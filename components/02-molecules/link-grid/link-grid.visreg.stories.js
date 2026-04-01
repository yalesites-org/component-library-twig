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
  createVariations,
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

  const renderLinkGrid = (dialTheme, lineTreatment = 'default') =>
    linkGridTwig({
      link_grid__theme: dialTheme,
      link_grid__line_treatment: lineTreatment,
      ...linkGridData,
    });

  return createGlobalThemeVariations(
    () => `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderLinkGrid('one'), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper('one', renderLinkGrid(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Link Grid Theme Variations',
        '',
        'Link Grid Theme',
      )}
      ${createVariations(
        (lineTreatment) =>
          createSectionWrapper('one', renderLinkGrid('one', lineTreatment), {
            width: 'site',
            primaryWidth: '100%',
          }),
        lineTreatments,
        'All Line Treatment Variations',
        '',
        'Line Treatment',
      )}
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
