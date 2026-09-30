/**
 * Guards the sr-only date label on Events Calendar day cells.
 *
 * `yds-calendar.twig` used to pass the viewed month's name to every cell, so
 * the leading (previous month) and trailing (next month) cells announced the
 * wrong month to screen readers, e.g. the Aug 30 cell in the September view
 * read "30 September, 2026". Each cell must name its own month.
 *
 * This renders the real calendar template with twig.js, using the same
 * extensions and namespaces as Storybook (`.storybook/setupTwig.js`).
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/03-organisms/calendar/calendar-cell-month-label.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const Twig = require('twig');
const { setupTwig, namespaces } = require('../../../.storybook/setupTwig');

const componentDir = path.dirname(fileURLToPath(import.meta.url));

setupTwig(Twig);
Twig.cache(false);

/** A cell as the Drupal backend supplies it. */
const cell = (day, month, year) => ({
  date: { day, month, year: String(year) },
  events: [],
});

/** Renders the calendar and returns the sr-only labels in document order. */
const renderLabels = (month) => {
  const html = Twig.twig({
    path: path.join(componentDir, 'yds-calendar.twig'),
    namespaces,
    async: false,
    rethrow: true,
  }).render({ month });

  return [...html.matchAll(/calendar__dialog-title[^>]*>([^<]*)</g)].map(
    (m) => m[1],
  );
};

test('adjacent-month cells name their own month, not the viewed month', () => {
  const labels = renderLabels([
    [cell(30, '08', 2026), cell(31, '08', 2026), cell(1, '09', 2026)],
    [cell(29, '09', 2026), cell(30, '09', 2026), cell(1, '10', 2026)],
  ]);

  assert.deepEqual(labels, [
    '30 August, 2026',
    '31 August, 2026',
    '1 September, 2026',
    '29 September, 2026',
    '30 September, 2026',
    '1 October, 2026',
  ]);
});

test('leading cells from the previous year keep their own month and year', () => {
  const labels = renderLabels([
    [cell(30, '12', 2026), cell(31, '12', 2026), cell(1, '01', 2027)],
    [cell(30, '01', 2027), cell(31, '01', 2027), cell(1, '02', 2027)],
  ]);

  assert.deepEqual(labels, [
    '30 December, 2026',
    '31 December, 2026',
    '1 January, 2027',
    '30 January, 2027',
    '31 January, 2027',
    '1 February, 2027',
  ]);
});
