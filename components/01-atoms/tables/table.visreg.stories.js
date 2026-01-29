import tableTwig from './example-tables.twig';

import './table';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

export default {
  title: 'Atoms/Table/Visreg',
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
  // Render function for table variations
  const renderTable = (theme) => `
    <div data-component-has-divider="false" data-component-theme="${theme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${tableTwig()}
        </div>
      </div>
    </div>
  `;

  return `
    <div style="border-top: 4px solid red; padding-top: 1rem; margin-top: 1rem;">
      <p style="color: red; font-weight: bold;">VRT Divider - Content above is interactive, content below is for visual regression testing</p>
    </div>

    ${createPlaygroundIntro(
      'Use the StoryBook controls to see the table below implement the available variations and colors.',
    )}

    ${renderTable(sectionTheme)}

    ${createThemeVariations(
      renderTable,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
