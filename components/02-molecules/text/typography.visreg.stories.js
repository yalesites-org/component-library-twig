import textFieldTwig from './yds-text-field.twig';

import textData from './text-field.yml';

import '../../01-atoms/typography/text/yds-text';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Text/Visreg',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
    variation: {
      name: 'Text Field Variation',
      options: ['default', 'emphasized'],
      type: 'select',
    },
  },
  args: {
    sectionTheme: 'default',
    variation: 'default',
  },
};

// *** VRT: Text Field with All Section Theme Variations ***
export const Visreg = ({ sectionTheme, variation }) => {
  // Render function for text field variations
  const renderTextField = (theme) => `
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
  `;

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different text field variations.',
    )}

    ${renderTextField(sectionTheme)}

    ${createThemeVariations(
      renderTextField,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
