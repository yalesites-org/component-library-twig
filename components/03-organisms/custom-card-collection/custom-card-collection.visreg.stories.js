import customCardCollectionTwig from './yds-custom-card-collection.twig';
import customCardData from '../../02-molecules/cards/custom-card/custom-card.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import {
  createPlaygroundIntro,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Card Collection/Custom Card Collection/Visreg',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    heading: {
      name: 'Collection Heading',
      type: 'string',
    },
    featured: {
      name: 'Featured',
      type: 'boolean',
    },
    withImage: {
      name: 'With Images',
      type: 'boolean',
    },
  },
  args: {
    heading: 'Custom Card Collection',
    featured: true,
    withImage: true,
  },
};

export const Visreg = ({ heading, featured, withImage }, context) => {
  const globalTheme = context.globals.globalTheme || 'one';

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different settings. Use the global theme toolbar to change the site-wide global theme.',
    )}

    <div class="wrap-for-screenshot">
      ${customCardCollectionTwig({
        site_global__theme: globalTheme,
        custom_card_collection__heading: heading,
        custom_card__heading: customCardData.custom_card__heading,
        custom_card__snippet: customCardData.custom_card__snippet,
        custom_card__url: 'https://google.com',
        custom_card__image: withImage ? 'true' : 'false',
        custom_card_collection__featured: featured ? 'true' : 'false',
        custom_card_collection__cards: featured ? [1, 2, 3] : [1, 2, 3, 4],
        ...customCardData,
        ...imageData.responsive_images['3x2'],
      })}
    </div>

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
