import wrappedImageTwig from './yds-wrapped-image.twig';
import textFieldTwig from '../text/yds-text-field.twig';

import imageData from '../../01-atoms/images/image/image.yml';
import WrappedImageData from './wrapped-image.yml';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Wrapped Image/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  const caption = 'This is the caption for the 16:9 image above.';
  const imageAlignment = 'left';
  const imageStyle = 'floated';

  const renderWrappedImage = () => `
    ${textFieldTwig({
      text_field__content: WrappedImageData.text_one,
      text_field__width: 'site',
      text_field__alignment: 'left',
    })}
    ${wrappedImageTwig({
      ...imageData.responsive_images['3x2'],
      wrapped_image__caption: caption,
      wrapped_image__alignment: imageAlignment,
      wrapped_image__style: imageStyle,
      wrapped_image__content: WrappedImageData.text_two,
    })}
  `;

  return createThemeVariations(
    (sectionTheme) =>
      createSectionWrapper(sectionTheme, renderWrappedImage(), {
        width: 'site',
        primaryWidth: '100%',
      }),
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations for visual regression testing.',
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
