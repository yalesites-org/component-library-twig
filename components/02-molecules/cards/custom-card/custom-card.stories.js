import customCardTwig from './yds-custom-card.twig';

import customCardData from './custom-card.yml';

import imageData from '../../../01-atoms/images/image/image.yml';

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
    content: {
      name: 'Content',
      type: 'string',
      defaultValue: customCardData.custom_card__content,
    },
    url: {
      name: 'URL',
      type: 'string',
      defaultValue: customCardData.custom_card__url,
    },
  },
};

export const customCard = ({ heading, content, url }) =>
  customCardTwig({
    ...imageData.responsive_images['3x2'],
    custom_card__heading: heading,
    custom_card__content: content,
    custom_card__url: url,
  });
