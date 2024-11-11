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
      defaultValue: videoData.video__heading,
    },
    text: {
      name: 'Text',
      type: 'string',
      defaultValue: videoData.video__text,
    },
    placement: {
      name: 'Video Placement',
      type: 'select',
      options: ['left', 'center'],
      defaultValue: videoData.video__placement,
    },
  },
};

export const video = ({ heading, text, placement }) =>
  videoTwig({
    ...videoData,
    video__heading: heading,
    video__text: text,
    video__alignment: placement,
    video__width: 'site',
  });
