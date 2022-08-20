import customCardTwig from './yds-custom-card.twig';
import customCardData from './custom-card.yml';
import imageData from '../../../01-atoms/images/image/image.yml';
import './yds-custom-card';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Cards',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: customCardData.custom_card__heading,
    },
    snippet: {
      name: 'Snippet',
      type: 'string',
      defaultValue: customCardData.custom_card__snippet,
    },
    url: {
      name: 'URL',
      type: 'string',
      defaultValue: customCardData.custom_card__url,
    },
    withImage: {
      name: 'With Image',
      type: 'boolean',
      defaultValue: true,
    },
    featured: {
      name: 'Featured',
      type: 'boolean',
      defaultValue: true,
    },
  },
};

export const customCard = ({ heading, snippet, url, withImage, featured }) => `
  <div class='custom-card-collection' data-component-width='max' data-collection-featured="${featured}">
    <div class='custom-card-collection__inner'>
      <ul class='custom-card-collection__cards'>
        ${customCardTwig({
          ...imageData.responsive_images['3x2'],
          custom_card__heading: heading,
          custom_card__snippet: snippet,
          custom_card__url: url,
          custom_card__image: withImage ? 'true' : 'false',
        })}
      </ul>
    </div>
  </div>
`;
