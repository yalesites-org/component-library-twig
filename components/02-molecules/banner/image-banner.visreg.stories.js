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
      () =>
        createThemeVariations(
          (sectionTheme) =>
            createSectionWrapper(
              sectionTheme,
              componentThemes
                .map(
                  (componentTheme) => `
                    <div class="sb-section__container">
                      <h3 class="sb-section__subheading">Image Banner Theme: ${componentTheme}</h3>
                      ${renderImageBanner(componentTheme)}
                    </div>
                  `,
                )
                .join(''),
              { width: 'site', primaryWidth: '100%' },
            ),
          sectionThemes,
          'All Section × Image Banner Theme Combinations',
          '',
          'Section Theme',
        ),
      globalThemes,
      'All Global Theme Variations',
    )}
  `;
};
