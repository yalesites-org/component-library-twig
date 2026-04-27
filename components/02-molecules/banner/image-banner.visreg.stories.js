import imageBannerTwig from './image/yds-image-banner.twig';
import imageData from '../../01-atoms/images/image/image.yml';

import {
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
  createVariations,
  createSectionWrapper,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Banners/Image Banner/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const size = 'tall';
  const imageCaption = 'Image Banner Caption';

  const renderImageBanner = (bgColor) =>
    imageBannerTwig({
      ...imageData.responsive_images['16x9'],
      image_banner__content__background: bgColor,
      image_banner__overlay_variation: 'full',
      image_banner__size: size,
      image_banner__video: 'false',
      image_banner__caption: imageCaption,
    });

  return `
    ${createVariations(
      (imgSize) =>
        imageBannerTwig({
          ...imageData.responsive_images['16x9'],
          image_banner__content__background: 'one',
          image_banner__overlay_variation: 'full',
          image_banner__size: imgSize,
          image_banner__video: 'false',
          image_banner__caption: imageCaption,
        }),
      ['tall', 'short'],
      'Size Variations',
      '',
      'Size',
    )}

    ${createGlobalThemeVariations(
      () => `
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
      `,
      globalThemes,
      'All Global Theme Variations',
    )}
  `;
};
