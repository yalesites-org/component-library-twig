import imageBannerTwig from './image/yds-image-banner.twig';
import imageData from '../../01-atoms/images/image/image.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createThemeVariations,
  createVariations,
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
  const bgColor = 'one';
  const size = 'tall';
  const imageCaption = 'Image Banner Caption';

  const renderTheme = (theme) => `
    <div data-component-theme="${theme}">
      ${imageBannerTwig({
        ...imageData.responsive_images['16x9'],
        image_banner__content__background: bgColor,
        image_banner__overlay_variation: 'full',
        image_banner__size: size,
        image_banner__video: 'false',
        image_banner__caption: imageCaption,
      })}
    </div>
  `;

  return `
    ${createVariations(
      (imgSize) =>
        imageBannerTwig({
          ...imageData.responsive_images['16x9'],
          image_banner__content__background: bgColor,
          image_banner__overlay_variation: 'full',
          image_banner__size: imgSize,
          image_banner__video: 'false',
          image_banner__caption: imageCaption,
        }),
      ['tall', 'short'],
      'Size Variations',
      'Size',
    )}

    ${createThemeVariations(
      renderTheme,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all section theme variations of the Image Banner for visual regression testing.',
      'Section Theme',
    )}
  `;
};
