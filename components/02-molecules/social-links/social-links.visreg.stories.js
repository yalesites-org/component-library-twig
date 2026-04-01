import socialLinksTwig from './yds-social-links.twig';

import socialLinksData from './social-links.yml';

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
  title: 'Molecules/Social Links/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  // Render function for social links variations
  const renderSocialLinks = (theme) =>
    createSectionWrapper(theme, socialLinksTwig(socialLinksData));

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderSocialLinks,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
