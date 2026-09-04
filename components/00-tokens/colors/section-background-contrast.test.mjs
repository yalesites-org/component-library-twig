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
 *    simply inherit the section's colors instead of naming a slot.
 * 3. The shared rule itself. An earlier version of this file asserted things
 *    about the fix without ever reading it, so deleting the entire rule from
 *    the SCSS left every test green. `readSharedRule()` closes that hole.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

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

test('the section-driven divider clears the non-text minimum everywhere', () => {
  // #1613 re-points `--color-divider` to the section's content colour, which
  // is what drives the always-on 70/30 column separator and the divider atom.
  // Non-text, so WCAG 1.4.11's 3:1 rather than 1.4.3's 4.5:1.
  const NON_TEXT_MINIMUM = 3;

  sectionBackgrounds().forEach((bg) => {
    const ratio = contrastRatio(
      parseHsl(bg.backgroundValue),
      parseHsl(bg.slots[bg.roles.content]),
    );

    assert.ok(
      ratio >= NON_TEXT_MINIMUM,
      `${bg.globalTheme}/${bg.sectionTheme} divider: ${ratio.toFixed(2)}:1`,
    );
  });
});

test('the two known --color-layout-border failures are still exactly two', () => {
  // `--color-layout-border` was deliberately NOT re-pointed by #1613: the CTA
  // atom paints its filled-button background from it, and it resolves to
  // slot-four, a gold/tan brand accent in four of the seven global themes.
  // Re-pointing it would have turned every filled CTA on a dark section white.
  //
  // So these two failures are outstanding, not fixed. This test pins the
  // count: it fails if a palette change makes the problem WORSE, and it fails
  // if someone fixes them without updating this comment -- either way the next
  // person finds out rather than inheriting a stale claim.
  const NON_TEXT_MINIMUM = 3;

  const failing = sectionBackgrounds()
    .filter(
      (bg) =>
        contrastRatio(
          parseHsl(bg.backgroundValue),
          parseHsl(bg.slots[bg.roles.border]),
        ) < NON_TEXT_MINIMUM,
    )
    .map((bg) => `${bg.globalTheme}/${bg.sectionTheme}`);

  assert.deepEqual(failing, ['seven/three', 'seven/four']);
});

/**
 * Read the shared themed-section rule #1613 added.
 *
 * Matched on the literal selector rather than on a theme name, because the
 * whole point of the rule is that it is NOT per theme -- so `readLayoutScss()`
 * above structurally cannot see it.
 */
function readSharedRule() {
  const source = readFileSync(LAYOUT_SCSS, 'utf8');
  const match = source.match(
    /&\[data-component-theme\]:not\(\[data-component-theme='default'\]\)\s*\{([\s\S]*?)\n {2}\}/,
  );

  return match ? match[1] : null;
}

test('the shared themed-section rule exists and drives both properties', () => {
  const body = readSharedRule();

  assert.ok(
    body,
    'the shared .yds-layout[data-component-theme]:not(default) rule is gone',
  );
  assert.match(
    body,
    /--color-divider:\s*var\(--color-layout-content\)/,
    '--color-divider must be driven from the section content colour',
  );
  assert.match(
    body,
    /--color-section-foreground:\s*var\(--color-layout-content\)/,
    '--color-section-foreground must be driven from the section content colour',
  );
  assert.doesNotMatch(
    body,
    /--color-layout-border:/,
    'the CTA atom paints from --color-layout-border, so the shared rule must ' +
      'not re-point it -- see the comment above the rule',
  );
});

test('--color-section-foreground is declared in exactly the expected places', () => {
  // The "unthemed rendering is unchanged by construction" argument rests on
  // this property being unset except where intended, so that each consumer's
  // `var(--color-section-foreground, <previous colour>)` fallback applies.
  // Expected: the shared layout rule, plus the self-painting components that
  // reset it for their own descendants.
  //
  // The count went 3 -> 4 in component-library-twig#714, when the single
  // reference card joined `text-with-image` and `content-spotlight-portrait`.
  // That was not bookkeeping: the card paints a fixed Yale-blue fill, and
  // #714 re-points `--color-link-hover` from the section for every link inside
  // a themed section, so without the shadow the card's heading link resolved
  // to the SECTION's foreground -- 1.32:1 on section themes two, five and six.
  // A new self-painting component needs an entry here for the same reason, and
  // this assertion is where that gets noticed.
  //
  // 4 -> 5 in YaleSites-Internal#1628, but the branch history reads 6 -> 5,
  // which is worth spelling out: merging `1616-section-color-parity` in left
  // `_yds-layout.scss` with TWO `[data-component-theme]:not(default)` blocks,
  // each declaring this property, so the real count was briefly 6 and this
  // assertion was failing. Consolidating those blocks removed one, and the
  // callout below added one.
  //
  // The callout joined the list because it paints
  // its own background from the component-theme dial, so before it reset the
  // contract its descendants followed the SECTION instead -- a filled Button
  // Link inside a theme-two callout on a theme-one section rendered
  // near-white on near-white (the reported invisible button). Resetting
  // `--color-section-foreground` to the callout's own `--color-text` is what
  // makes that button, and every other contract reader inside a callout,
  // follow the surface it is really sitting on.
  const componentsDir = new URL('../../', import.meta.url);
  const declarations = readdirSync(componentsDir, {
    recursive: true,
    withFileTypes: true,
  })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.scss'))
    .flatMap((entry) => {
      const dir = entry.parentPath ?? entry.path;
      const text = readFileSync(join(dir, entry.name), 'utf8');
      // Declarations, not `var()` reads.
      return (text.match(/--color-section-foreground:\s*[^;]+;/g) ?? []).map(
        (decl) => `${entry.name}: ${decl}`,
      );
    });

  assert.equal(declarations.length, 5, declarations.join(' | '));
});

/**
 * Components whose line or heading is drawn on the ENCLOSING surface rather
 * than on one they paint themselves, so a themed section has to supply its
 * colour. Folded in here from yalesites-org/component-library-twig#705, which
 * fixed the slot-nine choice for these three and explicitly deferred the
 * section-supplied half to this issue.
 *
 * Deliberately NOT in this list: `--color-accordion-accent`, the 6px rule on
 * an accordion ITEM. Every non-default dial paints the item its own gray-100
 * fill, so the item owns the surface behind its line and the section never
 * reaches it -- #705 measured that one at 42 failures -> 0 with slot-seven and
 * it needs no section treatment.
 */
const SECTION_SURFACE_CONSUMERS = [
  {
    name: 'wrapped-callout border',
    file: '../../02-molecules/wrapped-callout/_yds-wrapped-callout.scss',
    fallback: '--color-wrapped-callout-theme',
  },
  {
    name: 'link-grid column rule',
    file: '../../02-molecules/link-grid/_yds-link-grid.scss',
    fallback: '--color-link-grid-action',
  },
  {
    name: 'accordion group heading',
    file: '../../02-molecules/accordion/_yds-accordion.scss',
    fallback: '--color-basic-white',
  },
  // Added by #1614. `--color-heading` is declared on `.wrapped-callout`
  // itself, and an element's own declaration beats an inherited one whatever
  // the ancestor's specificity -- so a fixed slot-seven here was unreachable
  // from the section, and the heading stayed dark on the dark section
  // backgrounds while the callout's body copy, which inherits, was fine.
  // Matching on file content rather than on a single declaration, so this
  // sitting in the same file as the border consumer above is fine.
  {
    name: 'wrapped-callout heading',
    file: '../../02-molecules/wrapped-callout/_yds-wrapped-callout.scss',
    fallback: '--color-slot-seven',
  },
  // Added by the review of component-library-twig#721. These three are the
  // same defect as the entries above, but they were invisible to the
  // `--color-layout-*` containment test in `color-system-defects.test.mjs`:
  // they never named a layout property at all. They are flat neutrals used as
  // the colour of text drawn on a surface the component does not paint, with
  // no section override anywhere in their file, so nothing was undefined and
  // nothing was dropped -- the only symptom was measured contrast.
  //
  // Measured on section theme one before the fix: the select 1.36:1 and the
  // description 2.62:1. `.taxonomy-list--categories` failed AA on ALL SIX
  // themed sections, worst 1.16:1 on theme four; only `default` passed, and
  // only by 0.11.
  //
  // The greys stay as the CSS fallback, so the de-emphasis they exist to
  // create is unchanged on an unthemed section -- measured identical before
  // and after on `default`. Only the themed sections move, and there the grey
  // was the failure.
  {
    name: '.form-item__select text',
    file: '../../01-atoms/forms/select/_yds-select.scss',
    fallback: '--color-gray-700',
  },
  {
    name: '.form-item__description help text',
    file: '../../01-atoms/forms/textfields/_yds-textfields.scss',
    fallback: '--color-gray-500',
  },
  // `_yds-list.scss` also holds `.taxonomy-list--tags`, which reads the
  // contract with `--color-blue-yale` as ITS fallback. Matching on the grey
  // keeps this row specific to the categories rule.
  {
    name: '.taxonomy-list--categories',
    file: '../../01-atoms/lists/_yds-list.scss',
    fallback: '--color-gray-500',
  },
];

SECTION_SURFACE_CONSUMERS.forEach(({ name, file, fallback }) => {
  test(`${name} takes the section foreground, falling back to its own colour`, () => {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');

    // The fallback is the point: outside a themed section the property is
    // unset, the previous colour applies, and rendering is unchanged by
    // construction. A bare read with no fallback would blank it out.
    assert.match(
      source.replace(/\s+/g, ' '),
      new RegExp(
        `var\\( ?--color-section-foreground, var\\(${fallback}\\) ?\\)`,
      ),
      `${name} must read var(--color-section-foreground, var(${fallback}))`,
    );
  });
});

test('the accordion group heading no longer carves out section theme two', () => {
  // Hard-coded white needed that carve-out because section two is a near-white
  // tint. Now that the heading follows the section's own foreground, the
  // carve-out is not just unnecessary but wrong -- it would leave theme two on
  // the default heading colour while every other theme tracks the section.
  const source = readFileSync(
    new URL(
      '../../02-molecules/accordion/_yds-accordion.scss',
      import.meta.url,
    ),
    'utf8',
  );
  const heading = source.match(/\.accordion__heading \{([\s\S]*?)\n\}/);

  assert.ok(heading, 'the .accordion__heading rule is gone');
  assert.doesNotMatch(
    heading[1],
    /\[data-component-theme='two'\]/,
    'the section-theme-two carve-out should be gone from the group heading',
  );
});
