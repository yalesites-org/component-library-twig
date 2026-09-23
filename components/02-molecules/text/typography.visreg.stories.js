import textFieldTwig from './yds-text-field.twig';

import textData from './text-field.yml';

import '../../01-atoms/typography/text/yds-text';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
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
const renderGlobalTheme = () => {
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

  return createThemeVariations(
    renderTextField,
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations for visual regression testing.',
    'Section Theme',
  );
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
