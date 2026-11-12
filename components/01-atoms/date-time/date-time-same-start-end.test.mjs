/**
 * Guards the date on an event whose start and end are the same moment.
 *
 * The same-day formats print the date once, at the start of a range, and the
 * time alone after the dash ("Sat Jan 23, 2027 7:00 pm—8:00 pm"). An event
 * with no end time stores its end as its start, and `yds-date-time.twig` used
 * to format that single moment with the end's time-only half, so the event
 * page, cards and list items showed "7:00 pm" with no date at all.
 *
 * This renders the real template with twig.js, using the same extensions and
 * namespaces as Storybook (`components/_storybook/setup-twig.mjs`).
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/01-atoms/date-time/date-time-same-start-end.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Twig from 'twig';
import { setupTwig, namespaces } from '../../_storybook/setup-twig.mjs';

// Drupal passes UNIX timestamps and twig.js formats them in the process's
// timezone, so pin the one YaleSites sites use.
process.env.TZ = 'America/New_York';

const componentDir = path.dirname(fileURLToPath(import.meta.url));

setupTwig(Twig);
Twig.cache(false);

// Sat Jan 23, 2027 at 7:00 pm and 8:00 pm, Eastern.
const sevenPm = 1800748800;
const eightPm = sevenPm + 3600;

/** Renders the date-time atom and returns the text inside its <time>. */
const renderText = (format, start, end) => {
  const html = Twig.twig({
    path: path.join(componentDir, 'yds-date-time.twig'),
    namespaces,
    async: false,
    rethrow: true,
  }).render({
    date_time__start: start,
    date_time__end: end,
    date_time__format: format,
  });

  return html.match(/<time[^>]*>([^<]*)<\/time>/)[1];
};

test('an event page date with the same start and end keeps its date', () => {
  assert.equal(
    renderText('localist_same_day', sevenPm, sevenPm),
    'Sat Jan 23, 2027 7:00 pm',
  );
});

test('a card or list item date with the same start and end keeps its date', () => {
  assert.equal(
    renderText('same_day_diff_time', sevenPm, sevenPm),
    'January 23, 2027 7:00 pm',
  );
});

test('a same-day range still prints the date once, before the start time', () => {
  assert.equal(
    renderText('localist_same_day', sevenPm, eightPm),
    'Sat Jan 23, 2027 7:00 pm—8:00 pm',
  );
  assert.equal(
    renderText('same_day_diff_time', sevenPm, eightPm),
    'January 23, 2027 7:00 pm—8:00 pm',
  );
});

test('formats that never show a date are unchanged', () => {
  assert.equal(renderText('time', sevenPm, sevenPm), '7:00 pm');
  assert.equal(renderText('day__full', sevenPm, sevenPm), 'Sat Jan 23, 2027');
});
