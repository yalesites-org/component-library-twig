/**
 * Pins the Event Calendar filter bar to the spec in
 * yalesites-org/YaleSites-Internal#2269: built from the Views filter pieces,
 * no Apply button, a row/stacked layout prop, 840px stacking, a story for
 * every state. Run with:
 *   node --test components/02-molecules/event-calendar/filter-bar/filter-bar.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8');
const twig = read('yds-filter-bar.twig');
const scss = read('_yds-filter-bar.scss');
const stories = read('filter-bar.stories.js');
const partial = fs.readFileSync(
  path.join(
    dir,
    '../../../01-atoms/forms/views-filter/_yds-views-filter-form.twig',
  ),
  'utf8',
);

test('reuses the Views filter form instead of copying it', () => {
  assert.match(
    twig,
    /@atoms\/forms\/views-filter\/_yds-views-filter-form\.twig/,
  );
});

test('has no Apply button and passes the spec placeholders', () => {
  assert.match(twig, /hide_actions: true/);
  assert.match(twig, /Search by title, speaker or keyword/);
  assert.match(twig, /Select options/);
  assert.match(partial, /\{% if not hide_actions %\}/);
});

test('layout prop is row or stacked, defaulting to row', () => {
  assert.match(twig, /filter_bar__layout == 'stacked' \? 'stacked' : 'row'/);
  assert.match(twig, /data-filter-bar-layout/);
});

test('hides a filter when show is false or it has no options', () => {
  assert.match(twig, /filter\.show is not same as\(false\)/);
  assert.match(twig, /filter\.options\|length > 0/);
});

test('stacks under 840px of block width with a container query', () => {
  assert.match(scss, /\$filter-bar-stack-width: 52\.5rem/);
  assert.match(
    scss,
    /@container filter-bar \(width < #\{\$filter-bar-stack-width\}\)/,
  );
});

test('uses tokens only: no hex values, no margin or width on the bar', () => {
  assert.doesNotMatch(scss, /#[0-9a-fA-F]{3,8}\b(?!\))/);
  assert.doesNotMatch(scss, /^\s*(margin|width)\s*:/m);
});

test('a story for every state and layout plus a Playground', () => {
  [
    'Playground',
    'Empty',
    'FiltersSet',
    'SearchActive',
    'LayoutRow',
    'LayoutStacked',
  ].forEach((name) => {
    assert.match(stories, new RegExp(`export const ${name} =`), name);
  });
});

test('Storybook path matches the Event Calendar tree', () => {
  assert.match(stories, /title: 'Molecules\/Event Calendar\/Filter bar'/);
});
