/**
 * Pins that Views filter dropdowns (Chosen inside `.ys-filter-form--scaffold`)
 * keep the shared dropdown arrow, hide it while the list is open, and reserve
 * room for it so text never sits under it.
 *
 * Reported as yalesites-org/YaleSites-Internal#1827. Run with:
 *   node --test components/01-atoms/forms/views-filter-dropdown-arrow.test.mjs
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
  sass.compile(file, {
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
  }).css;

const root = parse(
  [path.join(dir, 'select/_yds-select.scss'), path.join(dir, '_yds-form.scss')]
    .map(compile)
    .join('\n'),
);

// Values of `prop` in every rule with a selector matching `test`.
const values = (matches, prop) => {
  const found = [];
  root.walkRules((rule) => {
    if (rule.selectors.some((s) => matches(s.replace(/\s+/g, ' ').trim()))) {
      rule.walkDecls(prop, (d) => found.push(d.value));
    }
  });
  return found;
};

const scaffold = '.ys-filter-form--scaffold';

test('scaffold dropdown arrow is not removed', () => {
  const contents = values(
    (s) =>
      s.startsWith(scaffold) &&
      s.includes('.form-item__dropdown') &&
      s.endsWith('::after'),
    'content',
  );
  assert.ok(!contents.includes('none'), 'content: none removes the arrow');
});

test('arrow is hidden while the Chosen list is open', () => {
  const display = values(
    (s) =>
      s === `${scaffold} .form-item__dropdown:has(.chosen-with-drop)::after`,
    'display',
  );
  assert.ok(display.includes('none'));
});

test('chosen choices reserve room for the arrow', () => {
  const padding = values(
    (s) => s === `${scaffold} .chosen-choices`,
    'padding-right',
  );
  assert.ok(padding.length > 0);
});
