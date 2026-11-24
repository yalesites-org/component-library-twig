/**
 * An open listing filter draws above the card "PINNED" label (#2356).
 * The label (.reference-card__overlay) is positioned at z-index 2; the open
 * filter list must sit higher, and still below the sticky site header.
 *
 *   node --test components/01-atoms/forms/views-filter-above-card-overlay.test.mjs
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
    }).css,
  );

const zIndexOf = (root, selectorTest) => {
  let found = null;
  root.walkRules((rule) => {
    if (found !== null || !selectorTest(rule.selector)) return;
    rule.walkDecls('z-index', (decl) => {
      if (rule.parent === root || rule.parent.type === 'root') {
        found = Number(decl.value);
      }
    });
  });
  return found;
};

const form = compile(path.join(dir, '_yds-form.scss'));
const card = compile(
  path.join(
    dir,
    '../../02-molecules/cards/reference-card/_yds-reference-card.scss',
  ),
);
const header = compile(
  path.join(dir, '../../03-organisms/site-header/_yds-site-header.scss'),
);

test('open filter list draws above the card overlay label', () => {
  const overlay = zIndexOf(
    card,
    (s) => s.trim() === '.reference-card__overlay',
  );
  const open = zIndexOf(form, (s) =>
    /(^|\s)\.chosen-with-drop$/.test(s.trim()),
  );
  assert.equal(overlay, 2);
  assert.ok(
    open > overlay,
    `open filter z-index ${open} must exceed ${overlay}`,
  );
});

test('open filter list stays below the sticky site header', () => {
  const open = zIndexOf(form, (s) =>
    /(^|\s)\.chosen-with-drop$/.test(s.trim()),
  );
  const headerZ = zIndexOf(header, (s) =>
    /^\.site-header(__base)?$/.test(s.trim()),
  );
  assert.ok(
    open < 10,
    `open filter z-index ${open} must stay below the header (10)`,
  );
  assert.ok(headerZ === null || headerZ >= open);
});
