/**
 * Functional-element contrast audit (YaleSites-Internal #1614).
 *
 * #1613's `section-background-contrast.mjs` answers "which colors MAY sit on
 * which section background" -- a property of the palette, computed from tokens.
 * Its own header notes the limit: whether a given component actually RESOLVES
 * to the color it should is a separate question that only a real render
 * answers. #1614 is that question, for the three blocks #1613 deliberately left
 * alone (accordion, link_grid, wrapped_text_callout).
 *
 * So this script does NOT compute colors. It reads colors that were MEASURED
 * off a rendered Drupal page -- every functional element, against its own
 * painted background, for every (component dial x section background x global
 * theme) pairing -- and turns them into the pass/fail table the ticket asks
 * for. Producing that input needs a Lando site, so it lives in
 * `yalesites-project/scripts/local/`, the same split #1613 used for its
 * screenshots.
 *
 * Regenerate the committed report with:
 *
 *   # in yalesites-project, with Lando up
 *   lando drush php:script scripts/local/1614-functional-contrast-fixture.php
 *   node scripts/local/1614-collect-rendered.mjs > /tmp/1614.json
 *
 *   # here
 *   node components/00-tokens/colors/functional-element-contrast.mjs /tmp/1614.json \
 *     > components/00-tokens/colors/functional-element-contrast.txt
 *
 * The raw measurements are ~1.3MB of JSON and are deliberately NOT committed;
 * the table below is the artifact, and the two scripts above regenerate it.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  contrastRatio,
  formatRatio,
  AA_NORMAL_TEXT,
} from './contrast-ratio.mjs';

/** AA minimum for large text and for non-text (UI/graphics) -- WCAG 1.4.3 / 1.4.11. */
export const AA_LARGE_OR_NON_TEXT = 3;

const RGB_PATTERN = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/;

/**
 * Parse the `rgb(r, g, b)` form `getComputedStyle` returns.
 *
 * A sibling of `parseHex`/`parseHsl` in contrast-ratio.mjs rather than a
 * replacement: those parse the formats colors are AUTHORED in (tokens are
 * `hsl(...)` strings), this parses the format they are READ BACK in. Kept here
 * because the render pipeline is the only consumer.
 */
export function parseRgb(value) {
  if (typeof value !== 'string') return null;

  const match = value.trim().match(RGB_PATTERN);
  if (!match) return null;

  return {
    r: Math.round(parseFloat(match[1])),
    g: Math.round(parseFloat(match[2])),
    b: Math.round(parseFloat(match[3])),
  };
}

/**
 * The minimum a row has to clear.
 *
 * Everything textual is held to 4.5:1 even where the element is a heading that
 * would qualify as WCAG large text. #1614 frames the failure as SC 1.4.3
 * normal text, and quietly applying the 3:1 large-text allowance to headings
 * would turn failing cells into passing ones by choosing a different rule. The
 * report marks which failures WOULD clear 3:1 instead, so the accessibility
 * engineer can make that call explicitly rather than inherit it from a script.
 */
export function minimumFor(row) {
  return row.nonText ? AA_LARGE_OR_NON_TEXT : AA_NORMAL_TEXT;
}

/** Contrast of one measured row: its resolved color against its own background. */
export function ratioFor(row) {
  return contrastRatio(parseRgb(row.value), parseRgb(row.background));
}

function table(header, rows) {
  const widths = header.map((_, column) =>
    Math.max(
      header[column].length,
      ...rows.map((row) => String(row[column]).length),
    ),
  );
  const line = (cells) =>
    cells
      .map((cell, i) => String(cell).padEnd(widths[i]))
      .join('  ')
      .trimEnd();

  return [line(header), line(widths.map((w) => '-'.repeat(w)))]
    .concat(rows.map(line))
    .join('\n');
}

/**
 * Collapse the 7 global themes into one row per (component, element, dial,
 * section background).
 *
 * The global theme is the least interesting axis: a cell that fails does so
 * because of how the component resolves its color, and that reasoning is the
 * same in every palette -- only the numbers move. Reporting the range and the
 * pass count says that in one line instead of seven, and keeps the table
 * readable at the size a ticket comment can show.
 */
export function summarise(rows) {
  const groups = rows.reduce((accumulator, row) => {
    const key = `${row.component} ${row.element} ${row.dial} ${row.sectionTheme}`;
    accumulator.set(key, (accumulator.get(key) || []).concat(row));
    return accumulator;
  }, new Map());

  return [...groups.values()].map((group) => {
    const [first] = group;
    const minimum = minimumFor(first);
    const ratios = group.map(ratioFor);
    const passing = ratios.filter((ratio) => ratio >= minimum).length;

    return {
      component: first.component,
      element: first.element,
      dial: first.dial,
      sectionTheme: first.sectionTheme,
      decorative: first.decorative,
      minimum,
      themes: group.length,
      passing,
      min: Math.min(...ratios),
      max: Math.max(...ratios),
      // Would the failing cells clear the 3:1 large-text/non-text allowance?
      // The distinction the accessibility engineer signs off on.
      passingAtThree: ratios.filter((ratio) => ratio >= AA_LARGE_OR_NON_TEXT)
        .length,
    };
  });
}

const verdict = (summary) => {
  if (summary.decorative) return 'n/a (decorative)';
  if (summary.passing === summary.themes) return 'PASS';
  if (summary.passing === 0) return 'FAIL (all themes)';
  return `FAIL (${summary.themes - summary.passing}/${summary.themes} themes)`;
};

export function buildReport(rows) {
  const summaries = summarise(rows);

  const functional = summaries.filter((summary) => !summary.decorative);
  const failing = functional.filter(
    (summary) => summary.passing < summary.themes,
  );

  const row = (summary) => [
    summary.component,
    summary.element,
    summary.dial,
    summary.sectionTheme,
    `${formatRatio(summary.min)}-${formatRatio(summary.max)}`,
    `${summary.passing}/${summary.themes}`,
    `${summary.minimum}:1`,
    verdict(summary),
  ];

  const header = [
    'Component',
    'Functional element',
    'Dial',
    'Section',
    'Ratio range',
    'Passing',
    'Min',
    'Verdict',
  ];

  const cells = rows.filter((measured) => !measured.decorative).length;

  return [
    'FUNCTIONAL-ELEMENT CONTRAST AUDIT',
    'yalesites-org/YaleSites-Internal#1614',
    '',
    'Generated by components/00-tokens/colors/functional-element-contrast.mjs',
    'from colors MEASURED on a rendered Drupal page. Regenerate rather than',
    'hand-edit; see the header of that file for the two commands.',
    '',
    `Measured cells: ${cells} functional (decorative elements excluded from`,
    'every verdict below, per #1614: the option-six accent is out of scope).',
    'Each cell is one functional element, in one component color dial, on one',
    'section background, in one global theme, against ITS OWN painted',
    'background -- a dialled accordion item paints its own fill, so its text',
    'does not sit on the section color.',
    '',
    'Text is held to 4.5:1 (SC 1.4.3 normal text) throughout, including',
    'headings that would qualify for the 3:1 large-text allowance -- see',
    '`minimumFor` for why. Section 3 lists which failures would clear 3:1.',
    '',
    '',
    '1. FAILURES',
    '',
    'Every row below is the SAME defect, tracked separately as',
    "YaleSites-Internal#1625: a link in the wrapped callout's body half has no",
    'styling at all and renders at the browser default #0000EE. It is not a',
    'section-background failure -- the color is identical in every global',
    'theme, every dial and every section -- so #1614 records it and leaves it.',
    'The section backgrounds only make an already-unstyled link visible as a',
    'contrast failure.',
    '',
    failing.length
      ? table(header, failing.map(row))
      : 'None. Every functional element clears its minimum on every section',
    failing.length ? '' : 'background in all 7 global themes.',
    '',
    `${failing.length} failing (component, element, dial, section) groups.`,
    '',
    '',
    '2. EVERY FUNCTIONAL ELEMENT',
    '',
    table(
      header,
      functional
        .sort(
          (a, b) =>
            a.component.localeCompare(b.component) ||
            a.element.localeCompare(b.element) ||
            a.dial.localeCompare(b.dial) ||
            a.sectionTheme.localeCompare(b.sectionTheme),
        )
        .map(row),
    ),
    '',
    '',
    '3. WOULD THE FAILURES CLEAR THE 3:1 LARGE-TEXT ALLOWANCE?',
    '',
    'Recorded so the large-text question is answered explicitly rather than',
    'assumed either way. A row that still fails at 3:1 fails under any reading',
    'of the criterion.',
    '',
    failing.length
      ? table(
          [
            'Component',
            'Functional element',
            'Dial',
            'Section',
            'Passing at 3:1',
          ],
          failing.map((summary) => [
            summary.component,
            summary.element,
            summary.dial,
            summary.sectionTheme,
            `${summary.passingAtThree}/${summary.themes}`,
          ]),
        )
      : 'No failures to reclassify.',
    '',
  ].join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const source = process.argv[2];
  if (!source) {
    process.stderr.write(
      'Usage: node functional-element-contrast.mjs <measurements.json>\n',
    );
    process.exit(1);
  }

  process.stdout.write(buildReport(JSON.parse(readFileSync(source, 'utf8'))));
}
