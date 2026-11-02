/**
 * Checks for the WCAG contrast math used by the Tokens/Colors stories.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/00-tokens/colors/contrast-ratio.test.mjs
 *
 * Expected ratios below are the published WCAG reference values, so a
 * regression in the luminance formula fails here rather than silently
 * mislabelling a color pair as accessible in the matrix story.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  AA_NORMAL_TEXT,
  WCAG_LEVELS,
  contrastRatio,
  evaluateRatio,
  findIsolatedSlots,
  formatContrastReport,
  formatRatio,
  parseHex,
  parseHsl,
  rgbToHex,
  thresholdGroups,
} from './contrast-ratio.mjs';

const BLACK = { r: 0, g: 0, b: 0 };
const WHITE = { r: 255, g: 255, b: 255 };

test('black on white is the maximum 21:1 ratio', () => {
  assert.equal(contrastRatio(BLACK, WHITE), 21);
});

test('contrast ratio is symmetric', () => {
  assert.equal(contrastRatio(WHITE, BLACK), contrastRatio(BLACK, WHITE));
});

test('a color against itself is 1:1', () => {
  assert.equal(contrastRatio(WHITE, WHITE), 1);
});

test('matches published reference ratios against white', () => {
  // #767676 is the darkest gray that still passes 4.5:1 on white.
  assert.equal(formatRatio(contrastRatio(parseHex('#767676'), WHITE)), '4.54');
  // #777777 is one step lighter and fails. Its true ratio is 4.4769, which
  // formatRatio truncates to 4.47 — WebAIM prints 4.48 for the same pair
  // because it rounds. See formatRatio for why truncating is deliberate.
  assert.equal(formatRatio(contrastRatio(parseHex('#777777'), WHITE)), '4.47');
});

test('parseHex accepts shorthand, longhand, and a missing hash', () => {
  assert.deepEqual(parseHex('#fff'), WHITE);
  assert.deepEqual(parseHex('#FFFFFF'), WHITE);
  assert.deepEqual(parseHex('ffffff'), WHITE);
  assert.deepEqual(parseHex('  #00356b '), { r: 0, g: 53, b: 107 });
});

test('parseHex rejects empty and malformed values instead of guessing', () => {
  assert.equal(parseHex(''), null);
  assert.equal(parseHex('   '), null);
  assert.equal(parseHex('#ff'), null);
  assert.equal(parseHex('#gggggg'), null);
  assert.equal(parseHex('rebeccapurple'), null);
  assert.equal(parseHex(undefined), null);
});

test('parseHsl reads the token format and rejects anything else', () => {
  assert.deepEqual(parseHsl('hsl(0, 0%, 100%)'), WHITE);
  assert.deepEqual(parseHsl('hsl(0, 0%, 0%)'), BLACK);
  // The Yale Blue slot token, hsl(210, 100%, 21%), is a rounded HSL of
  // #00356b = rgb(0, 53, 107), so converting it back lands one step off on
  // green. That imprecision is in the token, not here — the repo's existing
  // hslToComponents helper has always produced the same rgb(0, 54, 107).
  assert.deepEqual(parseHsl('hsl(210, 100%, 21%)'), { r: 0, g: 54, b: 107 });
  assert.equal(parseHsl('#ffffff'), null);
  assert.equal(parseHsl(undefined), null);
});

test('rgbToHex round-trips and passes null through', () => {
  assert.equal(rgbToHex(parseHsl('hsl(210, 100%, 21%)')), '#00366b');
  assert.equal(rgbToHex({ r: 0, g: 53, b: 107 }), '#00356b');
  assert.equal(rgbToHex(null), null);
});

test('formatRatio never rounds a failing ratio up to a passing one', () => {
  // 4.499 must not display as "4.50" next to a FAIL badge.
  assert.equal(formatRatio(4.499), '4.49');
  assert.equal(formatRatio(21), '21.00');
  assert.equal(formatRatio(null), null);
});

test('evaluateRatio applies each WCAG minimum to the unrounded ratio', () => {
  const at449 = Object.fromEntries(
    evaluateRatio(4.499).map((level) => [level.id, level.passes]),
  );
  assert.equal(at449['normal-aa'], false, '4.499 fails 4.5:1 normal text');
  assert.equal(at449['large-aa'], true);
  assert.equal(at449['non-text'], true);
  assert.equal(at449['normal-aaa'], false);
  assert.equal(at449['large-aaa'], false);

  const at21 = evaluateRatio(21);
  assert.ok(at21.every((level) => level.passes));
  assert.equal(at21.length, WCAG_LEVELS.length);

  assert.deepEqual(evaluateRatio(null), []);
});

test('thresholdGroups collapses the five criteria onto their distinct minimums', () => {
  const groups = thresholdGroups();

  // Ascending, deduplicated: 3 (large AA + non-text), 4.5 (normal AA + large
  // AAA), 7 (normal AAA). Reporting per minimum is why no dropdown is needed.
  assert.deepEqual(
    groups.map((group) => group.minimum),
    [3, 4.5, 7],
  );
  assert.deepEqual(
    groups.map((group) => group.levels.map((level) => level.id)),
    [['large-aa', 'non-text'], ['normal-aa', 'large-aaa'], ['normal-aaa']],
  );
  // Every criterion is represented exactly once.
  assert.equal(
    groups.reduce((total, group) => total + group.levels.length, 0),
    WCAG_LEVELS.length,
  );
});

test('a slot can have a partner at one minimum and none at a higher one', () => {
  // ~3.5:1 apart: partnered at 3:1, stranded at 4.5:1 and 7:1. This is the
  // whole reason the summary reports each threshold separately.
  const palette = {
    'slot-one': parseHex('#ffffff'),
    'slot-two': parseHex('#8a8a8a'),
  };
  const ratio = contrastRatio(palette['slot-one'], palette['slot-two']);
  assert.ok(ratio > 3 && ratio < 4.5, `expected 3-4.5, got ${ratio}`);

  assert.deepEqual(findIsolatedSlots(palette, 3), []);
  assert.deepEqual(findIsolatedSlots(palette, AA_NORMAL_TEXT), [
    'slot-one',
    'slot-two',
  ]);
  assert.deepEqual(findIsolatedSlots(palette, 7), ['slot-one', 'slot-two']);
});

test('formatContrastReport produces an aligned, self-describing text report', () => {
  const report = formatContrastReport({
    generatedOn: '2026-08-12',
    colors: [
      { label: 'Slot 1', hex: '#000000' },
      { label: 'Slot 10', hex: '#ffffff' },
    ],
    thresholds: [
      {
        minimum: 3,
        usedFor: 'Large text (AA)',
        passing: 1,
        total: 1,
        isolated: [],
      },
      {
        minimum: 7,
        usedFor: 'Normal text (AAA)',
        passing: 0,
        total: 1,
        isolated: ['Slot 1', 'Slot 10'],
      },
    ],
    pairs: [{ a: 'Slot 1', b: 'Slot 10', ratio: 21, verdict: 'Pass' }],
  });

  const lines = report.split('\n');

  assert.match(report, /^YaleSites contrast check\nGenerated 2026-08-12$/m);
  // Values are present, including the ratio formatted the same way the grid
  // formats it.
  assert.match(report, /#000000/);
  assert.match(report, /21\.00:1/);
  assert.match(report, /1 of 1/);
  // Empty isolated lists read as "None" rather than blank.
  assert.match(report, /3:1 {2,}Large text \(AA\) {2,}1 of 1 {2,}None/);
  assert.match(
    report,
    /7:1 {2,}Normal text \(AAA\) {2,}0 of 1 {2,}Slot 1, Slot 10/,
  );
  // Columns are padded to the widest value: "Slot 10" is longer than "Slot 1",
  // so the hex column starts at the same offset on both rows.
  const colorRows = lines.filter((line) => /^Slot (1|10)\s+#/.test(line));
  assert.equal(colorRows.length, 2);
  assert.equal(
    colorRows[0].indexOf('#'),
    colorRows[1].indexOf('#'),
    'hex column should be aligned',
  );
  // Every WCAG level is explained so the file stands alone.
  WCAG_LEVELS.forEach((level) => {
    assert.match(
      report,
      new RegExp(`SC ${level.criterion.replace('.', '\\.')}`),
    );
  });
  assert.match(report, /Level A has no contrast success criterion/);
});

test('findIsolatedSlots reports slots with no partner at the threshold', () => {
  const palette = {
    // Two near-identical light grays plus one near-black.
    'slot-one': { r: 250, g: 250, b: 250 },
    'slot-two': { r: 245, g: 245, b: 245 },
    'slot-three': { r: 10, g: 10, b: 10 },
  };
  // Every slot has a partner at 4.5:1 (the two grays both pair with the black).
  assert.deepEqual(findIsolatedSlots(palette, 4.5), []);

  const stranded = {
    'slot-one': { r: 250, g: 250, b: 250 },
    'slot-two': { r: 245, g: 245, b: 245 },
  };
  assert.deepEqual(findIsolatedSlots(stranded, 4.5), ['slot-one', 'slot-two']);

  // A slot is never its own partner.
  assert.deepEqual(findIsolatedSlots({ 'slot-one': WHITE }, 4.5), ['slot-one']);
  assert.deepEqual(findIsolatedSlots({}, 4.5), []);
});
