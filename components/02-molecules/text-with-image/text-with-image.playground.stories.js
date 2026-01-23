import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import textWithImageTwig from './yds-text-with-image.twig';
import contentSpotlightPortraitTwig from '../content-spotlight-portrait/yds-content-spotlight-portrait.twig';

import imageData from '../../01-atoms/images/image/image.yml';
import textWithImageData from './text-with-image.yml';
import contentSpotlightPortraitData from '../content-spotlight-portrait/content-spotlight-portrait.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Content Spotlight/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
    },
    componentTheme: {
      name: 'Component Theme (dial)',
      type: 'select',
      options: colorPairingsData,
    },
    width: {
      name: 'Width',
      type: 'select',
      options: ['highlight', 'site'],
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
    focus: {
      name: 'Focus',
      type: 'select',
      options: ['image', 'equal'],
    },
  },
  args: {
    sectionTheme: 'one',
    componentTheme: 'one',
    width: 'site',
    position: 'image-left',
    contentVerticalAlignment: 'top',
    imageStyle: 'inline',
    focus: 'equal',
  },
};

export const Playground = ({
  sectionTheme,
  componentTheme,
  width,
  position,
  contentVerticalAlignment,
  imageStyle,
  focus,
}) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different content spotlight configurations. Both landscape and portrait variants are shown below.</p>

  <div data-component-theme="${sectionTheme}">
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
      text_with_image__link__url: textWithImageData.text_with_image__link__url,
      text_with_image__link_two__content:
        textWithImageData.text_with_image__link_two__content,
      text_with_image__link_two__url:
        textWithImageData.text_with_image__link_two__url,
      text_with_image__caption: textWithImageData.text_with_image__caption,
    })}

    <h3 style="margin-top: 2rem;">Content Spotlight Portrait (2x3)</h3>
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

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations with both landscape and portrait for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 3rem;">
      <h3>Section Theme: ${theme}</h3>
      <div data-component-theme="${theme}">
        <h4>Content Spotlight Landscape (3x2)</h4>
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

        <h4 style="margin-top: 2rem;">Content Spotlight Portrait (2x3)</h4>
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
    </div>
  `,
    )
    .join('')}
  `;
};
