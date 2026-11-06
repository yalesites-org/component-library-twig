/**
 * Guards keyboard focus when the "more events" modal is reopened.
 *
 * The day toggle carries `data-micromodal-trigger`, so MicroModal's own click
 * listener opens the modal and focuses its first link before the calendar's
 * handler rebuilds the list. The rebuild removes that link and focus drops to
 * the page. The handler therefore has to move focus after it repopulates.
 *
 * Run with: node --test components/03-organisms/calendar/calendar-modal-focus.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const script = readFileSync(path.join(dir, 'yds-calendar.js'), 'utf8');

test('the click handler focuses the modal after repopulating it', () => {
  const populate = script.indexOf("moreEventsContainer.innerHTML = '';");
  const show = script.indexOf("MicroModal.show('calendar-modal');");
  const focus = script.indexOf('focusModal();', show);

  assert.ok(populate > -1 && show > populate, 'populate must precede show');
  assert.ok(focus > show, 'focusModal() must run after MicroModal.show');
});

test('focusModal targets the first event link, falling back to the Close button', () => {
  const helper = script.match(/const focusModal = \(\) => \{[\s\S]*?\n {6}\};/);

  assert.ok(helper, 'focusModal helper not found');
  assert.match(helper[0], /modal__calendar-events a\[href\]/);
  assert.match(helper[0], /button\[data-micromodal-close\]/);
});

test('a month change returns focus to the pressed Next or Previous button', () => {
  const remember = script.indexOf('pendingNavFocus = button === prevBtn');
  const refresh = script.indexOf('refreshCalendarData(wrapper, button);');
  const restore = script.indexOf('restoreTarget?.focus();');

  assert.ok(remember > -1 && refresh > remember, 'remember the button first');
  assert.ok(restore > -1, 'attach must refocus the pressed button');
  assert.match(script, /pendingNavFocus === 'prev' \? prevBtn : nextBtn/);
});
