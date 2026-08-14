import audioEmbedTwig from './yds-audio.twig';
import './yds-audio-player';

import audioEmbedData from './audio.yml';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
  createSectionWrapper,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Atoms/Audio Player/Visreg',
  parameters: {
    controls: { disable: true },
  },
};

const renderAudioPlayer = () =>
  audioEmbedTwig({
    audio_embed__content: audioEmbedData.audio_embed__content,
    audio_embed__url: audioEmbedData.audio_embed__url,
  });

export const Visreg = () =>
  createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (sectionTheme) =>
          createSectionWrapper(sectionTheme, renderAudioPlayer(), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
