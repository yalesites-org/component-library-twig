import linkGridTwig from './yds-link-grid.twig';

import linkGridData from './link-grid.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link grid/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const themeColor = 'one';
  const lineTreatment = 'default';

  // Render function for link grid variations
  const renderLinkGrid = (theme) => `
    <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${linkGridTwig({
            link_grid__theme: themeColor,
            link_grid__line_treatment: lineTreatment,
            ...linkGridData,
          })}
        </div>
      </div>
    </div>
  `;

  return `
    ${createThemeVariations(
      renderLinkGrid,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all section theme variations with the selected component theme and line treatment for visual regression testing.',
      'Section Theme',
    )}
  `;
};
