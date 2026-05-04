import relatedContentTwig from './yds-related-content.twig';
import sampleData from './related-content.yml';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Related Content/Visreg',
  parameters: { controls: { disable: true } },
};

/**
 * Visreg fixture HTML — mirrors what the embedded
 * `entity_reference_for_fields:embed_related_content` view emits in
 * Drupal after atomic's `views-view-unformatted.html.twig` strips the
 * `.view-content` and `.views-row` wrappers. Each row is a rendered
 * `node--related-content-card.html.twig` article.
 */
const buildSampleViewHtml = () => {
  const articles = sampleData.related_content__sample_items
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

  return `<div class="js-view-dom-id-storybook-visreg">${articles}</div>`;
};

export const Visreg = () => {
  // Each call gets a unique heading id so the new aria-labelledby
  // wiring stays valid when every global × section theme renders on
  // the same Storybook page (otherwise duplicate ids would violate
  // WCAG 4.1.1).
  let headingIdCounter = 0;
  const renderRelatedContent = () => {
    const id = `related-content-heading-${headingIdCounter}`;
    headingIdCounter += 1;
    return relatedContentTwig({
      related_content__heading: sampleData.related_content__heading,
      related_content__heading_id: id,
      related_content__view: buildSampleViewHtml(),
    });
  };

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (theme) => createSectionWrapper(theme, renderRelatedContent()),
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
