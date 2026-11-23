/**
 * Measures every visreg story's rendered pixel area against the snapshot
 * ceiling, and fails if any story is over it.
 *
 * Usage (needs a built Storybook, so run `npm run storybook:build` first):
 *   npm run visreg:measure
 *
 * The browser has to be present. `npm ci` normally downloads it through
 * Puppeteer's postinstall, but newer npm gates install scripts, so fetch it
 * explicitly if the run cannot find one:
 *   npx puppeteer browsers install chrome
 *
 * Environment overrides:
 *   VISREG_PIXEL_CEILING     pixel-area ceiling (default 25,000,000)
 *   VISREG_CONCURRENCY       stories measured in parallel (default 2)
 *   VISREG_STORY_TIMEOUT     per-story timeout in ms (default 30,000)
 *   VISREG_SETTLE_TIMEOUT    ms to wait for images and fonts (default 10,000)
 *   VISREG_BATCH_SIZE        stories measured per browser launch (default 50)
 *   VISREG_MEASUREMENTS_OUT  write every story's measurement to this JSON file
 *
 * This file is deliberately only the I/O: serve the build, drive a headless
 * browser, hand the numbers to `visreg-pixel-budget.mjs`, which is where the
 * decisions live and where they are unit tested without a browser. What is
 * left here -- the wait strategy, the block list, the worker pool -- is
 * verified by running it, not by assertions, because all three are only
 * meaningful against a real browser.
 *
 * On waiting: a story is measured once its images and fonts have settled, not
 * once the network goes idle. `networkidle2` looks like the obvious choice and
 * is the wrong one -- it gives identical measurements but the audio player
 * stories, which point at a remote mp3, stall it for ~40s each. Lazily-loaded
 * images are forced eager first, because an image that has not loaded
 * collapses to nothing and would measure the story short.
 *
 * Audio and video downloads are blocked outright. They cannot change the
 * layout -- the audio player draws its own controls and video is sized by CSS
 * -- and fetching them made the run depend on a third-party host's mood.
 * Images are deliberately *not* blocked: stories source them from the
 * committed `assets/images/placeholders/` set and those do change the height.
 *
 * Which is also why the settle step is time-boxed. `load` has already waited
 * for every image in the initial markup, so the budget only covers the ones
 * forced eager afterwards; without a bound, a slow third-party host wedges the
 * page for minutes and the run reports a story it could not measure rather
 * than a story that is fine.
 *
 * The budget is the one place this check is not perfectly repeatable: a story
 * with many third-party images can measure a little short if some of them are
 * still in flight when it expires. Measurements were identical across runs for
 * 517 of 518 stories, the exception being `Templates/Layout`'s
 * layout-variations story at roughly half the ceiling either way. The error is
 * always in the "measured short" direction, so raise the budget rather than
 * lower it if a story ever lands close enough for that to matter.
 *
 * @see visreg-pixel-budget.mjs
 * @see serve-storybook-build.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import puppeteer from 'puppeteer';

import {
  BLOCKED_MEDIA,
  serveDirectory,
  storyUrl,
} from './serve-storybook-build.mjs';
import {
  PIXEL_CEILING,
  VIEWPORT_WIDTH,
  evaluateBudget,
  formatBudgetReport,
  requirePositiveNumber,
  selectVisregStories,
  storyWord,
} from './visreg-pixel-budget.mjs';

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);

// Where `storybook:build` puts its output; nothing in this repo builds anywhere
// else, so it is not worth an override.
const buildDir = path.resolve(repoRoot, '.out');
const ceiling = requirePositiveNumber(
  'VISREG_PIXEL_CEILING',
  process.env.VISREG_PIXEL_CEILING,
  PIXEL_CEILING,
);
const concurrency = requirePositiveNumber(
  'VISREG_CONCURRENCY',
  process.env.VISREG_CONCURRENCY,
  2,
);
const storyTimeout = requirePositiveNumber(
  'VISREG_STORY_TIMEOUT',
  process.env.VISREG_STORY_TIMEOUT,
  30000,
);
const settleTimeout = requirePositiveNumber(
  'VISREG_SETTLE_TIMEOUT',
  process.env.VISREG_SETTLE_TIMEOUT,
  10000,
);
const batchSize = requirePositiveNumber(
  'VISREG_BATCH_SIZE',
  process.env.VISREG_BATCH_SIZE,
  50,
);
const measurementsOut = process.env.VISREG_MEASUREMENTS_OUT;

/**
 * The story's own fields, without any measurement from a previous attempt.
 *
 * A retried story arrives carrying the `error` from its first attempt, and
 * spreading it forward would leave that `error` on a successful retry -- which
 * would still be counted as a failure.
 */
const storyFields = ({ id, name, title, importPath }) => ({
  id,
  name,
  title,
  importPath,
});

/**
 * Renders one story and reads back the area a snapshot would have to capture.
 *
 * @param {import('puppeteer').Page} page
 *   A page already sized to the snapshot viewport.
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {{id: string}} story
 *   The story to measure.
 * @return {Promise<object>}
 *   The story with `width`/`height`, or with `error` if it would not render.
 */
async function measureStory(page, origin, story) {
  const url = storyUrl(origin, story.id);

  try {
    await page.goto(url, { waitUntil: 'load', timeout: storyTimeout });
    // The root div is in the static HTML, so its presence proves nothing --
    // wait for Storybook to have rendered something into it.
    await page.waitForFunction(
      () => document.querySelector('#storybook-root')?.childElementCount > 0,
      { timeout: storyTimeout },
    );

    const size = await page.evaluate(async (budget) => {
      const lazy = document.querySelectorAll('img[loading="lazy"]');
      for (let index = 0; index < lazy.length; index += 1) {
        lazy[index].setAttribute('loading', 'eager');
      }
      const settled = Promise.all([
        ...[...document.images]
          .filter((image) => !image.complete)
          .map(
            (image) =>
              new Promise((resolve) => {
                image.addEventListener('load', resolve, { once: true });
                image.addEventListener('error', resolve, { once: true });
              }),
          ),
        document.fonts?.ready,
      ]);
      await Promise.race([
        settled,
        new Promise((resolve) => {
          setTimeout(resolve, budget);
        }),
      ]);
      // Two frames so the last layout pass has settled before measuring.
      await new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      });

      const { body, documentElement } = document;
      return {
        width: Math.max(documentElement.scrollWidth, body?.scrollWidth ?? 0),
        height: Math.max(documentElement.scrollHeight, body?.scrollHeight ?? 0),
      };
    }, settleTimeout);

    return { ...storyFields(story), ...size };
  } catch (error) {
    return { ...storyFields(story), width: 0, height: 0, error: error.message };
  }
}

/**
 * Measures every story, a few at a time, one page per worker.
 *
 * @param {import('puppeteer').Browser} browser
 *   The launched browser.
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {Array<object>} storyList
 *   Stories to measure.
 * @param {number} workers
 *   How many pages to measure with in parallel.
 * @param {function(): void} onMeasured
 *   Called after each story, for the progress log.
 * @return {Promise<Array<object>>}
 *   One measurement per story, in the order they were given.
 */
async function measureAll(browser, origin, storyList, workers, onMeasured) {
  const measurements = new Array(storyList.length);
  let next = 0;

  const worker = async () => {
    const page = await browser.newPage();

    try {
      await page.setViewport({
        width: VIEWPORT_WIDTH,
        height: 800,
        deviceScaleFactor: 1,
      });

      // CDP rather than `setRequestInterception`, which switches off the page
      // cache -- and the placeholder images repeat across stories, so keeping
      // the cache is worth it.
      const session = await page.createCDPSession();
      await session.send('Network.enable');
      await session.send('Network.setBlockedURLs', { urls: BLOCKED_MEDIA });

      while (next < storyList.length) {
        const index = next;
        next += 1;
        measurements[index] = await measureStory(
          page,
          origin,
          storyList[index],
        );
        onMeasured();
      }
    } finally {
      // If the browser crashed, every story this worker had left already
      // failed as one; a close that throws on the dead page would turn those
      // retryable failures into an aborted run.
      await page.close().catch(() => {});
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(workers, storyList.length) }, worker),
  );

  return measurements;
}

/**
 * Runs `task` against a freshly launched browser, then closes it.
 *
 * @param {function(import('puppeteer').Browser): Promise<*>} task
 *   What to do with the browser.
 * @return {Promise<*>}
 *   Whatever `task` resolves to.
 */
async function withBrowser(task) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
    // Bound the devtools protocol too, so a wedged page fails as one story
    // rather than hanging the run. Generous relative to the per-story
    // timeout: the tallest stories are slow to lay out, not stuck.
    protocolTimeout: storyTimeout * 4,
  });

  try {
    return await task(browser);
  } finally {
    // A browser that crashed mid-run has nothing left to close.
    await browser.close().catch(() => {});
  }
}

/**
 * Measures stories in batches, each batch in a freshly launched browser.
 *
 * On CI, a browser that has rendered a couple of hundred stories starts
 * failing: requests come back `net::ERR_INSUFFICIENT_RESOURCES`, then the page
 * or the whole browser crashes, and every story after it fails. A fresh
 * browser per batch keeps each one well short of that, and a crash costs at
 * most the rest of one batch, which the retry pass then picks up.
 *
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {Array<object>} storyList
 *   Stories to measure.
 * @param {number} workers
 *   How many pages to measure with in parallel.
 * @return {Promise<Array<object>>}
 *   One measurement per story, in the order they were given.
 */
async function measureInBatches(origin, storyList, workers) {
  const progressEvery = Math.max(1, Math.ceil(storyList.length / 10));
  let done = 0;
  const onMeasured = () => {
    done += 1;
    if (done % progressEvery === 0 || done === storyList.length) {
      console.log(`  measured ${done}/${storyList.length}`);
    }
  };
  const measurements = [];

  for (let start = 0; start < storyList.length; start += batchSize) {
    const batch = storyList.slice(start, start + batchSize);
    // Sequential on purpose: one browser at a time.
    const measured = await withBrowser((browser) =>
      measureAll(browser, origin, batch, workers, onMeasured),
    );
    measurements.push(...measured);
  }

  return measurements;
}

/**
 * Re-measures anything that failed, one story at a time.
 *
 * Measuring in parallel is what makes the run tolerable, and it is also what
 * makes it flaky: the tallest stories are slow enough to lay out that a page
 * competing for the CPU can miss its timeout. A story that fails on its own,
 * with nothing else running, is a story that is genuinely broken -- and it
 * still fails the build, so this only removes false failures.
 *
 * The retry launches its own browsers rather than reusing one from the
 * parallel pass, which may be the browser that crashed.
 *
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {Array<object>} measurements
 *   Measurements from the parallel pass.
 * @return {Promise<Array<object>>}
 *   The same measurements, with retried entries replaced.
 */
async function retryFailures(origin, measurements) {
  const failed = measurements.filter((entry) => entry.error);

  if (failed.length === 0) {
    return measurements;
  }

  console.log(
    `\nRetrying ${failed.length} unmeasured ` +
      `${storyWord(failed.length)} one at a time.`,
  );

  const retried = await measureInBatches(origin, failed, 1);
  const byId = new Map(retried.map((entry) => [entry.id, entry]));

  return measurements.map((entry) => byId.get(entry.id) ?? entry);
}

async function main() {
  const indexPath = path.join(buildDir, 'index.json');
  let storyList;

  try {
    storyList = selectVisregStories(
      JSON.parse(await readFile(indexPath, 'utf8')),
    );
  } catch (error) {
    console.error(`Could not read visreg stories from ${indexPath}.`);
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  console.log(
    `Measuring ${storyList.length} visreg stories at ${VIEWPORT_WIDTH}px wide ` +
      `against a ${ceiling.toLocaleString('en-US')}px ceiling.`,
  );

  // Both of these have to be closed on every path. A listening server keeps
  // the event loop alive, so leaking one turns a failed run into a job that
  // hangs until CI times out -- including when the browser cannot launch at
  // all, which is the most likely failure here.
  const server = await serveDirectory(buildDir);
  let measurements;

  try {
    measurements = await measureInBatches(
      server.origin,
      storyList,
      concurrency,
    );
    measurements = await retryFailures(server.origin, measurements);
  } finally {
    await server.close();
  }

  const evaluation = evaluateBudget(measurements, ceiling);

  if (measurementsOut) {
    await writeFile(
      measurementsOut,
      `${JSON.stringify(
        [...evaluation.measured, ...evaluation.failed],
        null,
        2,
      )}\n`,
    );
    console.log(`Wrote every measurement to ${measurementsOut}.`);
  }

  console.log(`\n${formatBudgetReport(evaluation)}`);

  if (!evaluation.passed) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
