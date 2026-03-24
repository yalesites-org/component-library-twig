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
  title: 'Molecules/Banners/Grand Hero/Visreg',
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
      'Overlay Variation',
    )}

    ${createGlobalThemeVariations(
      () =>
        createThemeVariations(
          (sectionTheme) =>
            createSectionWrapper(
              sectionTheme,
              componentThemes
                .map(
                  (componentTheme) => `
                    <div class="sb-section__container">
                      <h3 class="sb-section__subheading">Grand Hero Theme: ${componentTheme}</h3>
                      ${renderGrandHero(componentTheme)}
                    </div>
                  `,
                )
                .join(''),
              { width: 'site', primaryWidth: '100%' },
            ),
          sectionThemes,
          'All Section × Grand Hero Theme Combinations',
          '',
          'Section Theme',
        ),
      globalThemes,
      'All Global Theme Variations',
    )}
  `;
};
