import { addTableDefaults } from '../../_storybook/add-table-defaults';

import videoBannerTwig from './video/yds-video-banner.twig';
import videoBannerData from '../../01-atoms/videos/video-embed/video-embed.yml';

const defaultArgs = {
  width: 'max',
};

const sharedArgTypes = addTableDefaults(
  {
    width: {
      name: 'Video Width',
      type: 'select',
      options: ['max', 'full'],
    },
  },
  defaultArgs,
);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Banners/Video Banner',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  args: defaultArgs,
  argTypes: sharedArgTypes,
};

export const VideoBanner = ({ width }) =>
  videoBannerTwig({
    video_banner__content: videoBannerData.video_embed__content,
    video_banner__width: width,
  });

VideoBanner.args = defaultArgs;
VideoBanner.argTypes = sharedArgTypes;
