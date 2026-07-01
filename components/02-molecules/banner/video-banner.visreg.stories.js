import videoBannerTwig from './video/yds-video-banner.twig';
import videoBannerData from '../../01-atoms/videos/video-embed/video-embed.yml';

import { sectionThemes, globalThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Organisms/Banners/Video Banner/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const renderVideoBanner = (width = 'max') =>
    videoBannerTwig({
      video_banner__content: videoBannerData.video_embed__content,
      video_banner__width: width,
    });

  return `
    ${createVariations(
      (w) => renderVideoBanner(w),
      ['max', 'full'],
      'Width Variations',
      '',
      'Width',
    )}

    ${createGlobalThemeVariations(
      () => `
        ${createThemeVariations(
          (theme) =>
            createSectionWrapper(theme, renderVideoBanner(), {
              width: 'site',
              primaryWidth: '100%',
            }),
          sectionThemes,
          'All Section Theme Variations',
          '',
          'Section Theme',
        )}
      `,
      globalThemes,
      'All Global Theme Variations',
    )}
  `;
};
