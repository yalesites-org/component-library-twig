import grandHeroTwig from './grand-hero/yds-grand-hero.twig';
import bannerData from './banner.yml';
import grandHeroData from './grand-hero.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import {
  componentThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
  createVariations,
  createVrtIntro,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Banners/Grand Hero/Visreg',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
    },
    snippet: {
      name: 'Snippet',
      type: 'string',
    },
    linkContent: {
      name: 'Link Content',
      type: 'string',
    },
    linkContentTwo: {
      name: 'Link Content Two',
      type: 'string',
    },
    bgColor: {
      name: 'Banner Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      type: 'select',
      options: componentThemes,
    },
    overlayVariation: {
      name: 'Content Overlay',
      type: 'select',
      options: ['contained', 'contained-narrow', 'full'],
    },
  },
  args: {
    heading: bannerData.banner__heading,
    snippet: bannerData.banner__snippet,
    linkContent: bannerData.banner__link__content,
    linkContentTwo: bannerData.banner__link__content_two,
    bgColor: 'one',
    overlayVariation: 'full',
  },
};

export const Visreg = ({
  heading,
  snippet,
  linkContent,
  linkContentTwo,
  bgColor,
  overlayVariation,
}) => {
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
    ${createPlaygroundIntro(
      'Use the controls to test different Grand Hero Banner configurations.',
    )}

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

    ${createVrtIntro()}

    ${createThemeVariations(
      renderTheme,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all section theme variations of the Grand Hero Banner for visual regression testing.',
      'Section Theme',
    )}
  `;
};
