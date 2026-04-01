// Twig templates
import videoTwig from './yds-video.twig';

// Data files
import videoData from './video.yml';
import componentProps from './video-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Video',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    heading: videoData.video__heading,
    text: videoData.video__text,
  },
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
