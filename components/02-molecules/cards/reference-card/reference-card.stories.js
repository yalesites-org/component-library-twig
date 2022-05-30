import referenceCardTwig from './reference-card.twig';

import referenceCardData from './news-card.yml';
import imageData from '../../../01-atoms/images/image/image.yml';

import './reference-card';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Cards',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    date: {
      name: 'Date',
      type: 'string',
      defaultValue: referenceCardData.reference_card__date,
    },
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: referenceCardData.reference_card__heading,
    },
    snippet: {
      name: 'Snippet',
      type: 'string',
      defaultValue: referenceCardData.reference_card__snippet,
    },
    collectionType: {
      name: 'Collection Type',
      type: 'select',
      options: ['grid', 'list'],
      defaultValue: 'grid',
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

export const NewsCard = ({
  date,
  heading,
  snippet,
  collectionType,
  featured,
  withImage,
}) => `
<div class='card-collection' data-component-width='max' data-collection-type='${collectionType}' data-collection-featured="${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${referenceCardTwig({
        ...imageData.responsive_images['3x2'],
        reference_card__date: date,
        reference_card__heading: heading,
        reference_card__snippet: snippet,
        reference_card__featured: featured ? 'true' : 'false',
        reference_card__image: withImage ? 'true' : 'false',
        reference_card__url: referenceCardData.reference_card__url,
      })}
    </ul>
  </div>
</div>
`;

export const EventCard = ({
  date,
  heading,
  snippet,
  collectionType,
  featured,
  withImage,
}) => `
<div class='card-collection' data-component-width='max' data-collection-type='${collectionType}' data-collection-featured="${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${referenceCardTwig({
        ...imageData.responsive_images['3x2'],
        reference_card__date: date,
        reference_card__heading: heading,
        reference_card__snippet: snippet,
        reference_card__featured: featured ? 'true' : 'false',
        reference_card__image: withImage ? 'true' : 'false',
        reference_card__url: referenceCardData.reference_card__url,
      })}
    </ul>
  </div>
</div>
`;
