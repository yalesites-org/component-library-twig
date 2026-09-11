import grandHeroTwig from './grand-hero/yds-grand-hero.twig';
import bannerData from './banner.yml';
import grandHeroData from './grand-hero.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  componentThemes,
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
  title: 'Organisms/Banners/Grand Hero/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderGrandHero = (bgColor, overlay = 'full') =>
  grandHeroTwig({
    ...imageData.responsive_images['16x9'],
    grand_hero__heading: bannerData.banner__heading,
    grand_hero__snippet: bannerData.banner__snippet,
    grand_hero__link__content: bannerData.banner__link__content,
    grand_hero__link__url: grandHeroData.grand_hero__link__url,
    grand_hero__link__content_two: bannerData.banner__link__content_two,
    grand_hero__link__url_two: grandHeroData.grand_hero__link__url_two,
    grand_hero__content__background: bgColor,
    grand_hero__overlay_variation: overlay,
    grand_hero__size: 'full',
    grand_hero__video: 'false',
  });

/**
 * Overlays do not vary by global theme, so they get one story of their own
 * rather than being repeated in every global theme story.
 */
export const OverlayVariations = () =>
  createVariations(
    (overlay) => renderGrandHero('one', overlay),
    ['full', 'contained', 'contained-narrow'],
    'Overlay Variations',
    '',
    'Overlay Variation',
  );

const renderGlobalTheme = () => `
  ${createThemeVariations(
    (theme) =>
      createSectionWrapper(theme, renderGrandHero('one'), {
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
      createSectionWrapper('one', renderGrandHero(theme), {
        width: 'site',
        primaryWidth: '100%',
      }),
    componentThemes,
    'All Grand Hero Theme Variations',
    '',
    'Grand Hero Theme',
  )}
`;

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
