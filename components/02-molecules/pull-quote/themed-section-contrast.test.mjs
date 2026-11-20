/**
 * YaleSites-Internal#2120: pull-quote attribution in Sections Two and Three,
 * and the Section One / dial-one callout edge. Ratios were measured in a
 * browser across 7 global themes; this test pins the rules that produce them.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const pullQuote = read('./_yds-pull-quote.scss');
const callout = read('../callout/_yds-callout.scss');

test('pull-quote attribution follows the section foreground in sections two and three only', () => {
  const selector =
    ".yds-layout:is([data-section-theme='two'], [data-section-theme='three']) & {";
  const start = pullQuote.indexOf(selector);
  assert.notEqual(start, -1, 'missing sections two/three attribution rule');
  assert.match(
    pullQuote.slice(start, start + 200),
    /--color-pull-quote-attribution: var\(--color-section-foreground\)/,
  );
});

test('dial-one callout gets an inset edge in section one', () => {
  const selector = ".yds-layout[data-section-theme='one'] & {";
  const start = callout.indexOf(selector);
  assert.notEqual(start, -1, 'missing section one callout edge rule');
  const rule = callout.slice(start, start + 300);
  assert.match(
    rule,
    /outline: var\(--border-thickness-2\) solid var\(--color-text\)/,
  );
  assert.match(
    rule,
    /outline-offset: calc\(-1 \* var\(--border-thickness-2\)\)/,
  );
});
