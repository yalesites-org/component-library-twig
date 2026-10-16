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
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const componentDir = path.dirname(fileURLToPath(import.meta.url));
const read = (file) => fs.readFileSync(path.join(componentDir, file), 'utf8');

test('the selected-count message goes into ul.chosen-choices as an li', () => {
  const handlers = {};
  const prepended = [];
  // Just enough jQuery for the behavior's chains to resolve.
  const chain = {
    find: () => chain,
    next: () => chain,
    each: (fn) => fn(0, 'form'),
    on: (name, fn) => {
      handlers[name] = fn;
    },
    prepend: (html) => prepended.push(html),
  };
  const sandbox = {
    jQuery: () => chain,
    once: () => [],
    Drupal: { behaviors: {} },
  };
  vm.runInNewContext(read('yds-select.js'), sandbox);
  sandbox.Drupal.behaviors.chosenSelect.attach({});

  handlers['chosen:ready']({ target: 'select' });
  assert.deepEqual(prepended, ['<li class="ys-select-message"></li>']);
});

test('empty Chosen containers are not rendered', () => {
  // Chosen fills ul.chosen-results only on first open; the message li is blank
  // until something is selected.
  assert.match(
    read('../_yds-form.scss'),
    /\.chosen-results:empty,\s*\.ys-select-message:empty \{\s*display: none;/,
  );
});
