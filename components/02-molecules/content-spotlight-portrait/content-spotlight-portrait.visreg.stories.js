import contentSpotlightPortraitTwig from './yds-content-spotlight-portrait.twig';

import imageData from '../../01-atoms/images/image/image.yml';
import contentSpotlightPortraitData from './content-spotlight-portrait.yml';

import {
  componentThemes,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Content Spotlight/Content Spotlight Portrait/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const positions = ['image-left', 'image-right'];
  const imageStyles = ['inline', 'offset'];
  const contentVerticalAlignment = 'middle';

  const renderContentSpotlightPortrait = (
    componentTheme,
    position,
    imageStyle,
  ) =>
    contentSpotlightPortraitTwig({
      ...imageData.responsive_images['2x3'],
      content_spotlight_portrait__theme: componentTheme,
      content_spotlight_portrait__position: position,
      content_spotlight_portrait__vertical_align: contentVerticalAlignment,
      content_spotlight_portrait__style: imageStyle,
      content_spotlight_portrait__heading:
        contentSpotlightPortraitData.content_spotlight_portrait__heading,
      content_spotlight_portrait__subheading:
        contentSpotlightPortraitData.content_spotlight_portrait__subheading,
      content_spotlight_portrait__text:
        contentSpotlightPortraitData.content_spotlight_portrait__text,
      content_spotlight_portrait__link__content:
        contentSpotlightPortraitData.content_spotlight_portrait__link__content,
      content_spotlight_portrait__link__url:
        contentSpotlightPortraitData.content_spotlight_portrait__link__url,
      content_spotlight_portrait__link_two__content:
        contentSpotlightPortraitData.content_spotlight_portrait__link_two__content,
      content_spotlight_portrait__link_two__url:
        contentSpotlightPortraitData.content_spotlight_portrait__link_two__url,
      content_spotlight_portrait__caption:
        contentSpotlightPortraitData.content_spotlight_portrait__caption,
    });

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (sectionTheme) =>
          createSectionWrapper(
            sectionTheme,
            componentThemes
              .map(
                (componentTheme) => `
                  <div class="sb-section__container">
                    <h3 class="sb-section__subheading">Content Spotlight Portrait Theme: ${componentTheme}</h3>
                    ${positions
                      .flatMap((position) =>
                        imageStyles.map(
                          (imageStyle) => `
                        <h4>Position: ${position} / Style: ${imageStyle}</h4>
                        ${renderContentSpotlightPortrait(
                          componentTheme,
                          position,
                          imageStyle,
                        )}
                      `,
                        ),
                      )
                      .join('')}
                  </div>
                `,
              )
              .join(''),
            { width: 'site', primaryWidth: '100%' },
          ),
        sectionThemes,
        'All Section × Content Spotlight Portrait Theme Combinations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
