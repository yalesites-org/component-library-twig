import linkGridTwig from './yds-link-grid.twig';

import linkGridData from './link-grid.yml';

import {
  componentThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link grid/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
    themeColor: {
      name: 'Link Grid Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      type: 'select',
      options: componentThemes,
    },
    lineTreatment: {
      name: 'Line Treatment',
      type: 'select',
      options: ['default', 'all_strong_lines', 'all_light_lines', 'no_lines'],
    },
  },
  args: {
    sectionTheme: 'default',
    themeColor: 'one',
    lineTreatment: 'default',
  },
};

export const Playground = ({ sectionTheme, themeColor, lineTreatment }) => {
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
    ${createPlaygroundIntro(
      'Use the controls to test different theme combinations and line treatments.',
    )}

    ${renderLinkGrid(sectionTheme)}

    ${createThemeVariations(
      renderLinkGrid,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all section theme variations with the selected component theme and line treatment for visual regression testing.',
      'Section Theme',
    )}
  `;
};
