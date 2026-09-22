/**
 * Taxonomy Display, `default` dial: link contrast inside a themed section
 * (YaleSites-Internal#1641).
 *
 * The `default` component-theme paints its own flat `--color-gray-100` box
 * (`_yds-taxonomy-display.scss:22-45`) but, before this fix, set no link
 * colour of its own. `.taxonomy-display__link` reads `color:
 * var(--color-link-base)`, which it then inherited from whichever ancestor
 * last set it. Outside a themed section nothing sets it, so it fell through
 * to the tokens.css root default and was fine. Inside a themed section,
 * `_yds-layout.scss` sets `--color-link-base` (and `-hover`) to suit the
 * SECTION's own background -- white (`slot-eight`) on section themes one,
 * three and four -- and that leaked straight onto this box: white links on a
 * near-white background, 1.07:1, on 21 of 42 (section theme x global theme)
 * pairings.
 *
 * The fix pins `--color-link-base` / `-hover` / `-visited-base` /
 * `-visited-hover` inside the `default` dial to the same raw palette values
 * the tokens.css root default already uses. Two things make that provably
 * safe rather than merely plausible:
 *
 * 1. A declaration on an element always beats one inherited from an
 *    ancestor, whatever the ancestor rule's specificity (the same rule
 *    `_yds-layout.scss:436-440` documents for the hover fix that motivated
 *    this file's sibling, `component-library-twig#714`). So the pin wins
 *    over the section every time, in every theme -- no per-theme branching
 *    needed.
 * 2. Pinning to the SAME values the root default already resolves to means
 *    rendering OUTSIDE a themed section is provably unchanged: this file's
 *    first test reads both the pin and the tokens.css root default and
 *    asserts they name the same raw palette token.
 *
 * What this file checks, and why each is a separate test rather than one
 * combined assertion:
 *
 * - The `default` dial's source literally contains the four pins, naming
 *   raw palette vars (not a `--color-slot-*`/section-derived value). Catches
 *   a revert outright, and catches "fixed it by pointing back at a slot"
 *   which would silently reintroduce the theme-dependence this fix removes.
 * - Those same pins are IDENTICAL to the tokens.css `:root` default for the
 *   same property. Catches "pinned to a value that happens to pass contrast
 *   but is not what renders outside a section" -- a plausible-looking wrong
 *   fix that would not be caught by the ratio checks alone.
 * - The pinned values clear 4.5:1 (WCAG 1.4.3 normal text) against
 *   `--color-gray-100`, computed from the real token values via
 *   `contrast-ratio.mjs`, not asserted as a constant.
 * - The RESTING link colour clears 4.5:1 in the full 42-cell (section theme
 *   x global theme) sweep the ticket asks for. Modelled with the same
 *   section-role data `section-background-contrast.test.mjs` already
 *   verifies against `_yds-layout.scss`
 *   (`section-themes.mjs`'s `SECTION_THEMES[theme].link`), so a revert of
 *   the taxonomy-display pin makes this test resolve the ACTUAL leaked
 *   value -- white on three of six section themes -- and fail on exactly
 *   the 21 cells the bug report measured.
 *
 * Hover and visited-hover/-base are NOT swept over all 42 cells the same
 * way: because they are pinned to a fixed palette value, the resolved
 * colour is the same regardless of section or global theme, so a single
 * ratio check covers all 42 cells at once. (The 42-cell sweep only earns
 * its keep for a value that still depends on theme, which is exactly the
 * bug being fixed for the resting link colour.)
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

import { stripComments } from './surface-contract.mjs';
import {
  contrastRatio,
  parseHsl,
  formatRatio,
  AA_NORMAL_TEXT,
} from './contrast-ratio.mjs';
import { SECTION_THEMES, resolveGlobalTheme } from './section-themes.mjs';

const require = createRequire(import.meta.url);

const tokens = require('@yalesites-org/tokens/build/json/tokens.json');

const TOKENS_CSS = readFileSync(
  require.resolve('@yalesites-org/tokens/build/css/tokens.css'),
  'utf8',
);

const SCSS_PATH = new URL(
  '../../02-molecules/taxonomy-display/_yds-taxonomy-display.scss',
  import.meta.url,
);

const GRAY_100 = tokens.color.gray['100'];

/** The four link states the `default` dial is expected to pin. */
const LINK_PROPERTIES = [
  '--color-link-base',
  '--color-link-hover',
  '--color-link-visited-base',
  '--color-link-visited-hover',
];

/**
 * The body of `&[data-component-theme='default'] { ... }`, brace-matched
 * rather than a non-greedy regex, so a nested rule inside it (there is none
 * today, but a future one) does not truncate the match early.
 */
function defaultDialBody(source) {
  const open = source.match(/\[data-component-theme=(['"])default\1\]\s*\{/);
  if (!open) return null;

  let depth = 1;
  let i = open.index + open[0].length;
  while (i < source.length && depth > 0) {
    if (source[i] === '{') depth += 1;
    else if (source[i] === '}') depth -= 1;
    i += 1;
  }

  return source.slice(open.index + open[0].length, i - 1);
}

/** `--color-<property>: var(--color-<raw palette token>);` -> the raw token's var name, or null. */
function pinnedVar(body, property) {
  if (!body) return null;
  const match = body.match(
    new RegExp(`${property}:\\s*var\\(\\s*(--color-[\\w-]+)\\s*\\)`),
  );
  return match ? match[1] : null;
}

/** Same extraction against the tokens.css `:root` block, for the "unchanged outside a section" check. */
function rootDefaultVar(property) {
  const match = TOKENS_CSS.match(
    new RegExp(
      `(?:^|[\\s;{])${property}:\\s*var\\(\\s*(--color-[\\w-]+)\\s*\\)`,
    ),
  );
  return match ? match[1] : null;
}

/**
 * Resolve a raw `--color-<group>-<shade>` custom property to its HSL value,
 * by flattening `tokens.color` the same way `foreground-purity.mjs`'s
 * `paletteTokenNames()` derives palette names -- group keys whose value is
 * an object, joined to their shade key.
 */
function paletteValue(varName) {
  const name = varName.replace(/^--color-/, '');

  const hit = Object.entries(tokens.color)
    .filter(([, value]) => typeof value === 'object')
    .flatMap(([group, value]) =>
      Object.entries(value).map(([shade, hsl]) => [`${group}-${shade}`, hsl]),
    )
    .find(([candidate]) => candidate === name);

  return hit ? hit[1] : null;
}

const source = stripComments(readFileSync(SCSS_PATH, 'utf8'));
const dialBody = defaultDialBody(source);

test('the default dial exists in the SCSS as this file expects', () => {
  assert.ok(
    dialBody,
    "could not find &[data-component-theme='default'] { ... } in _yds-taxonomy-display.scss -- has the selector changed?",
  );
});

test('the default dial pins all four link states to a raw palette token', () => {
  LINK_PROPERTIES.forEach((property) => {
    const pin = pinnedVar(dialBody, property);
    assert.ok(
      pin,
      `${property} is not pinned to a raw var(--color-*) token inside ` +
        "&[data-component-theme='default'] -- without it, this box's links " +
        'read whatever the enclosing themed section last set, which is sized ' +
        "for the SECTION's background, not this box's fixed gray-100 (YaleSites-Internal#1641).",
    );
  });
});

test('each pin matches the tokens.css root default for the same property (unchanged outside a section)', () => {
  LINK_PROPERTIES.forEach((property) => {
    const pin = pinnedVar(dialBody, property);
    const rootDefault = rootDefaultVar(property);

    assert.ok(
      rootDefault,
      `tokens.css has no root default for ${property} to compare against`,
    );
    assert.equal(
      pin,
      rootDefault,
      `${property} is pinned to ${pin}, but tokens.css's root default (what ` +
        'this box already rendered outside any themed section) is ' +
        `${rootDefault}. Pinning to a different value would change unthemed rendering.`,
    );
  });
});

test('every pinned link state clears 4.5:1 (AA normal text) on gray-100', () => {
  LINK_PROPERTIES.forEach((property) => {
    const pin = pinnedVar(dialBody, property);
    const value = pin && paletteValue(pin);
    assert.ok(value, `could not resolve ${pin} to a token value`);

    const ratio = contrastRatio(parseHsl(GRAY_100), parseHsl(value));
    assert.ok(
      ratio >= AA_NORMAL_TEXT,
      `${property} (${pin} = ${value}) on gray-100 measures ${formatRatio(
        ratio,
      )}:1, below the ${AA_NORMAL_TEXT}:1 AA minimum for normal text.`,
    );
  });
});

/**
 * The resting link colour actually rendered on this box, for one (section
 * theme, global theme) pairing -- the pin if present, else what leaks in
 * from the enclosing themed section today.
 *
 * The section-side fallback intentionally does not attempt a full leak model
 * for every property (hover, visited): `SECTION_THEMES[theme].link` is the
 * one role this file already has, transcribed from and drift-tested against
 * `_yds-layout.scss` by `section-background-contrast.test.mjs`. Reusing it
 * here rather than re-transcribing keeps the two files from being able to
 * silently disagree about what a section actually sets.
 */
function resolveRestingLinkColor(sectionTheme, globalTheme, pin) {
  if (pin) return paletteValue(pin);

  const slots = resolveGlobalTheme(globalTheme, tokens['global-themes']);
  const slotName = SECTION_THEMES[sectionTheme].link;
  return slots[slotName];
}

test('resting link colour clears 4.5:1 in every section theme x global theme pairing', () => {
  const pin = pinnedVar(dialBody, '--color-link-base');
  const globalThemes = Object.keys(tokens['global-themes']);

  const failures = Object.keys(SECTION_THEMES)
    .flatMap((sectionTheme) =>
      globalThemes.map((globalTheme) => {
        const value = resolveRestingLinkColor(sectionTheme, globalTheme, pin);
        const ratio = contrastRatio(parseHsl(GRAY_100), parseHsl(value));

        return { sectionTheme, globalTheme, value, ratio };
      }),
    )
    .filter(({ ratio }) => ratio < AA_NORMAL_TEXT)
    .map(
      ({ sectionTheme, globalTheme, value, ratio }) =>
        `section ${sectionTheme} x global ${globalTheme}: ${value} on gray-100 = ${formatRatio(
          ratio,
        )}:1`,
    );

  assert.deepEqual(
    failures,
    [],
    `${failures.length} of ${
      Object.keys(SECTION_THEMES).length * globalThemes.length
    } (section theme x global theme) pairings fail AA:\n${failures.join('\n')}`,
  );
});
