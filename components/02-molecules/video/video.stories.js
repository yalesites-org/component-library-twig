// Twig templates
import videoTwig from './yds-video.twig';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

// Data files
import videoData from './video.yml';

const videoArgs = {
  heading: videoData.video__heading,
  text: videoData.video__text,
  placement: videoData.video__placement,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Video',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: addTableDefaults(
    {
      heading: {
        name: 'Heading',
        type: 'string',
      },
      text: {
        name: 'Text',
        type: 'string',
      },
      placement: {
        name: 'Video Placement',
        type: 'select',
        options: ['left', 'center'],
      },
    },
    videoArgs,
  ),
  args: videoArgs,
};

export const Interactive = ({ heading, text, placement }) =>
  videoTwig({
    ...videoData,
    video__heading: heading,
    video__text: text,
    video__alignment: placement,
    video__width: 'site',
  });

export const video = ({ heading, text, placement }) =>
  videoTwig({
    ...videoData,
    video__heading: heading,
    video__text: text,
    video__alignment: placement,
    video__width: 'site',
  });
