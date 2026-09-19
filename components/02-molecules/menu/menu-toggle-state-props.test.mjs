/**
 * Pins that both menu toggles can be rendered in their open state.
 *
 * Run with the Node test runner:
 *   node --test components/02-molecules/menu/menu-toggle-state-props.test.mjs
 *
 * Both templates used to hardcode `aria_expanded: 'false'`, which made the open
 * state unrenderable from Twig -- only the runtime behaviours flipped it. That
 * is fine on a real page and fatal for a story, because `secondary-menu-toggle`
 * keys its ENTIRE open appearance off its own `aria-expanded`: the icon's
 * 180deg rotation, the gray-100 background, and the `::after` divider that is
 * only drawn while closed. Without an override there is nothing to
 * contrast-check but the closed state.
 *
 * Neither behaviour can stand in for it in a story. `yds-menu-toggle.js` needs
 * a `.site-header` ancestor and `yds-menu-in-this-section-toggle.js`
 * dereferences `.in-this-section__inner` unguarded, so both throw when the
 * component is rendered on its own.
 *
 * The defaults are pinned alongside the overrides on purpose: every existing
 * caller (`yds-site-header.twig`, `yds-site-in-this-section.twig`) includes
 * these templates with no arguments at all, so a default that regressed to
 * 'true' would ship a permanently-expanded toggle to every site.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

// twig.js, the extensions these templates rely on (bem(), add_attributes()),
// and the namespace map all come from the Storybook setup, so this test cannot
// drift from how the templates are really compiled.
const require = createRequire(import.meta.url);
const Twig = require('twig');
const { setupTwig, namespaces } = require('../../../.storybook/setupTwig');

setupTwig(Twig);

/**
 * Renders Twig source, resolving the `@molecules` namespace.
 *
 * @param {string} source - Twig source to render.
 * @param {object} context - Variables to render it with.
 *
 * @returns {string} the rendered markup.
 */
const render = (source, context = {}) =>
  Twig.twig({ data: source, namespaces, async: false }).render(context);

const include = (template, context) =>
  render(`{% include "${template}" %}`, context);

const MENU_TOGGLE = '@molecules/menu/menu-toggle/yds-menu-toggle.twig';
const SECTION_TOGGLE =
  '@molecules/menu/menu-in-this-section-toggle/yds-menu-in-this-section-toggle.twig';

test('menu-toggle: defaults to collapsed', () => {
  assert.match(include(MENU_TOGGLE, {}), /aria-expanded="false"/);
});

test('menu-toggle: renders expanded when asked', () => {
  const out = include(MENU_TOGGLE, { main_menu_toggle__aria_expanded: 'true' });

  assert.match(out, /aria-expanded="true"/);
  assert.doesNotMatch(out, /aria-expanded="false"/);
});

test('in-this-section toggle: defaults to collapsed, labelled for opening', () => {
  const out = include(SECTION_TOGGLE, {});

  assert.match(out, /aria-expanded="false"/);
  assert.match(out, /In This Section/);
});

test('in-this-section toggle: renders expanded when asked', () => {
  const out = include(SECTION_TOGGLE, {
    secondary_menu_toggle__aria_expanded: 'true',
  });

  assert.match(out, /aria-expanded="true"/);
  assert.doesNotMatch(out, /aria-expanded="false"/);
});

test('in-this-section toggle: label is overridable for the open state', () => {
  // The behaviour swaps the label to 'Close' while the menu is open, so a story
  // showing the open state with the closed label would misreport the component.
  const out = include(SECTION_TOGGLE, {
    secondary_menu_toggle__aria_expanded: 'true',
    secondary_menu_toggle__text: 'Close',
  });

  assert.match(out, /Close/);
  assert.doesNotMatch(out, /In This Section/);
});
