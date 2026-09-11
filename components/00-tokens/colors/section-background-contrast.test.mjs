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

import { readFileSync } from 'node:fs';

import { publishesContract, readComponentScss } from './surface-contract.mjs';

import { contrastRatio, parseHsl, AA_NORMAL_TEXT } from './contrast-ratio.mjs';
import {
  HARDCODED_CANDIDATES,
  SECTION_THEMES,
  sectionBackgrounds,
} from './section-background-contrast.mjs';

const LAYOUT_SCSS = new URL(
  '../../03-organisms/layout/layout/_yds-layout.scss',
  import.meta.url,
);

/**
 * Pull `theme -> { --color-layout-theme, --color-layout-content }` out of the
 * SCSS's `&[data-section-theme='N'] { … }` blocks.
 *
 * Only the two painted properties are read. Everything else in those blocks
 * (links, headings, visited states) is styling this audit does not model, and
 * matching on them would make the test fail for changes it does not care
 * about.
 */
function readLayoutScss() {
  const source = readFileSync(LAYOUT_SCSS, 'utf8');
  const blocks = source.matchAll(
    /&\[data-section-theme='(\w+)'\]\s*\{([\s\S]*?)\n {2}\}/g,
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

test('the section-driven line colours clear the non-text minimum everywhere', () => {
  // #1613 re-points `--color-divider` to the section's content colour, which
  // is what drives the always-on 70/30 column separator and the divider atom.
  // #1628 re-points Tabs' `--color-border` and `--color-border-selected` at
  // `--color-section-foreground`, which is that same content colour -- so one
  // measurement covers every line this contract draws on a section surface.
  // Non-text, so WCAG 1.4.11's 3:1 rather than 1.4.3's 4.5:1.
  const NON_TEXT_MINIMUM = 3;

  sectionBackgrounds().forEach((bg) => {
    const ratio = contrastRatio(
      parseHsl(bg.backgroundValue),
      parseHsl(bg.slots[bg.roles.content]),
    );

    assert.ok(
      ratio >= NON_TEXT_MINIMUM,
      `${bg.globalTheme}/${bg.sectionTheme} section line: ${ratio.toFixed(
        2,
      )}:1`,
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
    /&\[data-section-theme\]:not\(\[data-section-theme='default'\]\)\s*\{([\s\S]*?)\n {2}\}/,
  );

  return match ? match[1] : null;
}

test('the shared themed-section rule exists and drives both properties', () => {
  const body = readSharedRule();

  assert.ok(
    body,
    'the shared .yds-layout[data-section-theme]:not(default) rule is gone',
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

test('the surface contract is published in exactly the expected places', () => {
  // The "unthemed rendering is unchanged by construction" argument rests on
  // the contract being unpublished except where intended, so that each
  // consumer's `var(--color-section-foreground, <previous colour>)` fallback
  // applies. Expected: the shared layout rule, plus the self-painting
  // components that reset it for their own descendants.
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
  // callout added one.
  //
  // YaleSites-Internal#1631 changed the SHAPE of this assertion, not just the
  // number. Two things stopped a raw count of `--color-section-foreground:`
  // declarations meaning what it used to:
  //
  //   1. Publishing now normally goes through `tokens.publish-surface(...)`,
  //      so the literal declaration lives once in `_surface-contract.scss` and
  //      the call sites do not spell it out.
  //   2. A component publishes from every block that actually paints -- the
  //      dial loop AND theme six, which is not a `component-themes` key -- so
  //      one component contributes more than one site.
  //
  // Counting FILES rather than declarations survives both, and says the thing
  // the test is really for: this set is the list of surfaces that shadow the
  // section, and nothing should join it silently.
  // Deliberately NOT `surveySurfaces().converted`, which would look like the
  // obvious reuse: that list is filtered to files the guardrail detects as
  // PAINTING, so a file that publishes and later stops painting would silently
  // drop out of it. This assertion has to notice exactly that, so it asks the
  // simpler question -- who publishes -- and answers it over every stylesheet.
  // It is also why the two numbers differ: the guardrail reports 5 converted,
  // this list has 9, the extra four being `_yds-layout.scss` (the origin of the
  // contract, which paints via `--color-layout-*` rather than the block dial)
  // and `_yds-reference-card.scss`, `_yds-event-meta.scss` and
  // `_yds-publication-detail.scss` (which paint at no themed scope at all).
  const publishing = readComponentScss()
    .filter(([, source]) => publishesContract(source))
    .map(([path]) => path)
    .sort();

  assert.deepEqual(publishing, [
    'components/02-molecules/banner/action/_yds-action-banner.scss',
    'components/02-molecules/callout/_yds-callout.scss',
    'components/02-molecules/cards/reference-card/_yds-reference-card.scss',
    'components/02-molecules/content-spotlight-portrait/_yds-content-spotlight-portrait.scss',
    // 7 -> 9 with the meta chip conversion (the #1631 "concrete instance of
    // the guardrail" criterion). Like `_yds-reference-card.scss` above, these
    // two paint at NO themed scope -- a fixed `--color-gray-100` chip -- so
    // the guardrail cannot see them and `surveySurfaces()` still reports 5
    // converted while this list holds 9. `META_CHIP_SURFACES` at the foot of
    // this file is what actually pins their wiring and their numbers.
    'components/02-molecules/meta/event-meta/_yds-event-meta.scss',
    'components/02-molecules/meta/publication-meta/_yds-publication-detail.scss',
    'components/02-molecules/text-with-image/_yds-text-with-image.scss',
    'components/03-organisms/facts-and-figures-group/_yds-facts-and-figures-group.scss',
    'components/03-organisms/layout/layout/_yds-layout.scss',
  ]);
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
  // Added by YaleSites-Internal#1631. The current-page indicator paints no
  // background of its own, so its fixed brown-grey was unreachable from the
  // section it sits on. The pager renders in views blocks that ARE
  // section-placeable -- post-list, directory, taxonomy_term -- so it is
  // genuinely exposed, which is why it is here and not deferred with the
  // components that only ever render in the banner region.
  {
    name: 'pager current-page indicator',
    file: '../../02-molecules/pager/_yds-pager.scss',
    fallback: '--color-basic-brown-gray',
  },
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
  // Added by the second review of component-library-twig#721. Tabs is the one
  // file this PR rewrites where the BORDER roles were left flat while the
  // background and action roles were moved onto the contract, so the tab
  // chrome -- the bar's bottom rule, the line under the tab strip, the
  // selected tab's outline, the inactive tabs' top/left edges and the
  // scroll-arrow buttons -- did not follow the section it sits on.
  //
  // Two fallbacks per role, because the two grey pairs live in different
  // rules: `.tabs` itself carries the unthemed default, and the theme-six
  // dial carries the pair it uses for the near-white slot-nine panel it
  // paints for itself. Both keep their previous colour as the CSS fallback,
  // so an unthemed page renders identically -- measured byte-identical before
  // and after.
  //
  // Unlike the form and list rows above, that preserved pair is NOT
  // de-emphasis worth keeping: measured on an unthemed section,
  // `--color-gray-300` is 1.94:1 on white, and on theme six -- whose panel
  // computes to white, because the component-themes map stops at `five` so
  // nothing ever reads its `--color-tabs-background` -- `--color-gray-400` is
  // 2.75:1 and `--color-basic-white` 1.00:1, i.e. invisible. Those are
  // pre-existing 1.4.11 failures that this change deliberately leaves alone:
  // it scopes itself to themed sections, where the grey WAS the regression
  // this PR is fixing. Closing the unthemed ones darkens the resting border on
  // every tab set on the platform, which is a design decision needing its own
  // ticket.
  {
    name: '.tabs --color-border default',
    file: '../../02-molecules/tabs/_yds-tabs.scss',
    fallback: '--color-gray-300',
  },
  {
    name: '.tabs --color-border-selected default',
    file: '../../02-molecules/tabs/_yds-tabs.scss',
    fallback: '--color-gray-500',
  },
  {
    name: '.tabs --color-border theme six',
    file: '../../02-molecules/tabs/_yds-tabs.scss',
    fallback: '--color-gray-400',
  },
  {
    name: '.tabs --color-border-selected theme six',
    file: '../../02-molecules/tabs/_yds-tabs.scss',
    fallback: '--color-basic-white',
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
  // Either spelling: the carve-out predates the section/block dial split
  // (YaleSites-Internal#1630), so a reintroduced one could be written against
  // either attribute.
  assert.doesNotMatch(
    heading[1],
    /\[data-(component|section)-theme='two'\]/,
    'the section-theme-two carve-out should be gone from the group heading',
  );
});

/**
 * Ties the Tabs source wiring to the measurement above.
 *
 * The consumer rows further up prove each fallback pair is spelled correctly;
 * this proves there is no FOURTH declaration somewhere else in the file still
 * setting a border role to a flat colour. That is the shape the defect
 * actually took: `--color-border` was on the contract nowhere and hardcoded in
 * three separate rules, one of which only applied inside a themed section --
 * exactly where the contract was available and unused.
 */
test('no tab border role is left on a flat colour', () => {
  const source = readFileSync(
    new URL('../../02-molecules/tabs/_yds-tabs.scss', import.meta.url),
    'utf8',
  ).replace(/\s+/g, ' ');

  ['--color-border', '--color-border-selected'].forEach((property) => {
    const declarations = source.match(new RegExp(`${property}: [^;]+;`, 'g'));

    assert.ok(declarations, `${property} is no longer declared at all`);
    declarations.forEach((declaration) => {
      assert.match(
        declaration,
        /var\( ?--color-section-foreground, /,
        `${declaration.trim()} does not read the section contract`,
      );
    });
  });
});
/**
 * The meta chip/tag lists (YaleSites-Internal#1631, the "concrete instance of
 * the guardrail" acceptance criterion; surfaced during review of
 * component-library-twig#729).
 *
 * These three chips are the one shape `surface-contract.mjs` cannot see: they
 * paint a FIXED `--color-gray-100` at no themed scope at all, so the guardrail
 * would have to flag every piece of flat chrome in the library to catch them.
 * They are converted by hand, and this is the table that holds them instead.
 *
 * The defect, measured on the background they paint:
 *
 * - Resting: the anchors read `var(--color-text)`, which is the ENCLOSING
 *   surface's foreground, not the chip's. On block dials one to four, and on
 *   the `gray-700` / `gray-800` / `blue-yale` basic themes, that resolves to
 *   white -- **1.07:1**, the washed-out chips in the Old Blues visreg story.
 *   Only block dial five (11.26:1) and the light basic themes were ever legible.
 * - Visited: a dark themed section re-points `--color-link-visited-base` to
 *   `--color-link-visited-light` (`_yds-layout.scss:112-147`), which the chip
 *   inherits -- **1.32:1**. `a:visited` outranks a plain `color:` on the same
 *   anchor, so fixing only the resting state leaves this one invisible.
 *
 * Both states end on the chip's own published foreground. Visited collapsing
 * into the resting colour is deliberate and not new: `_yds-layout.scss:63-66`
 * already does exactly this for link-grid ("match section copy -- no default
 * purple :visited from link mixin"). Pointing it at the dark purple swatch
 * instead would read a raw palette token in foreground position, which is the
 * thing `foreground-purity.mjs` exists to stop.
 *
 * Hover is deliberately NOT in this table: `plain-link` self-declares
 * `--color-link-hover: var(--color-slot-two)` on the anchor itself, and a
 * declaration on the element beats the section's inherited one, so hover
 * already resolves to the global accent (4.98:1 to 6.84:1, all clearing AA).
 * That self-declaration is the very thing #1631 wants removed elsewhere; if a
 * later phase removes it from `plain-link`, hover joins this table.
 *
 * `--color-gray-700` is the published foreground because it is not a new
 * colour: it is exactly what these anchors already resolve to wherever they are
 * currently legible (it is the `text` value of every light basic theme). So the
 * light themes render byte-identically and only the failing combinations move.
 *
 * `surface` (the rule that paints) and `anchor` (the rule that colours the
 * link) are carried per row rather than derived from `name`, because the two
 * files are shaped differently: event-meta writes the chip rules flat at the
 * top level and delegates both to `chip-surface` / `chip-link` mixins, while
 * publication-detail nests everything under `.publication-detail` with an `&__`
 * prefix and declares both inline. Both are asserted PER CHIP rather than per
 * file, because a file-level match is satisfied by either chip and would let
 * the other silently revert to painting a bare background.
 */
const META_CHIP_SURFACES = [
  {
    name: '.event-meta__event-types__type',
    file: '../../02-molecules/meta/event-meta/_yds-event-meta.scss',
    surface: '.event-meta__event-types__type',
    anchor: '.event-meta__event-types__type a',
  },
  {
    name: '.event-meta__event-topics__topic',
    file: '../../02-molecules/meta/event-meta/_yds-event-meta.scss',
    surface: '.event-meta__event-topics__topic',
    anchor: '.event-meta__event-topics__topic a',
  },
  {
    name: '.publication-detail__taxonomy-list__item',
    file: '../../02-molecules/meta/publication-meta/_yds-publication-detail.scss',
    surface: '&__taxonomy-list__item',
    anchor: '&__taxonomy-list__item',
  },
];

/**
 * The chip stylesheets, read and whitespace-normalised once each.
 *
 * Keyed by unique file, not per row: two of the three chips live in
 * `_yds-event-meta.scss`, and the file-level assertions below would otherwise
 * read and normalise it once per row and once per test.
 */
const CHIP_SOURCES = new Map(
  [...new Set(META_CHIP_SURFACES.map(({ file }) => file))].map((file) => [
    file,
    readFileSync(new URL(file, import.meta.url), 'utf8').replace(/\s+/g, ' '),
  ]),
);

/**
 * The body that actually carries a rule's declarations, following one `@include`.
 *
 * One level of indirection has to be followed or these assertions go vacuous:
 * `_yds-event-meta.scss` shares both chip rules through `chip-surface` /
 * `chip-link` mixins, so each rule holds nothing but `@include <mixin>;`, and
 * matching on the rule alone would happily pass while the mixin set
 * `--color-text`. Verified by mutation -- reverting a mixin's declaration is
 * caught only because of this hop.
 *
 * Matches `@include <name>;` only, so a `@include tokens.publish-surface(...)`
 * (dotted, with arguments) is read as a declaration in this body rather than
 * mistaken for a delegation to follow.
 *
 * `[^}]*` stops at the first `}`, which is why publication-detail can use the
 * same string for `surface` and `anchor`: its captured body happens to run
 * through the nested `a { ... }` rule. That is incidental, not designed -- if
 * that nested rule is ever moved ABOVE the chip's own declarations, the
 * `surface` row stops seeing them and would need its own selector.
 */
function declaringBody(source, selector) {
  const rule = source.match(
    new RegExp(`${selector.replace(/[.$]/g, '\\$&')} \\{([^}]*)`),
  );
  if (!rule) return null;

  const delegated = rule[1].match(/@include ([\w-]+);/);
  if (!delegated) return rule[1];

  const mixin = source.match(new RegExp(`@mixin ${delegated[1]} \\{([^}]*)`));

  return mixin ? mixin[1] : rule[1];
}

test('every meta chip publishes the fixed surface it paints', () => {
  META_CHIP_SURFACES.forEach(({ name, file, surface }) => {
    const body = declaringBody(CHIP_SOURCES.get(file), surface);

    assert.ok(body, `the ${name} rule is gone`);
    // Whitespace-normalised, but prettier wraps the argument list only when it
    // does not fit, so the optional inner spaces are load-bearing: event-meta
    // fits on one line and publication-detail does not.
    assert.match(
      body,
      /@include tokens\.publish-surface\( ?var\(--color-gray-100\), var\(--color-gray-700\) ?\);/,
      `${name} must publish the fixed gray-100 surface it paints`,
    );

    // A dark themed section re-points the visited pair to the near-white
    // `light` tokens for copy drawn on the SECTION. The chip paints its own
    // near-white background, so it has to re-point them at the foreground it
    // publishes -- and it must do so on the CHIP, because `a:visited` outranks
    // a plain `color:` on the anchor.
    ['--color-link-visited-base', '--color-link-visited-hover'].forEach(
      (property) => {
        assert.match(
          body,
          new RegExp(`${property}: var\\(--color-section-foreground\\);`),
          `${name} must point ${property} at the surface it publishes`,
        );
      },
    );
  });
});

test('no meta chip anchor still reads the enclosing surface foreground', () => {
  // The regression this closes: `color: var(--color-text)` on the anchor is a
  // read of the surface the chip SITS ON, against the background the chip
  // PAINTS. Scoped to the chip anchors -- `.event-meta__address` and
  // `.event-meta__format` read `--color-text` legitimately, because they paint
  // no background and so genuinely belong to the enclosing surface.
  META_CHIP_SURFACES.forEach(({ name, file, anchor }) => {
    const body = declaringBody(CHIP_SOURCES.get(file), anchor);

    assert.ok(body, `the ${name} anchor rule is gone`);
    // Asserted positively as well, so deleting the declaration outright cannot
    // pass this test by leaving nothing to match.
    assert.match(
      body,
      /color: var\(--color-section-foreground\)/,
      `${name} must colour its anchor from the surface it paints`,
    );
    assert.doesNotMatch(
      body,
      /color: var\(--color-text\)/,
      `${name} must not read --color-text, the enclosing surface's foreground`,
    );
  });
});

test('the published chip pairing clears AA, and the pairing it replaced does not', () => {
  // Values come from `HARDCODED_CANDIDATES`, which reads the tokens package, so
  // a revision to gray-100 or gray-700 upstream is measured here rather than
  // silently testing a colour the chip no longer paints.
  const chip = parseHsl(HARDCODED_CANDIDATES['gray-100']);
  const published = contrastRatio(
    parseHsl(HARDCODED_CANDIDATES['gray-700']),
    chip,
  );

  assert.ok(
    published >= AA_NORMAL_TEXT,
    `the published chip foreground is ${published.toFixed(2)}:1, below AA`,
  );

  // Guards the premise rather than the fix: white is what `--color-text`
  // resolves to on every dark theme, and inheriting it was the defect. If this
  // ever clears AA on its own, the conversion has stopped being load-bearing
  // and this whole table should be revisited rather than quietly kept.
  const inherited = contrastRatio(
    parseHsl(HARDCODED_CANDIDATES['basic-white']),
    chip,
  );

  assert.ok(
    inherited < AA_NORMAL_TEXT,
    `inheriting a dark theme's --color-text now measures ${inherited.toFixed(
      2,
    )}:1 -- the defect this table documents no longer exists as described`,
  );
});
