import videoEmbedTwig from './yds-video-embed.twig';

import videoEmbedData from './video-embed.yml';

import { sectionThemes } from '../../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../../_storybook/playground-utils';

export default {
  title: 'Atoms/Videos/Video Embed/Visreg',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
  },
  args: {
    sectionTheme: 'default',
  },
};

export const Visreg = ({ sectionTheme }) => {
  // Render function for video embed variations
  const renderVideoEmbed = (theme) => `
    <div class="yds-layout" data-component-theme="${theme}" data-component-width="site">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${videoEmbedTwig(videoEmbedData)}
        </div>
      </div>
    </div>
  `;

  return `
    <div style="border-top: 4px solid red; padding-top: 1rem; margin-top: 1rem;">
      <p style="color: red; font-weight: bold;">VRT Divider - Content above is interactive, content below is for visual regression testing</p>
    </div>

    ${createPlaygroundIntro(
      'Use the controls to test video embed with different themes.',
    )}

    ${renderVideoEmbed(sectionTheme)}

    ${createThemeVariations(
      renderVideoEmbed,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
