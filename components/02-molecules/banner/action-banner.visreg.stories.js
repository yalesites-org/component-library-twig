import bannerTwig from './action/yds-action-banner.twig';
import bannerData from './banner.yml';
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
  title: 'Molecules/Banners/Action Banner/Visreg',
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
  const linkStyle = 'cta';
  const contentLayout = 'bottom';

  const renderTheme = (theme) => `
    <div data-component-theme="${theme}">
      ${bannerTwig({
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
      })}
    </div>
  `;

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
          banner__content__background: bgColor,
        }),
      ['bottom', 'left', 'right'],
      'Content Layout Variations',
      'Content Layout',
    )}

    ${createThemeVariations(
      renderTheme,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all section theme variations of the Action Banner for visual regression testing.',
      'Section Theme',
    )}
  `;
};
