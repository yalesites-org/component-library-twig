/**
 * Pins the condensed listing's trailing-gap fix (#2106).
 *
 * Condensed `.card-collection__cards` is a query container
 * (`container-type: inline-size`), which contains its children's margins, so
 * the last card's bottom margin no longer collapses into the section spacing
 * and adds 16px before the next block. The last card must therefore drop its
 * own bottom margin.
 *
 * Run with: node --test components/03-organisms/card-collection/card-collection-condensed-spacing.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const scss = readFileSync(
  new URL('./_yds-card-collection.scss', import.meta.url),
  'utf8',
);

test('condensed listing zeroes the last card bottom margin', () => {
  const start = scss.indexOf("[data-collection-type='condensed'] & {");
  assert.notEqual(start, -1, 'condensed block exists');
  const block = scss.slice(
    start,
    scss.indexOf("[data-collection-type='single'] & {"),
  );
  assert.match(block, /container-type:\s*inline-size/);
  assert.match(block, />\s*:last-child\s*{[^}]*margin-block-end:\s*0/);
});
