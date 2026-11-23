/**
 * Pins that, in closed Views filters, only the lone visible chip may shrink
 * (so a long label truncates and the "+N more" badge stays inside the box),
 * while chips in general and the badge itself never shrink. (#1366)
 *
 *   node --test components/01-atoms/forms/views-filter-more-badge.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { parse } from 'postcss';
import * as sass from 'sass';

const dir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(dir, '../../..');

const root = parse(
  sass.compile(path.join(dir, '_yds-form.scss'), {
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

// Declarations (prop, value) of every rule whose selector matches `matches`.
const decls = (matches) => {
  const found = [];
  root.walkRules((rule) => {
    if (rule.selectors.some((s) => matches(s.replace(/\s+/g, ' ').trim()))) {
      rule.walkDecls((d) => found.push([d.prop, d.value]));
    }
  });
  return found;
};

const scaffold = '.ys-filter-form--scaffold';
const shrinks = (list) =>
  list.some(
    ([p, v]) =>
      (p === 'flex-shrink' && v === '1') ||
      (p === 'flex' && /^\d+\s+1(\s|$)/.test(v)),
  );

test('lone visible chip next to the overflow chip may shrink', () => {
  const lone = decls(
    (s) =>
      s.includes('li.search-choice') &&
      s.includes(':first-child') &&
      s.includes(':has(+ .ys-search-choice--overflow)'),
  );
  assert.ok(shrinks(lone), 'lone chip must set flex-shrink: 1');
});

test('chips in general still do not shrink', () => {
  const general = decls(
    (s) => s.startsWith(scaffold) && s.endsWith(' li.search-choice'),
  );
  assert.ok(general.some(([p, v]) => p === 'flex' && v === 'none'));
});

test('the +N more badge never shrinks', () => {
  const badge = decls(
    (s) => s.startsWith(scaffold) && s.endsWith('.ys-select-more'),
  );
  assert.ok(badge.some(([p, v]) => p === 'flex' && v === 'none'));
});
