import bannerTwig from './action/yds-action-banner.twig';
import bannerData from './banner.yml';
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
  title: 'Organisms/Banners/Action Banner/Visreg',
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
  const linkStyle = 'cta';
  const contentLayout = 'bottom';

  const renderBanner = (bgColor) =>
    bannerTwig({
      ...imageData.responsive_images['16x9'],
      banner__heading: heading,
      banner__snippet: snippet,
      banner__link__content: linkContent,
      banner__link__url:
        linkStyle !== 'none' ? bannerData.banner__link__url : '',
      banner__link__content_two: linkStyle !== 'none' ? linkContentTwo : '',
      banner__link__url_two:
        linkStyle !== 'none' ? bannerData.banner__link__url_two : '',
      banner__link__style: linkStyle,
      banner__content__layout: contentLayout,
      banner__content__background: bgColor,
    });

  return `
    ${createVariations(
      (layout) =>
        bannerTwig({
          ...imageData.responsive_images['16x9'],
          banner__heading: heading,
          banner__snippet: snippet,
          banner__link__content: linkContent,
          banner__link__url:
            linkStyle !== 'none' ? bannerData.banner__link__url : '',
          banner__link__content_two: linkStyle !== 'none' ? linkContentTwo : '',
          banner__link__url_two:
            linkStyle !== 'none' ? bannerData.banner__link__url_two : '',
          banner__link__style: linkStyle,
          banner__content__layout: layout,
          banner__content__background: 'one',
        }),
      ['bottom', 'left', 'right'],
      'Content Layout Variations',
      '',
      'Content Layout',
    )}

    ${createGlobalThemeVariations(
      () => `
        ${createThemeVariations(
          (theme) =>
            createSectionWrapper(theme, renderBanner('one'), {
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
            createSectionWrapper('one', renderBanner(theme), {
              width: 'site',
              primaryWidth: '100%',
            }),
          componentThemes,
          'All Action Banner Theme Variations',
          '',
          'Action Banner Theme',
        )}
      `,
      globalThemes,
      'All Global Theme Variations',
    )}
  `;
};
