import videoEmbedTwig from './yds-video-embed.twig';

import videoEmbedData from './video-embed.yml';

import { sectionThemes } from '../../../_storybook/theme-constants';
import { createThemeVariations } from '../../../_storybook/playground-utils';

export default {
  title: 'Atoms/Videos/Video Embed/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
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
    ${createThemeVariations(
      renderVideoEmbed,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
