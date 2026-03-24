import secondaryNavTwig from './yds-secondary-nav.twig';
import secondaryNavData from './secondary-nav.yml';

import './yds-secondary-nav';

import {
  componentThemes,
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
  title: 'Organisms/Menu/Content Collection/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  // Render function for secondary nav component theme variations
  const renderSecondaryNav = (componentTheme) => `
    <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-component-width="max" data-component-theme="${componentTheme}">
      ${secondaryNavTwig({ ...secondaryNavData, menu_theme: componentTheme })}
    </div>
  `;

  // Render function wrapping component themes in a section wrapper
  const renderWithSectionTheme = (sectionTheme) =>
    createSectionWrapper(
      sectionTheme,
      createThemeVariations(
        renderSecondaryNav,
        componentThemes,
        'All Component Theme Variations',
        'Below are all component theme variations for visual regression testing.',
        'Component Theme',
      ),
      { width: 'site', primaryWidth: '100%' },
    );

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderWithSectionTheme,
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
