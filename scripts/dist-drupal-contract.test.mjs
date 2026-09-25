/**
 * Guards the dist/ files Drupal reads that no import produces.
 *
 * Run after a build (see the `test:dist` npm script):
 *   node --test scripts/dist-drupal-contract.test.mjs
 *
 * Vite emits only what a declared component tier imports. Everything below is
 * reached by URL from a template, by path from PHP, or by an
 * atomic.libraries.yml entry -- so nothing in the build graph fails when one goes
 * missing. The webpack build kept them present via CopyWebpackPlugin entries;
 * those left with webpack/plugins.js, and their replacements live in
 * the copyStaticDistFiles() plugin in config/emulsify-core/vite/plugins.mjs
 * and the Vite entry list.
 *
 * Each miss here is a silent runtime failure rather than a build error, which is
 * exactly why it is worth a test:
 *   - tokens.json      -> ColorTokenResolver logs a warning and returns [], and the
 *                         Site Global Theme colours empty out site-wide.
. *   - assets/icons.svg -> every <use xlink:href> misses; icons render as blank space.
 * *   - the css/js entries -> the matching atomic library loads a 404.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(projectRoot, 'dist');

/** dist-relative path -> who breaks when it is absent. */
const REQUIRED = {
  'tokens.json': 'ys_themes ColorTokenResolver (Site Global Theme colours)',
  'assets/icons.svg': '_yds-icon.twig and the addtoany share-icon config',
  'css/style.css': "atomic's global CSS library",
  'css/link-treatment.css': "atomic's link-treatment library",
  'js/link-treatment.js': "atomic's link-treatment library",
  'fonts/fontawesome/css/fontawesome.css': "atomic's fontawesome library",
};

test('dist/ contains every file Drupal reads', () => {
  // Not a skip: test:dist only ever runs after a build, and skipping here would
  // report green while checking nothing.
  assert.ok(
    existsSync(distDir),
    `${distDir} is missing -- run \`npm run build\` first.`,
  );

  const missing = Object.entries(REQUIRED)
    .filter(([relativePath]) => !existsSync(path.join(distDir, relativePath)))
    .map(
      ([relativePath, consumer]) =>
        `  dist/${relativePath} -- needed by ${consumer}`,
    );

  assert.deepEqual(
    missing,
    [],
    `Missing from the build output:\n${missing.join('\n')}`,
  );
});
