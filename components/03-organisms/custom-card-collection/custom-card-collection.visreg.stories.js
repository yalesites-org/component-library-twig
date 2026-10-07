import customCardCollectionTwig from './yds-custom-card-collection.twig';
import customCardData from '../../02-molecules/cards/custom-card/custom-card.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import {
  sectionThemes,
  globalThemeLabels,
  globalThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Organisms/Card Collection/Custom Card Collection/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  const heading = 'Custom Card Collection';
  const withImage = true;

  const renderLayoutVariations = () =>
    createVariations(
      (isFeatured) =>
        customCardCollectionTwig({
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
      '',
      'Layout Type',
      (isFeatured) => (isFeatured ? 'Featured Layout' : 'Standard Layout'),
    );

  return createThemeVariations(
    (theme) =>
      createSectionWrapper(theme, renderLayoutVariations(), {
        width: 'site',
        primaryWidth: '100%',
      }),
    sectionThemes,
    'All Section Theme Variations',
    '',
    'Section Theme',
  );
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
