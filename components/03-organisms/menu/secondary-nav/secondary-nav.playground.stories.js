import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import secondaryNavTwig from './yds-secondary-nav.twig';
import secondaryNavData from './secondary-nav.yml';

import './yds-secondary-nav';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Secondary Nav/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    themeColor: {
      name: 'Component Theme (dial)',
      options: colorPairingsData,
      type: 'select',
    },
  },
  args: {
    themeColor: 'one',
  },
};

export const Playground = ({ themeColor }) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different component theme variations.</p>

  <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-component-width="max" data-component-theme="${themeColor}">
    ${secondaryNavTwig({ ...secondaryNavData, menu_theme: themeColor })}
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Component Theme Variations</h2>
  <p>Below are all component theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin-bottom: 1rem;">Component Theme: ${theme}</h3>
      <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-component-width="max" data-component-theme="${theme}">
        ${secondaryNavTwig({ ...secondaryNavData, menu_theme: theme })}
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
