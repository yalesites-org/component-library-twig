/**
 * Pins the tab order the Tabs component renders, as Drupal renders it (#2293).
 *
 * Run with the Node test runner:
 *   node --test components/02-molecules/tabs/tabs-tab-order.test.mjs
 *
 * The pattern: only the selected tab is a Tab stop, so Tab moves from it into
 * its panel; the arrow keys (yds-tabs.js) move between tabs. Both attributes
 * that make that happen were lost in Drupal while Storybook looked right:
 *
 * - The inactive tabs' `tabindex="-1"` was built as a Twig string and printed.
 *   Drupal autoescapes printed strings, so it reached the page as
 *   `tabindex=&quot;-1&quot;`, a value browsers ignore, and every tab stayed a
 *   Tab stop. Storybook's Twig.js does not autoescape, so it never showed.
 * - The panel's `tabindex: '0'` went through add_attributes(). Drupal's
 *   AttributeArray drops falsy values before printing, and the string '0' is
 *   falsy in PHP, so the panel had no tabindex at all. The Down arrow handler
 *   in yds-tabs.js focuses that panel, which did nothing.
 *
 * The render tests switch Twig.js autoescaping on, as Drupal has it, which is
 * what exposed the first bug. Twig.js has no equivalent of the second, so that
 * one is asserted against the template source.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import Twig from 'twig';
import { readFileSync } from 'node:fs';
import { setupTwig, namespaces } from '../../_storybook/setup-twig.mjs';

setupTwig(Twig);

// Drupal registers bem() and add_attributes() as HTML-safe, so autoescaping
// leaves their output alone. Twig.js would escape it, so mark what they return
// as safe the same way. Anything else a template prints is still escaped.
Twig.extend(({ functions }) => {
  const registry = functions;
  ['add_attributes', 'bem'].forEach((name) => {
    const helper = registry[name];
    registry[name] = function drupalSafe(...args) {
      const attributes = helper.apply(this, args);
      attributes.twigMarkup = true;
      return attributes;
    };
  });
});

const tabs = Twig.twig({
  data: '{% include "@molecules/tabs/yds-tabs.twig" %}',
  namespaces,
  async: false,
  autoescape: true,
});

const html = tabs.render({
  tabs__id: 'test',
  tabs: [
    { tab__label: 'One', tab__content: 'First panel' },
    { tab__label: 'Two', tab__content: 'Second panel' },
    { tab__label: 'Three', tab__content: 'Third panel' },
  ],
});

/** Every opening tag with the given role, in document order. */
const tagsWithRole = (role) =>
  html.match(new RegExp(`<[a-z]+\\b[^>]*role="${role}"[^>]*>`, 'g')) ?? [];

test('renders one tab and one panel per item', () => {
  assert.equal(tagsWithRole('tab').length, 3);
  assert.equal(tagsWithRole('tabpanel').length, 3);
});

test('no attribute reaches the page with escaped quotes', () => {
  assert.doesNotMatch(html, /=&quot;/);
});

test('the selected tab is the only tab in the Tab order', () => {
  const [first, ...rest] = tagsWithRole('tab');
  assert.match(first, /\saria-selected="true"/);
  assert.doesNotMatch(first, /tabindex/);
  rest.forEach((tag) => {
    assert.match(tag, /\stabindex="-1"/);
    assert.doesNotMatch(tag, /aria-selected/);
  });
});

test('every panel can take focus', () => {
  // Hidden panels are `visibility: hidden`, which keeps them out of the Tab
  // order without removing the attribute, so all three carry it.
  tagsWithRole('tabpanel').forEach((tag) => {
    assert.match(tag, /\stabindex="0"/);
  });
});

test("tabindex is never passed to add_attributes(), where Drupal drops '0'", () => {
  ['./_yds-tab-label.twig', './_yds-tab-content.twig'].forEach((file) => {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');
    assert.doesNotMatch(
      source,
      /'tabindex'\s*:/,
      `${file} should write tabindex as a literal attribute`,
    );
  });
});
