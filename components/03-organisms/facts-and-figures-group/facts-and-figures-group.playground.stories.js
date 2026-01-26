import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import factsAndFiguresGroupTwig from './yds-facts-and-figures-group.twig';
import factsAndFiguresGroupData from './facts-and-figures-group.yml';
import factsAndFiguresIconsData from '../../02-molecules/facts-and-figures/facts-and-figures-icons.yml';
import imageData from '../../01-atoms/images/image/image.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

// Process icon data for Storybook controls
const iconDisplayToValueMap = {
  '- None -': '- None -',
};

if (
  factsAndFiguresIconsData.icons &&
  typeof factsAndFiguresIconsData.icons === 'object'
) {
  Object.entries(factsAndFiguresIconsData.icons).forEach(
    ([iconName, humanReadableName]) => {
      iconDisplayToValueMap[humanReadableName] = iconName;
    },
  );
}

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Facts and Figures Group/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    componentTheme: {
      name: 'Component Theme (dial)',
      options: colorPairingsData,
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

export const Playground = ({
  componentTheme,
  presentationStyle,
  columnCount,
  iconName,
}) => {
  const themes = colorPairingsData;
  const styles = ['basic', 'icon-only'];

  // Determine if icons should be shown
  const hasIcon = iconName && iconName !== '- None -';

  // Custom data with presentation style and icon applied to all items
  const customGroupData = {
    ...factsAndFiguresGroupData,
    facts_and_figures__group:
      factsAndFiguresGroupData.facts_and_figures__group.map((item) => ({
        ...item,
        facts_and_figures__presentation_style: presentationStyle,
        facts_and_figures__has_icon: hasIcon ? 'true' : 'false',
        facts_and_figures__icon_name: hasIcon ? iconName : null,
      })),
  };

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different component themes and presentation styles.</p>

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

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Component Theme & Presentation Style Variations</h2>
  <p>Below are all combinations of component themes and presentation styles for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 4rem; padding: 1rem; border: 2px solid #ccc;">
      <h3 style="margin: 0 0 1.5rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid #333;">Component Theme: ${theme}</h3>
      ${styles
        .map((style) => {
          const customData = {
            ...factsAndFiguresGroupData,
            facts_and_figures__group:
              factsAndFiguresGroupData.facts_and_figures__group.map((item) => ({
                ...item,
                facts_and_figures__presentation_style: style,
                facts_and_figures__has_icon: hasIcon ? 'true' : 'false',
                facts_and_figures__icon_name: hasIcon ? iconName : null,
              })),
          };

          return `
        <div style="margin-bottom: 2rem;">
          <h4 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin-bottom: 1rem;">Presentation Style: ${style}</h4>
          ${factsAndFiguresGroupTwig({
            facts_and_figures__group__heading:
              factsAndFiguresGroupData.facts_and_figures__group__heading,
            facts_and_figures__group__content:
              factsAndFiguresGroupData.facts_and_figures__group__content,
            facts_and_figures__group__has_icon: hasIcon ? 'true' : 'false',
            facts_and_figures__group__grid_count: 'three',
            facts_and_figures__group__alignment: 'left',
            facts_and_figures__group__presentation_style: style,
            facts_and_figures__group__font_style: 'normal',
            facts_and_figures__group__theme: theme,
            facts_and_figures__group__bg_image: false,
            ...customData,
            ...imageData.responsive_images['16x9'],
          })}
        </div>
      `;
        })
        .join('')}
    </div>
  `,
    )
    .join('')}
  `;
};
