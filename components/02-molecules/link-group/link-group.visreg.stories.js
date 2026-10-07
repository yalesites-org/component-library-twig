import linkGroupTwig from './yds-link-group.twig';

import linkGroupData from './link-group.yml';

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
  title: 'Molecules/Link group/Visreg',
  parameters: { controls: { disable: true } },
};

const renderGlobalTheme = () => {
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

  return createThemeVariations(
    renderLinkGroup,
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
