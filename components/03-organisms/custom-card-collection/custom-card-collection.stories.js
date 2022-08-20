import customCardCollectionTwig from './yds-custom-card-collection.twig';

import customCardData from '../../02-molecules/cards/custom-card/custom-card.yml';

import imageData from '../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Card Collection/Custom Card Collection',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    featured: {
      name: 'Featured',
      type: 'boolean',
      defaultValue: true,
    },
    withImage: {
      name: 'With Images',
      type: 'boolean',
      defaultValue: true,
    },
  },
};

export const customCardCollection = ({
  heading,
  snippet,
  url,
  withImage,
  featured,
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];

  return customCardCollectionTwig({
    collection_heading: 'Custom Card Grid Heading',
    custom_card__heading: heading,
    custom_card__snippet: snippet,
    custom_card__url: url,
    custom_card__image: withImage ? 'true' : 'false',
    custom_card_collection__featured: featured ? 'true' : 'false',
    custom_card_collection__cards: items,
    ...customCardData,
    ...imageData.responsive_images['3x2'],
  });
};
