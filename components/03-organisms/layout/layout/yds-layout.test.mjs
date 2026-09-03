/**
 * Structural guarantees for the section layout organism (YaleSites-Internal#1613).
 *
 * These read `_yds-layout.scss` and `yds-layout.twig` rather than rendering
 * them. That is deliberate: the three things guarded here are all "the source
 * says what we think it says" invariants, and every one of them has already
 * been broken once by a change that looked local.
 *
 *  1. The link-scoped `--color-text-shadow` block. Themes one-five receive it
 *     from the `@each $theme` loop because they are keys in the
 *     `component-themes` token map. Theme six is not a key in that map, so it
 *     is hand-written -- and a root-only declaration does NOT beat the link
 *     atom's own value for `.text-field a` and heading links. `default` is
 *     absent from that map too, and a block's own colour dial leaks a halo in
 *     a colour nothing paints when the section re-point is missing.
 *  2. One signature for every layout. `yds-layout.twig` is the single place
 *     that emits `class="yds-layout layout"` plus the `data-component-*`
 *     attributes, so a new section type is a new `component__layout` value and
 *     nothing else.
 *  3. The 70/30 separator is drawn once, and only when the editor asked for it.
 *     A 70/30 draws its separator as a `border-left` on
 *     `.yds-layout__secondary` while 50/50 and 33/33/33 render the
 *     `.yds-layout__divider` element, so for one section the two must never
 *     both draw -- and the border must be gated on the same Divider toggle the
 *     element is, or the control is a no-op on 70/30.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const LAYOUT_SCSS = new URL('./_yds-layout.scss', import.meta.url);
const LAYOUT_TWIG = new URL('./yds-layout.twig', import.meta.url);

const scss = () => readFileSync(LAYOUT_SCSS, 'utf8');
const twig = () => readFileSync(LAYOUT_TWIG, 'utf8');

/**
 * The four selectors themes one-five scope `--color-text-shadow` to. Hard-coded
 * rather than derived, so that dropping one from the SCSS is a test failure
 * instead of a silently smaller expectation.
 */
const LINK_SELECTORS = [
  '.link',
  '.text-field a',
  '.caption a',
  "[class*='__heading-link']",
];

/**
 * Body of the `&[data-component-theme='<theme>'] { … }` block.
 *
 * Terminates on a closing brace at the block's own indentation, so nested
 * rules inside the block are included rather than cutting the match short.
 */
function themeBlock(theme) {
  const match = scss().match(
    new RegExp(
      `&\\[data-component-theme='${theme}'\\]\\s*\\{([\\s\\S]*?)\\n {2}\\}`,
    ),
  );
  return match ? match[1] : null;
}

/** Body of the `@each $theme, $value in $layout-component-themes` loop. */
function eachThemeLoop() {
  const match = scss().match(
    /@each \$theme, \$value in \$layout-component-themes \{([\s\S]*?)\n {2}\}/,
  );
  return match ? match[1] : null;
}

/**
 * Does this rule body scope `--color-text-shadow` to the link selectors,
 * rather than only declaring it at the section root?
 */
function hasLinkScopedTextShadow(body) {
  const linkRule = body.match(
    /\.link,\s*\.text-field a,\s*\.caption a,\s*\[class\*='__heading-link'\]\s*\{([\s\S]*?)\}/,
  );
  return Boolean(linkRule) && /--color-text-shadow:\s*var\(/.test(linkRule[1]);
}

test('themes one-five get their link-scoped text-shadow from the @each loop', () => {
  const loop = eachThemeLoop();

  assert.ok(loop, 'the @each $layout-component-themes loop is gone');
  LINK_SELECTORS.forEach((selector) => {
    assert.ok(
      loop.includes(selector),
      `the @each loop no longer scopes to ${selector}`,
    );
  });
  assert.ok(
    hasLinkScopedTextShadow(loop),
    'the @each loop must scope --color-text-shadow to the link selectors',
  );
});

test('section theme six scopes --color-text-shadow to links, not just the root', () => {
  // Theme six is absent from the `component-themes` token map, so the @each
  // loop above never emits its link block. Declaring --color-text-shadow only
  // on the section root loses to the link atom's own value for `.text-field a`
  // and heading links, which renders the light descender halo on the
  // slot-three background. Reported on component-library-twig#707.
  const body = themeBlock('six');

  assert.ok(body, "the &[data-component-theme='six'] block is gone");
  assert.ok(
    hasLinkScopedTextShadow(body),
    'section theme six needs the same link-scoped --color-text-shadow block ' +
      'that the @each loop gives themes one-five -- a root-only declaration ' +
      'does not beat the link atom for .text-field a and heading links',
  );
});

test("an unthemed section re-points the link grid's descender halo", () => {
  // A section left on "Default - No Color" paints no background at all, so a
  // block inside it sits on the page surface. Link grid paints no background
  // of its own either -- but its own colour DIAL does declare
  // `--color-text-shadow: var(--color-background)` on `.link-grid`, from the
  // generic `[data-component-theme]` rule in
  // `00-tokens/colors/_color-component-themes.scss`. That is a dial background
  // the grid never paints, so a dialled link grid on an unthemed section drew
  // its descender halo in the dial's colour on the white page.
  // -
  // Themed sections one-five get the re-point from the `@each` loop and theme
  // six from its hand-written copy, both asserted above. `default` is absent
  // from the `component-themes` token map for the same reason theme six is, so
  // it needs its own copy too. Reported on component-library-twig#714.
  const body = themeBlock('default');

  assert.ok(body, "the &[data-component-theme='default'] block is gone");

  const linkGrid = body.match(/\.link-grid__link \{([\s\S]*?)\}/);

  assert.ok(
    linkGrid,
    'an unthemed section needs a .link-grid__link block, the same way the ' +
      '@each loop and theme six have one',
  );
  assert.match(
    linkGrid[1],
    /--color-text-shadow:\s*var\(/,
    "the unthemed section must re-point the link grid link's halo",
  );
  // The meaning, not a literal colour: the halo must stop following
  // `--color-background`, which on a dialled grid IS the dial colour the grid
  // never paints. Asserting the property it must NOT read survives a later
  // change of which page-surface token the library uses.
  assert.doesNotMatch(
    linkGrid[1],
    /--color-text-shadow:\s*var\(\s*--color-background/,
    'the halo must not follow --color-background: on a dialled link grid that ' +
      'is the dial colour, which the grid never paints',
  );
});

test('the 70/30 separator is drawn once, not twice', () => {
  // A seventy-thirty section draws its column separator as the `border-left`
  // (>=$break-2xl) / `border-top` (below it) on `.yds-layout__secondary`,
  // carried over from the pre-migration yds-two-column organism. The Divider
  // control renders a separate `.yds-layout__divider` element, so once both
  // respond to the toggle, turning it on would give two lines unless the
  // element stays excluded for this layout. Reported on
  // component-library-twig#707.
  const source = twig();

  const guard = source.match(/\{%\s*set layout__show_divider =([\s\S]*?)%\}/);

  assert.ok(guard, 'the layout__show_divider guard is gone');
  assert.match(
    guard[1],
    /layout__divider == 'true'/,
    'the divider must still only show when the editor turned it on',
  );
  assert.match(
    guard[1],
    /component__layout != 'seventy-thirty'/,
    "the .yds-layout__divider element must not render for 'seventy-thirty', " +
      'which draws its separator as a border on .yds-layout__secondary',
  );

  // Every render of the element must go through that guard, or the exclusion
  // is decorative.
  const renders = [...source.matchAll(/bem\('divider'/g)];
  assert.ok(renders.length > 0, 'the divider element is never rendered');
  assert.equal(
    [...source.matchAll(/layout__show_divider/g)].length - 1,
    renders.length,
    'each .yds-layout__divider render must be guarded by layout__show_divider',
  );
});

test('no dead seventy-thirty rule is left behind on the divider element', () => {
  // Once the element never renders for that layout, a rule scoped to it is
  // unreachable. Kept as a test rather than a comment so it cannot silently
  // come back.
  const dividerRule = scss().match(/\.yds-layout__divider \{([\s\S]*?)\n\}/);

  assert.ok(dividerRule, 'the .yds-layout__divider rule is gone');
  assert.doesNotMatch(
    dividerRule[1],
    /\[data-component-layout='seventy-thirty'\]/,
    'this element no longer renders for seventy-thirty, so a rule scoped to ' +
      'that layout is unreachable -- remove it',
  );
});

test('the organism is the single source of the section signature', () => {
  const source = twig();

  // The class list and every data attribute are built in one place, so a new
  // section type cannot drift into a signature of its own.
  const attrs = source.match(
    /\{% set layout__attributes = \{([\s\S]*?)\n\} %\}/,
  );

  assert.ok(attrs, 'the layout__attributes map is gone');
  [
    'data-component-theme',
    'data-component-layout',
    'data-component-padding',
    'data-component-has-divider',
    'data-component-width',
  ].forEach((attr) => {
    assert.ok(
      attrs[1].includes(attr),
      `${attr} is no longer part of the shared signature`,
    );
  });
  assert.match(
    attrs[1],
    /bem\(\s*layout__base_class,[\s\S]*?\['layout'\]/,
    "the signature must carry both the yds-layout base class and 'layout'",
  );
});

test('a layout can add its own class without hand-rolling the signature', () => {
  // One column needs `layout--onecol` alongside the shared signature: core's
  // stylesheets and both of the page's margin rules select on it. Without a
  // passthrough, that layout would have to build the class list itself, which
  // is exactly the duplication moving it onto the organism removed.
  const source = twig();

  assert.match(
    source,
    /\['layout'\]\|merge\(layout__extra_classes\|default\(\[\]\)\)/,
    'layout__extra_classes must be merged into the shared class list',
  );
});

test('a single-region layout renders no column row', () => {
  // `.yds-layout__inner` is the flex row of regions and `__primary` is a
  // column in it. One column has neither. Beyond being dead markup, __inner's
  // `> * > * { max-width: 100% }` would stop the full-bleed components a One
  // column section hosts from breaking out -- which is the documented reason
  // this layout previously refused to use the organism at all.
  const source = twig();

  assert.match(
    source,
    /\{% set layout__single_region = component__layout == 'one-column' %\}/,
    'one-column must be recognised as a single-region layout',
  );

  const single = source.match(
    /\{% if layout__single_region %\}([\s\S]*?)\{% else %\}/,
  );
  assert.ok(single, 'the single-region branch is gone');
  ["bem('inner'", "bem('primary'", "bem('secondary'", "bem('divider'"].forEach(
    (wrapper) => {
      assert.ok(
        !single[1].includes(wrapper),
        `a single-region layout must not render ${wrapper}`,
      );
    },
  );
  assert.match(
    single[1],
    /\{% block layout__primary %\}/,
    'the single-region branch must still expose the layout__primary block',
  );
});

test('one column is excluded from the default-theme section margins', () => {
  // A forward guard, not an active fix: called bare, `spacing-page-section`
  // currently emits nothing (its body is entirely behind `@if … == true`), so
  // this rule compiles away today. The exclusion matters the moment that mixin
  // is repaired -- one column's page-level margins already come from
  // `.main-content > *:first-child` and
  // `.main-content .layout.layout--onecol:last-of-type`, so section margins on
  // top would double them on every page. Pinned so a repair of the mixin
  // cannot silently regress one column.
  assert.match(
    scss(),
    /&\[data-component-theme='default'\]:not\(\[data-component-layout='one-column'\]\) \{/,
    'the default-theme section-margin rule must exclude one-column',
  );
});

/**
 * Body of a nested rule inside `.yds-layout__secondary`, by its selector.
 *
 * Terminates on a closing brace at the nested rule's own indentation, so the
 * media queries inside it are included rather than cutting the match short.
 */
function secondaryRule(selector) {
  const secondary = scss().match(/\.yds-layout__secondary \{([\s\S]*?)\n\}/);
  assert.ok(secondary, 'the .yds-layout__secondary rule is gone');

  // `\s*` before the `&`: prettier wraps a selector over 80 characters onto
  // the next line, which the compound gated selector is.
  const escaped = selector.replace(/[[\]']/g, (c) => `\\${c}`);
  const match = secondary[1].match(
    new RegExp(`\\n {2}${escaped}\\s*& \\{([\\s\\S]*?)\\n {2}\\}`),
  );
  return match ? match[1] : null;
}

/** The `[data-component-layout='seventy-thirty']` selector, ungated. */
const SEVENTY_THIRTY = "[data-component-layout='seventy-thirty']";

/** The same layout, gated on the editor's Divider toggle being on. */
const SEVENTY_THIRTY_WITH_DIVIDER = `${SEVENTY_THIRTY}[data-component-has-divider='true']`;

test('the 70/30 separator is drawn only when the Divider toggle is on', () => {
  // A 70/30 used to draw its separator unconditionally, so the Divider
  // checkbox YSLayoutOptions puts on every section did nothing at all on this
  // layout -- in either direction, because `layout__show_divider` also
  // suppresses the element for it. 50/50 and 33/33/33 have always respected
  // the toggle. Requested on yalesites-project#1514.
  //
  // The gate is `[data-component-has-divider='true']` on the section root,
  // which `yds-layout.twig` already emits, compounded onto the layout
  // attribute -- both live on the same element, so a descendant combinator
  // between them would never match.
  const gated = secondaryRule(SEVENTY_THIRTY_WITH_DIVIDER);

  assert.ok(
    gated,
    'no seventy-thirty rule is gated on data-component-has-divider, so the ' +
      'Divider toggle cannot reach the separator',
  );
  assert.match(
    gated,
    /border-left: var\(--thickness-divider\) solid var\(--color-divider\)/,
    'the wide-viewport separator must be drawn from --color-divider',
  );
  assert.match(
    gated,
    /border-top: var\(--thickness-divider\) solid var\(--color-divider\)/,
    'the stacked-viewport separator must be drawn from --color-divider',
  );

  // The ungated rule keeps the column sizing and gutter, which a 70/30 needs
  // whether or not a line is drawn -- but it must draw no border, or the gate
  // above is decorative.
  const ungated = secondaryRule(SEVENTY_THIRTY);
  assert.ok(ungated, 'the seventy-thirty secondary rule is gone');
  assert.doesNotMatch(
    ungated,
    /border-(top|left):/,
    'a border declared outside the data-component-has-divider gate draws ' +
      'regardless of the toggle, which is the bug',
  );
});

test('the 70/30 separator spans the full section height', () => {
  // `.yds-layout__inner` sets `align-items: flex-start`, so a flex item is only
  // as tall as its own content. On a 70/30 the narrow column is usually much
  // shorter than the wide one, which left the separator covering a fraction of
  // the section instead of dividing it. `.yds-layout__divider` gets full height
  // from `align-self: stretch`; the border-drawn separator needs the same.
  //
  // It sits in the gated rule, alongside the border it exists for: with no
  // separator to span there is nothing to stretch, and leaving it ungated
  // would change the column's height for sections that draw no line.
  const gated = secondaryRule(SEVENTY_THIRTY_WITH_DIVIDER);

  assert.ok(gated, 'the gated seventy-thirty secondary rule is gone');
  assert.match(
    gated,
    /align-self: stretch/,
    'the seventy-thirty separator must stretch, or it stops at the short column',
  );
});
