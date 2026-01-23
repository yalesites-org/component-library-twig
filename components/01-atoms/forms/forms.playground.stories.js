import select from './select/yds-select.twig';
import textfields from './textfields/yds-textfields.twig';
import formExample from './contact-form-example.twig';

import selectOptionsData from './select/select.yml';

export default {
  title: 'Atoms/Forms/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: ['default', 'one', 'two', 'three', 'four'],
    },
    buttonTheme: {
      name: 'Button Theme',
      type: 'select',
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven'],
    },
  },
  args: {
    sectionTheme: 'default',
    buttonTheme: 'one',
  },
};

export const Playground = ({ sectionTheme, buttonTheme }) => {
  const themes = ['default', 'one', 'two', 'three', 'four'];

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test form elements with different themes.</p>

  <div data-component-has-divider="false" data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        <h3>Select Dropdowns</h3>
        ${select(selectOptionsData)}

        <h3>Text Fields</h3>
        ${textfields()}

        <h3>Example Form</h3>
        ${formExample({ buttonTheme })}
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
      <div data-component-has-divider="false" data-component-theme="${theme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
        <div class="yds-layout__inner">
          <div class="yds-layout__primary">
            <h4>Select Dropdowns</h4>
            ${select(selectOptionsData)}

            <h4>Text Fields</h4>
            ${textfields()}

            <h4>Example Form</h4>
            ${formExample({ buttonTheme })}
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
