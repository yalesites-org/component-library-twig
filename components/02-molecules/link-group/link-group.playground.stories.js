import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import linkGroupTwig from './yds-link-group.twig';

import linkGroupData from './link-group.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link group/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
  },
  args: {
    sectionTheme: 'one',
    heading: linkGroupData.link_group__heading,
  },
};

export const Playground = ({ sectionTheme, heading }) => {
  const themes = colorPairingsData;

  return `
    <h2>Interactive Playground</h2>
    <p>Use the controls to test different settings.</p>

    <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${linkGroupTwig({
            ...linkGroupData,
            link_group__heading: heading,
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
              ${linkGroupTwig({
                ...linkGroupData,
                link_group__heading: heading,
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
