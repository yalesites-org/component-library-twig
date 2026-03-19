import videoBackgroundTwig from './yds-video-background.twig';

import videoBackgroundData from './video-background.yml';

import './yds-video-background';

import { sectionThemes } from '../../../_storybook/theme-constants';
import { createThemeVariations } from '../../../_storybook/playground-utils';

export default {
  title: 'Atoms/Videos/Video Background/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  // Render function for video background variations
  const renderVideoBackground = (theme) => `
    <div class="yds-layout" data-component-theme="${theme}" data-component-width="site">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${videoBackgroundTwig(videoBackgroundData)}
        </div>
      </div>
    </div>
  `;

  return `
    ${createThemeVariations(
      renderVideoBackground,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
