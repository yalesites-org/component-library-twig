import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import breadcrumbsTwig from './yds-breadcrumbs.twig';
import breadcrumbsData from './breadcrumbs.yml';

import './yds-breadcrumbs';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Breadcrumbs/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
    },
  },
  args: {
    sectionTheme: 'one',
  },
};

export const Playground = ({ sectionTheme }) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different section theme variations.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        ${breadcrumbsTwig({ ...breadcrumbsData })}
      </div>
    </div>
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all section theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin-bottom: 1rem;">Section Theme: ${theme}</h3>
      <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
        <div class="yds-layout__inner">
          <div class="yds-layout__primary">
            ${breadcrumbsTwig({ ...breadcrumbsData })}
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
