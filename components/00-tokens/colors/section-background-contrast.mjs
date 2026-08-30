/**
 * Section-background contrast audit (YaleSites-Internal #1613).
 *
 * #1539 computed slot-nine against every other slot and concluded "put block
 * foregrounds on slot-1 / slot-6 / slot-7". That rule was derived against ONE
 * background -- slot-nine, a near-white tint -- so it only says something about
 * light backgrounds. #1613's acceptance criteria ask for the same computation
 * extended to EVERY section background option the picker offers, which is what
 * this script does.
 *
 * Run it, and commit the output, with:
 *
 *   node components/00-tokens/colors/section-background-contrast.mjs \
 *     > components/00-tokens/colors/section-background-contrast.txt
 *
 * Deliberately a token computation rather than a browser render: it answers
 * "which colors may sit on which section background", which is a property of
 * the palette, not of any one component's cascade. Whether a given component
 * actually RESOLVES to the color it should is a separate question that only a
 * real render answers -- see the screenshots committed alongside #1613.
 */

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import {
  contrastRatio,
  formatRatio,
  parseHsl,
  AA_NORMAL_TEXT,
} from './contrast-ratio.mjs';

// `createRequire` rather than an import attribute: prettier (and therefore
// `npm run prettier`, part of this repo's test script) cannot parse
// `with { type: 'json' }` yet.
const require = createRequire(import.meta.url);
const tokens = require('@yalesites-org/tokens/build/json/tokens.json');

/** AA minimum for large text and for non-text (UI/graphics) -- WCAG 1.4.3 / 1.4.11. */
const AA_LARGE_OR_NON_TEXT = 3;

/**
 * How `_yds-layout.scss` maps each section theme onto global-theme slots.
 *
 * Transcribed from `components/03-organisms/layout/layout/_yds-layout.scss`
 * (the `&[data-component-theme='N']` blocks). Kept as data here rather than
 * parsed out of the SCSS, because a regex over Sass would be the fragile part
 * of this script -- but that means the two can drift, so
 * `section-background-contrast.test.mjs` reads the SCSS and asserts they agree.
 *
 * Note `background`/`content` are the properties actually painted:
 * `--color-layout-theme` becomes `background-color` and `--color-layout-content`
 * becomes `color` on `.yds-layout`, so every block inside inherits them unless
 * it overrides them.
 *
 * `border` is not listed per theme: since #1613 a single shared rule sets
 * `--color-layout-border: var(--color-layout-content)` for every themed
 * section, so the border role always follows `content`.
 */
export const SECTION_THEMES = {
  one: {
    background: 'slot-one',
    content: 'slot-eight',
    heading: 'slot-eight',
    link: 'slot-eight',
  },
  two: {
    background: 'slot-four',
    content: 'slot-seven',
    heading: 'slot-seven',
    link: 'slot-seven',
  },
  three: {
    background: 'slot-five',
    content: 'slot-eight',
    heading: 'slot-eight',
    link: 'slot-eight',
  },
  four: {
    background: 'slot-two',
    content: 'slot-eight',
    heading: 'slot-eight',
    link: 'slot-eight',
  },
  five: {
    background: 'slot-nine',
    content: 'slot-seven',
    heading: 'slot-seven',
    link: 'slot-seven',
  },
  six: {
    background: 'slot-three',
    content: 'slot-seven',
    heading: 'slot-seven',
    link: 'slot-seven',
  },
};

/**
 * Raw palette values a component might hardcode instead of inheriting the
 * section's foreground. These are the values the #1613 SCSS audit found being
 * set directly on text/borders inside blocks that can now land in a themed
 * section; each is checked against every section background below.
 */
export const HARDCODED_CANDIDATES = {
  'gray-100': tokens.color.gray['100'],
  'gray-200': tokens.color.gray['200'],
  'gray-300': tokens.color.gray['300'],
  'gray-500': tokens.color.gray['500'],
  'gray-700': tokens.color.gray['700'],
  'gray-800': tokens.color.gray['800'],
  'gray-hale': tokens.color.gray.hale,
  'basic-white': tokens.color.basic.white,
  'basic-black': tokens.color.basic.black,
};

/**
 * Resolve one global theme's slots, applying the theme-four slot swap.
 *
 * `_yds-layout.scss` swaps slot-two and slot-five for global theme four only
 * ("Switch colors slot in order to have the selected background colors per
 * component theme"). Ignoring it would report theme four's section themes
 * three and four against the wrong colors, which is precisely the pair #1614
 * found straddling the 3:1 threshold -- so the swap has to be modelled.
 */
export function resolveGlobalTheme(themeName) {
  const { colors } = tokens['global-themes'][themeName];
  const slots = { ...colors };

  if (themeName === 'four') {
    slots['slot-two'] = colors['slot-five'];
    slots['slot-five'] = colors['slot-two'];
  }

  return slots;
}

/** Every (global theme, section theme) pairing, with its resolved colors. */
export function sectionBackgrounds() {
  return Object.keys(tokens['global-themes']).flatMap((globalTheme) => {
    const slots = resolveGlobalTheme(globalTheme);

    return Object.entries(SECTION_THEMES).map(([sectionTheme, roles]) => ({
      globalTheme,
      globalThemeLabel: tokens['global-themes'][globalTheme].label,
      sectionTheme,
      roles,
      slots,
      backgroundValue: slots[roles.background],
    }));
  });
}

/** Contrast of an arbitrary color value against a section background. */
function ratioAgainst(background, value) {
  return contrastRatio(parseHsl(background.backgroundValue), parseHsl(value));
}

const verdict = (ratio, minimum) =>
  ratio >= minimum ? 'PASS' : `FAIL (needs ${minimum}:1)`;

function table(header, rows) {
  const widths = header.map((_, column) =>
    Math.max(
      header[column].length,
      ...rows.map((row) => String(row[column]).length),
    ),
  );
  const line = (cells) =>
    cells
      .map((cell, i) => String(cell).padEnd(widths[i]))
      .join('  ')
      .trimEnd();

  return [line(header), line(widths.map((w) => '-'.repeat(w)))]
    .concat(rows.map(line))
    .join('\n');
}

/**
 * Report 1 -- does the SECTION's own foreground clear its own background?
 *
 * This is the load-bearing check. Every block that simply inherits the
 * section's `color` / `--color-heading` / `--color-link-base` is correct if and
 * only if these rows pass, in all 7 global themes. If they do, "inherit the
 * section's foreground" is a complete fix and needs no per-theme branching.
 */
const SELF_CONSISTENCY_ROLES = ['content', 'heading', 'link', 'border'];

function sectionSelfConsistency() {
  const cells = sectionBackgrounds().flatMap((bg) =>
    SELF_CONSISTENCY_ROLES.map((role) => {
      // Since #1613 the border role is not declared per theme: the shared rule
      // derives it from the content color, so it is checked as such.
      const slot = role === 'border' ? bg.roles.content : bg.roles[role];
      // Borders are non-text (1.4.11); text roles take the 4.5:1 normal-text bar.
      const minimum = role === 'border' ? AA_LARGE_OR_NON_TEXT : AA_NORMAL_TEXT;
      const ratio = ratioAgainst(bg, bg.slots[slot]);

      return { bg, role, slot, minimum, ratio };
    }),
  );

  return {
    failures: cells.filter(({ ratio, minimum }) => ratio < minimum).length,
    total: cells.length,
    text: table(
      ['Global theme', 'Section', 'Background', 'Role', 'Ratio', 'Verdict'],
      cells.map(({ bg, role, slot, minimum, ratio }) => [
        `${bg.globalTheme} (${bg.globalThemeLabel})`,
        bg.sectionTheme,
        `${bg.roles.background} ${bg.backgroundValue}`,
        `${role} -> ${slot}`,
        `${formatRatio(ratio)}:1`,
        verdict(ratio, minimum),
      ]),
    ),
  };
}

/**
 * Report 2 -- #1539's rule generalised to every section background.
 *
 * #1539 said slot-1/6/7 are always safe. That was measured against slot-nine
 * only. Here every slot is checked against every section background, so the
 * "which slots are safe on WHICH background" question has an answer rather
 * than an assumption. #1614 predicted slot-seven would fail on section themes
 * one and three; this is where that shows up or does not.
 */
function slotSafetyBySectionBackground() {
  const slotNames = Object.keys(tokens['global-themes'].one.colors);
  const themeCount = Object.keys(tokens['global-themes']).length;

  const safety = (passing) => {
    if (passing === themeCount) return 'SAFE (all themes)';
    if (passing === 0) return 'NEVER';
    return 'MIXED';
  };

  const rows = Object.keys(SECTION_THEMES).flatMap((sectionTheme) =>
    slotNames.map((slot) => {
      const ratios = sectionBackgrounds()
        .filter((bg) => bg.sectionTheme === sectionTheme)
        .map((bg) => ratioAgainst(bg, bg.slots[slot]));

      const passing = ratios.filter((r) => r >= AA_NORMAL_TEXT).length;

      return [
        sectionTheme,
        SECTION_THEMES[sectionTheme].background,
        slot,
        `${formatRatio(Math.min(...ratios))}-${formatRatio(
          Math.max(...ratios),
        )}`,
        `${passing}/${themeCount}`,
        safety(passing),
      ];
    }),
  );

  return table(
    [
      'Section',
      'Background slot',
      'Foreground slot',
      'Ratio range',
      'AA-normal',
      'Verdict',
    ],
    rows,
  );
}

/**
 * Report 3 -- raw palette values against every section background.
 *
 * A block that hardcodes `var(--color-gray-700)` for its body copy keeps that
 * color no matter which section it lands in. This says, for each such value,
 * on how many of the 42 (global theme x section theme) backgrounds it is
 * actually legible -- i.e. how bad the hardcoding is.
 */
function hardcodedValueSafety() {
  const backgrounds = sectionBackgrounds();

  const rows = Object.entries(HARDCODED_CANDIDATES).map(([name, value]) => {
    const ratios = backgrounds.map((bg) => ratioAgainst(bg, value));
    const passingText = ratios.filter((r) => r >= AA_NORMAL_TEXT).length;
    const passingNonText = ratios.filter(
      (r) => r >= AA_LARGE_OR_NON_TEXT,
    ).length;

    return [
      name,
      value,
      `${formatRatio(Math.min(...ratios))}-${formatRatio(Math.max(...ratios))}`,
      `${passingText}/${ratios.length}`,
      `${passingNonText}/${ratios.length}`,
    ];
  });

  return table(
    [
      'Palette value',
      'Color',
      'Ratio range',
      'AA text (4.5:1)',
      'AA non-text (3:1)',
    ],
    rows,
  );
}

// Only emit the report when run as a script. The test file imports
// SECTION_THEMES and sectionBackgrounds() from here, and an unguarded write
// would dump the whole report into the test output.
const consistency = sectionSelfConsistency();

const report = [
  'SECTION BACKGROUND CONTRAST AUDIT',
  'yalesites-org/YaleSites-Internal#1613',
  '',
  'Generated by components/00-tokens/colors/section-background-contrast.mjs.',
  'Regenerate rather than hand-edit.',
  '',
  `Section themes: ${Object.keys(SECTION_THEMES).join(', ')}`,
  `Global themes:  ${Object.keys(tokens['global-themes']).join(', ')}`,
  '',
  '',
  "1. DOES THE SECTION'S OWN FOREGROUND CLEAR ITS OWN BACKGROUND?",
  '',
  "Every block that inherits the section's color / --color-heading /",
  '--color-link-base / --color-layout-border is correct exactly when these',
  'rows pass. Text roles are held to 4.5:1 (WCAG 1.4.3 normal text); the',
  'border role to 3:1 (1.4.11 non-text).',
  '',
  consistency.text,
  '',
  `Failures: ${consistency.failures} of ${consistency.total}.`,
  '',
  '',
  '2. EVERY SLOT AGAINST EVERY SECTION BACKGROUND',
  '',
  '#1539 established slot-1/6/7 as safe foregrounds, but measured only',
  'against slot-nine (section theme five). Extended here to all six section',
  'backgrounds. "SAFE (all themes)" means the slot clears 4.5:1 on that',
  'section background in all 7 global themes with no per-theme branching.',
  '',
  slotSafetyBySectionBackground(),
  '',
  '',
  '3. RAW PALETTE VALUES AGAINST EVERY SECTION BACKGROUND',
  '',
  'For components that hardcode a palette color instead of inheriting the',
  'section foreground: how many of the 42 (global theme x section theme)',
  'backgrounds that color is legible on.',
  '',
  hardcodedValueSafety(),
  '',
].join('\n');

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.stdout.write(report);
}
