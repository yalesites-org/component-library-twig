import factsAndFiguresGroupTwig from './yds-facts-and-figures-group.twig';
import factsAndFiguresGroupData from './facts-and-figures-group.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import {
  componentThemes,
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Organisms/Facts and Figures Group/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  const styles = ['basic', 'with-icon', 'icon-only'];

  const renderFactsAndFigures = (theme, style = 'basic') => {
    const customData = {
      ...factsAndFiguresGroupData,
      facts_and_figures__group:
        factsAndFiguresGroupData.facts_and_figures__group.map((item) => ({
          ...item,
          facts_and_figures__presentation_style: style,
          facts_and_figures__has_icon: 'false',
          facts_and_figures__icon_name: null,
        })),
    };

    return factsAndFiguresGroupTwig({
      facts_and_figures__group__heading:
        factsAndFiguresGroupData.facts_and_figures__group__heading,
      facts_and_figures__group__content:
        factsAndFiguresGroupData.facts_and_figures__group__content,
      facts_and_figures__group__has_icon: 'false',
      facts_and_figures__group__grid_count: 'three',
      facts_and_figures__group__alignment: 'left',
      facts_and_figures__group__presentation_style: style,
      facts_and_figures__group__theme: theme,
      facts_and_figures__group__bg_image: false,
      ...customData,
      ...imageData.responsive_images['16x9'],
    });
  };

  return `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderFactsAndFigures('one'), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper('one', renderFactsAndFigures(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Facts and Figures Group Theme Variations',
        '',
        'Facts and Figures Group Theme',
      )}
      ${createVariations(
        (style) =>
          createSectionWrapper('one', renderFactsAndFigures('one', style), {
            width: 'site',
            primaryWidth: '100%',
          }),
        styles,
        'All Presentation Style Variations',
        '',
        'Presentation Style',
      )}
    `;
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
