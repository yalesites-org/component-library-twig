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
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Organisms/Content Spotlight/Content Spotlight Portrait/Visreg',
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
    position = 'image-left',
    imageStyle = 'inline',
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
    () => `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderContentSpotlightPortrait('one'), {
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
          createSectionWrapper('one', renderContentSpotlightPortrait(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Content Spotlight Portrait Theme Variations',
        '',
        'Content Spotlight Portrait Theme',
      )}
      ${createVariations(
        (position) =>
          createSectionWrapper(
            'one',
            renderContentSpotlightPortrait('one', position),
            { width: 'site', primaryWidth: '100%' },
          ),
        positions,
        'All Position Variations',
        '',
        'Position',
      )}
      ${createVariations(
        (imageStyle) =>
          createSectionWrapper(
            'one',
            renderContentSpotlightPortrait('one', 'image-left', imageStyle),
            { width: 'site', primaryWidth: '100%' },
          ),
        imageStyles,
        'All Image Style Variations',
        '',
        'Image Style',
      )}
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
