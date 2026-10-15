import videoTwig from './yds-video.twig';

import videoData from './video.yml';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Video/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  const heading = videoData.video__heading;
  const text = videoData.video__text;
  const placement = videoData.video__placement;

  // Render function for video variations.
  //
  // Wrapped with `createSectionWrapper`, which emits the real section signature
  // (`class="yds-layout"` + `data-section-theme`). This grid iterates
  // `sectionThemes` and labels its axis "Section Theme", but it used to
  // hand-roll `<div data-component-theme="…">` -- no `yds-layout` class, so
  // none of `_yds-layout.scss` applied and it was rendering the BLOCK colour
  // map instead (and nothing at all for `default` and `six`, which the block
  // map does not define). Corrected with the dial split,
  // YaleSites-Internal#1630, since visual regression is the net for exactly
  // that class of bug.
  const renderVideo = (theme) =>
    createSectionWrapper(
      theme,
      videoTwig({
        ...videoData,
        video__heading: heading,
        video__text: text,
        video__alignment: placement,
        video__width: 'site',
      }),
    );

  return createThemeVariations(
    renderVideo,
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
