/**
 * Table links in dark themed sections (YaleSites-Internal#2113).
 *
 * Section themes one, three and four give links a light colour. Table cells
 * paint a light background, so without a re-point the links render white on
 * white. These read `_table.scss` and check the re-point is still emitted for
 * exactly those three themes and covers every link variable.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parse } from 'postcss';
import * as sass from 'sass';

const scss = readFileSync(new URL('./_table.scss', import.meta.url), 'utf8');

test('themes one, three and four re-point table link colours', () => {
  assert.match(scss, /@each \$section-theme in \('one', 'three', 'four'\)/);
});

test('every link colour variable is re-pointed at the cell text colour', () => {
  [
    '--color-link-base',
    '--color-link-hover',
    '--color-link-visited-base',
    '--color-link-visited-hover',
  ].forEach((v) => {
    assert.match(scss, new RegExp(`${v}: currentcolor;`), v);
  });
});

/**
 * Hover must win the cascade. `_yds-layout.scss` re-declares
 * `--color-link-hover` on `.text-field a` and friends at (0,4,1); a table link
 * rule that loses to it leaves hover white on the light cell (1.07:1). Compile
 * the real bundle and compare specificity instead of grepping source text.
 */
const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../..',
);

const root = parse(
  sass.compile(path.join(repoRoot, 'components/style.scss'), {
    loadPaths: [repoRoot, path.join(repoRoot, 'node_modules')],
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

/** Specificity as [classes+attrs, types] for a simple compiled selector. */
const specificity = (selector) => {
  const flat = selector.replace(/:not\(/g, ' ').replace(/\)/g, '');
  const classes = (flat.match(/\.[\w-]+|\[[^\]]+\]/g) || []).length;
  const types = (
    flat.replace(/\[[^\]]*\]/g, '').match(/(^|[\s>+~])[a-z][\w-]*/g) || []
  ).length;
  return [classes, types];
};

const wins = (a, b) => a[0] > b[0] || (a[0] === b[0] && a[1] > b[1]);

const selectorsDeclaring = (prop, matches) => {
  const found = [];
  root.walkRules((rule) => {
    if (!rule.selector.includes('data-section-theme')) return;
    if (!rule.some((d) => d.prop === prop)) return;
    rule.selectors.filter(matches).forEach((s) => found.push(s));
  });
  return found;
};

test('table link hover rule outranks the section text-field hover rule', () => {
  ['one', 'three', 'four'].forEach((theme) => {
    const table = selectorsDeclaring(
      '--color-link-hover',
      (s) => s.includes(`=${theme}]`) && /table td a$/.test(s),
    );
    const section = selectorsDeclaring('--color-link-hover', (s) =>
      /\.text-field a$/.test(s),
    );
    assert.ok(table.length, `table rule emitted for theme ${theme}`);
    assert.ok(section.length, 'section text-field hover rule emitted');
    section.forEach((s) =>
      assert.ok(
        wins(specificity(table[0]), specificity(s)),
        `${table[0]} must outrank ${s}`,
      ),
    );
  });
});
