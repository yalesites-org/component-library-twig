/**
 * Pins that every grid built from the shared mixins can hold a long unbroken
 * string -- a pasted URL -- inside its column instead of being widened by it.
 *
 * Run with the Node test runner:
 *   node --test components/03-organisms/grid-mixins-long-string.test.mjs
 *
 * Reported as YaleSites-Internal#1729. The reasoning for each of the three
 * declarations lives beside it in `_grid-mixins.scss`; what is only true here
 * is why this is asserted against *compiled* CSS: the fix is inherited from a
 * mixin, so the source shows one `base` rule while what ships is one `> *`
 * rule per include site, and a variant that overrode a property afterwards
 * would not be visible in the source either.
 *
 * The mixin list is read out of the stylesheet, so every mixin is covered --
 * not just the card grids -- and a variant added later is caught rather than
 * shipping unprotected.
 *
 * Coupling note: the `.link-purpose-nobreak` assertions pin that override at
 * the *grid* layer. Its better long-term home is
 * `lib/link-treatment/link-treatment.scss`, alongside the other linkpurpose
 * overrides -- moving it there is a deliberate improvement, not a regression,
 * and should move these assertions with it rather than be read as a failure.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { parse } from 'postcss';
import * as sass from 'sass';

const componentDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(componentDir, '../..');

/**
 * Every mixin `_grid-mixins.scss` exposes, each wrapped in its own probe class.
 *
 * Read out of the stylesheet rather than hardcoded, so a variant added later is
 * actually covered instead of silently skipped. A mixin here that is not a grid
 * container would fail these assertions -- that is deliberate: failing loudly is
 * the point, and the fix is to give it the same treatment or exclude it here.
 */
// Column-band helpers from #1648, not grids themselves: each only layers bands
// onto a grid that already includes `base`, so they carry none of its rules.
const HELPERS = new Set([
  'single-column-below-break-m',
  'container-grid-columns',
  'container-grid-small',
]);

const MIXINS = [
  ...readFileSync(
    path.join(componentDir, '_grid-mixins.scss'),
    'utf8',
  ).matchAll(/^@mixin\s+([\w-]+)/gm),
]
  .map(([, name]) => name)
  .filter((name) => !HELPERS.has(name));

// Compiled from a synthetic consumer rather than a real organism: the contract
// belongs to the mixins, and a real file would also drag in that component's
// own unrelated rules.
const source = [
  "@use './grid-mixins' as grid;",
  ...MIXINS.map((mixin) => `.probe-${mixin} { @include grid.${mixin}; }`),
].join('\n');

const { css } = sass.compileString(source, {
  // `compileString` has no file of its own, so `url` is what gives the relative
  // `@use` above -- and the token imports inside the mixins -- a directory to
  // resolve against.
  url: pathToFileURL(
    path.join(componentDir, 'grid-mixins-long-string.probe.scss'),
  ),
  loadPaths: [repoRoot, path.join(repoRoot, 'node_modules')],
  // Webpack resolves the `~` package prefix the token imports use; plain Sass
  // needs to be told where it points.
  importers: [
    {
      findFileUrl(url) {
        return url.startsWith('~')
          ? pathToFileURL(path.join(repoRoot, 'node_modules', url.slice(1)))
          : null;
      },
    },
  ],
  quietDeps: true,
  logger: sass.Logger.silent,
});

/**
 * Every value each guarded property is given, per mixin.
 *
 * Collected in a single pass at module scope: the stylesheet never changes, and
 * each variant layers several rules on one probe (the `base` rule plus its
 * media-query overrides), any of which could reintroduce the bug -- so the
 * assertions below run over the merged set rather than the first match.
 */
const declarations = new Map(
  MIXINS.map((mixin) => [
    mixin,
    { minWidth: [], overflowWrap: [], nobreak: [] },
  ]),
);

parse(css).walkRules((rule) => {
  rule.selectors.forEach((raw) => {
    // The nobreak override is nested inside the `> *` rule, so it compiles to
    // the same selector plus a descendant -- captured by the trailing group.
    const [, mixin, descendant] =
      raw
        .replace(/\s+/g, ' ')
        .trim()
        .match(/^\.probe-(\S+) > \*(.*)$/) ?? [];
    const found = declarations.get(mixin);

    if (!found) {
      return;
    }

    if (descendant === ' .link-purpose-nobreak') {
      rule.walkDecls('white-space', (d) => found.nobreak.push(d.value));
    } else if (descendant === '') {
      rule.walkDecls('min-width', (d) => found.minWidth.push(d.value));
      rule.walkDecls('overflow-wrap', (d) => found.overflowWrap.push(d.value));
    }
  });
});

MIXINS.forEach((mixin) => {
  // Each test opens by asserting the collected list is non-empty, which is also
  // what stops it passing vacuously: a renamed mixin or a rule that stopped
  // compiling leaves the list empty and fails here.
  test(`grid.${mixin}: items may shrink below their own content width`, () => {
    const { minWidth } = declarations.get(mixin);

    assert.ok(
      minWidth.length > 0,
      `grid.${mixin} never sets min-width, so its items keep the flex default ` +
        'of `auto` and a long URL widens the column',
    );
    // Checks every occurrence, not just the first: a later rule setting it back
    // to `auto` would restore the bug while the first rule still reads correct.
    minWidth.forEach((value) => {
      assert.equal(
        value,
        '0',
        `grid.${mixin} sets min-width: ${value} on its items`,
      );
    });
  });

  test(`grid.${mixin}: long unbroken strings wrap inside the item`, () => {
    const { overflowWrap } = declarations.get(mixin);

    assert.ok(
      overflowWrap.length > 0,
      `grid.${mixin} never sets overflow-wrap, so a URL that no longer widens ` +
        'the column overflows the card box instead',
    );
    overflowWrap.forEach((value) => {
      assert.notEqual(
        value,
        'normal',
        `grid.${mixin} sets overflow-wrap: normal, which is the default that ` +
          'leaves a URL unbreakable',
      );
    });
  });

  test(`grid.${mixin}: an auto-linked URL is allowed to wrap`, () => {
    const { nobreak } = declarations.get(mixin);

    assert.ok(
      nobreak.length > 0,
      `grid.${mixin} never relaxes .link-purpose-nobreak, so a URL that Drupal ` +
        'auto-linked keeps `white-space: nowrap` and overflows the card ' +
        'regardless of overflow-wrap',
    );
    nobreak.forEach((value) => {
      assert.equal(
        value,
        'normal',
        `grid.${mixin} leaves .link-purpose-nobreak at white-space: ${value}`,
      );
    });
  });
});
