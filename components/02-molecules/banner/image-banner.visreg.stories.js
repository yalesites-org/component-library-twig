import imageBannerTwig from './image/yds-image-banner.twig';
import imageData from '../../01-atoms/images/image/image.yml';

import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  componentThemes,
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
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
  title: 'Organisms/Banners/Image Banner/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderImageBanner = (bgColor, imgSize = 'tall') =>
  imageBannerTwig({
    ...imageData.responsive_images['16x9'],
    image_banner__content__background: bgColor,
    image_banner__overlay_variation: 'full',
    image_banner__size: imgSize,
    image_banner__video: 'false',
    image_banner__caption: 'Image Banner Caption',
  });

/**
 * Sizes do not vary by global theme, so they get one story of their own rather
 * than being repeated in every global theme story.
 */
export const SizeVariations = () =>
  createVariations(
    (imgSize) => renderImageBanner('one', imgSize),
    ['tall', 'short', 'mini'],
    'Size Variations',
    '',
    'Size',
  );

const renderGlobalTheme = () => `
  ${createThemeVariations(
    (theme) =>
      createSectionWrapper(theme, renderImageBanner('one'), {
        width: 'site',
        primaryWidth: '100%',
      }),
    sectionThemes,
    'All Section Theme Variations',
    '',
    'Section Theme',
  )}
  ${createThemeVariations(
    (theme) =>
      createSectionWrapper('one', renderImageBanner(theme), {
        width: 'site',
        primaryWidth: '100%',
      }),
    componentThemes,
    'All Image Banner Theme Variations',
    '',
    'Image Banner Theme',
  )}
`;

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
