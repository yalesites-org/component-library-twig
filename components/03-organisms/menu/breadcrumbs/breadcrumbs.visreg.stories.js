import breadcrumbsTwig from './yds-breadcrumbs.twig';
import breadcrumbsData from './breadcrumbs.yml';

import './yds-breadcrumbs';

import { sectionThemes } from '../../../_storybook/theme-constants';
import { createThemeVariations } from '../../../_storybook/playground-utils';

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
  const renderBreadcrumbs = (theme) => `
    <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${breadcrumbsTwig({ ...breadcrumbsData })}
        </div>
      </div>
    </div>
  `;

  return `
    ${createThemeVariations(
      renderBreadcrumbs,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all section theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
