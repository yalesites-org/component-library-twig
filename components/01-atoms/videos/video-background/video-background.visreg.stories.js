import videoBackgroundTwig from './yds-video-background.twig';

import videoBackgroundData from './video-background.yml';

import './yds-video-background';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../../_storybook/global-theme-stories.mjs';
import {
  createThemeVariations,
  createSectionWrapper,
} from '../../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Atoms/Videos/Video Background/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  const renderVideoBackground = (theme) =>
    videoBackgroundTwig({
      ...videoBackgroundData,
      // A looping video lands on a different frame in every snapshot; this one
      // shows the same frame for its whole length. See assets/videos/README.md.
      video_background__content: 'assets/videos/placeholder-static.mp4',
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
