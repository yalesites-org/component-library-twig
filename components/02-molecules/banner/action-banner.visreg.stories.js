import bannerTwig from './action/yds-action-banner.twig';
import bannerData from './banner.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import {
  componentThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
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
    linkStyle: {
      name: 'Link Style',
      type: 'select',
      options: ['cta', 'text-link', 'none'],
    },
    contentLayout: {
      name: 'Content Layout',
      type: 'select',
      options: ['bottom', 'left', 'right'],
    },
  },
  args: {
    heading: bannerData.banner__heading,
    snippet: bannerData.banner__snippet,
    linkContent: bannerData.banner__link__content,
    linkContentTwo: bannerData.banner__link__content_two,
    bgColor: 'one',
    linkStyle: 'cta',
    contentLayout: 'bottom',
  },
};

export const Visreg = ({
  heading,
  snippet,
  linkContent,
  linkContentTwo,
  bgColor,
  linkStyle,
  contentLayout,
}) => {
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
    ${createPlaygroundIntro(
      'Use the controls to test different Action Banner configurations.',
    )}

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
