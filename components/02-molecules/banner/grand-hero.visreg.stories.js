import grandHeroTwig from './grand-hero/yds-grand-hero.twig';
import bannerData from './banner.yml';
import grandHeroData from './grand-hero.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import {
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
  createVariations,
  createSectionWrapper,
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

export const Visreg = () => {
  const heading = bannerData.banner__heading;
  const snippet = bannerData.banner__snippet;
  const linkContent = bannerData.banner__link__content;
  const linkContentTwo = bannerData.banner__link__content_two;
  const overlayVariation = 'full';

  const renderGrandHero = (bgColor) =>
    grandHeroTwig({
      ...imageData.responsive_images['16x9'],
      grand_hero__heading: heading,
      grand_hero__snippet: snippet,
      grand_hero__link__content: linkContent,
      grand_hero__link__url: grandHeroData.grand_hero__link__url,
      grand_hero__link__content_two: linkContentTwo,
      grand_hero__link__url_two: grandHeroData.grand_hero__link__url_two,
      grand_hero__content__background: bgColor,
      grand_hero__overlay_variation: overlayVariation,
      grand_hero__size: 'full',
      grand_hero__video: 'false',
    });

  return `
    ${createVariations(
      (overlay) =>
        grandHeroTwig({
          ...imageData.responsive_images['16x9'],
          grand_hero__heading: heading,
          grand_hero__snippet: snippet,
          grand_hero__link__content: linkContent,
          grand_hero__link__url: grandHeroData.grand_hero__link__url,
          grand_hero__link__content_two: linkContentTwo,
          grand_hero__link__url_two: grandHeroData.grand_hero__link__url_two,
          grand_hero__content__background: 'one',
          grand_hero__overlay_variation: overlay,
          grand_hero__size: 'full',
          grand_hero__video: 'false',
        }),
      ['full', 'contained', 'contained-narrow'],
      'Overlay Variations',
      '',
      'Overlay Variation',
    )}

    ${createGlobalThemeVariations(
      () => `
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
      `,
      globalThemes,
      'All Global Theme Variations',
    )}
  `;
};
