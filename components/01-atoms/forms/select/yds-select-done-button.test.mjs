/**
 * Guards the "Done" button in the open Chosen filter panel, which closes the
 * list without clicking elsewhere on the page. (#2313)
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/01-atoms/forms/select/yds-select-done-button.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const componentDir = path.dirname(fileURLToPath(import.meta.url));
const read = (file) => fs.readFileSync(path.join(componentDir, file), 'utf8');

test('the panel footer holds a real Done button', () => {
  const source = read('yds-select.js');
  assert.match(source, /class: 'ys-select-done'/);
  assert.match(source, /Drupal\.t\('Done'\)/);
  // A <button type="button"> so Enter and Space work and it never submits.
  assert.match(
    source,
    /\$\('<button>', \{\s*type: 'button',\s*class: 'ys-select-done'/,
  );
});

test('Done closes the list and returns focus to the filter', () => {
  const source = read('yds-select.js');
  assert.match(
    source,
    /\.on\('click', \(\) => \{\s*chosen\.results_hide\(\);\s*chosen\.search_field\.trigger\('focus'\);/,
  );
});

test('the Done button is hidden with the closed panel', () => {
  // The footer is already visibility: hidden while closed, which keeps the
  // button out of the tab order; Done must live inside that footer.
  const source = read('yds-select.js');
  assert.match(
    source,
    /\$\('<div>', \{ class: 'ys-select-footer' \}\)\.append\([\s\S]*?\$done/,
  );
  assert.match(
    read('../_yds-form.scss'),
    /\.chosen-container:not\(\.chosen-with-drop\) & \{\s*visibility: hidden;/,
  );
});

test('Done is styled and has a visible focus ring', () => {
  const scss = read('../_yds-form.scss');
  assert.match(scss, /\.ys-select-done \{/);
  assert.match(scss, /\.ys-select-done[\s\S]*?&:focus-visible/);
});

test('Done is a plain link and Clear all sits by the count, not by Done', () => {
  const source = read('./yds-select.js');
  assert.match(
    source,
    /ys-select-actions[\s\S]*?ys-select-count[\s\S]*?\$clear,\s*\),\s*\$done,/,
  );
  const scss = read('../_yds-form.scss');
  const rule = scss.match(/\.ys-select-done \{[\s\S]*?\n {2}\}/)[0];
  assert.match(rule, /background: none;/);
  assert.doesNotMatch(rule, /border-radius/);
});
