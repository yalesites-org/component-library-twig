/**
 * @file
 * Fails if the published npm package grows past its ceiling, or if review
 * artefacts creep back into a published directory.
 *
 * Run with the Node test runner (as `npm run test:unit` does):
 *   node --test components/_storybook/package-weight.test.mjs
 *
 * ## Why this exists
 *
 * `package.json` declares `files: ["dist", "components"]`, so **everything**
 * under those two directories ships to every consumer -- and there is no
 * `.npmignore` to carve anything back out. That is a whitelist of directories,
 * not of content, so a new subdirectory under `components/` is published the
 * moment it is committed, with nothing to say so in review.
 *
 * That is not hypothetical. 84 before/after review screenshots (11 MB) were
 * committed to `components/03-organisms/layout/layout/screenshots/` during the
 * #1613/#1614 contrast audit and shipped in the package until they were moved
 * to `docs/review/` (outside the whitelist). A reviewer cannot see package
 * weight in a diff, so the only way to catch this class of mistake is to
 * measure it.
 *
 * ## What it checks
 *
 * 1. The packed tarball stays under `MAX_TARBALL_MB`.
 * 2. No directory that ships carries a pile of raster images -- the specific
 *    shape of the mistake above, caught by name so the failure explains itself
 *    rather than just reporting a number that went up.
 *
 * Raising `MAX_TARBALL_MB` to turn a red build green is not a fix. If the
 * package genuinely needs to grow, say why in the commit that raises it.
 */

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);

/**
 * Ceiling for the packed tarball, in MB.
 *
 * Set with headroom over the measured size at the time of writing (46.2 MB
 * after the screenshots were moved out) so ordinary component work does not
 * trip it, but a bulk directory arriving does.
 */
const MAX_TARBALL_MB = 50;

/**
 * How many raster images in one shipped directory counts as a pile.
 *
 * Components legitimately ship a handful of images. A directory holding dozens
 * is evidence, not decoration -- the screenshots case had 84 in one place.
 */
const MAX_IMAGES_PER_DIR = 20;

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);

/**
 * Asks npm what it would actually publish.
 *
 * @return {{entryCount: number, size: number, unpackedSize: number, files: Array<{path: string, size: number}>}}
 *   npm's own report for the package as it stands.
 */
const packReport = () => {
  const out = execFileSync('npm', ['pack', '--dry-run', '--json'], {
    cwd: ROOT,
    encoding: 'utf8',
    // npm writes its human-readable summary to stderr; only stdout is JSON.
    stdio: ['ignore', 'pipe', 'ignore'],
    maxBuffer: 32 * 1024 * 1024,
  });
  return JSON.parse(out)[0];
};

test('the published package stays under its size ceiling', () => {
  const report = packReport();
  const tarballMb = report.size / 1024 / 1024;

  // Name the biggest shipped entries in the failure, so whoever hits this can
  // see what grew without re-running npm pack themselves.
  const biggest = [...report.files]
    .sort((a, b) => b.size - a.size)
    .slice(0, 5)
    .map((f) => `      ${(f.size / 1024 / 1024).toFixed(2)} MB  ${f.path}`)
    .join('\n');

  assert.ok(
    tarballMb <= MAX_TARBALL_MB,
    `The published tarball is ${tarballMb.toFixed(
      1,
    )} MB, over the ${MAX_TARBALL_MB} MB ceiling.\n` +
      `    package.json ships everything under dist/ and components/, so a new\n` +
      `    directory in either is published automatically. Largest entries:\n${biggest}\n` +
      `    If the growth is legitimate, raise MAX_TARBALL_MB and say why in the commit.`,
  );
});

test('no shipped directory carries a pile of review images', () => {
  const report = packReport();

  // Array iteration rather than a for..of loop: the shared eslint config bars
  // for..of (no-restricted-syntax) and `continue` (no-continue).
  const imagesByDir = report.files
    .filter((file) =>
      IMAGE_EXTENSIONS.has(path.extname(file.path).toLowerCase()),
    )
    .reduce(
      (acc, file) =>
        acc.set(
          path.dirname(file.path),
          (acc.get(path.dirname(file.path)) ?? 0) + 1,
        ),
      new Map(),
    );

  const offenders = [...imagesByDir.entries()]
    .filter(([, count]) => count > MAX_IMAGES_PER_DIR)
    .map(([dir, count]) => `      ${count} images  ${dir}`)
    .join('\n');

  assert.equal(
    offenders,
    '',
    `A shipped directory holds more than ${MAX_IMAGES_PER_DIR} raster images:\n${offenders}\n` +
      `    Review evidence (before/after captures, audit screenshots) belongs in\n` +
      `    docs/review/, which is outside package.json's files whitelist. Component\n` +
      `    assets that genuinely ship are fine -- raise MAX_IMAGES_PER_DIR and say why.`,
  );
});
