/**
 * Pins that a long unbroken string -- a pasted URL -- can wrap inside its
 * column anywhere on the platform, not only in card grids.
 *
 * Run with the Node test runner:
 *   node --test components/00-tokens/typography/long-url-wrap.test.mjs
 *
 * Reported as YaleSites-Internal#1953, the platform-wide follow-up to the
 * card-grid fix in YaleSites-Internal#1729 (see grid-mixins-long-string.test.mjs
 * beside the grid mixins). The reasoning for each rule lives beside it in the
 * stylesheet; these assertions run against the *compiled* bundles, because a
 * rule that a later one overrides reads correctly in the source and still
 * ships broken.
 *
 * What this cannot pin is layout: whether a given column actually holds the
 * URL depends on the cascade in a browser. That is what the
 * `Atoms/Text/Visreg/Long URL In Body Text` story is for.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { parse } from 'postcss';
import * as sass from 'sass';

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../..',
);

/**
 * Compile one of the shipped entry points the way the build does.
 *
 * @param {string} entry - Path to the entry stylesheet, from the repo root.
 *
 * @returns {import('postcss').Root} - The compiled stylesheet.
 */
const compile = (entry) =>
  parse(
    sass.compile(path.join(repoRoot, entry), {
      loadPaths: [repoRoot, path.join(repoRoot, 'node_modules')],
      // Vite resolves the `~` package prefix the token imports use; plain Sass
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
    }).css,
  );

// `css/style` and `css/link-treatment` are the two bundles atomic loads on
// every page.
const style = compile('components/style.scss');
const linkTreatment = compile('lib/link-treatment/link-treatment.scss');

/**
 * Every value a property is given on rules matching a selector, across the
 * whole stylesheet and its media queries.
 *
 * @param {import('postcss').Root} root - Compiled stylesheet.
 * @param {(selector: string) => boolean} matches - Selector filter.
 * @param {string} prop - Property name.
 *
 * @returns {{selector: string, value: string}[]} - Matching declarations.
 */
const valuesOf = (root, matches, prop) => {
  const found = [];

  root.walkRules((rule) => {
    rule.selectors
      .map((s) => s.replace(/\s+/g, ' ').trim())
      .filter(matches)
      .forEach((selector) => {
        rule.walkDecls(prop, (d) => found.push({ selector, value: d.value }));
      });
  });

  return found;
};

test('the body lets a long unbroken string break instead of overflowing', () => {
  const values = valuesOf(style, (s) => s === 'body', 'overflow-wrap');

  assert.ok(
    values.length > 0,
    'body never sets overflow-wrap, so every text container inherits ' +
      '`normal` and a pasted URL runs past its column',
  );
  values.forEach(({ value }) => {
    // Why not `anywhere`: see the comment beside the rule.
    assert.equal(
      value,
      'break-word',
      `body sets overflow-wrap: ${value}; expected break-word`,
    );
  });
});

test('nothing resets text back to an unbreakable overflow-wrap', () => {
  const offenders = [];

  style.walkDecls(/^(overflow-wrap|word-wrap)$/, (decl) => {
    // The `visually-hidden` mixin clips its text to a 1px box on purpose; no
    // one reads it on screen, so whether it wraps does not matter. Its
    // `clip` is what marks a rule as an include of it.
    if (decl.value !== 'normal' || decl.parent.some((d) => d.prop === 'clip')) {
      return;
    }
    offenders.push(`${decl.parent.selector} { ${decl.prop}: normal }`);
  });

  assert.deepEqual(
    offenders,
    [],
    'these rules undo the body-wide overflow-wrap for their subtree',
  );
});

test('an action banner lets its text shrink to the banner, not the URL', () => {
  const minWidth = valuesOf(
    style,
    (s) => s === '.cta-banner__outer-wrap',
    'min-width',
  );
  const maxWidth = valuesOf(
    style,
    (s) => s === '.cta-banner__text',
    'max-width',
  );

  assert.deepEqual(
    minWidth.map(({ value }) => value),
    ['0'],
    '.cta-banner__outer-wrap is a flex item floored at its min-content, so a ' +
      'URL in the banner text widens it across the banner image',
  );
  assert.deepEqual(
    maxWidth.map(({ value }) => value),
    ['100%'],
    '.cta-banner__text is sized to its content by `align-items: flex-start`, ' +
      'so a URL in it overflows the banner unless it is capped',
  );
});

test("nothing relaxes link-treatment's nowrap last-word span", () => {
  // The span is what keeps the external-link icon on the line with the end
  // of its link. link-treatment.js now trims a long last word down to a few
  // characters inside it, so a URL can wrap without it; relaxing it anywhere
  // (as the card grids once did, YaleSites-Internal#1729) only lets the icon
  // wrap onto a line by itself.
  const nobreak = (s) => /\.link-purpose-nobreak$/.test(s);
  const values = [
    ...valuesOf(linkTreatment, nobreak, 'white-space'),
    ...valuesOf(style, nobreak, 'white-space'),
  ];

  assert.ok(
    values.length > 0,
    "linkpurpose's own `.link-purpose-nobreak { white-space: nowrap }` is " +
      'missing from the link-treatment bundle',
  );
  values.forEach(({ selector, value }) => {
    assert.equal(
      value,
      'nowrap',
      `${selector} sets white-space: ${value}, which lets the icon orphan`,
    );
  });
});
