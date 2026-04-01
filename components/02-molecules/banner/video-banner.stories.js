import videoBannerTwig from './video/yds-video-banner.twig';
import componentProps from './video-banner-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';
import videoBannerData from '../../01-atoms/videos/video-embed/video-embed.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Banners/Video Banner',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

export const VideoBanner = ({ width }) =>
  videoBannerTwig({
    video_banner__content: videoBannerData.video_embed__content,
    video_banner__width: width,
  });
