/**
 * Guards the Chosen filter widget against shipping invalid or empty lists
 * (SiteImprove "Container element is empty", axe `list`).
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/01-atoms/forms/select/yds-select-empty-list.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const componentDir = path.dirname(fileURLToPath(import.meta.url));
const read = (file) => fs.readFileSync(path.join(componentDir, file), 'utf8');

// The old "(X) items selected" message li is gone: 1318-views-rework replaced
// it with the "+N more" badge (#1366), which is the only thing the behavior
// inserts into ul.chosen-choices. It must stay an li, since a ul may only hold
// li children.
test('the "+N more" badge goes into ul.chosen-choices as an li', () => {
  const source = read('yds-select.js');
  assert.match(source, /const \$badge = \$\('<li>',/);
  assert.doesNotMatch(source, /\.prepend\(`<span/);
});

test('empty Chosen containers are not rendered', () => {
  // Chosen fills ul.chosen-results only on first open.
  assert.match(
    read('../_yds-form.scss'),
    /\.chosen-results:empty \{\s*display: none;/,
  );
});
