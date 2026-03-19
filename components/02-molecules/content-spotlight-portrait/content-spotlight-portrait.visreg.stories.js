import contentSpotlightPortraitTwig from './yds-content-spotlight-portrait.twig';

import imageData from '../../01-atoms/images/image/image.yml';
import contentSpotlightPortraitData from './content-spotlight-portrait.yml';

import { componentThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

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
  const componentTheme = 'one';
  const position = 'image-left';
  const contentVerticalAlignment = 'middle';
  const imageStyle = 'inline';

  // Render function for content spotlight portrait
  const renderContentSpotlightPortrait = (theme) => `
    <div data-component-theme="${theme}">
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
      renderContentSpotlightPortrait,
      componentThemes,
      'All Section Theme Variations',
      'Below are all theme variations for Content Spotlight Portrait for visual regression testing.',
      'Section Theme',
    )}
  `;
};
