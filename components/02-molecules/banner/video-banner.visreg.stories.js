import videoBannerTwig from './video/yds-video-banner.twig';
import videoBannerData from '../../01-atoms/videos/video-embed/video-embed.yml';

import { createPlaygroundIntro } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Banners/Video Banner/Visreg',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    width: {
      name: 'Video Width',
      type: 'select',
      options: ['max', 'full'],
    },
  },
  args: {
    width: 'max',
  },
};

export const Visreg = () => {
  const renderWidths = () =>
    ['max', 'full']
      .map(
        (w) => `
      <h3 style="padding: 1rem; background: #f5f5f5;">Width: ${w}</h3>
      ${videoBannerTwig({
        video_banner__content: videoBannerData.video_embed__content,
        video_banner__width: w,
      })}
    `,
      )
      .join('');

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different Video Banner configurations.',
    )}

    <h2 style="padding: 1rem;">Width Variations</h2>
    ${renderWidths()}
  `;
};
