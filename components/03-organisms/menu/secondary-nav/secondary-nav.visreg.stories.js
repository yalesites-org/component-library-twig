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
  tags: ['visreg'],
  title: 'Organisms/Menu/Content Collection/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const renderSecondaryNav = (componentTheme) => `
    <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-component-width="max" data-component-theme="${componentTheme}">
      ${secondaryNavTwig({ ...secondaryNavData, menu_theme: componentTheme })}
    </div>
  `;

  return createGlobalThemeVariations(
    () => `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderSecondaryNav('one'), {
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
          createSectionWrapper('one', renderSecondaryNav(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Secondary Nav Theme Variations',
        '',
        'Secondary Nav Theme',
      )}
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
