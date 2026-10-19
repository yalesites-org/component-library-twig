/**
 * Guards the calendar day cell's "more events" toggle wording.
 *
 * A day cell shows its first event and hides the rest behind a toggle. With
 * exactly one hidden event the toggle read "1 more events". It must read
 * "1 more event" for one and "N more events" for two or more.
 *
 * Renders the real template through the same Twig.js setup Storybook uses.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/03-organisms/calendar/calendar-more-events-plural.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Twig from 'twig';
import { setupTwig, namespaces } from '../../_storybook/setup-twig.mjs';

// The event card's getUrlType() reads the page hostname; Node has no document.
globalThis.document = { location: { hostname: 'localhost' } };
setupTwig(Twig);

const template = Twig.twig({
  path: path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '_yds-calendar-cell.twig',
  ),
  namespaces,
  async: false,
  rethrow: true,
});

const event = { title: 'Event', url: '/event', time: '9:00am' };

/** Text of the toggle button for a day holding `count` events. */
const toggleText = (count) => {
  const html = template.render({
    year: '2024',
    month: '06',
    day: 25,
    events: Array(count).fill(event),
  });
  const match = html.match(/<button[^>]*calendar-event__toggle[^>]*>([^<]*)</);
  return match ? match[1].trim() : null;
};

test('one hidden event reads singular', () => {
  assert.equal(toggleText(2), '1 more event');
});

test('two or more hidden events read plural', () => {
  assert.equal(toggleText(3), '2 more events');
  assert.equal(toggleText(5), '4 more events');
});

test('a single event shows no toggle', () => {
  assert.equal(toggleText(1), null);
});
