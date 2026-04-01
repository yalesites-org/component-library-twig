import linkGroupTwig from './yds-link-group.twig';

import linkGroupData from './link-group.yml';

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
  title: 'Molecules/Link group/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const heading = linkGroupData.link_group__heading;

  // Render function for link group variations
  const renderLinkGroup = (theme) =>
    createSectionWrapper(
      theme,
      linkGroupTwig({
        ...linkGroupData,
        link_group__heading: heading,
      }),
    );

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderLinkGroup,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
