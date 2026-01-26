import videoTwig from './yds-video.twig';

import videoData from './video.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Video/Playground',
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
    text: {
      name: 'Text',
      type: 'string',
    },
    placement: {
      name: 'Video Placement',
      type: 'select',
      options: ['left', 'center'],
    },
  },
  args: {
    sectionTheme: 'default',
    heading: videoData.video__heading,
    text: videoData.video__text,
    placement: videoData.video__placement,
  },
};

export const Playground = ({ sectionTheme, heading, text, placement }) => {
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

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different video configurations.',
    )}

    ${renderVideo(sectionTheme)}

    ${createThemeVariations(
      renderVideo,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
