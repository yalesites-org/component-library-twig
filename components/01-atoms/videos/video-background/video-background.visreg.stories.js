import videoBackgroundTwig from './yds-video-background.twig';

import videoBackgroundData from './video-background.yml';

import './yds-video-background';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../../_storybook/global-theme-stories.mjs';
import {
  createThemeVariations,
  createSectionWrapper,
} from '../../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Atoms/Videos/Video Background/Visreg',
  parameters: { controls: { disable: true } },
};

const renderGlobalTheme = () => {
  const renderVideoBackground = (theme) =>
    videoBackgroundTwig({
      ...videoBackgroundData,
      video_background__button__background_color: theme,
    });

  return `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderVideoBackground('one'), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper('one', renderVideoBackground(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Video Background Theme Variations',
        '',
        'Video Background Theme',
      )}
    `;
};

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
