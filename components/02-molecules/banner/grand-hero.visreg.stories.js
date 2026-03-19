import grandHeroTwig from './grand-hero/yds-grand-hero.twig';
import bannerData from './banner.yml';
import grandHeroData from './grand-hero.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createThemeVariations,
  createVariations,
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
  const bgColor = 'one';
  const overlayVariation = 'full';

  const renderTheme = (theme) => `
    <div data-component-theme="${theme}">
      ${grandHeroTwig({
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
      })}
    </div>
  `;

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
          grand_hero__content__background: bgColor,
          grand_hero__overlay_variation: overlay,
          grand_hero__size: 'full',
          grand_hero__video: 'false',
        }),
      ['full', 'contained', 'contained-narrow'],
      'Overlay Variations',
      'Overlay Variation',
    )}

    ${createThemeVariations(
      renderTheme,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all section theme variations of the Grand Hero Banner for visual regression testing.',
      'Section Theme',
    )}
  `;
};
