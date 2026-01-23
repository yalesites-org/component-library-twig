import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import linkSkipTwig from './yds-link-skip.twig';

import linkSkipData from './link-skip.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link skip/Playground',
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
  <p>Skip link component for accessibility. Press Tab to see it appear.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        ${linkSkipTwig({
          ...linkSkipData,
        })}
      </div>
    </div>
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
      <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
        <div class="yds-layout__inner">
          <div class="yds-layout__primary">
            ${linkSkipTwig({
              ...linkSkipData,
            })}
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
