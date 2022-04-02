import newsCardTwig from './news-card.twig';

import newsCardData from './news-card.yml';
import imageData from '../../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/News Card',
  argTypes: {
    date: {
      name: 'Date',
      type: 'string',
      defaultValue: newsCardData.news_card__date,
    },
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: newsCardData.news_card__heading,
    },
    snippet: {
      name: 'Snippet',
      type: 'string',
      defaultValue: newsCardData.news_card__snippet,
    },
    featured: {
      name: 'Featured',
      type: 'boolean',
      defaultValue: true,
    },
    withImage: {
      name: 'With Image',
      type: 'boolean',
      defaultValue: true,
    },
  },
};

export const NewsCard = ({ date, heading, snippet, featured, withImage }) =>
  newsCardTwig({
    ...imageData.responsive_images['3x2'],
    news_card__date: date,
    news_card__heading: heading,
    news_card__snippet: snippet,
    news_card__featured: featured ? 'true' : 'false',
    news_card__image: withImage,
  });
