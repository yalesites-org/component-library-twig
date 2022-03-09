// Twig templates
import textWithImageTwig from './text-with-image.twig';

// Data files
import imageData from '../../01-atoms/images/image/image.yml';
import textWithImageData from './text-with-image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Text With Image',
  argTypes: {
    overline: {
      name: 'Overline (optional)',
      type: 'string',
      defaultValue: null,
    },
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: textWithImageData.text_with_image__heading,
    },
    subheading: {
      name: 'Subheading (optional)',
      type: 'string',
      defaultValue: textWithImageData.text_with_image__subheading,
    },
    text: {
      name: 'Text',
      type: 'string',
      defaultValue: textWithImageData.text_with_image__text,
    },
    linkContent: {
      name: 'Link Content (optional)',
      type: 'string',
      defaultValue: textWithImageData.text_with_image__link__content,
    },
  },
};

export const TextWithImage = ({
  overline,
  heading,
  subheading,
  text,
  linkContent,
}) =>
  textWithImageTwig({
    ...imageData.responsive_images['3x2'],
    text_with_image__overline: overline,
    text_with_image__heading: heading,
    text_with_image__subheading: subheading,
    text_with_image__text: text,
    text_with_image__link__content: linkContent,
    text_with_image__link__url: textWithImageData.text_with_image__link__url,
  });
