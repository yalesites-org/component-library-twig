import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import utilityNavExampleTwig from './yds-utility-nav--example.twig';

import './utility-nav-dropdown-menu';

const siteHeaderThemeOptions = Object.keys(tokens['site-header-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Utility Nav/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    siteHeaderTheme: {
      name: 'Site Header Theme',
      options: siteHeaderThemeOptions,
      type: 'select',
    },
  },
  args: {
    siteHeaderTheme: 'one',
  },
};

export const Playground = ({ siteHeaderTheme }) => {
  const themes = siteHeaderThemeOptions;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different site header theme variations.</p>

  <div class="utility-nav--examples">
    ${utilityNavExampleTwig({
      site_header__theme: siteHeaderTheme,
    })}
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Site Header Theme Variations</h2>
  <p>Below are all site header theme variations for visual regression testing.</p>

  <div class="utility-nav--examples">
    ${themes
      .map(
        (theme) => `
      <div style="margin-bottom: 2rem;">
        <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin-bottom: 1rem;">Site Header Theme: ${theme}</h3>
        ${utilityNavExampleTwig({
          site_header__theme: theme,
        })}
      </div>
    `,
      )
      .join('')}
  </div>
  `;
};
