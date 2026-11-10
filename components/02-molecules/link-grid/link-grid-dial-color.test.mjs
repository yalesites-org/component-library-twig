import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// YaleSites-Internal#2099: a reset of `--color-link-grid-action` under
// `[data-section-theme='default']` sat on `.link-grid__inner` and beat the
// dial's own value from `.link-grid`, so dials two to six drew navy.
const scss = readFileSync(
  new URL('./_yds-link-grid.scss', import.meta.url),
  'utf8',
);
const code = scss.replace(/\/\/.*$/gm, '');

test('no section-theme rule resets the link grid action colour', () => {
  assert.doesNotMatch(
    code,
    /\[data-section-theme=[^\]]*\][^{]*\{[^}]*--color-link-grid-action/,
  );
});

test('every dial sets its own action colour', () => {
  ['one', 'two', 'three', 'four', 'five', 'six'].forEach((dial) => {
    assert.match(
      code,
      new RegExp(
        `\\[data-component-theme='${dial}'\\]\\s*\\{\\s*--color-link-grid-action:`,
      ),
    );
  });
});
