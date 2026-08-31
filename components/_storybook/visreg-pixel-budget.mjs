/**
 * The visual-regression pixel budget: which stories count, what is over
 * budget, and what to say about it.
 *
 * Visual regression snapshots have a hard pixel-area ceiling -- Chromatic
 * rejects anything over 25,000,000px -- and nothing in a Storybook build fails
 * when a story grows past it. The story still renders; it is only too tall to
 * be captured, so the failure surfaces much later as a snapshot error. The
 * one-story-per-global-theme shape in `global-theme-stories.mjs` is what keeps
 * stories under the ceiling; this module is what proves they still are.
 *
 * Everything here is pure so it can be tested without a browser. The
 * measuring is in `measure-visreg-pixels.mjs`, which is kept deliberately thin
 * for the same reason.
 *
 * @see visreg-pixel-budget.test.mjs
 * @see measure-visreg-pixels.mjs
 */

/**
 * Chromatic's per-snapshot pixel-area ceiling.
 *
 * Percy is what `npm run visreg:ci` runs today; this is the tighter of the two
 * limits and the one the story shape was designed against, so it is what the
 * check enforces. Also stated in STORYBOOK.md and in the
 * `global-theme-stories.mjs` docblock -- change it in all three.
 */
export const PIXEL_CEILING = 25000000;

/**
 * The viewport width snapshots are captured at.
 *
 * Chromatic's default. Height is whatever the story renders to, which is the
 * half that varies in practice -- but the measuring reads width back from the
 * page rather than assuming this value, so a story that overflows horizontally
 * is measured as it actually renders.
 */
export const VIEWPORT_WIDTH = 1200;

/** Formats a pixel count the way the report quotes it. */
const px = (value) => value.toLocaleString('en-US');

/**
 * "1 story" / "3 stories", so a count reads as a sentence.
 *
 * Exported because the measuring script counts stories out loud too, and one
 * copy of this rule is enough.
 *
 * @param {number} count
 *   How many stories.
 * @return {string}
 *   The noun to use with that count.
 */
export const storyWord = (count) => (count === 1 ? 'story' : 'stories');

/**
 * Reads a positive number out of an environment override.
 *
 * `Number('nonsense')` is `NaN`, and every `area > NaN` comparison is false --
 * so a fat-fingered override would quietly pass every story instead of
 * checking anything. Same for a ceiling of zero or a negative timeout. This
 * check exists so a bad override fails loudly rather than disabling the check.
 *
 * @param {string} name
 *   The variable's name, for the error message.
 * @param {string|undefined} raw
 *   The raw environment value, if set.
 * @param {number} fallback
 *   Value to use when the variable is unset.
 * @return {number}
 *   The parsed value, or the fallback.
 */
export function requirePositiveNumber(name, raw, fallback) {
  if (raw === undefined || raw === '') {
    return fallback;
  }

  const value = Number(raw);

  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${name} must be a positive number, got "${raw}".`);
  }

  return value;
}

/**
 * Picks the visual-regression stories out of a built Storybook index.
 *
 * @param {object} index
 *   The parsed contents of `<storybook build dir>/index.json`.
 * @return {Array<{id: string, name: string, title: string, importPath: string}>}
 *   The visreg stories, ordered by id so a report is stable between runs.
 */
export function selectVisregStories(index) {
  const entries = index?.entries;

  if (!entries || typeof entries !== 'object') {
    throw new Error(
      'The Storybook index has no "entries" map. Run `npm run storybook:build` first.',
    );
  }

  const visreg = Object.values(entries)
    .filter(
      (entry) =>
        entry.type === 'story' && (entry.tags ?? []).includes('visreg'),
    )
    .map(({ id, name, title, importPath }) => ({ id, name, title, importPath }))
    .sort((a, b) => a.id.localeCompare(b.id));

  if (visreg.length === 0) {
    throw new Error(
      'No stories tagged "visreg" in the Storybook index. Either the tag was ' +
        'dropped or the build is stale -- measuring nothing is not a pass.',
    );
  }

  return visreg;
}

/**
 * Judges measured stories against the ceiling.
 *
 * A story carrying an `error` is reported separately rather than dropped: a
 * story that could not be measured is not a story known to fit.
 *
 * @param {Array<{id: string, title: string, name: string, width: number, height: number, error?: string}>} measurements
 *   One entry per visreg story.
 * @param {number} [ceiling]
 *   Pixel-area ceiling to judge against.
 * @return {{ceiling: number, measured: Array<object>, overBudget: Array<object>, failed: Array<object>, largest: ?object, passed: boolean}}
 *   `measured` is ordered largest first, with an `area` added.
 */
export function evaluateBudget(measurements, ceiling = PIXEL_CEILING) {
  if (!Array.isArray(measurements) || measurements.length === 0) {
    throw new Error(
      'Got no measurements to evaluate -- expected one per visreg story.',
    );
  }

  const failed = measurements.filter((entry) => entry.error);
  const measured = measurements
    .filter((entry) => !entry.error)
    .map((entry) => ({ ...entry, area: entry.width * entry.height }))
    .sort((a, b) => b.area - a.area);
  const overBudget = measured.filter((entry) => entry.area > ceiling);

  return {
    ceiling,
    measured,
    overBudget,
    failed,
    largest: measured[0] ?? null,
    passed: overBudget.length === 0 && failed.length === 0,
  };
}

/** One indented block per over-budget story, naming it and its size. */
const describeOverBudget = (entry, ceiling) =>
  [
    `  ${entry.title} > ${entry.name}`,
    `    ${entry.id}`,
    `    ${px(entry.width)} x ${px(entry.height)} = ${px(entry.area)}px -- ` +
      `${(entry.area / ceiling).toFixed(1)}x the ceiling`,
  ].join('\n');

/**
 * Renders the report a developer reads in CI output.
 *
 * @param {object} evaluation
 *   The return value of `evaluateBudget`.
 * @return {string}
 *   The report, ready to print.
 */
export function formatBudgetReport(evaluation) {
  const { ceiling, measured, overBudget, failed, largest } = evaluation;
  const sections = [];

  if (overBudget.length > 0) {
    sections.push(
      `${overBudget.length} visreg ${storyWord(overBudget.length)} ` +
        `${overBudget.length === 1 ? 'exceeds' : 'exceed'} the ${px(
          ceiling,
        )}px ` +
        'snapshot ceiling:',
      overBudget
        .map((entry) => describeOverBudget(entry, ceiling))
        .join('\n\n'),
      'Split the story so each snapshot stays under the ceiling -- see "One ' +
        'story per global theme" in STORYBOOK.md.',
    );
  } else if (largest) {
    sections.push(
      `${measured.length} visreg ${storyWord(measured.length)} measured, all ` +
        `within the ${px(ceiling)}px snapshot ceiling.`,
      `Largest: ${largest.title} > ${largest.name} (${largest.id}) at ` +
        `${px(largest.width)} x ${px(largest.height)} = ${px(
          largest.area,
        )}px ` +
        `(${Math.round((largest.area / ceiling) * 100)}% of the ceiling).`,
    );
  }

  if (failed.length > 0) {
    sections.push(
      `${failed.length} visreg ${storyWord(
        failed.length,
      )} could not be measured:`,
      failed
        .map(
          (entry) =>
            `  ${entry.title} > ${entry.name} (${entry.id}): ${entry.error}`,
        )
        .join('\n'),
    );
  }

  return sections.join('\n\n');
}
