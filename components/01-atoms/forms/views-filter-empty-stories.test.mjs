/**
 * Pins that the visreg stories cover a Views filter with no options (the gray
 * disabled box), and that the static Chosen twig can render one.
 * yalesites-org/YaleSites-Internal#1832. Run with:
 *   node --test components/01-atoms/forms/views-filter-empty-stories.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8');
const twig = read('views-filter/_yds-views-filter-form.twig');
const stories = read('forms.visreg.stories.js');

// Source of one exported story, up to the next top-level export or EOF.
const story = (name) => {
  const start = stories.indexOf(`export const ${name} =`);
  assert.notEqual(start, -1, `${name} story exists`);
  const next = stories.indexOf('\nexport const ', start + 1);
  return stories.slice(start, next === -1 ? undefined : next);
};

test('twig renders a disabled Chosen box like a site does', () => {
  assert.match(twig, /chosen-disabled/);
  assert.match(twig, /No options available\./);
  assert.match(twig, /<select[^>]*\{% if field\.disabled %\} disabled/);
});

test('emptyFilter story helper marks the field disabled', () => {
  assert.match(stories, /emptyFilter = [\s\S]*?disabled: true/);
});

test('twig documents the disabled field prop', () => {
  assert.match(twig, /disabled: /);
});

test('a Views filters story shows an empty filter next to filled ones', () => {
  const s = story('ViewsFiltersEmpty');
  assert.match(s, /emptyFilter\(/);
  assert.match(s, /category\(/);
});

test('one story has a narrow empty box for the "..." cut-off', () => {
  const s = story('ViewsFiltersEmptyNarrow');
  assert.match(s, /emptyFilter\(/);
  assert.match(s, /max-width|width:/);
});

test('the Events calendar story and the phone story include an empty filter', () => {
  assert.match(story('ViewsFiltersEventsCalendar'), /emptyFilter\(/);
  assert.match(story('ViewsFiltersPhoneWidth'), /emptyFilter\(/);
});
