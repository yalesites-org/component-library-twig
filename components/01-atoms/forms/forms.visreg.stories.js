import select from './select/yds-select.twig';
import textfields from './textfields/yds-textfields.twig';
import formExample from './contact-form-example.twig';

import selectOptionsData from './select/select.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
  createVrtIntro,
} from '../../_storybook/playground-utils';

export default {
  title: 'Atoms/Forms/Visreg',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
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

export const Visreg = ({ sectionTheme, buttonTheme }) => {
  // Render function for form variations
  const renderForms = (theme) => `
    <div data-component-has-divider="false" data-component-theme="${theme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
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
  `;

  return `
    ${createVrtIntro()}

    ${createPlaygroundIntro(
      'Use the controls to test form elements with different themes.',
    )}

    ${renderForms(sectionTheme)}

    ${createThemeVariations(
      renderForms,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
