import bannerTwig from './action/yds-action-banner.twig';
import grandHeroTwig from './grand-hero/yds-grand-hero.twig';
import imageBannerTwig from './image/yds-image-banner.twig';
import videoBannerTwig from './video/yds-video-banner.twig';

import bannerData from './banner.yml';
import grandHeroData from './grand-hero.yml';
import videoBannerData from '../../01-atoms/videos/video-embed/video-embed.yml';

import imageData from '../../01-atoms/images/image/image.yml';

import {
  componentThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Banners/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
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
    sectionTheme: 'default',
    heading: bannerData.banner__heading,
    snippet: bannerData.banner__snippet,
    linkContent: bannerData.banner__link__content,
    linkContentTwo: bannerData.banner__link__content_two,
    bgColor: 'one',
    linkStyle: 'cta',
    contentLayout: 'bottom',
  },
};

export const Playground = ({
  sectionTheme,
  heading,
  snippet,
  linkContent,
  linkContentTwo,
  bgColor,
  linkStyle,
  contentLayout,
}) => {
  // Render function for banner variations
  const renderBanners = (theme) => `
    <div data-component-theme="${theme}">
      <h3>Action Banner</h3>
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

      <h3>Grand Hero Banner</h3>
      ${grandHeroTwig({
        ...imageData.responsive_images['16x9'],
        grand_hero__heading: heading,
        grand_hero__snippet: snippet,
        grand_hero__link__content: linkContent,
        grand_hero__link__url: grandHeroData.grand_hero__link__url,
        grand_hero__link__content_two: linkContentTwo,
        grand_hero__link__url_two: grandHeroData.grand_hero__link__url_two,
        grand_hero__content__background: bgColor,
        grand_hero__overlay_variation: 'full',
        grand_hero__size: 'full',
        grand_hero__video: 'false',
      })}

      <h3>Image Banner</h3>
      ${imageBannerTwig({
        ...imageData.responsive_images['16x9'],
        image_banner__content__background: bgColor,
        image_banner__overlay_variation: 'full',
        image_banner__size: 'tall',
        image_banner__video: 'false',
        image_banner__caption: 'Image Banner Caption',
      })}

      <h3>Video Banner</h3>
      ${videoBannerTwig({
        video_banner__content: videoBannerData.video_embed__content,
        video_banner__width: 'max',
      })}
    </div>
  `;

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different banner configurations. All 4 banner types are shown below.',
    )}

    ${renderBanners(sectionTheme)}

    ${createThemeVariations(
      renderBanners,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations with all 4 banner types for visual regression testing.',
      'Section Theme',
    )}
  `;
};
