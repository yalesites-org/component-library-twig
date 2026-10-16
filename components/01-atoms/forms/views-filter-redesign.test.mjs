/**
 * Pins the front-end filter dropdown redesign (pills, checkbox rows, footer)
 * to the scaffold filter form, so Chosen in the Layout Builder block form and
 * the admin themes is untouched. (YaleSites-Internal#1897)
 *
 *   node --test components/01-atoms/forms/views-filter-redesign.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { parse } from 'postcss';
import * as sass from 'sass';

const dir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(dir, '../../..');

const compile = (file) =>
  parse(
    sass.compile(path.join(dir, file), {
      loadPaths: [repoRoot, path.join(repoRoot, 'node_modules')],
      importers: [
        {
          findFileUrl: (url) =>
            url.startsWith('~')
              ? pathToFileURL(path.join(repoRoot, 'node_modules', url.slice(1)))
              : null,
        },
      ],
      quietDeps: true,
      logger: sass.Logger.silent,
    }).css,
  );

const form = compile('_yds-form.scss');
const scaffold = '.ys-filter-form--scaffold';

const selectors = (root) => {
  const found = [];
  root.walkRules((rule) =>
    rule.selectors.forEach((s) => found.push(s.replace(/\s+/g, ' ').trim())),
  );
  return found;
};

// Declarations of every rule with a selector matching `matches`.
const decls = (root, matches) => {
  const found = [];
  root.walkRules((rule) => {
    if (rule.selectors.some((s) => matches(s.replace(/\s+/g, ' ').trim()))) {
      rule.walkDecls((d) => found.push([d.prop, d.value]));
    }
  });
  return found;
};

test('every Chosen and filter-dropdown selector is scaffold-scoped', () => {
  const bare = selectors(form).filter(
    (s) => /\.chosen-|\.ys-select-/.test(s) && !s.includes(scaffold),
  );
  assert.deepEqual(bare, []);
});

test('result rows draw a checkbox and selected rows fill it', () => {
  const all = selectors(form).filter((s) => s.startsWith(scaffold));
  ['.active-result::before', '.result-selected::before'].forEach((row) =>
    assert.ok(
      all.some((s) => s.endsWith(row)),
      `missing ${row}`,
    ),
  );
  const selected = decls(
    form,
    (s) => s.startsWith(scaffold) && s.endsWith('.result-selected::before'),
  );
  assert.ok(
    selected.some(
      ([p, v]) => p.startsWith('background') && v.includes('--color-blue-yale'),
    ),
    'selected checkbox must fill Yale Blue',
  );
});

test('selected rows no longer get the dark gray row fill', () => {
  const rows = decls(
    form,
    (s) => s.startsWith(scaffold) && s.endsWith('.result-selected'),
  );
  assert.ok(
    !rows.some(
      ([p, v]) => p.startsWith('background') && v.includes('--color-gray-700'),
    ),
  );
});

test('footer and Clear all are styled under the scaffold', () => {
  const all = selectors(form);
  assert.ok(
    all.some((s) => s.startsWith(scaffold) && s.includes('.ys-select-footer')),
  );
  assert.ok(
    all.some((s) => s.startsWith(scaffold) && s.includes('.ys-select-clear')),
  );
});

test('required asterisk stays dark on light sections default, two, five', () => {
  const text = compile('textfields/_yds-textfields.scss').toString();
  const rule = text.match(
    /\[data-component-theme\]:not\(([^)]*)\)\s*\.form-item__label/,
  );
  assert.ok(rule, 'asterisk exclusion rule not found');
  ['default', 'two', 'five'].forEach((theme) =>
    assert.ok(
      rule[1].includes(`[data-component-theme=${theme}]`) ||
        rule[1].includes(`[data-component-theme='${theme}']`),
      `missing ${theme}`,
    ),
  );
});
