import videoBannerTwig from './video/yds-video-banner.twig';
import videoBannerData from '../../01-atoms/videos/video-embed/video-embed.yml';

import {
  createPlaygroundIntro,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Banners/Video Banner/Visreg',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Visreg = () => `
  ${createPlaygroundIntro(
    'Use the controls to test different Video Banner configurations.',
  )}

  ${createVariations(
    (w) =>
      videoBannerTwig({
        video_banner__content: videoBannerData.video_embed__content,
        video_banner__width: w,
      }),
    ['max', 'full'],
    'Width Variations',
    'Width',
  )}
`;
