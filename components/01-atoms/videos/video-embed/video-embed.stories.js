import videoEmbedTwig from './yds-video-embed.twig';

import videoEmbedData from './video-embed.yml';
import componentProps from './video-embed-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Atoms/Videos/Video Embed',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    content: videoEmbedData.video_embed__content,
  },
};

export const videoEmbed = ({ content }) =>
  videoEmbedTwig({ video_embed__content: content });
