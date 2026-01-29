import factsAndFiguresGroupTwig from './yds-facts-and-figures-group.twig';
import factsAndFiguresGroupData from './facts-and-figures-group.yml';
import factsAndFiguresIconsData from '../../02-molecules/facts-and-figures/facts-and-figures-icons.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import { componentThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';
import { createIconMapping, hasIcon } from '../../_storybook/icon-utils';

const iconDisplayToValueMap = createIconMapping(factsAndFiguresIconsData);

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Facts and Figures Group/Visreg',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    componentTheme: {
      name: 'Facts and Figures Group Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      options: componentThemes,
      type: 'select',
    },
    presentationStyle: {
      name: 'Presentation Style',
      options: ['basic', 'icon-only'],
      type: 'select',
    },
    columnCount: {
      name: 'Column Count',
      options: ['two', 'three', 'four'],
      type: 'select',
    },
    iconName: {
      name: 'Icon Selection',
      options: iconDisplayToValueMap,
      type: 'select',
    },
  },
  args: {
    componentTheme: 'one',
    presentationStyle: 'basic',
    columnCount: 'three',
    iconName: '- None -',
  },
};

export const Visreg = ({
  componentTheme,
  presentationStyle,
  columnCount,
  iconName,
}) => {
  const styles = ['basic', 'icon-only'];

  // Determine if icons should be shown
  const hasIconSelected = hasIcon(iconName);

  // Custom data with presentation style and icon applied to all items
  const customGroupData = {
    ...factsAndFiguresGroupData,
    facts_and_figures__group:
      factsAndFiguresGroupData.facts_and_figures__group.map((item) => ({
        ...item,
        facts_and_figures__presentation_style: presentationStyle,
        facts_and_figures__has_icon: hasIconSelected ? 'true' : 'false',
        facts_and_figures__icon_name: hasIconSelected ? iconName : null,
      })),
  };

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
              facts_and_figures__has_icon: hasIconSelected ? 'true' : 'false',
              facts_and_figures__icon_name: hasIconSelected ? iconName : null,
            })),
        };

        return `
          <h3>Presentation Style: ${style}</h3>
          ${factsAndFiguresGroupTwig({
            facts_and_figures__group__heading:
              factsAndFiguresGroupData.facts_and_figures__group__heading,
            facts_and_figures__group__content:
              factsAndFiguresGroupData.facts_and_figures__group__content,
            facts_and_figures__group__has_icon: hasIconSelected
              ? 'true'
              : 'false',
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
    ${createPlaygroundIntro(
      'Use the controls to test different component themes and presentation styles.',
    )}

    <div class="wrap-for-screenshot">
    ${factsAndFiguresGroupTwig({
      facts_and_figures__group__heading:
        factsAndFiguresGroupData.facts_and_figures__group__heading,
      facts_and_figures__group__content:
        factsAndFiguresGroupData.facts_and_figures__group__content,
      facts_and_figures__group__has_icon: 'false',
      facts_and_figures__group__grid_count: columnCount,
      facts_and_figures__group__alignment: 'left',
      facts_and_figures__group__presentation_style: presentationStyle,
      facts_and_figures__group__font_style: 'normal',
      facts_and_figures__group__theme: componentTheme,
      facts_and_figures__group__bg_image: false,
      ...customGroupData,
      ...imageData.responsive_images['16x9'],
    })}
    </div>

    ${createThemeVariations(
      renderFactsAndFigures,
      componentThemes,
      'All Component Theme & Presentation Style Variations',
      'Below are all combinations of component themes and presentation styles for visual regression testing.',
      'Component Theme',
    )}
  `;
};
