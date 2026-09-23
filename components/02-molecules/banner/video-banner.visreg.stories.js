import videoBannerTwig from './video/yds-video-banner.twig';
import videoBannerData from '../../01-atoms/videos/video-embed/video-embed.yml';

import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Organisms/Banners/Video Banner/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderVideoBanner = (width = 'max') =>
  videoBannerTwig({
    video_banner__content: videoBannerData.video_embed__content,
    video_banner__width: width,
  });

/**
 * Widths do not vary by global theme, so they get one story of their own rather
 * than being repeated in every global theme story.
 */
export const WidthVariations = () =>
  createVariations(
    renderVideoBanner,
    ['max', 'full'],
    'Width Variations',
    '',
    'Width',
  );

const renderGlobalTheme = () =>
  createThemeVariations(
    (theme) =>
      createSectionWrapper(theme, renderVideoBanner(), {
        width: 'site',
        primaryWidth: '100%',
      }),
    sectionThemes,
    'All Section Theme Variations',
    '',
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
