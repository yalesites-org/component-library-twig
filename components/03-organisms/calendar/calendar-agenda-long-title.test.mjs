/**
 * Guards the agenda day against long event titles (#2132).
 *
 * Below the month-view breakpoint each day is a flex row: the date badge, then
 * the list of events. A flex item will not shrink below its longest word, so a
 * title with one very long word stretched the list (and every title in it) to
 * ~1,800px and the page clipped the other events. The list needs both
 * `min-width: 0` (so it can shrink) and `overflow-wrap: anywhere` (so the word
 * breaks instead of spilling out).
 *
 * Run with the Node test runner:
 *   node --test components/03-organisms/calendar/calendar-agenda-long-title.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scss = fs.readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), '_yds-calendar.scss'),
  'utf8',
);

// Returns the body of the `{ ... }` block that opens at or after `from`.
const blockAt = (source, from) => {
  const open = source.indexOf('{', from);
  let depth = 0;
  for (let i = open; i < source.length; i += 1) {
    if (source[i] === '{') depth += 1;
    if (source[i] === '}') depth -= 1;
    if (depth === 0) return source.slice(open + 1, i);
  }
  throw new Error('unbalanced braces');
};

// The phone/tablet agenda: `.calendar__day--events` inside the max-width query.
const mobile = blockAt(
  scss,
  scss.indexOf('@media (max-width: tokens.$break-xl) {\n  .calendar__day {'),
);
const agendaDay = blockAt(mobile, mobile.indexOf('.calendar__day--events {'));
const eventList = blockAt(
  agendaDay,
  agendaDay.indexOf('.calendar__day-events {'),
);

test('agenda event list can shrink below its longest word', () => {
  assert.match(eventList, /min-width:\s*0;/);
});

test('agenda event list breaks words too long for the day', () => {
  assert.match(eventList, /overflow-wrap:\s*anywhere;/);
});
