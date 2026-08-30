/**
 * Checks for the #1613 section-background contrast audit.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/00-tokens/colors/section-background-contrast.test.mjs
 *
 * Two things are worth guarding here, and neither is the contrast math (that
 * is `contrast-ratio.test.mjs`):
 *
 * 1. `SECTION_THEMES` is hand-transcribed from `_yds-layout.scss`. If someone
 *    re-points a section theme in the SCSS and not here, every number this
 *    audit reports becomes quietly wrong. The first test reads the SCSS and
 *    fails on the drift.
 * 2. The audit's conclusion -- that every section theme's own foreground
 *    clears its own background in all 7 global themes -- is what lets blocks
 *    simply inherit the section's colors instead of naming a slot. The second
 *    test pins that, so a future palette change cannot silently break the
 *    premise the fixes rest on.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { contrastRatio, parseHsl, AA_NORMAL_TEXT } from './contrast-ratio.mjs';
import {
  SECTION_THEMES,
  sectionBackgrounds,
} from './section-background-contrast.mjs';

const LAYOUT_SCSS = new URL(
  '../../03-organisms/layout/layout/_yds-layout.scss',
  import.meta.url,
);

/**
 * Pull `theme -> { --color-layout-theme, --color-layout-content }` out of the
 * SCSS's `&[data-component-theme='N'] { … }` blocks.
 *
 * Only the two painted properties are read. Everything else in those blocks
 * (links, headings, visited states) is styling this audit does not model, and
 * matching on them would make the test fail for changes it does not care
 * about.
 */
function readLayoutScss() {
  const source = readFileSync(LAYOUT_SCSS, 'utf8');
  const blocks = source.matchAll(
    /&\[data-component-theme='(\w+)'\]\s*\{([\s\S]*?)\n {2}\}/g,
  );
  return Object.fromEntries(
    [...blocks]
      .map(([, theme, body]) => [
        theme,
        body.match(/--color-layout-theme:\s*var\(--color-(slot-[a-z]+)\)/),
        body.match(/--color-layout-content:\s*var\(--color-(slot-[a-z]+)\)/),
      ])
      .filter(([, themeSlot, contentSlot]) => themeSlot && contentSlot)
      .map(([theme, themeSlot, contentSlot]) => [
        theme,
        { background: themeSlot[1], content: contentSlot[1] },
      ]),
  );
}

test('SECTION_THEMES matches the slots _yds-layout.scss actually paints', () => {
  const fromScss = readLayoutScss();

  assert.deepEqual(
    Object.keys(fromScss).sort(),
    Object.keys(SECTION_THEMES).sort(),
    'the SCSS and the audit disagree about which section themes exist',
  );

  Object.entries(fromScss).forEach(([theme, { background, content }]) => {
    assert.equal(
      SECTION_THEMES[theme].background,
      background,
      `section theme ${theme}: background slot drifted from the SCSS`,
    );
    assert.equal(
      SECTION_THEMES[theme].content,
      content,
      `section theme ${theme}: content slot drifted from the SCSS`,
    );
  });
});

test('every section theme foreground clears its own background at AA', () => {
  const failures = sectionBackgrounds()
    .flatMap((bg) =>
      ['content', 'heading', 'link'].map((role) => ({
        bg,
        role,
        ratio: contrastRatio(
          parseHsl(bg.backgroundValue),
          parseHsl(bg.slots[bg.roles[role]]),
        ),
      })),
    )
    .filter(({ ratio }) => ratio < AA_NORMAL_TEXT)
    .map(
      ({ bg, role, ratio }) =>
        `${bg.globalTheme}/${bg.sectionTheme} ${role}: ${ratio.toFixed(2)}:1`,
    );

  assert.deepEqual(
    failures,
    [],
    'a block that inherits the section foreground would now fail AA here',
  );
});

test('the shared rule keeps the border role legible as non-text', () => {
  // `--color-layout-border` is derived from `--color-layout-content` by the
  // shared rule, so it is checked against the 3:1 non-text minimum (WCAG
  // 1.4.11) rather than the 4.5:1 text one. Before #1613 themes one/three/four
  // used slot-four here, which measured 2.42:1 and 2.99:1 in Whitney.
  const NON_TEXT_MINIMUM = 3;

  sectionBackgrounds().forEach((bg) => {
    const ratio = contrastRatio(
      parseHsl(bg.backgroundValue),
      parseHsl(bg.slots[bg.roles.content]),
    );

    assert.ok(
      ratio >= NON_TEXT_MINIMUM,
      `${bg.globalTheme}/${bg.sectionTheme} border: ${ratio.toFixed(2)}:1`,
    );
  });
});
