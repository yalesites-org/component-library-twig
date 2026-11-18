/**
 * Pins the `data-card-size` contract on the custom card collection (#1842).
 *
 * Run with the Node test runner:
 *   node --test components/03-organisms/custom-card-collection/custom-card-collection-card-size.test.mjs
 *
 * The size is authored in Drupal (the "Card Size" dial on the Custom Card
 * Collection block, passed by block--inline-block--custom-cards.html.twig as
 * `custom_card_collection__card_size`) and consumed in SCSS through
 * `[data-card-size='small']`. Renaming one side and not the other renders a
 * valid page that silently ignores the editor's choice, so the attribute and
 * its default are pinned here.
 *
 * Rendered via `{% embed %}`, the only path Drupal uses.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import Twig from 'twig';
import { readFileSync } from 'node:fs';
import { setupTwig, namespaces } from '../../_storybook/setup-twig.mjs';

setupTwig(Twig);

const TEMPLATE =
  '@organisms/custom-card-collection/yds-custom-card-collection.twig';

const renderCollection = (props = {}) => {
  const withClause = JSON.stringify(props).replace(/"([^"]+)":/g, '$1:');
  return Twig.twig({
    data:
      `{% embed "${TEMPLATE}" with ${withClause} %}` +
      '{% block custom_card_collection__cards %}<li class="probe">a card</li>{% endblock %}' +
      '{% endembed %}',
    namespaces,
    async: false,
  }).render({});
};

test('a collection with no card size renders small', () => {
  // Small is the 4-up grid every collection rendered before the dial existed.
  assert.match(renderCollection(), /data-card-size="small"/);
});

test('an unknown card size falls back to small', () => {
  assert.match(
    renderCollection({ custom_card_collection__card_size: 'huge' }),
    /data-card-size="small"/,
  );
});

test('the authored card size reaches the attribute the SCSS selects on', () => {
  assert.match(
    renderCollection({ custom_card_collection__card_size: 'large' }),
    /data-card-size="large"/,
  );
  assert.match(
    renderCollection({ custom_card_collection__card_size: 'small' }),
    /data-card-size="small"/,
  );
});

test('the featured prop is gone from the markup', () => {
  const out = renderCollection({ custom_card_collection__featured: 'true' });
  assert.doesNotMatch(out, /data-collection-featured/);
});

test('no stylesheet or story still keys on data-collection-featured', () => {
  const files = [
    '../../02-molecules/cards/custom-card/_yds-custom-card.scss',
    './_yds-custom-card-collection.scss',
  ];
  files.forEach((f) => {
    const src = readFileSync(new URL(f, import.meta.url), 'utf8');
    assert.doesNotMatch(src, /data-collection-featured/, f);
  });
});
