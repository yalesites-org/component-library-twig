/**
 * Guards the day-detail modal's event list against shipping empty.
 *
 * `yds-modal.twig` emits `<ul class="modal__calendar-events">` for the calendar
 * modal, and `yds-calendar.js` only fills it when a visitor clicks a day with
 * more than one event. So on every calendar page load the delivered DOM
 * contained an empty list container -- the same "Container element is empty"
 * finding as the per-event tags list, once per calendar.
 *
 * It cannot simply be dropped: `yds-calendar.js` resolves the element once, at
 * attach time, and would get `null` for every subsequent day click. So the list
 * stays in the markup, ships `hidden`, and the script clears that only once the
 * list actually holds cloned events.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/03-organisms/calendar/calendar-modal-empty-list.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const componentDir = path.dirname(fileURLToPath(import.meta.url));

const modalTemplate = readFileSync(
  path.join(componentDir, '../../02-molecules/modal/yds-modal.twig'),
  'utf8',
);
const calendarScript = readFileSync(
  path.join(componentDir, 'yds-calendar.js'),
  'utf8',
);

/** The opening `<ul ...>` the calendar modal ships, so a comment cannot match. */
const eventListTag = modalTemplate.match(
  /<ul[^>]*bem\(\s*'calendar-events'[^>]*>/,
);

test('the calendar modal ships its event list hidden', () => {
  assert.ok(
    eventListTag,
    "no <ul> built with bem('calendar-events', ...) found in yds-modal.twig",
  );
  assert.match(eventListTag[0], /\bhidden\b/);
});

test('the calendar script reveals the modal list only when it holds events', () => {
  const assignment = calendarScript.match(
    /moreEventsContainer\.hidden\s*=\s*([^;]+);/,
  );

  assert.ok(
    assignment,
    'yds-calendar.js never clears `hidden`, so a populated modal would stay invisible',
  );
  // Derived, not unconditional: the populate step clears `innerHTML` first, so a
  // day click that produced no events must leave the list hidden.
  assert.match(assignment[1], /children\.length/);
});
