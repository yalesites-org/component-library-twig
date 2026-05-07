import componentProps from './related-content-props.yml';
import sampleData from './related-content.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

import relatedContentTwig from './yds-related-content.twig';

/**
 * Build a fixture HTML string that matches the markup emitted by the
 * embedded `entity_reference_for_fields:embed_related_content` view in
 * Drupal — row plugin `entity:node` with `view_mode: related_content_card`
 * rendering through `node--related-content-card.html.twig` in atomic.
 *
 * Atomic's overridden `views-view-unformatted.html.twig` strips the
 * `<div class="view-content">` and per-row `<div class="views-row">`
 * wrappers, leaving each rendered article as a direct child of the
 * `<div class="js-view-dom-id-…">` outer wrapper. The molecule's SCSS
 * uses `display: contents` on that wrapper to flatten it so the cards
 * become direct grid children — fixture mirrors that DOM exactly so
 * Storybook preview matches the live render.
 */
const buildSampleViewHtml = (count) => {
  const items = sampleData.related_content__sample_items.slice(0, count);
  if (!items.length) {
    return '';
  }
  const articles = items
    .map((item) => {
      const eyebrow = item.category
        ? `${item.type.toUpperCase()}<span class="related-card__eyebrow-separator" aria-hidden="true"> | </span><span class="related-card__category">${item.category.toUpperCase()}</span>`
        : item.type.toUpperCase();
      return `
      <article class="related-card">
        <p class="related-card__eyebrow">${eyebrow}</p>
        <h3 class="related-card__title">
          <a href="${item.url}">${item.title}</a>
        </h3>
      </article>`;
    })
    .join('\n');

  return `<div class="js-view-dom-id-storybook">${articles}</div>`;
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Related Content',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    heading: sampleData.related_content__heading,
    itemCount: 6,
  },
};

export const RelatedContent = ({ heading, itemCount }) =>
  relatedContentTwig({
    related_content__heading: heading,
    related_content__view: buildSampleViewHtml(itemCount),
  });
RelatedContent.storyName = 'Related Content';
