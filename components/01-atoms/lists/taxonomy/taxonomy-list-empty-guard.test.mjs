/**
 * Guards the emptiness check on the two taxonomy list atoms.
 *
 * Both templates used to emit their `<ul>` unconditionally, outside the
 * `{% for %}`, so a consumer that passed no items still rendered
 * `<ul class="taxonomy-list taxonomy-list--tags"></ul>` -- a list container
 * holding no list items, which SiteImprove reports as "Container element is
 * empty". On yalesites.yale.edu the Events Calendar alone accounted for roughly
 * 60 of the 71 such flags, because most events carry no tags and
 * `_yds-calendar-cell-event.twig` embeds the tags atom for every event in every
 * cell.
 *
 * Nothing on screen catches a regression here. Every fixture in the library
 * supplies a non-empty list -- `calendar.yml` gives all eight of its events a
 * `type`, and the visreg "no events" variation empties `events` wholesale
 * rather than `type` -- so the empty branch is never rendered in Storybook or
 * captured by visual regression. Source is the only place it is visible.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/01-atoms/lists/taxonomy/taxonomy-list-empty-guard.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const componentDir = path.dirname(fileURLToPath(import.meta.url));

/** Twig source with `{# comments #}` dropped, so no assertion matches prose. */
const readTemplate = (file) =>
  readFileSync(path.join(componentDir, file), 'utf8').replace(
    /\{#[\s\S]*?#\}/g,
    '',
  );

/** The atoms that render a taxonomy `<ul>` from an `items` sequence. */
const templates = ['yds-tags-list.twig', 'yds-categories-list.twig'].map(
  (file) => ({ file, source: readTemplate(file) }),
);

templates.forEach(({ file, source }) => {
  test(`${file} renders its <ul> only when it has items`, () => {
    // Emptiness, not truthiness: `{% if items %}` is true for an empty array in
    // Twig, so it would still render the empty container this guards against.
    assert.match(
      source,
      /\{%-?\s*if\s+items\s+is\s+not\s+empty\s*-?%\}\s*<ul\b/,
      `${file} must open its <ul> immediately inside {% if items is not empty %}`,
    );
    assert.match(
      source,
      /<\/ul>\s*\{%-?\s*endif\s*-?%\}/,
      `${file} must close that guard immediately after </ul>, so it wraps the whole list`,
    );
  });
});
