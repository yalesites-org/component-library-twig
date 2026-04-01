import breadcrumbsTwig from './yds-breadcrumbs.twig';
import breadcrumbsData from './breadcrumbs.yml';

import './yds-breadcrumbs';

import {
  sectionThemes,
  globalThemes,
} from '../../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Breadcrumbs/Visreg',
  parameters: {
    controls: { disable: true },
  },
};

export const Visreg = () => {
  // Render function for breadcrumbs variations
  const renderBreadcrumbs = (theme) =>
    createSectionWrapper(theme, breadcrumbsTwig({ ...breadcrumbsData }));

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderBreadcrumbs,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all section theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
