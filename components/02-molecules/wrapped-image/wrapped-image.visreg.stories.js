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
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Wrapped Image/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

/**
 * Every style and position at one size. Sizes do not vary by global theme, so
 * each gets one story of its own rather than being repeated in every global
 * theme story (YaleSites-Internal#1954).
 */
const renderSize = (size) =>
  createVariations(
    ([style, alignment]) =>
      wrappedImageTwig({
        ...imageData.responsive_images['3x2'],
        wrapped_image__caption: 'This is the caption for the image above.',
        wrapped_image__alignment: alignment,
        wrapped_image__style: style,
        wrapped_image__size: size,
        wrapped_image__content: WrappedImageData.text_two,
      }),
    [
      ['floated', 'left'],
      ['floated', 'right'],
      ['offset', 'left'],
      ['offset', 'right'],
    ],
    `Size: ${size}`,
    '',
    'Style',
    ([style, alignment]) =>
      `${style === 'floated' ? 'Inline' : 'Offset'}, image ${alignment}`,
  );

export const SizeLarge = () => renderSize('large');
export const SizeSmall = () => renderSize('small');

SizeLarge.storyName = 'Size: Large';
SizeSmall.storyName = 'Size: Small';

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
