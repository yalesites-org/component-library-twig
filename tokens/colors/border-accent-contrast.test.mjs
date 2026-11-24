/**
 * Guards the border/accent color role in Accordion, Wrapped Callout and Link
 * Grid against WCAG 2.1 SC 1.4.11 (non-text contrast, 3:1).
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/00-tokens/colors/border-accent-contrast.test.mjs
 *
 * Why this is a test at all: these three components draw their color option as
 * a line — a left border, a callout outline, a column rule — rather than as a
 * background fill. A line has to clear contrast against whatever is behind it
 * on its own, with no paired foreground to help it. Nothing in a Sass build or
 * a Storybook render fails when a slot that only works as a background tint is
 * wired into that role, so the regression is invisible until someone measures
 * it by hand.
 *
 * The mappings are read out of the SCSS rather than restated here, so the test
 * fails when the source changes rather than when this file falls out of date.
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
} from './contrast-ratio.mjs';

const require = createRequire(import.meta.url);
const tokens = require('@yalesites-org/tokens/build/json/tokens.json');

const NON_TEXT_MINIMUM = WCAG_LEVELS.find(
  (level) => level.id === 'non-text',
).minimum;

const componentsDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);

const globalThemes = Object.entries(tokens['global-themes']);

/**
 * The color option every one of these components exposes as its neutral
 * choice, and the one this guard exists for: it used to resolve to slot-nine,
 * the light background tint, which cannot clear 3:1 as a line at any shade.
 *
 * @see https://github.com/yalesites-org/YaleSites-Internal/issues/1614
 */
const NEUTRAL_OPTION = 'six';

/**
 * The three components whose `data-component-theme` color option is drawn as a
 * line, with the surface that line sits on.
 *
 * `against` comes from the token set rather than being transcribed as a hex, so
 * an upstream shade change moves the measurement instead of silently
 * invalidating it.
 *
 * Read the scope carefully, because it differs per component. Accordion paints
 * its own fill behind the border, so its surface really is fixed. Wrapped
 * Callout and Link Grid have no fill of their own, so what is behind their line
 * is whatever the page gives them — the plain page background here. Dropped
 * into a themed `.yds-layout` section their backdrop becomes
 * `--color-layout-theme`, a palette slot that varies per section and global
 * theme, and **this guard does not cover that pairing**. Auditing block colors
 * against section backgrounds is YaleSites-Internal#1613.
 */
const lineRoles = [
  {
    name: 'accordion',
    file: '02-molecules/accordion/_yds-accordion.scss',
    property: '--color-accordion-accent',
    // `border-left` on `.accordion-item`, which fills itself with
    // `--color-gray-100` whenever a color option other than `default` is
    // chosen.
    against: tokens.color.gray['100'],
  },
  {
    name: 'wrapped-callout',
    file: '02-molecules/wrapped-callout/_yds-wrapped-callout.scss',
    property: '--color-wrapped-callout-theme',
    // `border` on `.wrapped-callout__callout`, which has no fill of its own,
    // so the page background shows through behind the line.
    against: tokens.color.background,
  },
  {
    name: 'link-grid',
    file: '02-molecules/link-grid/_yds-link-grid.scss',
    property: '--color-link-grid-action',
    // Feeds `--color-link-grid-border`, the column rule drawn on
    // `.link-grid__column-wrapper` over the page background.
    against: tokens.color.background,
  },
];

/** Read a component SCSS file, relative to `components/`. */
function sourceOf(file) {
  return readFileSync(path.join(componentsDir, file), 'utf8');
}

/**
 * The `data-component-theme` option to color slot mapping declared in a file.
 *
 * Only matches the explicit per-option rules. The `@each` loops that seed
 * defaults interpolate `#{$theme}` rather than naming an option, and the
 * global theme blocks key off `data-global-theme`, so neither is picked up.
 *
 * @param {string} source
 *   The SCSS source to read.
 * @param {string} property
 *   The custom property carrying the line color.
 *
 * @return {Map<string, string>}
 *   Option name (`one`, `six`, `default`) keyed to slot name (`slot-nine`).
 */
function declaredOptions(source, property) {
  const pattern = new RegExp(
    `\\[data-component-theme='([a-z]+)'\\][^{]*\\{[^}]*?${property}:\\s*var\\(--color-(slot-[a-z]+)\\)`,
    'g',
  );

  return new Map(
    [...source.matchAll(pattern)].map((match) => [match[1], match[2]]),
  );
}

/**
 * The color slots a file maps from global theme tokens for its own use.
 *
 * Custom properties inherit, so an undeclared slot resolves from whatever
 * ancestor happens to define it — the surrounding layout section on a page,
 * and nothing at all in an isolated Storybook story. Declaring every slot the
 * component consumes is what keeps it self-contained.
 *
 * @param {string} source
 *   The SCSS source to read.
 *
 * @return {Set<string>}
 *   Slot names (`slot-seven`) declared from `--global-themes-*`.
 */
function declaredSlots(source) {
  const pattern = /--color-(slot-[a-z]+):\s*var\(\s*--global-themes-[^)]*\)/g;

  return new Set([...source.matchAll(pattern)].map((match) => match[1]));
}

lineRoles.forEach((role) => {
  test(`${role.name} declares a color slot for its line role`, () => {
    const options = declaredOptions(sourceOf(role.file), role.property);

    // A source-scraping test that quietly finds nothing is worse than no test,
    // so prove the scrape still works before trusting what it did not find.
    assert.ok(
      options.size > 0,
      `no ${role.property} option found in ${role.file} — the selector or variable was probably renamed, so this file needs updating alongside it`,
    );
    assert.ok(
      options.has(NEUTRAL_OPTION),
      `${role.file} no longer maps color option '${NEUTRAL_OPTION}' to ${role.property}`,
    );
  });

  test(`${role.name} declares every slot its line role uses`, () => {
    const source = sourceOf(role.file);
    const declared = declaredSlots(source);
    const undeclared = [
      ...new Set(declaredOptions(source, role.property).values()),
    ]
      .filter((slot) => !declared.has(slot))
      .sort();

    assert.deepEqual(
      undeclared,
      [],
      `${role.file} sets ${role.property} from ${undeclared.join(
        ', ',
      )} without mapping ${
        undeclared.length === 1 ? 'it' : 'them'
      } from the global theme tokens, so the value only resolves when some ancestor happens to define it`,
    );
  });

  // Narrower than it may read: this only rules out slot-nine, the slot that
  // cannot work as a line at any shade. Other options can still fail 3:1 --
  // auditing all of them is YaleSites-Internal#1613, not this guard.
  test(`${role.name} does not draw its line in slot-nine`, () => {
    const inSlotNine = [...declaredOptions(sourceOf(role.file), role.property)]
      .filter(([, slot]) => slot === 'slot-nine')
      .map(([option]) => option);

    assert.deepEqual(
      inSlotNine,
      [],
      `${role.file} uses slot-nine for ${
        role.property
      } on color option(s) ${inSlotNine.join(
        ', ',
      )}. slot-nine is the light background tint: as a line on a light surface it cannot reach ${NON_TEXT_MINIMUM}:1 at any shade. Use slot-seven (or slot-one / slot-six).`,
    );
  });

  test(`${role.name}'s neutral color option clears ${NON_TEXT_MINIMUM}:1 against its unsectioned backdrop in every global theme`, () => {
    const slot = declaredOptions(sourceOf(role.file), role.property).get(
      NEUTRAL_OPTION,
    );
    const surface = parseHsl(role.against);

    const failures = globalThemes
      .map(([, { colors, label }]) => ({
        theme: label,
        ratio: contrastRatio(parseHsl(colors[slot]), surface),
      }))
      .filter(({ ratio }) => ratio < NON_TEXT_MINIMUM)
      .map(({ theme, ratio }) => `${theme} ${formatRatio(ratio)}:1`);

    assert.deepEqual(
      failures,
      [],
      `${
        role.name
      } option '${NEUTRAL_OPTION}' (${slot}) fails ${NON_TEXT_MINIMUM}:1 against ${
        role.against
      } in: ${failures.join(', ')}`,
    );
  });
});
