import customCardCollectionTwig from './yds-custom-card-collection.twig';
import customCardData from '../../02-molecules/cards/custom-card/custom-card.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import { createVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Card Collection/Custom Card Collection/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = (_, context) => {
  const globalTheme = context.globals.globalTheme || 'one';
  const heading = 'Custom Card Collection';
  const withImage = true;

  return `
    ${createVariations(
      (isFeatured) =>
        customCardCollectionTwig({
          site_global__theme: globalTheme,
          custom_card_collection__heading: heading,
          custom_card__heading: customCardData.custom_card__heading,
          custom_card__snippet: customCardData.custom_card__snippet,
          custom_card__url: 'https://google.com',
          custom_card__image: withImage ? 'true' : 'false',
          custom_card_collection__featured: isFeatured ? 'true' : 'false',
          custom_card_collection__cards: isFeatured ? [1, 2, 3] : [1, 2, 3, 4],
          ...customCardData,
          ...imageData.responsive_images['3x2'],
        }),
      [true, false],
      'All Layout Variations',
      'Layout Type',
      (isFeatured) => (isFeatured ? 'Featured Layout' : 'Standard Layout'),
    )}
  `;
};
