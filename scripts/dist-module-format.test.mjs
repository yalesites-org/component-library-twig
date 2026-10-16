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
import vm from 'node:vm';
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

/**
 * Whether a file would fail to load as a classic `<script>`.
 *
 * Compiling with `vm.Script` asks exactly the question Drupal's script tag asks,
 * rather than pattern-matching for it. A regex over minified output gets this
 * wrong in the dangerous direction: Rollup puts `export{...}` at the END of the
 * code line, so an anchored pattern misses `a=1;export{b};` entirely and the guard
 * would report the set unchanged while a Drupal behaviour goes inert.
 *
 * @param {string} code - File contents.
 * @returns {boolean} True when the file is an ES module.
 */
function isEsModule(code) {
  try {
    new vm.Script(code);
    return false;
  } catch (error) {
    return /import statement outside a module|Unexpected token .export|may appear only with|import\.meta/.test(
      error.message,
    );
  }
}

test('dist/js module format matches what atomic.libraries.yml declares', () => {
  assert.ok(
    existsSync(distJsDir),
    `${distJsDir} is missing -- run \`npm run build\` first. test:dist runs after the build.`,
  );

  const actual = readdirSync(distJsDir, { recursive: true })
    .filter((entry) => entry.endsWith('.js'))
    .filter((entry) =>
      isEsModule(readFileSync(path.join(distJsDir, entry), 'utf8')),
    )
    .sort();

  assert.deepEqual(
    actual,
    [...KNOWN_ES_MODULES].sort(),
    'The set of ES modules under dist/js/ changed. Drupal loads these as classic ' +
      'scripts unless told otherwise, and a classic script containing `import` never ' +
      'executes. Each addition needs `attributes: { type: module }` in ' +
      'atomic.libraries.yml; each removal should lose it there and here.',
  );
});
