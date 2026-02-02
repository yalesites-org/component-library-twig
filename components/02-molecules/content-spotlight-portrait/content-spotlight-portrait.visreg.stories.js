import contentSpotlightPortraitTwig from './yds-content-spotlight-portrait.twig';

import imageData from '../../01-atoms/images/image/image.yml';
import contentSpotlightPortraitData from './content-spotlight-portrait.yml';

import { componentThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Content Spotlight/Content Spotlight Portrait/Visreg',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: componentThemes,
    },
    componentTheme: {
      name: 'Content Spotlight Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      type: 'select',
      options: componentThemes,
    },
    position: {
      name: 'Image Position',
      type: 'select',
      options: ['image-left', 'image-right'],
    },
    contentVerticalAlignment: {
      name: 'Content Vertical Alignment',
      type: 'select',
      options: ['top', 'middle', 'bottom'],
    },
    imageStyle: {
      name: 'Image Style',
      type: 'select',
      options: ['inline', 'offset'],
    },
  },
  args: {
    sectionTheme: 'one',
    componentTheme: 'one',
    position: 'image-left',
    contentVerticalAlignment: 'middle',
    imageStyle: 'inline',
  },
};

export const Visreg = ({
  componentTheme,
  position,
  contentVerticalAlignment,
  imageStyle,
}) => {
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
    ${createPlaygroundIntro(
      'Content Spotlight Portrait variations for visual regression testing',
    )}
    ${createThemeVariations(
      renderContentSpotlightPortrait,
      componentThemes,
      'All Section Theme Variations',
      'Below are all theme variations for Content Spotlight Portrait for visual regression testing.',
      'Section Theme',
    )}
  `;
};
