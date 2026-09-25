/**
 * The build-time contrast gate (YaleSites-Internal#1632).
 *
 * `node --test` runs this, so it gates every pull request through
 * `npm run test:unit`. That is the whole point of the ticket: contrast stops
 * being something a reviewer is expected to notice and becomes something the
 * build refuses to let through.
 *
 * What is gated is the set of pairings the *token structure* declares -- every
 * surface that publishes a background together with the foreground meant to sit
 * on it. See `approved-pairings.mjs` for the enumeration and for why the
 * Phase 2 (#1631) leak case is measured but not asserted here.
 *
 * Three of the tests below exist to stop the gate going quietly vacuous, which
 * is the failure mode a gate like this actually dies of: if the registry stops
 * enumerating, every assertion still passes and nobody notices for a year.
 * `color-system-defects.test.mjs` learnt the same lesson the hard way -- an
 * earlier version of it asserted things about a fix without ever reading the
 * fix, so deleting the fix left the suite green.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { formatRatio } from './contrast-ratio.mjs';
import {
  approvedPairings,
  PAIRING_KINDS,
  GLOBAL_THEME_COUNT,
} from './approved-pairings.mjs';
import {
  KNOWN_FAILURES,
  LEAK_BASELINE,
  evaluatePairings,
  gateResult,
  leakSurvey,
} from './contrast-gate.mjs';

const evaluated = evaluatePairings(approvedPairings());
const result = gateResult(evaluated);

/** `id (ratio:1 < minimum:1)` for every failure, one per line. */
const describeFailures = (failures) =>
  failures
    .map(
      (pairing) =>
        `  ${pairing.id}: ${pairing.foreground.name} on ${pairing.background.name} ` +
        `= ${formatRatio(pairing.ratio)}:1, needs ${pairing.minimum}:1`,
    )
    .join('\n');

test('every approved pairing outside the baseline meets its WCAG minimum', () => {
  assert.deepEqual(
    result.newFailures.map((pairing) => pairing.id),
    [],
    'a token pairing dropped below its WCAG minimum:\n' +
      `${describeFailures(result.newFailures)}\n\n` +
      'Fix the colors. Adding the pairing to contrast-gate-baseline.json is ' +
      'not a fix -- the baseline is a burn-down list of pre-existing failures, ' +
      'not an opt-out.',
  );
});

test('every baseline entry still names a pairing the registry produces', () => {
  assert.deepEqual(
    result.staleBaseline,
    [],
    'contrast-gate-baseline.json names pairings that no longer exist. A ' +
      'renamed slot or a restructured surface leaves the entry silently ' +
      'suppressing nothing. Delete these entries:\n' +
      `  ${result.staleBaseline.join('\n  ')}`,
  );
});

test('every baseline entry is still failing, so fixed ones get retired', () => {
  assert.deepEqual(
    result.fixedBaseline,
    [],
    'these baselined pairings now pass. Delete them from ' +
      'contrast-gate-baseline.json so the gate starts enforcing them:\n' +
      `  ${result.fixedBaseline.join('\n  ')}`,
  );
});

test('every baseline entry documents why it is there and who owns it', () => {
  Object.entries(KNOWN_FAILURES).forEach(([id, entry]) => {
    assert.ok(
      entry.reason && entry.reason.length > 20,
      `baseline entry ${id} needs a reason explaining why it is not fixed yet`,
    );
    assert.match(
      entry.ticket,
      /^yalesites-org\/[\w-]+#\d+$/,
      `baseline entry ${id} needs a fully-qualified owning ticket, so the ` +
        'burn-down is traceable to work someone is actually doing',
    );
  });
});

// --- The gate must not go vacuous ---------------------------------------

test('pairing ids are unique, so a baseline entry suppresses exactly one', () => {
  const ids = evaluated.map((pairing) => pairing.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

  assert.deepEqual(
    [...new Set(duplicates)],
    [],
    'duplicate pairing ids: one baseline entry would suppress several ' +
      'pairings at once, hiding failures nobody signed off on',
  );
});

test('the registry still enumerates every surface family and every theme', () => {
  const kinds = new Set(evaluated.map((pairing) => pairing.kind));
  assert.deepEqual(
    [...kinds].sort(),
    [...PAIRING_KINDS].sort(),
    'a surface family stopped producing pairings -- the gate is now blind to it',
  );

  const globalThemes = new Set(
    evaluated
      .filter((pairing) => pairing.globalTheme)
      .map((pairing) => pairing.globalTheme),
  );

  // Against the literal 7, not against GLOBAL_THEME_COUNT. That constant is
  // derived from the same token object the generators walk, so the two would
  // fall together: a token package that lost a theme would leave this passing
  // while the gate silently stopped checking it. The AC says "across all seven"
  // -- if an eighth global theme is legitimately added, edit this number and
  // the AC together.
  assert.equal(
    globalThemes.size,
    7,
    'the gate is not covering all seven global themes',
  );
  assert.equal(
    GLOBAL_THEME_COUNT,
    7,
    'the token package no longer defines seven global themes',
  );
});

test('every surface family still produces the number of pairings it should', () => {
  // The `PAIRING_KINDS` check above only catches a whole family going dark, and
  // the >= 200 floor leaves ~60 pairings of slack. This closes the gap in
  // between: `declaredPairings` skips a role when the token object lacks it
  // (`['text', 'heading'].filter((role) => theme[role])`), so a single surface
  // losing its `text` key would drop out with nothing else noticing.
  const perKind = Object.fromEntries(
    PAIRING_KINDS.map((kind) => [
      kind,
      evaluated.filter((pairing) => pairing.kind === kind).length,
    ]),
  );

  assert.deepEqual(perKind, {
    // 7 global themes x 6 section themes x (content, heading, link, border).
    section: 168,
    // 5 component themes x (text, heading).
    block: 10,
    // 6 basic themes x (text, heading).
    basic: 12,
    // 7 CTA themes x text; button-cta-themes declares no heading.
    cta: 7,
    // 7 global themes x 3 safe-foreground backgrounds x 3 safe slots.
    'safe-slot': 63,
  });
});

test('every pairing resolves to a color the contrast math can read', () => {
  const unreadable = evaluated.filter((pairing) => pairing.ratio === null);

  assert.deepEqual(
    unreadable.map((pairing) => pairing.id),
    [],
    'these pairings point at a token that does not resolve, so they are ' +
      'silently not being checked. A mistyped slot name looks exactly like ' +
      'this:\n' +
      `  ${unreadable.map((pairing) => pairing.id).join('\n  ')}`,
  );
});

test('the gate checks a non-trivial number of pairings', () => {
  // A floor rather than an exact count: adding a global theme or a section
  // theme should not have to touch this test, but the registry collapsing to a
  // handful of pairings should fail loudly.
  assert.ok(
    evaluated.length >= 200,
    `the registry produced only ${evaluated.length} pairings; it enumerated ` +
      '250+ when the gate was written, so something stopped being read',
  );
});

// --- The Phase 2 leak case: not gated, but ratcheted ---------------------

test('the Phase 2 leak case does not get worse than its baseline', () => {
  const leak = leakSurvey();

  assert.equal(
    leak.total,
    LEAK_BASELINE.total,
    'the leak survey is measuring a different number of combinations than the ' +
      'baseline recorded, so the two figures are not comparable. Adding a ' +
      'global, section or block theme changes this legitimately -- re-measure ' +
      'with `npm run contrast:gate` and update both numbers together.',
  );

  assert.ok(
    leak.failing <= LEAK_BASELINE.failing,
    `the leak case worsened: ${leak.failing} of ${leak.total} combinations are ` +
      `now below AA, against a baseline of ${LEAK_BASELINE.failing}. This is ` +
      'not gated per-pairing -- Phase 2 (#1631) owns fixing it -- but it must ' +
      'not go backwards while that work is pending.',
  );
});

test('a fixed leak case lowers the baseline rather than leaving slack', () => {
  const leak = leakSurvey();

  assert.equal(
    leak.failing,
    LEAK_BASELINE.failing,
    `the leak case improved to ${leak.failing} of ${leak.total}. Lower the ` +
      '`leakCase.failing` figure in contrast-gate-baseline.json to match, or ' +
      'the ratchet leaves room to slip back to the old number unnoticed.',
  );
});

// --- The classifier itself, on synthetic input ---------------------------
//
// Everything above asserts against the real token package, so it can only ever
// prove the gate is green *today*. These prove it would go red: a gate nobody
// has seen fail is a gate nobody knows works.

/** A pairing with colors chosen to land either side of the minimum. */
const syntheticPairing = (id, background, foreground) => ({
  id,
  kind: 'section',
  surface: 'test',
  globalTheme: 'one',
  role: 'content',
  background: { name: 'bg', value: background },
  foreground: { name: 'fg', value: foreground },
  minimum: 4.5,
});

const BLACK = 'hsl(0, 0%, 0%)';
const WHITE = 'hsl(0, 0%, 100%)';
/** 3.94:1 against white -- fails 4.5:1 without being an obviously silly color. */
const NEAR_MISS = 'hsl(0, 0%, 50%)';

test('a failing pairing that is not baselined is reported as a new failure', () => {
  const evaluatedPair = evaluatePairings([
    syntheticPairing('not-in-any-baseline', WHITE, NEAR_MISS),
  ]);

  assert.equal(evaluatedPair[0].passes, false);
  assert.deepEqual(
    gateResult(evaluatedPair).newFailures.map((pairing) => pairing.id),
    ['not-in-any-baseline'],
  );
});

test('a passing pairing is not reported', () => {
  const evaluatedPair = evaluatePairings([
    syntheticPairing('comfortably-passing', WHITE, BLACK),
  ]);

  assert.equal(evaluatedPair[0].passes, true);
  assert.deepEqual(gateResult(evaluatedPair).newFailures, []);
});

test('a baselined id that the registry no longer produces is stale', () => {
  const evaluatedPair = evaluatePairings([
    syntheticPairing('some-other-pairing', WHITE, BLACK),
  ]);
  const baselinedIds = Object.keys(KNOWN_FAILURES);

  assert.ok(baselinedIds.length > 0, 'this check needs a non-empty baseline');
  assert.deepEqual(gateResult(evaluatedPair).staleBaseline, baselinedIds);
});

test('a baselined pairing that now passes is reported for retirement', () => {
  const [baselinedId] = Object.keys(KNOWN_FAILURES);
  const evaluatedPair = evaluatePairings([
    syntheticPairing(baselinedId, WHITE, BLACK),
  ]);

  const retired = gateResult(evaluatedPair);
  assert.deepEqual(retired.fixedBaseline, [baselinedId]);
  assert.deepEqual(retired.newFailures, []);
});

test('an unreadable color counts as a failure rather than passing silently', () => {
  const evaluatedPair = evaluatePairings([
    syntheticPairing('unparseable', WHITE, 'not-a-color'),
  ]);

  assert.equal(evaluatedPair[0].ratio, null);
  assert.equal(evaluatedPair[0].passes, false);
});

// --- Both WCAG minimums are actually in play -----------------------------

test('text pairings are held to 4.5:1 and non-text pairings to 3:1', () => {
  const minimums = new Set(evaluated.map((pairing) => pairing.minimum));

  assert.deepEqual(
    [...minimums].sort((a, b) => a - b),
    [3, 4.5],
    'the AC asks for 4.5:1 on text and 3:1 on non-text (borders). If only one ' +
      'minimum appears, one of the two is not being checked.',
  );
});
