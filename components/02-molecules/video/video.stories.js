// Twig templates
import videoTwig from './yds-video.twig';

// Data files
import videoData from './video.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Video',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
    },
    text: {
      name: 'Text',
      type: 'string',
    },
  },
  args: {
    heading: videoData.video__heading,
    text: videoData.video__text,
  },
};

export const video = ({ heading, text }) =>
  videoTwig({
    ...videoData,
    video__heading: heading,
    video__text: text,
  });
