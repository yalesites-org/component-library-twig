import videoTwig from './yds-video.twig';

import videoData from './video.yml';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Video/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const heading = videoData.video__heading;
  const text = videoData.video__text;
  const placement = videoData.video__placement;

  // Render function for video variations
  const renderVideo = (theme) => `
    <div data-component-theme="${theme}">
      ${videoTwig({
        ...videoData,
        video__heading: heading,
        video__text: text,
        video__alignment: placement,
        video__width: 'site',
      })}
    </div>
  `;

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderVideo,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
