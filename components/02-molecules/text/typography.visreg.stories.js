import textFieldTwig from './yds-text-field.twig';

import textData from './text-field.yml';

import '../../01-atoms/typography/text/yds-text';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Text/Visreg',
  parameters: { controls: { disable: true } },
};

// *** VRT: Text Field with All Section Theme Variations ***
export const Visreg = () => {
  const variation = 'default';

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
    ${createThemeVariations(
      renderTextField,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
