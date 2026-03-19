import textWithImageTwig from './yds-text-with-image.twig';
import contentSpotlightPortraitTwig from '../content-spotlight-portrait/yds-content-spotlight-portrait.twig';

import imageData from '../../01-atoms/images/image/image.yml';
import textWithImageData from './text-with-image.yml';
import contentSpotlightPortraitData from '../content-spotlight-portrait/content-spotlight-portrait.yml';

import { componentThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Content Spotlight/Content Spotlight Landscape/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const componentTheme = 'one';
  const width = 'site';
  const position = 'image-left';
  const contentVerticalAlignment = 'top';
  const imageStyle = 'inline';
  const focus = 'equal';

  // Render function for content spotlight variations (both landscape and portrait)
  const renderContentSpotlights = (theme) => `
    <div data-component-theme="${theme}">
      <h3>Content Spotlight Landscape (3x2)</h3>
      ${textWithImageTwig({
        ...imageData.responsive_images['3x2'],
        text_with_image__theme: componentTheme,
        text_with_image__width: width,
        text_with_image__position: position,
        text_with_image__vertical_align: contentVerticalAlignment,
        text_with_image__style: imageStyle,
        text_with_image__focus: focus,
        text_with_image__heading: textWithImageData.text_with_image__heading,
        text_with_image__subheading:
          textWithImageData.text_with_image__subheading,
        text_with_image__text: textWithImageData.text_with_image__text,
        text_with_image__link__content:
          textWithImageData.text_with_image__link__content,
        text_with_image__link__url:
          textWithImageData.text_with_image__link__url,
        text_with_image__link_two__content:
          textWithImageData.text_with_image__link_two__content,
        text_with_image__link_two__url:
          textWithImageData.text_with_image__link_two__url,
        text_with_image__caption: textWithImageData.text_with_image__caption,
      })}

      <h3>Content Spotlight Portrait (2x3)</h3>
      ${contentSpotlightPortraitTwig({
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
      })}
    </div>
  `;

  return `
    ${createThemeVariations(
      renderContentSpotlights,
      componentThemes,
      'All Section Theme Variations',
      'Below are all theme variations with both landscape and portrait for visual regression testing.',
      'Section Theme',
    )}
  `;
};
