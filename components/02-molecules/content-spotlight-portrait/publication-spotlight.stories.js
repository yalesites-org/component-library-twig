import tokens from '@yalesites-org/tokens/build/json/tokens.json';

// Twig templates
import publicationSpotlightTwig from './yds-publication-spotlight.twig';

// Data files
import imageData from '../../01-atoms/images/image/image.yml';
import publicationSpotlightData from './publication-spotlight.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Content Spotlight/Portrait',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    componentTheme: {
      name: 'Component Theme (dial)',
      type: 'select',
      options: colorPairingsData,
      defaultValue: 'default',
    },
    position: {
      name: 'Image Position',
      type: 'select',
      options: ['image-left', 'image-right'],
      defaultValue: 'image-left',
    },
    imageStyle: {
      name: 'Image Style',
      type: 'select',
      options: ['inline', 'offset'],
      defaultValue: 'inline',
    },
    imageOrientation: {
      name: 'Image Orientation',
      type: 'select',
      options: ['landscape', 'portrait'],
      defaultValue: 'portrait',
    },
    overline: {
      name: 'Overline (optional)',
      type: 'string',
      defaultValue: null,
    },
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: publicationSpotlightData.publication_spotlight__heading,
    },
    subheading: {
      name: 'Subheading (optional)',
      type: 'string',
      defaultValue: publicationSpotlightData.publication_spotlight__subheading,
    },
    text: {
      name: 'Text',
      type: 'string',
      defaultValue: publicationSpotlightData.publication_spotlight__text,
    },
    linkContent: {
      name: 'Link Content (optional)',
      type: 'string',
      defaultValue:
        publicationSpotlightData.publication_spotlight__link__content,
    },
  },
};

export const publicationSpotlight = ({
  position,
  overline,
  heading,
  subheading,
  text,
  linkContent,
  componentTheme,
  imageStyle,
  imageOrientation,
}) =>
  publicationSpotlightTwig({
    ...(imageOrientation === 'portrait'
      ? imageData.responsive_images['2x3']
      : imageData.responsive_images['3x2']),
    publication_spotlight__theme: componentTheme,
    publication_spotlight__position: position,
    publication_spotlight__orientation: imageOrientation,
    publication_spotlight__style: imageStyle,
    publication_spotlight__overline: overline,
    publication_spotlight__heading: heading,
    publication_spotlight__subheading: subheading,
    publication_spotlight__text: text,
    publication_spotlight__link__content: linkContent,
    publication_spotlight__link__url:
      publicationSpotlightData.publication_spotlight__link__url,
  });
