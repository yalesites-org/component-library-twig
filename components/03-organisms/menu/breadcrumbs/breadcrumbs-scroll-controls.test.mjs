/**
 * Guards the compiled selectors for the breadcrumbs scroll controls.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/03-organisms/menu/breadcrumbs/breadcrumbs-scroll-controls.test.mjs
 *
 * The hidden state of each control is written as a nested `[data-...] &` rule,
 * where the `&` is what attaches the ancestor attribute to the control. Drop
 * the `&` and Sass silently compiles a *descendant* selector instead
 * (`.breadcrumbs__control--left [data-scroll-indicator=none]`), which matches
 * nothing, so the control keeps rendering. Source review does not show that and
 * neither does the browser, because the control is already at `opacity: 0` —
 * the compiled selector is the only place it is visible.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { parse } from 'postcss';
import * as sass from 'sass';

const componentDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(componentDir, '../../../..');

const { css } = sass.compile(path.join(componentDir, '_yds-breadcrumbs.scss'), {
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

const CONTROL = '.breadcrumbs__control--';
const STATE = '[data-scroll-indicator';

/** Every compiled selector that hides a breadcrumbs scroll control. */
const hidingSelectors = [];

parse(css).walkDecls('visibility', (declaration) => {
  if (declaration.value !== 'hidden') {
    return;
  }

  declaration.parent.selectors
    .filter((selector) => selector.includes(CONTROL))
    .forEach((selector) => hidingSelectors.push(selector.replace(/\s+/g, ' ')));
});

test('every rule hiding a breadcrumbs scroll control keys off an ancestor state', () => {
  // Guard against the assertion below passing vacuously.
  ['left', 'right'].forEach((side) => {
    assert.ok(
      hidingSelectors.some((selector) => selector.endsWith(CONTROL + side)),
      `nothing hides ${CONTROL}${side}`,
    );
  });

  // `data-scroll-indicator` lives on an ancestor, so it must lead the selector.
  // Trailing it means a nested rule lost its `&` and now looks for the state on
  // a descendant of the control, which never matches.
  const misnested = hidingSelectors.filter(
    (selector) =>
      selector.includes(STATE) &&
      selector.indexOf(STATE) > selector.indexOf(CONTROL),
  );

  assert.deepEqual(
    misnested,
    [],
    'a nested selector is missing its "&", so it matches a descendant of the control instead of the control',
  );
});
