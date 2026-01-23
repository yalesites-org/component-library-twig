import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import linkGridTwig from './yds-link-grid.twig';

import linkGridData from './link-grid.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link grid/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
    },
    themeColor: {
      name: 'Component Theme (dial)',
      type: 'select',
      options: colorPairingsData,
    },
    lineTreatment: {
      name: 'Line Treatment',
      type: 'select',
      options: ['default', 'all_strong_lines', 'all_light_lines', 'no_lines'],
    },
  },
  args: {
    sectionTheme: 'one',
    themeColor: 'one',
    lineTreatment: 'default',
  },
};

export const Playground = ({ sectionTheme, themeColor, lineTreatment }) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different theme combinations and line treatments.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
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

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all section theme variations with the selected component theme and line treatment for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
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
    </div>
  `,
    )
    .join('')}
  `;
};
