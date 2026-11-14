/**
 * Guards the dark-section calendar colors (#2194).
 *
 * The dark-section block recolors calendar text to the section foreground.
 * Two places must stay out of it or text vanishes:
 *  - events cloned into the "More events" popup, which paints white and
 *    publishes no section surface;
 *  - the phone-width event time, which sets its own gray directly and so needs
 *    its own entry in the block to follow the section foreground.
 *
 * Run with the Node test runner:
 *   node --test components/03-organisms/calendar/calendar-dark-section.test.mjs
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

// The selector list of the rule that sets color to the section foreground.
const start = scss.indexOf('[data-section-theme]:not(');
const open = scss.indexOf('.calendar {', start);
const block = scss.slice(
  open,
  scss.indexOf('color: var(--color-section-foreground);', open),
);

test('dark-section event rules skip the More events popup', () => {
  const eventSelectors = block
    .split(',')
    .map((s) => s.trim())
    .filter((s) => /calendar-event(__category|__type)?(\s|$|:)/.test(s));
  assert.ok(eventSelectors.length >= 3, 'expected event selectors');
  eventSelectors.forEach((selector) => {
    assert.match(
      selector,
      /:not\(\s*\.calendar-event--modal(\s+\.[\w-]+)?\s*\)/,
      `selector leaks into the popup: ${selector}`,
    );
  });
});

test('dark-section block recolors the event time', () => {
  assert.match(block, /calendar-event[^,]*\btime\b/);
});
