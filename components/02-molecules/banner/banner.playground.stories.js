import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import bannerTwig from './action/yds-action-banner.twig';
import grandHeroTwig from './grand-hero/yds-grand-hero.twig';
import imageBannerTwig from './image/yds-image-banner.twig';
import videoBannerTwig from './video/yds-video-banner.twig';

import bannerData from './banner.yml';
import grandHeroData from './grand-hero.yml';
import videoBannerData from '../../01-atoms/videos/video-embed/video-embed.yml';

import imageData from '../../01-atoms/images/image/image.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

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
      type: 'select',
      options: colorPairingsData,
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
      name: 'Component Theme (dial)',
      type: 'select',
      options: colorPairingsData,
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
    sectionTheme: 'one',
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
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different banner configurations. All 4 banner types are shown below.</p>

  <div data-component-theme="${sectionTheme}">
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

    <h3 style="margin-top: 2rem;">Grand Hero Banner</h3>
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

    <h3 style="margin-top: 2rem;">Image Banner</h3>
    ${imageBannerTwig({
      ...imageData.responsive_images['16x9'],
      image_banner__content__background: bgColor,
      image_banner__overlay_variation: 'full',
      image_banner__size: 'tall',
      image_banner__video: 'false',
      image_banner__caption: 'Image Banner Caption',
    })}

    <h3 style="margin-top: 2rem;">Video Banner</h3>
    ${videoBannerTwig({
      video_banner__content: videoBannerData.video_embed__content,
      video_banner__width: 'max',
    })}
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations with all 4 banner types for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 3rem;">
      <h3>Section Theme: ${theme}</h3>
      <div data-component-theme="${theme}">
        <h4>Action Banner</h4>
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

        <h4 style="margin-top: 2rem;">Grand Hero Banner</h4>
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

        <h4 style="margin-top: 2rem;">Image Banner</h4>
        ${imageBannerTwig({
          ...imageData.responsive_images['16x9'],
          image_banner__content__background: bgColor,
          image_banner__overlay_variation: 'full',
          image_banner__size: 'tall',
          image_banner__video: 'false',
          image_banner__caption: 'Image Banner Caption',
        })}

        <h4 style="margin-top: 2rem;">Video Banner</h4>
        ${videoBannerTwig({
          video_banner__content: videoBannerData.video_embed__content,
          video_banner__width: 'max',
        })}
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
