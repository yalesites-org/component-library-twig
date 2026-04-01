import factsAndFiguresTwig from './yds-facts-and-figures.twig';
import factsAndFiguresData from './facts-and-figures.yml';
import {
  componentThemes,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

export default {
  title: 'Molecules/Facts and Figures/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const factsAndFigures = factsAndFiguresData.facts_and_figures__stat;
  const content = factsAndFiguresData.facts_and_figures__content;
  const presentationStyles = ['basic', 'with-icon', 'icon-only'];
  const fontStyles = ['numeric-oldstyle', 'normal'];
  const alignment = 'center';
  const iconName = 'piggy-bank-solid';

  const renderFactsAndFigures = (
    theme,
    presentationStyle = 'basic',
    fontStyle = 'normal',
  ) => `
    <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type='single'>
      ${factsAndFiguresTwig({
        facts_and_figures__stat: factsAndFigures,
        facts_and_figures__content: content,
        facts_and_figures__presentation_style: presentationStyle,
        facts_and_figures__font_style: fontStyle,
        facts_and_figures__alignment: alignment,
        facts_and_figures__theme: theme,
        facts_and_figures__has_icon:
          presentationStyle !== 'basic' ? 'true' : 'false',
        facts_and_figures__icon_name:
          presentationStyle !== 'basic' ? iconName : null,
      })}
    </ul>
  `;

  return createGlobalThemeVariations(
    () => `
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
      ${createVariations(
        (fontStyle) =>
          createSectionWrapper(
            'one',
            renderFactsAndFigures('one', 'basic', fontStyle),
            {
              width: 'site',
              primaryWidth: '100%',
            },
          ),
        fontStyles,
        'All Font Style Variations',
        '',
        'Font Style',
      )}
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
