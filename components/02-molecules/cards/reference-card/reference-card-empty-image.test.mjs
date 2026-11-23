/**
 * Pins that a reference card with no image reserves no image column
 * (YaleSites-Internal#2367).
 *
 * Run with the Node test runner:
 *   node --test components/02-molecules/cards/reference-card/reference-card-empty-image.test.mjs
 *
 * A listing can ask for the teaser image (`reference_card__image: 'true'`) on
 * a card whose content has no image and whose site has no fallback image. The
 * Drupal templates then override the image block with markup that renders
 * nothing. The card used to keep an empty image wrapper and the
 * `data-component-has-image="true"` flag anyway, and in a list the empty
 * wrapper holds a 40% column, pushing the text far from the left edge.
 *
 * The card must drop the wrapper and flip the flag to "false" when the image
 * block renders nothing, and must keep both when it renders an image.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import Twig from 'twig';
import { setupTwig, namespaces } from '../../../_storybook/setup-twig.mjs';

setupTwig(Twig);

const TEMPLATE = '@molecules/cards/reference-card/yds-reference-card.twig';

const render = (imageBlock) =>
  Twig.twig({
    data:
      `{% embed "${TEMPLATE}" with {` +
      "reference_card__heading: 'Baccalaureate Ceremony'," +
      "reference_card__image: 'true'" +
      '} %}' +
      `{% block reference_card__image %}${imageBlock}{% endblock %}` +
      '{% endembed %}',
    namespaces,
    async: false,
  }).render({});

test('an image block that renders nothing leaves no image wrapper', () => {
  const out = render('{% if false %}x{% endif %}');
  assert.doesNotMatch(out, /reference-card__image/);
});

test('an image block that renders only whitespace leaves no image wrapper', () => {
  const out = render('  {% if false %}x{% endif %}  ');
  assert.doesNotMatch(out, /reference-card__image/);
});

test('an image-less card is flagged as having no image', () => {
  const out = render('{% if false %}x{% endif %}');
  assert.match(out, /data-component-has-image="false"/);
});

test('an image block with an image keeps the wrapper and the flag', () => {
  const out = render('<img data-test-image alt="">');
  assert.match(out, /reference-card__image/);
  assert.match(out, /data-component-has-image="true"/);
  assert.ok(out.includes('<img data-test-image'));
});
