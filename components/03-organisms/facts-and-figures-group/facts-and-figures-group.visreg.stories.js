import factsAndFiguresGroupTwig from './yds-facts-and-figures-group.twig';
import factsAndFiguresGroupData from './facts-and-figures-group.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import { componentThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Facts and Figures Group/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const styles = ['basic', 'icon-only'];

  // Render function for facts and figures with theme/style combinations
  const renderFactsAndFigures = (theme) =>
    styles
      .map((style) => {
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

        return `
          <h3>Presentation Style: ${style}</h3>
          ${factsAndFiguresGroupTwig({
            facts_and_figures__group__heading:
              factsAndFiguresGroupData.facts_and_figures__group__heading,
            facts_and_figures__group__content:
              factsAndFiguresGroupData.facts_and_figures__group__content,
            facts_and_figures__group__has_icon: 'false',
            facts_and_figures__group__grid_count: 'three',
            facts_and_figures__group__alignment: 'left',
            facts_and_figures__group__presentation_style: style,
            facts_and_figures__group__font_style: 'normal',
            facts_and_figures__group__theme: theme,
            facts_and_figures__group__bg_image: false,
            ...customData,
            ...imageData.responsive_images['16x9'],
          })}
        `;
      })
      .join('');

  return `
    ${createThemeVariations(
      renderFactsAndFigures,
      componentThemes,
      'All Component Theme & Presentation Style Variations',
      'Below are all combinations of component themes and presentation styles for visual regression testing.',
      'Component Theme',
    )}
  `;
};
