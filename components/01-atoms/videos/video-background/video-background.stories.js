import videoBackgroundTwig from './yds-video-background.twig';

import videoBackgroundData from './video-background.yml';

import './yds-video-background';

import { sectionThemes } from '../../../_storybook/theme-constants';
import { addTableDefaults } from '../../../_storybook/add-table-defaults';

const videoBackgroundArgs = {
  sectionTheme: 'default',
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Atoms/Videos/Video Background',
  tags: ['!dev'],
  argTypes: addTableDefaults(
    {
      sectionTheme: {
        name: 'Section Theme',
        description: 'Background color theme for the layout section',
        type: 'select',
        options: sectionThemes,
      },
    },
    videoBackgroundArgs,
  ),
  args: videoBackgroundArgs,
};

export const Interactive = ({ sectionTheme }) => `
  <div class="yds-layout" data-component-theme="${sectionTheme}" data-component-width="site">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        ${videoBackgroundTwig(videoBackgroundData)}
      </div>
    </div>
  </div>
`;

export const videoBackground = () => videoBackgroundTwig(videoBackgroundData);
