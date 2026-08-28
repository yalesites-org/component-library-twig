/**
 * Guards the module format of the JS this package ships to Drupal.
 *
 * Run after a build (see the `test:dist` npm script):
 *   node --test scripts/dist-module-format.test.mjs
 *
 * atomic loads every file under dist/js/ through atomic.libraries.yml. Drupal
 * adds `<script src>` without `type="module"` unless a library explicitly asks
 * for it, and a classic script containing a top-level `import` is a parse-time
 * SyntaxError -- the file never executes and its Drupal.behaviors entry is never
 * registered. That failure is close to silent: the component renders its markup
 * and simply does nothing.
 *
 * Rollup emits a module here whenever two build entries import the same
 * third-party package, because it hoists the shared copy into dist/assets/. So
 * this is not a one-off: adding an import that another component already uses can
 * turn a working behavior into an inert one with no source change to that
 * component.
 *
 * Every ES module below therefore needs a matching `attributes: { type: module }`
 * in atomic.libraries.yml. This test fails when that set changes, so the atomic
 * side gets updated deliberately instead of being discovered in production.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distJsDir = path.join(projectRoot, 'dist', 'js');

/**
 * Files under dist/js/ that are ES modules and are declared as such in
 * atomic.libraries.yml. Keep the reason with the entry.
 */
const KNOWN_ES_MODULES = [
  // Shares micromodal with the modal component, so Rollup hoists micromodal into
  // dist/assets/ and leaves both entries importing it. Loaded by atomic's
  // `calendar` library, which declares type: module for exactly this reason.
  'components/03-organisms/calendar/yds-calendar.js',
  // The other half of that shared micromodal chunk. atomic does not currently
  // load this file at all, so it breaks nothing today -- it is listed so the set
  // stays complete, and as the warning for whoever adds a modal library later:
  // it needs type: module too.
  'components/02-molecules/modal/yds-modal.js',
];

/** Top-level `import ... from` / `export` -- the forms that break a classic script. */
const ESM_SYNTAX = /(?:^|\n)\s*(?:import[\s{*"']|export[\s{*])/;

function distJsFiles() {
  return readdirSync(distJsDir, { recursive: true })
    .filter((entry) => entry.endsWith('.js'))
    .map((entry) => entry.split(path.sep).join('/'));
}

test('dist/js module format matches what atomic.libraries.yml declares', (t) => {
  if (!existsSync(distJsDir)) {
    t.skip(
      'dist/js is absent -- run `npm run build` first (test:dist runs post-build)',
    );
    return;
  }

  const actual = distJsFiles()
    .filter((file) =>
      ESM_SYNTAX.test(readFileSync(path.join(distJsDir, file), 'utf8')),
    )
    .sort();
  const expected = [...KNOWN_ES_MODULES].sort();

  const undeclared = actual.filter((file) => !expected.includes(file));
  const stale = expected.filter((file) => !actual.includes(file));

  assert.deepEqual(
    actual,
    expected,
    'The set of ES modules under dist/js/ changed.\n' +
      `Newly an ES module (Drupal will fail to parse these as classic scripts, so each\nneeds attributes: { type: module } in atomic.libraries.yml):\n  ${
        undeclared.join('\n  ') || '(none)'
      }\n` +
      `No longer an ES module (drop the type: module attribute in atomic and remove it\nfrom KNOWN_ES_MODULES here):\n  ${
        stale.join('\n  ') || '(none)'
      }`,
  );
});
