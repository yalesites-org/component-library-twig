import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import factsAndFiguresTwig from './yds-facts-and-figures.twig';
import factsAndFiguresData from './facts-and-figures.yml';
import factsAndFiguresIconsData from './facts-and-figures-icons.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

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

export default {
  title: 'Molecules/Facts and Figures/Playground',
  argTypes: {
    factsAndFigures: {
      name: 'Fact or Figure',
      type: 'string',
      defaultValue: factsAndFiguresData.facts_and_figures__stat,
    },
    content: {
      name: 'Content',
      type: 'string',
      defaultValue: factsAndFiguresData.facts_and_figures__content,
    },
    presentationStyle: {
      name: 'Presentation Style',
      options: ['basic', 'icon-only'],
      type: 'select',
      defaultValue: 'basic',
    },
    fontStyle: {
      name: 'Font Style',
      options: ['normal', 'numeric-oldstyle'],
      type: 'select',
      defaultValue: 'normal',
    },
    alignment: {
      name: 'Alignment',
      options: ['left', 'center'],
      type: 'select',
      defaultValue: 'left',
    },
    themeColor: {
      name: 'Component Theme (dial)',
      options: colorPairingsData,
      type: 'select',
      defaultValue: 'one',
    },
    iconName: {
      name: 'Icon Selection',
      options: iconDisplayToValueMap,
      type: 'select',
      defaultValue: '- None -',
    },
  },
  args: {
    factsAndFigures: factsAndFiguresData.facts_and_figures__stat,
    content: factsAndFiguresData.facts_and_figures__content,
    presentationStyle: 'basic',
    fontStyle: 'normal',
    alignment: 'left',
    themeColor: 'one',
    iconName: '- None -',
  },
};

export const Playground = ({
  factsAndFigures,
  content,
  presentationStyle,
  fontStyle,
  alignment,
  themeColor,
  iconName,
}) => {
  const hasIcon = iconName && iconName !== '- None -';
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the StoryBook controls to see the facts and figures implement the available variations.</p>
  <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type='single'>
    ${factsAndFiguresTwig({
      facts_and_figures__stat: factsAndFigures,
      facts_and_figures__content: content,
      facts_and_figures__presentation_style: presentationStyle,
      facts_and_figures__font_style: fontStyle,
      facts_and_figures__alignment: alignment,
      facts_and_figures__theme: themeColor,
      facts_and_figures__has_icon: hasIcon ? 'true' : 'false',
      facts_and_figures__icon_name: hasIcon ? iconName : null,
    })}
  </ul>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Component Theme Variations</h2>
  <p>Below are all component theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin-bottom: 1rem;">Component Theme: ${theme}</h3>
      <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type='single'>
        ${factsAndFiguresTwig({
          facts_and_figures__stat: factsAndFigures,
          facts_and_figures__content: content,
          facts_and_figures__presentation_style: presentationStyle,
          facts_and_figures__font_style: fontStyle,
          facts_and_figures__alignment: alignment,
          facts_and_figures__theme: theme,
          facts_and_figures__has_icon: hasIcon ? 'true' : 'false',
          facts_and_figures__icon_name: hasIcon ? iconName : null,
        })}
      </ul>
    </div>
  `,
    )
    .join('')}
  `;
};
