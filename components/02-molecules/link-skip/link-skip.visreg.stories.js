import linkSkipTwig from './yds-link-skip.twig';

import linkSkipData from './link-skip.yml';

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
  title: 'Molecules/Link skip/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  // Render function for link skip variations
  const renderLinkSkip = (theme) =>
    createSectionWrapper(theme, linkSkipTwig({ ...linkSkipData }));

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderLinkSkip,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
