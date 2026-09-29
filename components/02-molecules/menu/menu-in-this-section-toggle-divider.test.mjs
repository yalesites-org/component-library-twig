/**
 * Guards the divider under the closed In This Section toggle, which sits on a
 * white button, against WCAG 2.1 SC 1.4.11 (3:1) on every component theme in
 * every global theme (yalesites-org/YaleSites-Internal#1797). The theme
 * mappings are read out of the SCSS, like border-accent-contrast.test.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  WCAG_LEVELS,
  contrastRatio,
  formatRatio,
  parseHsl,
} from '../../00-tokens/colors/contrast-ratio.mjs';

const require = createRequire(import.meta.url);
const tokens = require('@yalesites-org/tokens/build/json/tokens.json');

const NON_TEXT_MINIMUM = WCAG_LEVELS.find(
  (level) => level.id === 'non-text',
).minimum;

const componentsDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);

const read = (file) => readFileSync(path.join(componentsDir, file), 'utf8');

const toggleSource = read(
  '02-molecules/menu/menu-in-this-section-toggle/_yds-menu-in-this-section-toggle.scss',
);
const sectionSource = read(
  '03-organisms/site-in-this-section/_site-in-this-section.scss',
);

/** Option name to slot name, for one property, from the explicit theme rules. */
function declaredOptions(property) {
  const pattern = new RegExp(
    `&\\[data-component-theme='([a-z]+)'\\]\\s*\\{[^}]*?${property}:\\s*var\\(--color-(slot-[a-z]+)\\)`,
    'g',
  );

  return new Map(
    [...sectionSource.matchAll(pattern)].map((match) => [match[1], match[2]]),
  );
}

// `var(--a, var(--b))` in the toggle's `::after` rule: the divider property and
// the property it falls back to.
const [, dividerProperty, fallbackProperty] =
  toggleSource.match(
    /::after\s*\{[^}]*?border-bottom:[^;]*?var\(\s*(--[a-z-]+),\s*var\((--[a-z-]+)\)\s*\)/,
  ) ?? [];

test('the toggle divider reads a divider property with a fallback', () => {
  assert.ok(
    dividerProperty && fallbackProperty,
    'the ::after border-bottom in _yds-menu-in-this-section-toggle.scss no longer has the var(--divider, var(--fallback)) shape this test reads',
  );
});

test(`the toggle divider clears ${NON_TEXT_MINIMUM}:1 against white on every component theme in every global theme`, () => {
  const divider = declaredOptions(dividerProperty);
  const fallback = declaredOptions(fallbackProperty);
  const themes = Object.keys(tokens['component-themes']);
  const white = parseHsl(tokens.color.basic.white);

  // Prove the scrape found every theme before trusting what it did not find.
  assert.deepEqual(
    themes.filter((theme) => !divider.has(theme) && !fallback.has(theme)),
    [],
    'a component theme has no divider or fallback color declared',
  );

  const failures = themes.flatMap((theme) => {
    const slot = divider.get(theme) ?? fallback.get(theme);

    return Object.entries(tokens['global-themes'])
      .map(([globalTheme, { colors }]) => ({
        globalTheme,
        ratio: contrastRatio(parseHsl(colors[slot]), white),
      }))
      .filter(({ ratio }) => ratio < NON_TEXT_MINIMUM)
      .map(
        ({ globalTheme, ratio }) =>
          `component ${theme} (${slot}) / global ${globalTheme}: ${formatRatio(
            ratio,
          )}:1`,
      );
  });

  assert.deepEqual(failures, []);
});
