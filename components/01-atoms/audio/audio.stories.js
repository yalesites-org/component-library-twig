import audioEmbedTwig from './yds-audio.twig';
import './yds-audio-player';

import audioEmbedData from './audio.yml';
import componentProps from './audio-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Atoms/Audio Player',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    content: audioEmbedData.audio_embed__content,
    url: audioEmbedData.audio_embed__url,
  },
};

export const audioEmbed = ({ content, url }) =>
  audioEmbedTwig({
    audio_embed__content: content,
    audio_embed__url: url,
  });
