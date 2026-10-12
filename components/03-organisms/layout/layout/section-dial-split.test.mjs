/**
 * The section dial / block dial split (YaleSites-Internal#1630).
 *
 * Run with the Node test runner:
 *   node --test components/03-organisms/layout/layout/section-dial-split.test.mjs
 *
 * `data-component-theme` used to be emitted on BOTH Layout Builder sections and
 * blocks, and it meant a different slot mapping in each place:
 *
 * - `00-tokens/colors/_color-component-themes.scss` maps the `component-themes`
 *   token layer (`background` / `text` / `heading`) from a BARE attribute
 *   selector, so it landed on the section wrapper too.
 * - `_yds-layout.scss` maps the SECTION palette (`--color-layout-theme` /
 *   `--color-layout-content`), which points at different slots.
 *
 * One attribute carrying two mappings is why no colour reset could be correct
 * for both, and why `_yds-layout.scss` had to invent `--color-section-foreground`
 * as a third property rather than fix `--color-text` in place. Sections now emit
 * `data-section-theme` and `data-component-theme` belongs to blocks alone.
 *
 * These tests read the source rather than a render, for the same reason the rest
 * of `00-tokens/colors/*.test.mjs` does: the thing being asserted is a property
 * of the cascade as written, and a browser render would only sample the handful
 * of (global theme x section theme x component) cells someone remembered to
 * build a fixture for.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  contrastRatio,
  parseHsl,
  AA_NORMAL_TEXT,
} from '../../../00-tokens/colors/contrast-ratio.mjs';
import {
  SECTION_THEMES,
  sectionBackgrounds,
} from '../../../00-tokens/colors/section-background-contrast.mjs';

const LAYOUT_SCSS = new URL('./_yds-layout.scss', import.meta.url);
const BLOCK_DIAL_SCSS = new URL(
  '../../../00-tokens/colors/_color-component-themes.scss',
  import.meta.url,
);

const read = (source) => readFileSync(source, 'utf8');

/** This file names both attributes on purpose, so it cannot police itself. */
const selfPath = fileURLToPath(import.meta.url);
const componentsDir = path.resolve(path.dirname(selfPath), '../../..');

/**
 * Every text file under `components/` that could carry a selector.
 *
 * Same shape as `_storybook/no-third-party-images.test.mjs`, including the
 * `selfPath` exclusion -- derived rather than hardcoded, so renaming this file
 * cannot silently make it start flagging itself.
 */
const componentFiles = readdirSync(componentsDir, { recursive: true })
  .filter((entry) => /\.(scss|twig|js|mjs|yml)$/.test(entry))
  .map((entry) => path.join(componentsDir, entry))
  .filter((file) => file !== selfPath);

/**
 * Body of the shared `&[data-section-theme]:not([… 'default']) { … }` rule.
 *
 * Matched on the literal selector, not on a theme name: the rule is shared
 * across all six themes, so a per-theme parse structurally cannot see it.
 * Reading the rule BODY rather than the whole file is what stops a deletion
 * from leaving these tests green -- the same hole
 * `00-tokens/colors/section-background-contrast.test.mjs`'s `readSharedRule()`
 * closes, for the same rule.
 */
function sharedSectionRule() {
  const match = read(LAYOUT_SCSS).match(
    /&\[data-section-theme\]:not\(\[data-section-theme='default'\]\)\s*\{([\s\S]*?)\n {2}\}/,
  );

  return match ? match[1] : null;
}

// Which attribute the organism emits is asserted by `yds-layout.test.mjs`'s
// "the organism is the single source of the section signature" test -- it
// already extracts the `layout__attributes` map, so the positive and negative
// assertions about the attribute live there rather than being re-derived here.

test('the block dial rule stays keyed on data-component-theme only', () => {
  // The generic rule is deliberately still bare -- it has to reach any block
  // wrapper -- and that is safe precisely because sections no longer carry the
  // attribute. If it ever also matched `data-section-theme`, the split would be
  // undone without a single selector changing in `_yds-layout.scss`.
  // Comments stripped first: the file explains the split in prose and so names
  // the section attribute on purpose. Only the selectors are the assertion.
  const source = read(BLOCK_DIAL_SCSS).replace(/\/\/.*$/gm, '');

  assert.match(source, /\[data-component-theme='#\{\$theme\}'\]/);
  assert.doesNotMatch(
    source,
    /data-section-theme/,
    'the block dial must not map the section attribute',
  );
});

/**
 * Collapse whitespace inside parentheses so a selector reads as one line.
 *
 * Load-bearing, not tidiness. Prettier wraps a long `:is(...)` argument list
 * across lines, and the reach-back selectors this file guards were formatted
 * exactly that way -- `_yds-image.scss` had three of them, all multi-line.
 * Matched against the pre-fix file, the selector regex below finds **one** of
 * those three without this flattening and all three with it, so leaving it out
 * would have made the guard quietly two-thirds ineffective.
 */
const flattenParens = (source) =>
  source.replace(/\([^()]*\)/g, (group) => group.replace(/\s+/g, ' '));

test('no selector anywhere reaches a section through data-component-theme', () => {
  // `.yds-layout[data-component-theme]` and `.yds-layout:is([data-component-theme=…])`
  // are the reach-back shapes: they qualify the SECTION ancestor. Every one of
  // them silently stops matching once the section renames its attribute, so a
  // missed occurrence is a colour that quietly reverts rather than an error.
  const offenders = componentFiles
    .flatMap((file) =>
      (
        flattenParens(read(file)).match(
          /\.yds-layout[^,{;\n]*\[data-component-theme[^\]]*\]/g,
        ) ?? []
      ).map((match) => `${path.relative(componentsDir, file)}: ${match}`),
    )
    .sort();

  assert.deepEqual(offenders, []);
});

test('the shared themed-section rule declares the derived colour set', () => {
  const body = sharedSectionRule();

  assert.ok(body, 'the shared themed-section rule is gone');

  // The block dial set the whole group from the `component-themes` map. Now
  // that it no longer reaches the section, the section has to supply the same
  // group from ITS map, or a descendant that reads one of them falls back to
  // the page default -- white text on a white page inside a dark section.
  [
    ['--color-background', '--color-layout-theme'],
    ['--color-text', '--color-layout-content'],
    ['--color-text-shadow', '--color-background'],
  ].forEach(([property, source]) => {
    assert.match(
      body,
      new RegExp(`${property}:\\s*var\\(${source}\\)`),
      `${property} must be driven from var(${source})`,
    );
  });

  // `--color-layout-border` is not only a border colour -- the CTA atom paints
  // its filled-button background from it, and it resolves to a gold/tan brand
  // accent in four of the seven global themes. See the comment above the rule
  // and `section-background-contrast.test.mjs`.
  assert.doesNotMatch(
    body,
    /--color-layout-border:/,
    'the shared rule must not re-point --color-layout-border',
  );
});

test('every themed section declares --color-heading for itself', () => {
  // The shared rule above deliberately omits `--color-heading` because each
  // per-theme block already declares it. That is only safe while all six do --
  // the block dial used to supply it as a backstop and no longer can, so a
  // theme that dropped its own declaration would leave headings inside it on
  // the page default.
  const source = read(LAYOUT_SCSS);

  Object.keys(SECTION_THEMES).forEach((theme) => {
    const block = source.match(
      new RegExp(
        `&\\[data-section-theme='${theme}'\\]\\s*\\{([\\s\\S]*?)\\n {2}\\}`,
      ),
    );

    assert.ok(block, `the &[data-section-theme='${theme}'] block is gone`);
    assert.match(
      block[1],
      /--color-heading:\s*var\(--color-slot-\w+\)/,
      `section theme ${theme} must declare its own --color-heading`,
    );
  });
});

/**
 * Components that read `--color-text` on a surface they do not paint.
 *
 * These are the three the #1626 research (section 2.2) found exposed
 * unconditionally: each consumes `var(--color-text)`, never re-declares it, and
 * paints no background of its own, so whatever the nearest dialled ancestor put
 * on `--color-text` is what they render in. That ancestor used to be the section
 * carrying the BLOCK map.
 */
const SECTION_SURFACE_TEXT_CONSUMERS = [
  '../../../02-molecules/social-links/_yds-social-links.scss',
  '../../../02-molecules/meta/event-meta/_yds-event-meta.scss',
  '../../../02-molecules/meta/publication-meta/_yds-publication-detail.scss',
];

SECTION_SURFACE_TEXT_CONSUMERS.forEach((file) => {
  const name = file.split('/').pop();

  test(`${name} reads --color-text without re-declaring it`, () => {
    // The premise of the section-side fix. If one of these ever declares
    // `--color-text` on itself, an element's own declaration beats an inherited
    // one and the section can no longer reach it -- it would need converting to
    // the surface contract instead (Phase 2, YaleSites-Internal#1631).
    const source = read(new URL(file, import.meta.url));

    assert.match(
      source,
      /var\(--color-text\)/,
      `${name} no longer reads --color-text`,
    );
    assert.doesNotMatch(
      source,
      /--color-text:\s/,
      `${name} declares --color-text on itself, so the section cannot reach it`,
    );
  });
});

test('inherited --color-text clears every section background at AA', () => {
  // The #1630 accessibility outcome, measured rather than asserted.
  //
  // Before the split, a descendant inside a themed section inherited
  // `--color-text: var(--component-themes-<theme>-text)` from the block map --
  // a literal token value, NOT a slot, so no global theme could correct it.
  // That put white text on section theme two's light background in all seven
  // global themes (1.07:1 to 1.91:1).
  //
  // The property the section now points `--color-text` at is read out of the
  // SCSS instead of hardcoded here, so re-pointing it at something that does
  // not clear AA fails this test rather than drifting past it.
  const body = sharedSectionRule();
  assert.ok(body, 'the shared themed-section rule is gone');

  const declared = body.match(/--color-text:\s*var\(--color-layout-(\w+)\)/);
  assert.ok(
    declared,
    '--color-text must be driven from a --color-layout-* property',
  );

  // Which `SECTION_THEMES` role each `--color-layout-*` property resolves to.
  // A lookup rather than a two-way guess, so re-pointing `--color-text` at a
  // property this audit does not model fails loudly instead of being silently
  // measured as the wrong role.
  const role = { content: 'content', theme: 'background', border: 'border' }[
    declared[1]
  ];
  assert.ok(
    role,
    `--color-text is driven from an unmodelled --color-layout-${declared[1]}`,
  );

  const failures = sectionBackgrounds()
    .map((bg) => ({
      bg,
      ratio: contrastRatio(
        parseHsl(bg.backgroundValue),
        parseHsl(bg.slots[bg.roles[role]]),
      ),
    }))
    .filter(({ ratio }) => ratio < AA_NORMAL_TEXT)
    .map(
      ({ bg, ratio }) =>
        `${bg.globalTheme}/${bg.sectionTheme}: ${ratio.toFixed(2)}:1`,
    );

  // Every (global theme x section theme) pairing, including section theme six,
  // which was absent from the `component-themes` map entirely and so inherited
  // no `--color-text` at all before. That the pairing list matches the SCSS is
  // asserted by `section-background-contrast.test.mjs`, so it is not re-checked
  // here.
  assert.deepEqual(
    failures,
    [],
    'a component that inherits --color-text inside a themed section fails AA here',
  );
});
