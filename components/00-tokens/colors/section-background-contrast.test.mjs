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
import { createRequire } from 'node:module';
import { join } from 'node:path';

import { contrastRatio, parseHsl, AA_NORMAL_TEXT } from './contrast-ratio.mjs';
import {
  SECTION_THEMES,
  sectionBackgrounds,
} from './section-background-contrast.mjs';

// `createRequire` rather than an import attribute, for the reason
// `approved-pairings.mjs` gives: prettier -- which `npm run test` runs --
// cannot parse `with { type: 'json' }` yet.
const require = createRequire(import.meta.url);
const tokens = require('@yalesites-org/tokens/build/json/tokens.json');

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
  // Added by YaleSites-Internal#1662. Same defect as the select / description
  // / taxonomy rows above, found the same way -- by measurement, because
  // nothing was undefined and nothing was dropped. The meta molecules paint no
  // background of their own, so their date-times, counters, field labels,
  // format overlines and audience lists sit directly on whatever the enclosing
  // section painted, while their colour was a flat neutral chosen against a
  // white page. Measured across 7 global themes x 6 section themes: 128 of 168
  // pairings below 4.5:1, worst 1.00:1.
  //
  // Multiple rows per file, as the four `.tabs` rows above already do. That
  // covers the SPELLING of each fallback; the per-declaration COUNT test
  // further down is what stops one of two declarations sharing a fallback from
  // satisfying the row on its own -- which `event-meta` would otherwise do
  // twice over.
  {
    name: '.basic-meta secondary text',
    file: '../../02-molecules/meta/basic-meta/_yds-basic-meta.scss',
    fallback: '--color-gray-600',
  },
  {
    name: '.event-meta base + past-event icon',
    file: '../../02-molecules/meta/event-meta/_yds-event-meta.scss',
    fallback: '--color-basic-brown-gray',
  },
  {
    name: '.event-meta overline + audience',
    file: '../../02-molecules/meta/event-meta/_yds-event-meta.scss',
    fallback: '--color-gray-500',
  },
  {
    name: '.event-meta__event__label',
    file: '../../02-molecules/meta/event-meta/_yds-event-meta.scss',
    fallback: '--color-gray-800',
  },
  // The localist cell hairline. Every sibling border in that rule draws from
  // `--color-divider`, and this one was left flat. It is NOT converted to
  // `--color-divider` to match them: on a themed section the two resolve to
  // the same value (`--color-layout-content`, _yds-layout.scss lines 315/317),
  // so there is nothing to gain there, and off one `--color-divider` defaults
  // to `--color-gray-500` -- darkening this deliberately lighter hairline on
  // every unthemed page, which is a design change this accessibility fix has
  // no business making.
  {
    name: '.event-meta localist cell hairline',
    file: '../../02-molecules/meta/event-meta/_yds-event-meta.scss',
    fallback: '--color-gray-200',
  },
  {
    name: 'publication-meta text + label mixins',
    file: '../../02-molecules/meta/publication-meta/_yds-publication-meta.scss',
    fallback: '--color-gray-500',
  },
  {
    name: '.publication-detail base',
    file: '../../02-molecules/meta/publication-meta/_yds-publication-detail.scss',
    fallback: '--color-basic-brown-gray',
  },
  {
    name: '.publication-detail__field__label',
    file: '../../02-molecules/meta/publication-meta/_yds-publication-detail.scss',
    fallback: '--color-gray-800',
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
 * The meta molecules, per DECLARATION (YaleSites-Internal#1662).
 *
 * The `SECTION_SURFACE_CONSUMERS` rows above cover the spelling of each
 * fallback, but they match on file CONTENT -- so one file holding two
 * declarations that share a fallback is satisfied by converting either one.
 * `event-meta` has exactly that shape twice over (two `--color-basic-brown-gray`
 * declarations, two `--color-gray-500`). Counting is what closes the hole, and
 * it is the same shape as the tab-border test above.
 *
 * `profile-meta` is deliberately absent: it paints its own background and
 * re-declares `--color-text` / `--color-heading` per theme, which is the
 * pattern the other four are being brought up to, not a defect.
 * `resource-meta` is absent because it has no flat foreground at all.
 *
 * `flatByDesign` is the count each file may still carry, and why. Two survive,
 * both the same shape -- a rule that paints its own background and therefore
 * pairs its own foreground rather than letting one inherit:
 *
 * - `.event-meta__multiple-dates` (`--color-gray-100` / `--color-gray-800`,
 *   15.03:1). Already paired before #1662.
 * - `.publication-detail__taxonomy-list__item` (`--color-gray-100` /
 *   `--color-basic-brown-gray`, 4.54:1). Newly pinned, and NOT hypothetical:
 *   `yds-publication-detail.twig` prints `{{ item }}` raw and
 *   `ResourceMetaBlock` builds the DCN cell as `#plain_text`, so a non-link
 *   item inherits the component root. Moving that root onto the section
 *   contract therefore put the section's foreground on a chip that stayed
 *   gray-100 -- below AA on 21 of 42 pairings, worst 1.07:1. Pinning the value
 *   it used to inherit keeps rendering identical and closes it.
 *
 * Both are the reason #1631 records for excluding `audio`, and both keep these
 * files' entries in `foreground-purity-baseline.json` honest.
 */
const META_MOLECULES = {
  '_yds-basic-meta.scss': {
    file: '../../02-molecules/meta/basic-meta/_yds-basic-meta.scss',
    flatByDesign: 0,
  },
  '_yds-event-meta.scss': {
    file: '../../02-molecules/meta/event-meta/_yds-event-meta.scss',
    flatByDesign: 1,
  },
  '_yds-publication-meta.scss': {
    file: '../../02-molecules/meta/publication-meta/_yds-publication-meta.scss',
    flatByDesign: 0,
  },
  '_yds-publication-detail.scss': {
    file: '../../02-molecules/meta/publication-meta/_yds-publication-detail.scss',
    flatByDesign: 1,
  },
};

/**
 * A palette token as the DIRECT value of `color:`.
 *
 * Anchored on `color:` immediately followed by the palette `var()`, so the
 * converted form -- `color: var(--color-section-foreground, var(--color-gray-500))`
 * -- does not match even though the same token appears inside it as the
 * fallback. The leading class keeps it off `background-color:` and
 * `-webkit-text-fill-color:`.
 */
const FLAT_FOREGROUND =
  /(?:^|[;{\s])color:\s*var\(--color-(?:gray-\d+|basic-[\w-]+)\)/g;

Object.entries(META_MOLECULES).forEach(([name, { file, flatByDesign }]) => {
  test(`${name} keeps no secondary text on a flat neutral`, () => {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');
    const found = source.match(FLAT_FOREGROUND) ?? [];

    // Equality, not `<=`. Too FEW means the recorded exception was converted
    // too and this entry is now stale -- the same two-way ratchet
    // `foreground-purity-baseline.json` uses, for the same reason: an
    // allowance nobody has to justify stops being an allowance.
    assert.equal(
      found.length,
      flatByDesign,
      `${name}: ${
        found.length
      } flat foreground(s), expected ${flatByDesign} -- ${found
        .map((declaration) => declaration.trim())
        .join(' | ')}`,
    );
  });
});

/**
 * The measurement the conversion rests on, both directions.
 *
 * The grays fail and the section's own foreground passes -- on every one of the
 * 42 (global theme x section theme) pairings. Asserting the "before" half too
 * is what keeps this from going stale: if a palette change ever made the grays
 * legible everywhere, this test says so instead of leaving a conversion nobody
 * can justify.
 */
test('meta secondary text: the grays fail and the section foreground passes', () => {
  const grays = {
    '--color-gray-500': tokens.color.gray['500'],
    '--color-gray-600': tokens.color.gray['600'],
    '--color-gray-800': tokens.color.gray['800'],
    '--color-basic-brown-gray': tokens.color.basic['brown-gray'],
  };
  const backgrounds = sectionBackgrounds();

  Object.entries(grays).forEach(([name, value]) => {
    const gray = parseHsl(value);
    const failing = backgrounds.filter(
      (background) =>
        contrastRatio(parseHsl(background.backgroundValue), gray) <
        AA_NORMAL_TEXT,
    );

    assert.ok(
      failing.length > 0,
      `${name} now clears AA on all ${backgrounds.length} section backgrounds -- ` +
        'the reason meta text was moved off it no longer holds; re-check #1662',
    );
  });

  const contractFailures = backgrounds.filter(
    (background) =>
      contrastRatio(
        parseHsl(background.backgroundValue),
        parseHsl(background.slots[background.roles.content]),
      ) < AA_NORMAL_TEXT,
  );

  assert.equal(
    contractFailures.length,
    0,
    `the section foreground meta text now follows must clear AA everywhere: ${contractFailures
      .map(
        (background) => `${background.globalTheme}/${background.sectionTheme}`,
      )
      .join(', ')}`,
  );
});

/**
 * The guardrail the chip above went through: paint a background, pair a
 * foreground (YaleSites-Internal#1662).
 *
 * `.publication-detail__taxonomy-list__item` painted `--color-gray-100` and set
 * no `color`, so it silently rode on whatever its ancestor happened to be. That
 * is invisible until the ancestor moves -- which is exactly what converting
 * these components to the section contract does, and it turned a passing 4.54:1
 * into 1.07:1 on half the pairings before review caught it.
 *
 * So assert the rule directly rather than trusting each conversion to remember
 * it: in these files, a rule that sets `background-color` to a flat palette
 * token must set `color` in the same rule. This is the per-file, enforceable
 * form of the guardrail #1631's acceptance criteria describe for the whole
 * library.
 */
/**
 * Rules that paint a background and pair no foreground, on purpose, for now.
 *
 * `.event-meta__event-types__type` and `.event-meta__event-topics__topic` are
 * the same shape as the publication-detail chip, and they are NOT pinned here.
 * They have no live defect -- `yds-event-meta-localist.twig` wraps every chip's
 * text in an anchor that colours itself, and the non-localist template renders
 * no chips at all -- and pinning them would add two raw palette foregrounds,
 * pushing this file's `foreground-purity-baseline.json` count UP for a purely
 * speculative hardening. That baseline may only fall.
 *
 * That said, "safe because the template always emits an anchor" is exactly the
 * assumption that failed on the publication-detail chip, and those anchors
 * colour themselves from `var(--color-text)`, which is its own AA failure on a
 * themed section (1.07:1). Both belong to #1631's guardrail work, which should
 * fix the chip and its link together rather than have this PR half-do it. The
 * count is asserted, so a THIRD unpaired background cannot appear unnoticed.
 */
const BACKGROUND_WITHOUT_FOREGROUND = {
  '_yds-basic-meta.scss': 0,
  '_yds-event-meta.scss': 2,
  '_yds-publication-meta.scss': 0,
  '_yds-publication-detail.scss': 0,
};

Object.entries(META_MOLECULES).forEach(([name, { file }]) => {
  test(`${name} pairs a foreground with every background it paints`, () => {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');
    const unpaired = [];

    // Walk each `background-color: var(--color-<palette>)` forward to the end
    // of its own rule, tracking brace depth so a nested rule's `color` (the
    // chip's `a { color: ... }`, which only applies to links) does not count.
    const painted = source.matchAll(
      /(?:^|[;{\s])background-color:\s*var\(--color-(?:gray-\d+|basic-[\w-]+)\)/g,
    );

    [...painted].forEach((match) => {
      let depth = 0;
      let index = match.index + match[0].length;
      let paired = false;

      while (index < source.length) {
        const character = source[index];
        if (character === '{') depth += 1;
        else if (character === '}') {
          if (depth === 0) break;
          depth -= 1;
        } else if (
          depth === 0 &&
          /[;{\s]/.test(source[index - 1]) &&
          source.startsWith('color:', index)
        ) {
          paired = true;
        }
        index += 1;
      }

      if (!paired) unpaired.push(match[0].trim());
    });

    assert.equal(
      unpaired.length,
      BACKGROUND_WITHOUT_FOREGROUND[name],
      `${name}: ${
        unpaired.length
      } background(s) painted without pairing a foreground in the same rule, expected ${
        BACKGROUND_WITHOUT_FOREGROUND[name]
      } -- such text follows an ancestor the rule does not control: ${unpaired.join(
        ' | ',
      )}`,
    );
  });
});
