import factsAndFiguresTwig from './yds-facts-and-figures.twig';
import factsAndFiguresData from './facts-and-figures.yml';
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

export default {
  tags: ['visreg'],
  title: 'Molecules/Facts and Figures/Visreg',
  parameters: { controls: { disable: true } },
};

const renderGlobalTheme = () => {
  const factsAndFigures = factsAndFiguresData.facts_and_figures__stat;
  const content = factsAndFiguresData.facts_and_figures__content;
  const presentationStyles = ['basic', 'with-icon', 'icon-only'];
  const alignment = 'center';
  const iconName = 'piggy-bank-solid';

  const renderFactsAndFigures = (theme, presentationStyle = 'basic') => `
    <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type='single'>
      ${factsAndFiguresTwig({
        facts_and_figures__stat: factsAndFigures,
        facts_and_figures__content: content,
        facts_and_figures__presentation_style: presentationStyle,
        facts_and_figures__alignment: alignment,
        facts_and_figures__theme: theme,
        facts_and_figures__has_icon:
          presentationStyle !== 'basic' ? 'true' : 'false',
        facts_and_figures__icon_name:
          presentationStyle !== 'basic' ? iconName : null,
      })}
    </ul>
  `;

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
        'All Facts and Figures Theme Variations',
        '',
        'Facts and Figures Theme',
      )}
      ${createVariations(
        (presentationStyle) =>
          createSectionWrapper(
            'one',
            renderFactsAndFigures('one', presentationStyle),
            { width: 'site', primaryWidth: '100%' },
          ),
        presentationStyles,
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
