import cardCollectionTwig from './card-collection.twig';

import newsCardData from '../../02-molecules/cards/news-card/news-card.yml';
import imageData from '../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Card Collection',
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: 'News Card Grid Heading',
    },
  },
};

export const NewsGridFeatured = ({ heading }) =>
  cardCollectionTwig({
    card_example_type: 'news',
    card_collection__heading: heading,
    card_collection__variation: 'featured',
    card_collection__cards: [1, 2, 3],
    ...newsCardData,
    ...imageData.responsive_images['3x2'],
  });

export const NewsGridSecondary = ({ heading }) =>
  cardCollectionTwig({
    card_example_type: 'news',
    card_collection__heading: heading,
    card_collection__variation: 'secondary',
    card_collection__cards: [1, 2, 3, 4],
    ...newsCardData,
    ...imageData.responsive_images['3x2'],
  });
