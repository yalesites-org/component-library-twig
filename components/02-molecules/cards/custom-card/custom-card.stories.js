// Custom card twig file
import customCardTwig from './yds-custom-card.twig';

// Custom card default data
import customCardData from './custom-card.yml';

// Image atom component - generic images for demo
import imageData from '../../../01-atoms/images/image/image.yml';
import componentProps from './custom-card-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Cards',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    heading: customCardData.custom_card__heading,
    snippet: customCardData.custom_card__snippet,
  },
};

export const customCard = ({ heading, snippet, withImage, featured }) => `
  <div class='custom-card-collection' data-component-width='site' data-collection-featured="${featured}">
    <div class='custom-card-collection__inner'>
      <ul class='custom-card-collection__cards'>
        ${customCardTwig({
          ...imageData.responsive_images['3x2'],
          custom_card__heading: heading,
          custom_card__snippet: snippet,
          custom_card__url: 'https://google.com',
          custom_card__image: withImage ? 'true' : 'false',
        })}
      </ul>
    </div>
  </div>
`;
