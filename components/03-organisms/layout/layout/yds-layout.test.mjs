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
 *     atom's own value for `.text-field a` and heading links.
 *  2. One signature for every layout. `yds-layout.twig` is the single place
 *     that emits `class="yds-layout layout"` plus the `data-component-*`
 *     attributes, so a new section type is a new `component__layout` value and
 *     nothing else.
 *  3. The 70/30 separator is drawn once. The always-on `border-left` on
 *     `.yds-layout__secondary` and the opt-in `.yds-layout__divider` element
 *     must not both draw for the same section.
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

test('the 70/30 separator is drawn once, not twice', () => {
  // A seventy-thirty section ALWAYS draws a column separator: the
  // `border-left` (>=$break-2xl) / `border-top` (below it) on
  // `.yds-layout__secondary`, carried over from the pre-migration
  // yds-two-column organism. The opt-in Divider control renders a separate
  // `.yds-layout__divider` element, so turning it on used to give two lines.
  // Reported on component-library-twig#707; #1613 re-pointing --color-divider
  // to the section foreground is what made the doubling read worst.
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
    "the opt-in .yds-layout__divider must not render for 'seventy-thirty', " +
      'which already draws an always-on separator on .yds-layout__secondary',
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

test('the 70/30 separator spans the full section height', () => {
  // `.yds-layout__inner` sets `align-items: flex-start`, so a flex item is only
  // as tall as its own content. On a 70/30 the narrow column is usually much
  // shorter than the wide one, which left the separator covering a fraction of
  // the section instead of dividing it. `.yds-layout__divider` gets full height
  // from `align-self: stretch`; the border-drawn separator needs the same.
  const secondary = scss().match(/\.yds-layout__secondary \{([\s\S]*?)\n\}/);

  assert.ok(secondary, 'the .yds-layout__secondary rule is gone');

  const seventyThirty = secondary[1].match(
    /\[data-component-layout='seventy-thirty'\] & \{([\s\S]*?)\n {2}\}/,
  );
  assert.ok(seventyThirty, 'the seventy-thirty secondary rule is gone');
  assert.match(
    seventyThirty[1],
    /align-self: stretch/,
    'the seventy-thirty separator must stretch, or it stops at the short column',
  );
  // Same rule that draws it, so the two cannot drift apart.
  assert.match(
    seventyThirty[1],
    /border-left: var\(--thickness-divider\) solid var\(--color-divider\)/,
    'the separator must still be drawn from --color-divider',
  );
});
