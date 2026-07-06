import select from './select/yds-select.twig';
import textfields from './textfields/yds-textfields.twig';
import formExample from './contact-form-example.twig';

import selectOptionsData from './select/select.yml';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Atoms/Forms/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const buttonTheme = 'one';

  // Render function for form variations
  const renderForms = (theme) =>
    createSectionWrapper(
      theme,
      `
          <h3>Select Dropdowns</h3>
          ${select(selectOptionsData)}

          <h3>Text Fields</h3>
          ${textfields()}

          <h3>Example Form</h3>
          ${formExample({ buttonTheme })}
        `,
    );

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderForms,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
