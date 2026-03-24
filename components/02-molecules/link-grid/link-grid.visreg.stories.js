import linkGridTwig from './yds-link-grid.twig';

import linkGridData from './link-grid.yml';

import {
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
  createSectionWrapper,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link grid/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const lineTreatments = [
    'default',
    'all_strong_lines',
    'all_light_lines',
    'no_lines',
  ];

  const renderLinkGrid = (dialTheme, lineTreatment) =>
    linkGridTwig({
      link_grid__theme: dialTheme,
      link_grid__line_treatment: lineTreatment,
      ...linkGridData,
    });

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (sectionTheme) =>
          createSectionWrapper(
            sectionTheme,
            componentThemes
              .map(
                (componentTheme) => `
                  <div class="sb-section__container">
                    <h3 class="sb-section__subheading">Link Grid Theme: ${componentTheme}</h3>
                    ${lineTreatments
                      .map(
                        (lineTreatment) => `
                      <h4>Line Treatment: ${lineTreatment}</h4>
                      ${renderLinkGrid(componentTheme, lineTreatment)}
                    `,
                      )
                      .join('')}
                  </div>
                `,
              )
              .join(''),
            { width: 'site', primaryWidth: '100%' },
          ),
        sectionThemes,
        'All Section × Link Grid Theme Combinations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
