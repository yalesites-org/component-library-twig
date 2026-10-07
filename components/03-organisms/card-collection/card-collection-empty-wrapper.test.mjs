/**
 * Pins that a card collection with nothing to show renders nothing at all.
 *
 * Run with the Node test runner:
 *   node --test components/03-organisms/card-collection/card-collection-empty-wrapper.test.mjs
 *
 * An empty `<ul>` is invalid markup -- SiteImprove reports it as "Container
 * element is empty" -- and it is reachable in production: a Reference card
 * block whose target node has been unpublished or deleted renders zero cards.
 *
 * Covers custom-card-collection alongside card-collection because it is one
 * rule over two templates, and the trap below applies identically to both.
 *
 * The trap, and the reason this is pinned rather than left to review: on every
 * Drupal path the cards arrive as a `{% block %}` override from an
 * `{% embed %}`, NOT as the `*__cards` variable the template's own default body
 * iterates -- that variable is only ever set by Storybook stories and page
 * examples. So the obvious guard, `{% if card_collection__cards %}`, looks
 * right, passes every story, and silently deletes every real card collection on
 * the site. The guard has to test the *rendered* cards.
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
 * Renders Twig source, resolving the `@organisms` namespace.
 *
 * Note: do not add `allowInlineIncludes` here. It routes namespaced paths
 * through relative-path resolution, which fails for a template built from
 * source rather than loaded from a file.
 *
 * @param {string} source - Twig source to render.
 * @param {object} context - Variables to render it with.
 *
 * @returns {string} the rendered markup.
 */
const render = (source, context = {}) =>
  Twig.twig({ data: source, namespaces, async: false }).render(context);

const components = [
  {
    label: 'card-collection',
    template: '@organisms/card-collection/yds-card-collection.twig',
    // 'single' is what the Reference card block passes -- the production shape
    // of the unpublished/deleted target case.
    embedWith: "{ card_collection__type: 'single' }",
    cards: 'card_collection__cards',
  },
  {
    label: 'custom-card-collection',
    template:
      '@organisms/custom-card-collection/yds-custom-card-collection.twig',
    embedWith: '{}',
    cards: 'custom_card_collection__cards',
  },
];

components.forEach(({ label, template, embedWith, cards }) => {
  /** Mirrors how the Drupal block templates supply cards: an embed override. */
  const viaEmbed = (markup) =>
    render(
      `{% embed "${template}" with ${embedWith} %}` +
        `{% block ${cards} %}${markup}{% endblock %}` +
        `{% endembed %}`,
    );

  /** Mirrors how Storybook stories supply cards: the *__cards variable. */
  const viaVariable = (items) =>
    render(`{% include "${template}" %}`, { [cards]: items });

  // Anchored on the class attribute: `\b` would not do, because '-' is a
  // non-word character, so `\bcard-collection__cards` also matches inside
  // `custom-card-collection__cards`.
  const wrapper = new RegExp(
    `<ul[^>]*class="(?:[^"]*\\s)?${label}__cards(?:\\s[^"]*)?"`,
  );

  test(`${label}: renders nothing when the cards block is empty`, () => {
    assert.equal(
      viaEmbed('').trim(),
      '',
      'the whole component should be suppressed, not just its list',
    );
  });

  test(`${label}: renders nothing when the cards block is only whitespace`, () => {
    // A block override carries the surrounding template's indentation, so a
    // block that produced no cards is whitespace rather than an empty string.
    assert.equal(viaEmbed('   \n\t  \n').trim(), '');
  });

  test(`${label}: still renders cards supplied through the block`, () => {
    const out = viaEmbed('<li class="probe">a card</li>');
    assert.match(out, wrapper, 'populated collections must keep their wrapper');
    assert.match(out, /<li class="probe">a card<\/li>/);
  });

  test(`${label}: renders nothing when the cards variable is empty`, () => {
    assert.equal(viaVariable([]).trim(), '');
  });

  test(`${label}: still renders cards supplied through the variable`, () => {
    const out = viaVariable([1, 2, 3]);
    assert.match(out, wrapper, 'populated collections must keep their wrapper');
    assert.match(out, /<li/, 'expected the card molecule to render list items');
  });
});
