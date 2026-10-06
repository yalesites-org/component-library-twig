/**
 * Pins how four Drupal behaviors treat their `context` argument.
 *
 * Drupal passes a behavior the document on page load but a fragment after an
 * AJAX swap, and Storybook passes the story's wrapper element. Neither contains
 * <body>, so `context.querySelector('body')` is null there: the behavior throws
 * (the mobile menu then never locks page scroll) and the calendar's Storybook
 * check misses the `.sb-show-main` class that lives on <body>.
 *
 * The calendar pins are the AJAX month-change regression: MicroModal 0.7 caches
 * one instance per modal id, bound to the element that existed when it was
 * created. A month change replaces the whole calendar including the modal, so
 * the click handler must drop that instance before `show`, or it opens a
 * detached element and the modal never appears again.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/behavior-context.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (relative) =>
  readFileSync(
    fileURLToPath(new URL(`../${relative}`, import.meta.url)),
    'utf8',
  );

const behaviors = {
  'yds-menu-toggle.js': read(
    '02-molecules/menu/menu-toggle/yds-menu-toggle.js',
  ),
  'page-title.js': read('02-molecules/page-title/page-title.js'),
  'yds-site-header.js': read('03-organisms/site-header/yds-site-header.js'),
  'yds-calendar.js': read('03-organisms/calendar/yds-calendar.js'),
};

Object.entries(behaviors).forEach(([name, source]) => {
  test(`${name} never looks for <body> or the Storybook class inside context`, () => {
    assert.doesNotMatch(source, /context\.querySelector\(\s*'body'\s*\)/);
    assert.doesNotMatch(source, /context\.querySelector\(\s*storybook\s*\)/);
  });
});

test('the calendar binds toggles inside its own calendar element, not the whole context', () => {
  const source = behaviors['yds-calendar.js'];
  assert.doesNotMatch(source, /context\.querySelectorAll\(\s*eventToggle\s*\)/);
  assert.match(
    source,
    /calendarElement\.querySelectorAll\(\s*eventToggle\s*\)/,
  );
});

test('the calendar drops the cached MicroModal instance once per attach, before init', () => {
  const source = behaviors['yds-calendar.js'];
  const remove = source.indexOf("MicroModal.removeModal('calendar-modal')");
  const init = source.indexOf('MicroModal.init()');
  const click = source.indexOf("addEventListener('click', (clickEvent)");

  assert.ok(remove > -1, 'removeModal is never called');
  assert.ok(init > remove, 'removeModal must run before init');
  assert.ok(click > init, 'removeModal must not run inside the click handler');
});
