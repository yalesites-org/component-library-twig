import tableTwig from './example-tables.twig';

import './table';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

export default {
  title: 'Atoms/Table/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
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
    ${createThemeVariations(
      renderTable,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
