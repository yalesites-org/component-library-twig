import cardGridTwig from './card-grid.twig';

import newsCardData from '../../02-molecules/cards/news-card/news-card.yml';
import imageData from '../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Card Grid',
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: 'News Card Grid Heading',
    },
  },
};

export const NewsGridFeatured = ({ heading }) =>
  cardGridTwig({
    card_type: 'news',
    card_grid__heading: heading,
    card_grid__variation: 'featured',
    card_grid__cards: [1, 2, 3],
    ...newsCardData,
    ...imageData.responsive_images['3x2'],
  });

export const NewsGridSecondary = ({ heading }) =>
  cardGridTwig({
    card_type: 'news',
    card_grid__heading: heading,
    card_grid__variation: 'secondary',
    card_grid__cards: [1, 2, 3, 4],
    ...newsCardData,
    ...imageData.responsive_images['3x2'],
  });
