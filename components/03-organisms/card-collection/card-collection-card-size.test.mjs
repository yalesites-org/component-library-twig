/**
 * Pins the `data-card-size` contract on the card collection (#1648).
 *
 * Run with the Node test runner:
 *   node --test components/03-organisms/card-collection/card-collection-card-size.test.mjs
 *
 * The card-size dial is authored in Drupal (`ys_views_basic`, the "Card size"
 * select) and consumed entirely in SCSS, through the
 * `[data-collection-type='grid'][data-card-size='small']` selector. Nothing
 * between the two fails loudly: the prop name is a string in one repo's Twig
 * (`views-basic-rows.html.twig`, which sets `card_collection__card_size`) and a
 * string in this repo's Twig, so renaming one side and not the other renders a
 * perfectly valid page that silently ignores the author's choice. These tests
 * pin the attribute and its default so that drift fails here instead.
 *
 * Rendered via `{% embed %}`, because that is the only path Drupal uses -- see
 * the trap documented at length in card-collection-empty-wrapper.test.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const Twig = require('twig');
const { setupTwig, namespaces } = require('../../../.storybook/setupTwig');

setupTwig(Twig);

const TEMPLATE = '@organisms/card-collection/yds-card-collection.twig';

/**
 * Renders the card collection the way the Drupal listing template does.
 *
 * @param {object} props - Props to pass through the embed's `with`.
 *
 * @returns {string} the rendered markup.
 */
const renderCollection = (props = {}) => {
  const withClause = JSON.stringify(props).replace(/"([^"]+)":/g, '$1:');
  return Twig.twig({
    data:
      `{% embed "${TEMPLATE}" with ${withClause} %}` +
      '{% block card_collection__cards %}<li class="probe">a card</li>{% endblock %}' +
      '{% endembed %}',
    namespaces,
    async: false,
  }).render({});
};

test('the authored card size reaches the attribute the SCSS selects on', () => {
  const out = renderCollection({ card_collection__card_size: 'small' });
  assert.match(out, /data-card-size="small"/);
});

test('a collection with no card size falls back to large', () => {
  // Large is the grid every card collection rendered before the dial existed,
  // so an unset value has to be indistinguishable from the old markup.
  assert.match(renderCollection(), /data-card-size="large"/);
});

test('the card size is emitted alongside the collection type it depends on', () => {
  // The SCSS rule is `[data-collection-type='grid'][data-card-size='small']`,
  // so the size alone does nothing -- both attributes have to land on the same
  // element for the narrower grid bands to apply at all.
  const out = renderCollection({
    card_collection__type: 'grid',
    card_collection__card_size: 'small',
  });
  assert.match(
    out,
    /<div[^>]*data-collection-type="grid"[^>]*data-card-size="small"/,
  );
});

test('card size does not disturb the featured attribute', () => {
  // data-collection-featured is a different concept (the per-card image/text
  // ratio) that is hardcoded to 'true' for every Drupal listing. The size dial
  // deliberately does not reuse it, so it must still default independently.
  const out = renderCollection({ card_collection__card_size: 'small' });
  assert.match(out, /data-collection-featured="true"/);
});

test('the superseded cards-per-row prop no longer emits an attribute', () => {
  // Guards against a half-finished rename leaving both spellings in the tree.
  const out = renderCollection({ card_collection__cards_per_row: '4' });
  assert.doesNotMatch(out, /data-cards-per-row/);
  assert.match(out, /data-card-size="large"/);
});
