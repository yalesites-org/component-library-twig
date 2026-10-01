/**
 * The legacy Two Column separator matches the section layout separators
 * (YaleSites-Internal#1830). Reads the SCSS source, like yds-layout.test.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const scss = () =>
  readFileSync(new URL('./_yds-two-column.scss', import.meta.url), 'utf8');
const shared = () =>
  readFileSync(new URL('../_layout-divider.scss', import.meta.url), 'utf8');

test('both two-column separators use the shared layout divider border', () => {
  const source = scss();

  assert.match(source, /border-top: \$layout-divider-border;/);
  assert.match(source, /border-left: \$layout-divider-border;/);
  assert.doesNotMatch(source, /--color-divider|--thickness-divider/);
});

test('the shared divider border is thickness-2 in the section foreground', () => {
  assert.match(
    shared(),
    /^\$layout-divider-border: var\(--border-thickness-2\) solid\s+var\(--color-section-foreground, var\(--color-layout-border\)\);$/m,
  );
});

test('.yds-two-column defines --color-layout-border', () => {
  // It is not inside `.yds-layout`, so nothing else sets it, and an undefined
  // var() would make the whole border declaration invalid.
  assert.match(
    scss(),
    /\.yds-two-column \{[^]*?--color-layout-border: var\(--color-slot-one\)/,
  );
});
