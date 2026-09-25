/**
 * The build-time contrast gate (YaleSites-Internal#1632).
 *
 * Takes the pairings `approved-pairings.mjs` enumerates, computes WCAG 2.1
 * contrast for each, and reports which of them fail. `contrast-gate.test.mjs`
 * turns that into a build failure; this module stays verdict-only so the same
 * arithmetic can be printed as a report without a test runner:
 *
 *   node components/00-tokens/colors/contrast-gate.mjs
 *
 * ## Why there is a baseline
 *
 * A gate introduced against a codebase that already fails is either useless
 * (warn-only) or unmergeable (fails on day one). `contrast-gate-baseline.json`
 * takes the third option: the pairings that already failed when the gate landed
 * are listed by id, each with a reason and the ticket that owns the fix. The
 * gate ignores exactly those and nothing else, so a *new* failure breaks the
 * build immediately.
 *
 * The list is a ratchet, and the tests enforce both directions of it: a
 * baselined pairing that starts passing must be deleted from the file (or the
 * gate silently stops enforcing a pairing that is now fine), and a baselined id
 * that no longer matches any pairing must be deleted too (or it suppresses
 * nothing while looking like it suppresses something). Adding to the file to
 * make a red build green is not a fix, and the reason/ticket fields exist to
 * make that obvious in review.
 */

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import { approvedPairings, AA_NON_TEXT } from './approved-pairings.mjs';
import {
  SECTION_THEMES,
  resolveGlobalTheme as resolveSlots,
} from './section-themes.mjs';
import {
  AA_NORMAL_TEXT,
  contrastRatio,
  formatRatio,
  parseHsl,
} from './contrast-ratio.mjs';

const require = createRequire(import.meta.url);
const tokens = require('@yalesites-org/tokens/build/json/tokens.json');

/** `resolveSlots` with this package's global themes supplied. */
const resolveGlobalTheme = (themeName) =>
  resolveSlots(themeName, tokens['global-themes']);

/** Pre-existing failures the gate tolerates, keyed by pairing id. */
export const {
  knownFailures: KNOWN_FAILURES,
  leakCase: LEAK_BASELINE,
} = require('./contrast-gate-baseline.json');

/** Attach the measured ratio and verdict to each pairing. */
export function evaluatePairings(pairings = approvedPairings()) {
  return pairings.map((pairing) => {
    const ratio = contrastRatio(
      parseHsl(pairing.background.value),
      parseHsl(pairing.foreground.value),
    );

    return {
      ...pairing,
      ratio,
      passes: ratio !== null && ratio >= pairing.minimum,
    };
  });
}

/**
 * Split the evaluated pairings into the four groups the tests assert on.
 *
 * `newFailures` is the gate. The other three keep the baseline honest.
 */
export function gateResult(evaluated = evaluatePairings()) {
  const failing = evaluated.filter((pairing) => !pairing.passes);
  const ids = new Set(evaluated.map((pairing) => pairing.id));
  const baselinedIds = Object.keys(KNOWN_FAILURES);

  return {
    total: evaluated.length,
    newFailures: failing.filter((pairing) => !(pairing.id in KNOWN_FAILURES)),
    baselinedFailures: failing.filter(
      (pairing) => pairing.id in KNOWN_FAILURES,
    ),
    fixedBaseline: evaluated
      .filter((pairing) => pairing.passes && pairing.id in KNOWN_FAILURES)
      .map((pairing) => pairing.id),
    staleBaseline: baselinedIds.filter((id) => !ids.has(id)),
  };
}

/**
 * How far the Phase 2 (#1631) leak reaches today, as a number to watch.
 *
 * A block that paints a background without publishing a foreground leaves its
 * descendants reading the *section's* foreground against the *block's*
 * background. That is the epic's root cause, it is not an approved pairing, and
 * it is not gated per-pairing here (see the note in `approved-pairings.mjs`).
 *
 * The *count* is ratcheted, though. Reporting a number nobody is required to
 * look at would be barely better than not measuring it: a palette change that
 * pushed the leak from 105 to 150 would go unnoticed until #1631 got there. So
 * `contrast-gate.test.mjs` asserts it can only fall, and the baseline entry
 * names #1631 as the owner of driving it to zero.
 */
export function leakSurvey() {
  let failing = 0;
  let total = 0;

  Object.keys(tokens['global-themes']).forEach((globalTheme) => {
    const slots = resolveGlobalTheme(globalTheme);

    Object.values(SECTION_THEMES).forEach((roles) => {
      Object.values(tokens['component-themes']).forEach((blockTheme) => {
        total += 1;
        const ratio = contrastRatio(
          parseHsl(blockTheme.background),
          parseHsl(slots[roles.content]),
        );
        if (ratio === null || ratio < AA_NORMAL_TEXT) failing += 1;
      });
    });
  });

  return { failing, total };
}

/** Surfaces the gate does not cover, measured so the gap is visible. */
function uncoveredSurvey() {
  return Object.entries(tokens['site-header-themes']).map(([name, theme]) => ({
    name: `site-header-themes.${name}`,
    role: 'yale-branding',
    ratio: contrastRatio(
      parseHsl(theme.background),
      parseHsl(theme['yale-branding']),
    ),
  }));
}

const line = (pairing) =>
  `  ${pairing.id.padEnd(40)} ${formatRatio(pairing.ratio).padStart(6)}:1 ` +
  `(needs ${pairing.minimum}:1)  ${pairing.foreground.name} on ${pairing.background.name}`;

/** The human-readable report. Also what the CLI prints. */
export function formatGateReport(result = gateResult()) {
  const leak = leakSurvey();

  return [
    'YaleSites contrast gate (YaleSites-Internal#1632)',
    '',
    `Pairings checked: ${result.total}`,
    `New failures:     ${result.newFailures.length}`,
    `Baselined:        ${result.baselinedFailures.length}`,
    '',
    'NEW FAILURES (these fail the build)',
    result.newFailures.length
      ? result.newFailures.map(line).join('\n')
      : '  None.',
    '',
    'BASELINED FAILURES (pre-existing, each owned by a ticket)',
    result.baselinedFailures.length
      ? result.baselinedFailures
          .map(
            (pairing) =>
              `${line(pairing)}\n      ${KNOWN_FAILURES[pairing.id].ticket}: ${
                KNOWN_FAILURES[pairing.id].reason
              }`,
          )
          .join('\n')
      : '  None -- delete contrast-gate-baseline.json.',
    '',
    result.fixedBaseline.length
      ? `RETIRE THESE BASELINE ENTRIES (now passing)\n  ${result.fixedBaseline.join(
          '\n  ',
        )}\n`
      : null,
    result.staleBaseline.length
      ? `STALE BASELINE ENTRIES (no such pairing)\n  ${result.staleBaseline.join(
          '\n  ',
        )}\n`
      : null,
    'NOT GATED -- Phase 2 (#1631) leak case',
    '',
    '  A section foreground inheriting onto a block background, for every',
    '  (global theme x section theme x block theme) combination. Not an',
    '  approved pairing: it is what happens when a component paints a',
    `  background without publishing a foreground.`,
    '',
    `  ${leak.failing} of ${leak.total} below ${AA_NORMAL_TEXT}:1. This number should fall as`,
    '  #1631 converts components to the surface contract.',
    '',
    'NOT GATED -- site header branding',
    '',
    '  A wordmark asset rather than a token-painted foreground, and stated in a',
    `  different key vocabulary. Measured here so the gap is visible (${AA_NON_TEXT}:1 would`,
    '  apply if it were treated as a graphic):',
    '',
    ...uncoveredSurvey().map(
      (entry) =>
        `  ${entry.name.padEnd(28)} ${formatRatio(entry.ratio).padStart(6)}:1`,
    ),
    '',
  ]
    .filter((section) => section !== null)
    .join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = gateResult();
  process.stdout.write(`${formatGateReport(result)}\n`);
  if (result.newFailures.length) process.exitCode = 1;
}
