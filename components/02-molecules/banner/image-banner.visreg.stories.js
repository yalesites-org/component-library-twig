import imageBannerTwig from './image/yds-image-banner.twig';
import imageData from '../../01-atoms/images/image/image.yml';

import {
  componentThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
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
  },
  argTypes: {
    bgColor: {
      name: 'Banner Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      type: 'select',
      options: componentThemes,
    },
    size: {
      name: 'Image Size',
      type: 'select',
      options: ['tall', 'short'],
    },
    imageCaption: {
      name: 'Image Caption',
      type: 'string',
    },
  },
  args: {
    bgColor: 'one',
    size: 'tall',
    imageCaption: 'Image Banner Caption',
  },
};

export const Visreg = ({ bgColor, size, imageCaption }) => {
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
    ${createPlaygroundIntro(
      'Use the controls to test different Image Banner configurations.',
    )}

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
