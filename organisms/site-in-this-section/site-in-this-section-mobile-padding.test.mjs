/**
 * Pins that the open Content Collection menu keeps the page's left margin on
 * phones. The level-0 menu is pulled left by one spacing step to cancel the
 * inner wrapper's desktop padding-left; on mobile that padding does not exist,
 * so the pull must not apply there or the links touch the screen edge. Nested
 * (level-1) menus are indented with a margin, so on mobile they must size to
 * the remaining width instead of 100% or they run off the right edge.
 *
 * Reported as yalesites-org/YaleSites-Internal#1867. Run with:
 *   node --test components/03-organisms/site-in-this-section/site-in-this-section-mobile-padding.test.mjs
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
  [
    path.join(dir, '_site-in-this-section.scss'),
    path.join(dir, '../menu/secondary-nav/_yds-secondary-nav.scss'),
  ]
    .map(compile)
    .join('\n'),
);

// [media params, value] of every `prop` set on a selector matching `matches`.
const declsFor = (matches, prop) => {
  const found = [];
  root.walkRules((rule) => {
    if (!rule.selectors.some((s) => matches(s.replace(/\s+/g, ' ').trim()))) {
      return;
    }
    rule.walkDecls(prop, (d) => {
      found.push([
        rule.parent.type === 'atrule' ? rule.parent.params : '',
        d.value,
      ]);
    });
  });
  return found;
};

const mediaFor = (matches, prop) => declsFor(matches, prop).map(([m]) => m);

test('level-0 menu pull-left only applies at desktop widths', () => {
  const media = mediaFor(
    (s) =>
      s ===
      '.in-this-section__inner .secondary-nav__menu--level-0:first-of-type',
    'margin-left',
  );
  assert.ok(media.length > 0, 'the desktop pull-left rule still exists');
  media.forEach((params) =>
    assert.match(params, /min-width/, `unscoped or mobile rule: "${params}"`),
  );
});

test('inner wrapper padding it cancels is desktop-only too', () => {
  const media = mediaFor(
    (s) => s === '.in-this-section__inner',
    'padding-left',
  );
  assert.ok(media.length > 0);
  media.forEach((params) => assert.match(params, /min-width/));
});

test('nested menu fits beside its indent on mobile', () => {
  const widths = declsFor(
    (s) => s === '.secondary-nav__menu--level-1',
    'width',
  ).filter(([params]) => /max-width/.test(params));
  assert.deepEqual(
    widths.map(([, value]) => value),
    ['auto'],
    'width: 100% plus margin-left overflows the screen',
  );
});
