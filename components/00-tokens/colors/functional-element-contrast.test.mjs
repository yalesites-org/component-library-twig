/**
 * Checks for the #1614 functional-element contrast audit.
 *
 * Two kinds of test here, and the second kind is the load-bearing one:
 *
 * 1. Unit tests for the report helpers, so the table cannot quietly change
 *    what it means (which minimum a row is held to, how the 7 global themes
 *    collapse into one row).
 *
 * 2. SOURCE assertions that the two fixes are still in place. The audit itself
 *    runs against a live Drupal render and cannot execute in CI, so without
 *    these the fixes could be reverted and nothing would notice until the next
 *    manual sweep. They follow the same approach as
 *    `section-background-contrast.test.mjs`, which reads `_yds-layout.scss` and
 *    asserts it agrees with the model rather than trusting a transcription.
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import {
  AA_LARGE_OR_NON_TEXT,
  buildReport,
  minimumFor,
  parseRgb,
  ratioFor,
  summarise,
} from './functional-element-contrast.mjs';

const componentsDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const readComponent = (path) => readFileSync(join(componentsDir, path), 'utf8');

const layoutScss = () =>
  readComponent('03-organisms/layout/layout/_yds-layout.scss');

/**
 * Body of the shared `&[data-component-theme]:not([… 'default']) { … }` rule.
 *
 * Terminates on a closing brace at the block's OWN indentation rather than on
 * the first `}`, so nested rules inside the block are included rather than
 * cutting the match short. Copied from `yds-layout.test.mjs`'s `themeBlock`,
 * which solved this for the same file: a `[^}]*` match would break the moment
 * anything nests ahead of the rule being asserted, and would then report the
 * fix as reverted when nothing about the fix had changed.
 */
function themedSectionBlock() {
  const match = layoutScss().match(
    /&\[data-component-theme\]:not\(\[data-component-theme='default'\]\)\s*\{([\s\S]*?)\n {2}\}/,
  );
  return match ? match[1] : null;
}

/** One measured row, in the shape `1614-measure-rendered.js` emits. */
const measured = (overrides = {}) => ({
  globalTheme: 'one',
  sectionTheme: 'one',
  component: 'wrapped_text_callout',
  dial: 'one',
  element: 'callout heading',
  property: 'color',
  value: 'rgb(255, 255, 255)',
  background: 'rgb(0, 54, 107)',
  nonText: false,
  decorative: false,
  ...overrides,
});

test('parseRgb reads the format getComputedStyle returns', () => {
  assert.deepEqual(parseRgb('rgb(0, 54, 107)'), { r: 0, g: 54, b: 107 });
  // Chromium emits `rgba(...)` for anything with an alpha channel, and the
  // space-separated form for colors authored in modern syntax.
  assert.deepEqual(parseRgb('rgba(1, 2, 3, 0.5)'), { r: 1, g: 2, b: 3 });
  assert.deepEqual(parseRgb('rgb(1 2 3)'), { r: 1, g: 2, b: 3 });
  assert.deepEqual(parseRgb('  rgb(10, 20, 30)  '), { r: 10, g: 20, b: 30 });
});

test('parseRgb returns null rather than guessing', () => {
  // A null has to propagate as a null: a ratio computed from a guessed color
  // would be reported with the same confidence as a measured one.
  ['transparent', '#ffffff', '', null, undefined, 42].forEach((value) => {
    assert.equal(parseRgb(value), null);
  });
  assert.equal(ratioFor(measured({ value: 'transparent' })), null);
});

test('text is held to 4.5:1 even where it is a heading', () => {
  // The deliberate call #1614 makes: headings would qualify for the 3:1
  // large-text allowance, but the ticket frames the failure as SC 1.4.3, and
  // applying 3:1 to headings would turn failing cells into passing ones by
  // switching criterion rather than by fixing anything.
  assert.equal(minimumFor(measured({ element: 'callout heading' })), 4.5);
  assert.equal(minimumFor(measured({ element: 'block heading' })), 4.5);
  assert.equal(
    minimumFor(measured({ element: 'item separator', nonText: true })),
    AA_LARGE_OR_NON_TEXT,
  );
});

test('summarise collapses the global themes into one row and counts passes', () => {
  const rows = [
    // Passes: white on Yale Blue.
    measured({ globalTheme: 'one' }),
    // Fails: near-black on Yale Blue.
    measured({ globalTheme: 'two', value: 'rgb(33, 33, 33)' }),
  ];

  const [summary] = summarise(rows);

  assert.equal(summary.themes, 2);
  assert.equal(summary.passing, 1);
  assert.equal(summary.component, 'wrapped_text_callout');
  assert.equal(summary.element, 'callout heading');
  assert.ok(summary.min < 4.5);
  assert.ok(summary.max > 4.5);
});

test('summarise keys on dial and section, so the slot-mixing cases stay distinct', () => {
  // AC #4: a block carrying its own color dial inside a themed section is a
  // separate cell from the same block with a different dial. Collapsing those
  // together is exactly how the link-grid dial-two failure would have been
  // averaged away.
  const rows = [
    measured({ dial: 'one' }),
    measured({ dial: 'two' }),
    measured({ dial: 'two', sectionTheme: 'three' }),
  ];

  assert.equal(summarise(rows).length, 3);
});

test('decorative rows are reported but never given a verdict', () => {
  // #1614 AC #6: the option-six accent is explicitly out of scope, so it must
  // not be able to fail the audit.
  const report = buildReport([
    measured({
      element: 'decorative callout outline',
      property: 'borderTopColor',
      value: 'rgb(0, 54, 107)',
      decorative: true,
    }),
  ]);

  assert.match(report, /None\. Every functional element clears its minimum/);
});

test('the link grid heading rule covers every section theme, not just the light ones', () => {
  const block = themedSectionBlock();

  assert.ok(
    block,
    'the shared themed-section rule should exist in _yds-layout.scss',
  );
  assert.match(
    block.replace(/\s+/g, ' '),
    /\.link-grid \.link-grid__heading, \.link-grid \.link-group__heading \{ color: var\(--color-section-foreground\); \}/,
    'link grid headings must be re-pointed for every themed section, not only two/five/six',
  );
});

test('no rule in the layout pins a link-grid heading to a fixed slot', () => {
  // The light-only carve-out this REPLACED. Not merely redundant now: leaving
  // it beside the general rule would re-fix the same three section themes at
  // lower specificity and invite the next reader to add a dark-only twin
  // rather than notice the general one already exists.
  // -
  // Asserted on MEANING rather than on the exact text that used to be here.
  // Pinning the old rule's whitespace and brace placement would let it back in
  // reformatted, joined onto one line, or with a comment after the brace.
  const rules = layoutScss()
    .replace(/\s+/g, ' ')
    .match(/[^{}]*\.link-grid__heading[^{}]*\{[^{}]*\}/g);

  (rules || []).forEach((rule) => {
    assert.doesNotMatch(
      rule,
      /--color-slot-/,
      `link-grid heading rules must follow the section foreground, not a fixed slot: ${rule.trim()}`,
    );
  });
});

test('--color-section-foreground is declared for every themed section', () => {
  // Both #1614 fixes read this property, and both fall back to their old
  // colour when it is unset. If the declaration were ever narrowed to a subset
  // of section themes, the fixes would silently stop applying on the rest --
  // and the fallback means nothing would look broken enough to notice.
  assert.match(
    themedSectionBlock().replace(/\s+/g, ' '),
    /--color-section-foreground: var\(--color-layout-content\);/,
  );
});

test('an unmeasurable colour is reported as unmeasured, never as a failure', () => {
  // `getComputedStyle().fill` is the string `none` on an unfilled icon, so
  // this is a real input, not a hypothetical. Before this was partitioned out,
  // a null ratio compared false against the minimum and coerced to 0 through
  // `Math.min`, printing a genuine-looking `0.00-0.00  FAIL (all themes)` --
  // a measurement gap wearing the costume of a contrast result.
  const [summary] = summarise([measured({ value: 'none' })]);

  assert.equal(summary.unmeasured, 1);
  assert.equal(summary.themes, 0);
  assert.equal(summary.min, null);

  const report = buildReport([measured({ value: 'none' })]);
  assert.match(report, /UNMEASURED \(1 cell\)/);
  assert.doesNotMatch(report, /0\.00-0\.00/);
});

test('the #1625 note is emitted only while every failure IS that defect', () => {
  // The file says "regenerate rather than hand-edit", so an unconditional
  // narrative would describe the first future regression as #1625 in a
  // committed artifact while the table beneath it said otherwise.
  const calloutLink = measured({
    element: 'body link',
    value: 'rgb(0, 0, 238)',
  });
  const somethingElse = measured({
    component: 'link_grid',
    element: 'block heading',
    value: 'rgb(33, 33, 33)',
  });

  assert.match(buildReport([calloutLink]), /YaleSites-Internal#1625/);
  assert.doesNotMatch(
    buildReport([calloutLink, somethingElse]),
    /YaleSites-Internal#1625/,
  );
});

test('the report counts global themes from the data, not from a literal', () => {
  // `GLOBAL_THEMES` lives in the other repo, so a hardcoded "7" here would
  // quietly become wrong the moment a palette is added or removed.
  const report = buildReport([
    measured({ globalTheme: 'one' }),
    measured({ globalTheme: 'two' }),
  ]);

  assert.match(report, /across 2 global themes/);
});
