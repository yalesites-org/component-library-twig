import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

// Twig templates
import textWithImageTwig from './yds-text-with-image.twig';

// Data files
import imageData from '../../01-atoms/images/image/image.yml';
import textWithImageData from './text-with-image.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

const textWithImageArgs = {
  componentTheme: 'default',
  width: 'site',
  position: 'image-left',
  contentVerticalAlignment: 'top',
  imageStyle: 'inline',
  focus: 'equal',
  overline: null,
  heading: textWithImageData.text_with_image__heading,
  subheading: textWithImageData.text_with_image__subheading,
  text: textWithImageData.text_with_image__text,
  linkContent: textWithImageData.text_with_image__link__content,
  linkTwoContent: textWithImageData.text_with_image__link_two__content,
  caption: textWithImageData.text_with_image__caption,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Content Spotlight/Content Spotlight Landscape',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: addTableDefaults(
    {
      componentTheme: {
        name: 'Component Theme (dial)',
        type: 'select',
        options: ['default', ...colorPairingsData],
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
      overline: {
        name: 'Overline',
        type: 'string',
      },
      heading: {
        name: 'Heading',
        type: 'string',
      },
      subheading: {
        name: 'Subheading',
        type: 'string',
      },
      text: {
        name: 'Text',
        type: 'string',
      },
      linkContent: {
        name: 'Link Content',
        type: 'string',
      },
      linkTwoContent: {
        name: 'Second Link Content',
        type: 'string',
      },
      caption: {
        name: 'Caption',
        type: 'string',
      },
    },
    textWithImageArgs,
  ),
  args: textWithImageArgs,
};

export const ContentSpotlightLandscape = ({
  width,
  position,
  contentVerticalAlignment,
  focus,
  overline,
  heading,
  subheading,
  text,
  linkContent,
  linkTwoContent,
  componentTheme,
  imageStyle,
}) =>
  textWithImageTwig({
    ...imageData.responsive_images['3x2'],
    text_with_image__theme: componentTheme,
    text_with_image__width: width,
    text_with_image__position: position,
    text_with_image__vertical_align: contentVerticalAlignment,
    text_with_image__style: imageStyle,
    text_with_image__focus: focus,
    text_with_image__overline: overline,
    text_with_image__heading: heading,
    text_with_image__subheading: subheading,
    text_with_image__text: text,
    text_with_image__link__content: linkContent,
    text_with_image__link__url: textWithImageData.text_with_image__link__url,
    text_with_image__link_two__content: linkTwoContent,
    text_with_image__link_two__url:
      textWithImageData.text_with_image__link_two__url,
    text_with_image__caption: textWithImageData.text_with_image__caption,
  });
