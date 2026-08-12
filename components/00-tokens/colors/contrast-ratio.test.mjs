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
  WCAG_LEVELS,
  contrastRatio,
  evaluateRatio,
  findIsolatedSlots,
  formatRatio,
  parseHex,
  parseHsl,
  rgbToHex,
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
