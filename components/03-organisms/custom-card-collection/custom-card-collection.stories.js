import tokens from '@yalesites-org/tokens/build/json/tokens.json';
// get global themes as `label` : `key` values to pass into options as array.
import getGlobalThemes from '../../00-tokens/colors/color-global-themes';

// Custom card collection twig
import customCardCollectionTwig from './yds-custom-card-collection.twig';

// Custom card default data
import customCardData from '../../02-molecules/cards/custom-card/custom-card.yml';

// Image atom component - generic images for demo
import imageData from '../../01-atoms/images/image/image.yml';
import componentProps from './custom-card-collection-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

// Get global theme options
const siteGlobalThemeOptions = getGlobalThemes(tokens['global-themes']);

const argTypes = toArgTypes(componentProps);
argTypes.globalTheme = {
  ...argTypes.globalTheme,
  options: siteGlobalThemeOptions,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Card Collection/Custom Card Collection',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
  args: {
    ...toArgs(componentProps),
    customCardCollectionHeading: 'Custom Card Collection Heading',
  },
};

export const customCardCollection = ({
  heading,
  snippet,
  url,
  customCardCollectionHeading,
  withImage,
  featured,
  globalTheme,
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];

  return `
    <div class="wrap-for-global-theme" data-global-theme="${globalTheme}">
      ${customCardCollectionTwig({
        site_global__theme: globalTheme,
        custom_card_collection__heading: customCardCollectionHeading,
        custom_card__heading: heading,
        custom_card__snippet: snippet,
        custom_card__url: url,
        custom_card__image: withImage ? 'true' : 'false',
        custom_card_collection__featured: featured ? 'true' : 'false',
        custom_card_collection__cards: items,
        ...customCardData,
        ...imageData.responsive_images['3x2'],
      })}
    </div>
  `;
};
