import breadcrumbsTwig from './yds-breadcrumbs.twig';
import breadcrumbsData from './breadcrumbs.yml';

import './yds-breadcrumbs';

import { sectionThemes } from '../../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Breadcrumbs/Visreg',
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
    ${createPlaygroundIntro(
      'Use the controls to test different section theme variations.',
    )}

    ${renderBreadcrumbs(sectionTheme)}

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 0.95rem;">
        The variations below test all breadcrumb configurations for visual regression testing with Percy.
      </p>
    </div>

    ${createThemeVariations(
      renderBreadcrumbs,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all section theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
