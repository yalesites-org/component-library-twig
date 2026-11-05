/**
 * Table links in dark themed sections (YaleSites-Internal#2113).
 *
 * Section themes one, three and four give links a light colour. Table cells
 * paint a light background, so without a re-point the links render white on
 * white. These read `_table.scss` and check the re-point is still emitted for
 * exactly those three themes and covers every link variable.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const scss = readFileSync(new URL('./_table.scss', import.meta.url), 'utf8');

test('themes one, three and four re-point table link colours', () => {
  assert.match(scss, /@each \$section-theme in \('one', 'three', 'four'\)/);
});

test('every link colour variable is re-pointed at the cell text colour', () => {
  [
    '--color-link-base',
    '--color-link-hover',
    '--color-link-visited-base',
    '--color-link-visited-hover',
  ].forEach((v) => {
    assert.match(scss, new RegExp(`${v}: currentcolor;`), v);
  });
});
