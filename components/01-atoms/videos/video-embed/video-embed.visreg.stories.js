import videoEmbedTwig from './yds-video-embed.twig';

import STATIC_VIDEO_EMBED from '../../../_storybook/static-video-embed.mjs';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
} from '../../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Atoms/Videos/Video Embed/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  // Render function for video embed variations
  const renderVideoEmbed = (theme) =>
    createSectionWrapper(
      theme,
      videoEmbedTwig({ video_embed__content: STATIC_VIDEO_EMBED }),
    );

  return createThemeVariations(
    renderVideoEmbed,
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations for visual regression testing.',
    'Section Theme',
  );
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
