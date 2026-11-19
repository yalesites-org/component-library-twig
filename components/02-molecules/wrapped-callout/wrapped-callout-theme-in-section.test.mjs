/**
 * Wrapped Callout: the Theme option inside a themed section
 * (YaleSites-Internal#2314).
 *
 * The callout's Theme is drawn as its border. Inside a themed section the
 * border sits on the section's background, so the Sass build swaps in the
 * section foreground wherever the chosen Theme would fall under 3:1 (WCAG 1.4.11).
 *
 * Run with: node --test components/02-molecules/wrapped-callout/wrapped-callout-theme-in-section.test.mjs
 *
 * This compiles the real stylesheet and compares what Sass decided with an
 * independent measurement from `contrast-ratio.mjs`, so a token shade change,
 * a changed section mapping, or a drift between the two contrast
 * implementations fails here.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

import {
  contrastRatio,
  parseHsl,
} from '../../00-tokens/colors/contrast-ratio.mjs';
import { SECTION_THEMES } from '../../00-tokens/colors/section-themes.mjs';

const require = createRequire(import.meta.url);
const tokens = require('@yalesites-org/tokens/build/json/tokens.json');

const here = path.dirname(fileURLToPath(import.meta.url));
const NON_TEXT_MINIMUM = 3;

/** Callout option to the palette slot its border uses (six is the neutral). */
const OPTION_SLOTS = {
  one: 'slot-one',
  two: 'slot-two',
  three: 'slot-three',
  four: 'slot-four',
  five: 'slot-five',
  six: 'slot-seven',
};

const { css } = sass.compile(path.join(here, '_yds-wrapped-callout.scss'), {
  loadPaths: [path.resolve(here, '../../../node_modules')],
  quietDeps: true,
  logger: sass.Logger.silent,
});

const fallbackRule =
  /\[data-global-theme=(\w+)\]\s+\[data-section-theme=(\w+)\]\s+\.wrapped-callout\[data-component-theme=(\w+)\]\s*\{\s*--color-wrapped-callout-border:\s*var\(--color-section-foreground\);/g;

const swapped = new Set(
  [...css.matchAll(fallbackRule)].map((m) => `${m[1]}|${m[2]}|${m[3]}`),
);

const pairings = Object.entries(tokens['global-themes']).flatMap(
  ([globalName, theme]) =>
    Object.entries(SECTION_THEMES).flatMap(([section, mapping]) => {
      const background = parseHsl(theme.colors[mapping.background]);

      return Object.entries(OPTION_SLOTS).map(([option, slot]) => ({
        key: `${globalName}|${section}|${option}`,
        chosen: contrastRatio(parseHsl(theme.colors[slot]), background),
        foreground: contrastRatio(
          parseHsl(theme.colors[mapping.content]),
          background,
        ),
      }));
    }),
);

test('the callout border reads the swap variable, falling back to the Theme', () => {
  assert.match(
    css,
    /\.wrapped-callout__callout\s*\{[^}]*border:\s*var\(--border-thickness-2\)\s+solid\s+var\(--color-wrapped-callout-border,\s*var\(--color-wrapped-callout-theme\)\)/,
  );
});

test('Sass swaps to the section foreground for exactly the pairings under 3:1', () => {
  const expected = new Set(
    pairings.filter((p) => p.chosen < NON_TEXT_MINIMUM).map((p) => p.key),
  );
  assert.deepEqual([...swapped].sort(), [...expected].sort());
});

test('every Theme and section pairing ends up with a border that clears 3:1', () => {
  const failures = pairings.filter((p) => {
    const effective = swapped.has(p.key) ? p.foreground : p.chosen;
    return effective < NON_TEXT_MINIMUM;
  });
  assert.deepEqual(
    failures.map((p) => p.key),
    [],
  );
});
