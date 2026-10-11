/**
 * Pins the Office Hours status line wording and time formatting.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/02-molecules/office-hours/office-hours-status.test.mjs
 *
 * Drives the real behavior file in a `node:vm` sandbox and calls its pure
 * helpers, so the wording the design spec fixes (YaleSites-Internal#1704) and
 * the site-time-zone conversion are checked without a DOM.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const componentDir = path.dirname(fileURLToPath(import.meta.url));
const sandbox = { Drupal: { behaviors: {} }, Intl };
vm.runInNewContext(
  fs.readFileSync(path.join(componentDir, 'yds-office-hours.js'), 'utf8'),
  sandbox,
);
const oh = sandbox.Drupal.behaviors.officeHours;

const week = (rows) =>
  Object.fromEntries(
    Object.entries(rows).map(([weekday, [hours, exception = null]]) => [
      weekday,
      {
        slots: oh.parseHours(hours),
        allDay: hours === 'all-day',
        exception,
      },
    ]),
  );

// Sun blank, Mon closed, Tue 10-5, Wed two slots, Sat all day.
const days = week({
  1: [''],
  2: ['1000-1700'],
  3: ['1000-1300,1400-2000'],
  6: ['all-day'],
});

test('formats times without :00 and with lowercase a.m./p.m.', () => {
  assert.equal(oh.formatTime(1000), '10 a.m.');
  assert.equal(oh.formatTime(1730), '5:30 p.m.');
  assert.equal(oh.formatTime(1200), '12 p.m.');
  assert.equal(oh.formatTime(5), '12:05 a.m.');
});

test('open inside hours says when it closes', () => {
  assert.deepEqual(
    { ...oh.computeStatus(days, { weekday: 2, time: 1100 }) },
    { open: true, detail: 'Closes at 5 p.m.' },
  );
});

test('before opening and between slots say when it opens today', () => {
  assert.equal(
    oh.computeStatus(days, { weekday: 2, time: 900 }).detail,
    'Opens at 10 a.m.',
  );
  assert.equal(
    oh.computeStatus(days, { weekday: 3, time: 1330 }).detail,
    'Opens at 2 p.m.',
  );
});

test('after closing says tomorrow', () => {
  assert.deepEqual(
    { ...oh.computeStatus(days, { weekday: 2, time: 1800 }) },
    { open: false, detail: 'Opens tomorrow at 10 a.m.' },
  );
});

test('a closed or blank day says closed today and names the next day', () => {
  assert.equal(
    oh.computeStatus(days, { weekday: 1, time: 1100 }).detail,
    'Closed today · Opens Tuesday at 10 a.m.',
  );
  assert.equal(
    oh.computeStatus(days, { weekday: 4, time: 1100 }).detail,
    'Closed today · Open all day on Saturday',
  );
});

test('a closing exception is named', () => {
  const withException = { ...days, ...week({ 2: ['', 'Homecoming'] }) };
  assert.equal(
    oh.computeStatus(withException, { weekday: 2, time: 1100 }).detail,
    'Closed today for Homecoming · Opens Wednesday at 10 a.m.',
  );
});

test('all day is open all day', () => {
  assert.deepEqual(
    { ...oh.computeStatus(days, { weekday: 6, time: 300 }) },
    { open: true, detail: 'Open all day' },
  );
});

test('no hours at all gives no status', () => {
  assert.equal(
    oh.computeStatus(week({ 1: [''] }), { weekday: 1, time: 0 }),
    null,
  );
});

test('reads the clock in the site time zone, not the visitor one', () => {
  // 2026-10-13 02:30 UTC is Monday 10:30 p.m. in New York.
  const moment = new Date(Date.UTC(2026, 9, 13, 2, 30));
  assert.deepEqual(
    { ...oh.localNow(moment, 'America/New_York'), date: undefined },
    { date: undefined, weekday: 1, time: 2230 },
  );
  assert.deepEqual(
    { ...oh.localNow(moment, 'UTC'), date: undefined },
    { date: undefined, weekday: 2, time: 230 },
  );
});

test('a slot past midnight stays open into the next day', () => {
  // Friday 8 p.m.-2 a.m., Saturday 10-5 (contrib stores the end as 200).
  const late = week({ 5: ['2000-200'], 6: ['1000-1700'] });
  assert.deepEqual(
    { ...oh.computeStatus(late, { weekday: 5, time: 2100 }) },
    { open: true, detail: 'Closes at 2 a.m.' },
  );
  assert.deepEqual(
    { ...oh.computeStatus(late, { weekday: 6, time: 100 }) },
    { open: true, detail: 'Closes at 2 a.m.' },
  );
  assert.deepEqual(
    { ...oh.computeStatus(late, { weekday: 6, time: 300 }) },
    { open: false, detail: 'Opens at 10 a.m.' },
  );
});

test('an end of midnight is 2400, not an overnight slot', () => {
  assert.deepEqual(
    [...oh.parseHours('1800-0')].map((s) => [...s]),
    [[1800, 2400]],
  );
});

test('this week swaps in its exceptions and the next three are upcoming', () => {
  // Today is Friday 2026-10-09. Rows: regular Sunday and Thursday, exceptions
  // on Sunday 10-11 (this week) and Thursday 11-26 (later), four upcoming.
  const rows = [
    { weekday: 0, date: null, upcoming: false },
    { weekday: 0, date: '2026-10-11', upcoming: false },
    { weekday: 4, date: null, upcoming: false },
    { weekday: 4, date: '2026-11-26', upcoming: false },
    { weekday: 0, date: '2026-10-11', upcoming: true },
    { weekday: 0, date: '2026-10-21', upcoming: true },
    { weekday: 0, date: '2026-10-29', upcoming: true },
    { weekday: 0, date: '2026-11-08', upcoming: true },
    { weekday: 0, date: '2026-11-26', upcoming: true },
  ];
  assert.deepEqual(
    [...oh.visibleRows(rows, '2026-10-09')],
    [false, true, true, false, false, true, true, true, false],
  );
  // A cached page read on Thanksgiving week: Sunday's exception is past, so
  // the regular Sunday row is back, and Thursday is replaced instead.
  assert.deepEqual(
    [...oh.visibleRows(rows, '2026-11-23')],
    [true, false, false, true, false, false, false, false, false],
  );
});

test('the local date comes from the site time zone', () => {
  const moment = new Date(Date.UTC(2026, 9, 13, 2, 30));
  assert.equal(oh.localNow(moment, 'America/New_York').date, '2026-10-12');
  assert.equal(oh.addDays('2026-12-31', 1), '2027-01-01');
});
