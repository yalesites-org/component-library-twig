// Twig templates
import textWithVideoTwig from './text-with-video.twig';

// Data files
import videoData from '../../01-atoms/video/video.yml';
import textWithVideoData from './text-with-video.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Text With Video',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: textWithVideoData.text_with_video__heading,
    },
    text: {
      name: 'Text',
      type: 'string',
      defaultValue: textWithVideoData.text_with_video__text,
    },
  },
};

export const TextWithVideo = ({ heading, text }) =>
  textWithVideoTwig({
    ...videoData,
    text_with_video__heading: heading,
    text_with_video__text: text,
  });
