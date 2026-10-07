/**
 * Guards the Link Grid heading against the white-on-white failure reported in
 * yalesites-org/YaleSites-Internal#1734 (live on a published site).
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/02-molecules/link-grid/link-grid-heading-contrast.test.mjs
 *
 * The Link Grid paints no background of its own -- `--color-link-grid-action`
 * only ever drives borders and link color -- so its heading sits on whichever
 * background the enclosing `.yds-layout` section paints. Only that section
 * knows what the background is, so the component has to defer to it rather than
 * pick an ink itself.
 *
 * It cannot simply leave `--color-heading` alone: the shared rule in
 * `00-tokens/colors/_color-component-themes.scss` sets that property for
 * component themes one-five, using a token chosen for components that DO paint
 * a background. Left unopposed it puts white text on a backdrop never drawn.
 *
 * So the component fails this way whenever a fixed ink is pinned, in either of
 * the two stylesheets the original bug spanned. Tests 1-3 forbid that. Test 4
 * proves the value being deferred to is itself accessible, using real tokens.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import {
  WCAG_LEVELS,
  contrastRatio,
  parseHsl,
} from '../../00-tokens/colors/contrast-ratio.mjs';

const require = createRequire(import.meta.url);
const tokens = require('@yalesites-org/tokens/build/json/tokens.json');

const selfPath = fileURLToPath(import.meta.url);
const componentsDir = path.dirname(path.dirname(path.dirname(selfPath)));

const read = (relativePath) =>
  readFileSync(path.join(componentsDir, relativePath), 'utf8');

const stylesheet = read('02-molecules/link-grid/_yds-link-grid.scss');
const layoutStylesheet = read('03-organisms/layout/layout/_yds-layout.scss');

/**
 * The heading renders at ~49px, well over the 24px large-text boundary, so 3:1
 * is the applicable minimum. Read from the shared table so there is one copy of
 * each WCAG number in the repo.
 */
const LARGE_TEXT_AA = WCAG_LEVELS.find(
  (level) => level.id === 'large-aa',
).minimum;

/**
 * Reads each `&[data-section-theme='x']` block in `_yds-layout.scss` and
 * returns its `{ background, heading }` slot names -- `--color-layout-theme` is
 * what the section paints, `--color-heading` the ink it publishes.
 */
function sectionThemeSlots(scss) {
  const blocks = [
    ...scss.matchAll(/&\[data-section-theme='(\w+)'\]\s*\{([^}]*)\}/g),
  ];

  return blocks.reduce((slots, [, theme, body]) => {
    const slotFor = (property) =>
      body.match(
        new RegExp(`--${property}:\\s*var\\(--color-(slot-\\w+)\\)`),
      )?.[1];

    const background = slotFor('color-layout-theme');
    const heading = slotFor('color-heading');

    return background && heading
      ? { ...slots, [theme]: { background, heading } }
      : slots;
  }, {});
}

/** Reads the global-theme-four slot swap out of `_yds-layout.scss`. */
function globalThemeFourSwaps(scss) {
  const matches = [
    ...scss.matchAll(
      /--color-(slot-\w+):\s*var\(--global-themes-four-colors-(slot-\w+)\)/g,
    ),
  ];

  return matches.reduce(
    (swaps, [, target, source]) => ({ ...swaps, [target]: source }),
    {},
  );
}

test('--color-heading tracks the section, never a fixed color', () => {
  // The section owns the background, so the section owns the heading ink.
  // Theme `six` pinned `--color-slot-seven`, which this component never
  // declares; the rest inherited the shared white. Either way the ink was
  // chosen without reference to what is actually painted behind it.
  const assignments = stylesheet
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^--color-heading\s*:/.test(line));

  assert.notEqual(
    assignments.length,
    0,
    'Link Grid must set --color-heading; the shared [data-component-theme] rule otherwise wins.',
  );

  const offenders = assignments.filter(
    (line) => !line.includes('--color-section-foreground'),
  );

  assert.deepEqual(
    offenders,
    [],
    'Heading ink must come from the section (--color-section-foreground), not a fixed token.',
  );
});

test('the heading never hardcodes a text color', () => {
  // `color: var(--color-basic-white)` here assumes a dark backdrop the
  // component cannot see. On an unthemed (white) section that was the visible
  // white-on-white failure.
  const headingBlock = stylesheet.slice(
    stylesheet.indexOf('.link-grid__heading'),
  );
  const end = headingBlock.indexOf('\n.link-grid__inner');
  const heading = end === -1 ? headingBlock : headingBlock.slice(0, end);

  assert.doesNotMatch(
    heading,
    /color:\s*var\(--color-basic-white\)/,
    'The heading must not force white; the section background is not known here.',
  );
});

test('the layout does not reach in and colour Link Grid headings', () => {
  // The original bug spanned two files: `_yds-layout.scss` carried a workaround
  // forcing dark headings on light section themes, which hid the defect there
  // while the unthemed section stayed broken. Such a rule is specificity 0,3,0
  // -- it beats everything in the component stylesheet, so re-adding one would
  // reproduce the bug with the other tests still green.
  const offenders = layoutStylesheet
    .split('\n')
    .map((line, index) => ({ line: line.trim(), number: index + 1 }))
    .filter(({ line }) => /\.link-(grid|group)__heading/.test(line));

  assert.deepEqual(
    offenders,
    [],
    'Section heading colour belongs to --color-heading, not a layout override targeting Link Grid.',
  );
});

test('every section theme pairs its foreground with its own background at 3:1', () => {
  // The component defers to the section, so the section's own pairings are what
  // make that safe. Parsed out of `_yds-layout.scss` rather than restated here,
  // so a remapped slot fails this test instead of silently drifting past it.
  const sectionThemes = sectionThemeSlots(layoutStylesheet);
  const swaps = globalThemeFourSwaps(layoutStylesheet);

  assert.ok(
    Object.keys(sectionThemes).length >= 5,
    `expected the five section themes, parsed ${Object.keys(sectionThemes)}`,
  );

  // An unthemed section paints nothing, so the heading lands on the page with
  // the fallback ink the component declares.
  const failures = [];

  const check = (label, heading, background) => {
    assert.ok(background && heading, `${label} is missing a slot color`);
    const ratio = contrastRatio(heading, background);
    if (ratio < LARGE_TEXT_AA) {
      failures.push(`${label}: ${ratio.toFixed(2)}:1`);
    }
  };

  check(
    'unthemed section',
    parseHsl(tokens.color.gray['800']),
    parseHsl(tokens.color.basic.white),
  );

  Object.entries(tokens['global-themes']).forEach(([globalTheme, palette]) => {
    // Global theme four swaps slots two and five inside these components.
    const slot = (name) =>
      parseHsl(
        palette.colors[
          globalTheme === 'four' && swaps[name] ? swaps[name] : name
        ],
      );

    Object.entries(sectionThemes).forEach(([sectionTheme, mapping]) => {
      check(
        `global ${globalTheme} / section ${sectionTheme}`,
        slot(mapping.heading),
        slot(mapping.background),
      );
    });
  });

  assert.deepEqual(
    failures,
    [],
    `Section heading ink must clear ${LARGE_TEXT_AA}:1 on its own background.`,
  );
});
