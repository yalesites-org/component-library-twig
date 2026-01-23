import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import textFieldTwig from './yds-text-field.twig';

import textData from './text-field.yml';

import '../../01-atoms/typography/text/yds-text';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Text/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
    },
    variation: {
      name: 'Text Field Variation',
      options: ['default', 'emphasized'],
      type: 'select',
    },
  },
  args: {
    sectionTheme: 'one',
    variation: 'default',
  },
};

export const Playground = ({ sectionTheme, variation }) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different text field variations.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        ${textFieldTwig({
          text_field__content: textData.text_field__content,
          text_field__variation: variation,
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
            ${textFieldTwig({
              text_field__content: textData.text_field__content,
              text_field__variation: variation,
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
