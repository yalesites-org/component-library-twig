import textFieldTwig from './yds-text-field.twig';

import textData from './text-field.yml';

import '../../01-atoms/typography/text/yds-text';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Atoms/Text/Visreg',
  parameters: { controls: { disable: true } },
};

// *** VRT: Text Field with All Section Theme Variations ***
export const Visreg = () => {
  const variation = 'default';

  // Render function for text field variations
  const renderTextField = (theme) =>
    createSectionWrapper(
      theme,
      textFieldTwig({
        text_field__content: textData.text_field__content,
        text_field__variation: variation,
      }),
    );

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderTextField,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
