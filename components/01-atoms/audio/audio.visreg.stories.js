import audioEmbedTwig from './yds-audio.twig';
import './yds-audio-player';

import audioEmbedData from './audio.yml';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
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

const renderGlobalTheme = () =>
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
  );

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
