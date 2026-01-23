import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import primaryNavTwig from './yds-primary-nav.twig';
import primaryNavData from './primary-nav.yml';

import './yds-primary-nav';

const siteHeaderThemeOptions = Object.keys(tokens['site-header-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Primary Nav/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    siteHeaderTheme: {
      name: 'Site Header Theme',
      options: siteHeaderThemeOptions,
      type: 'select',
    },
    menuVariation: {
      name: 'Menu Variation',
      options: ['basic', 'mega', 'focus'],
      type: 'select',
    },
  },
  args: {
    siteHeaderTheme: 'one',
    menuVariation: 'basic',
  },
};

export const Playground = ({ siteHeaderTheme, menuVariation }) => {
  const themes = siteHeaderThemeOptions;
  const variations = ['basic', 'mega', 'focus'];

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different site header theme and menu variation combinations.</p>

  <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-site-header-nav-position='left' data-component-width="max" data-header-theme="${siteHeaderTheme}">
    ${primaryNavTwig({ ...primaryNavData, menu__variation: menuVariation })}
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Site Header Theme & Menu Variation Combinations</h2>
  <p>Below are all combinations of site header themes and menu variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 4rem; padding: 1rem; border: 2px solid #ccc;">
      <h3 style="margin: 0 0 1.5rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid #333;">Site Header Theme: ${theme}</h3>
      ${variations
        .map(
          (variation) => `
        <h4 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin: 2rem 0 1rem 0;">Menu Variation: ${variation}</h4>
        <div style="position: relative; padding-top: var(--size-spacing-site-gutter); margin-bottom: 2rem;" data-site-header-nav-position='left' data-component-width="max" data-header-theme="${theme}">
          ${primaryNavTwig({ ...primaryNavData, menu__variation: variation })}
        </div>
      `,
        )
        .join('')}
    </div>
  `,
    )
    .join('')}
  `;
};
