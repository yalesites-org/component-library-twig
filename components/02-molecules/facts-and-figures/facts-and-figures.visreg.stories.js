import factsAndFiguresTwig from './yds-facts-and-figures.twig';
import factsAndFiguresData from './facts-and-figures.yml';
import { componentThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';
import { hasIcon } from '../../_storybook/icon-utils';

export default {
  title: 'Molecules/Facts and Figures/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const factsAndFigures = factsAndFiguresData.facts_and_figures__stat;
  const content = factsAndFiguresData.facts_and_figures__content;
  const presentationStyle = 'basic';
  const fontStyle = 'normal';
  const alignment = 'left';
  const iconName = '- None -';

  const hasIconSelected = hasIcon(iconName);

  // Render function for theme variations
  const renderFactsAndFigures = (theme) => `
    <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type='single'>
      ${factsAndFiguresTwig({
        facts_and_figures__stat: factsAndFigures,
        facts_and_figures__content: content,
        facts_and_figures__presentation_style: presentationStyle,
        facts_and_figures__font_style: fontStyle,
        facts_and_figures__alignment: alignment,
        facts_and_figures__theme: theme,
        facts_and_figures__has_icon: hasIconSelected ? 'true' : 'false',
        facts_and_figures__icon_name: hasIconSelected ? iconName : null,
      })}
    </ul>
  `;

  return `
  ${createThemeVariations(
    renderFactsAndFigures,
    componentThemes,
    'All Component Theme Variations',
    'Below are all component theme variations for visual regression testing.',
    'Component Theme',
  )}
  `;
};
