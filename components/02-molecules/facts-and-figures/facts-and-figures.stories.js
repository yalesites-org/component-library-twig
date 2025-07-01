import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import factsAndFiguresTwig from './yds-facts-and-figures.twig';
import factsAndFiguresData from './facts-and-figures.yml';
import factsAndFiguresIconsData from './facts-and-figures-icons.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

// Process icon data for Storybook controls
const iconOptions = [];
Object.values(factsAndFiguresIconsData.categories).forEach((category) => {
  Object.keys(category.icons).forEach((iconKey) => {
    iconOptions.push(iconKey);
  });
});
/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Facts and Figures',
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
    factsAndFiguresIcon: {
      name: 'Show Icon',
      type: 'boolean',
      defaultValue: false,
    },
    iconName: {
      name: 'Icon Selection',
      options: iconOptions,
      type: 'select',
      // defaultValue: factsAndFiguresIconsData.config.none_label,
      if: { arg: 'factsAndFiguresIcon', eq: true },
    },
  },
};

export const FactsAndFigures = ({
  factsAndFigures,
  content,
  presentationStyle,
  fontStyle,
  alignment,
  themeColor,
  factsAndFiguresIcon,
  iconName,
}) => `

  <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type="single">
    ${factsAndFiguresTwig({
      facts_and_figures__stat: factsAndFiguresData.facts_and_figures__stat,
      facts_and_figures__content:
        factsAndFiguresData.facts_and_figures__content,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__has_icon: 'false',
      facts_and_figures__alignment: 'center',
    })}
    ${factsAndFiguresTwig({
      facts_and_figures__stat: factsAndFiguresData.facts_and_figures__stat,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__has_icon: 'true',
      facts_and_figures__alignment: 'left',
    })}
    ${factsAndFiguresTwig({
      facts_and_figures__stat: factsAndFiguresData.facts_and_figures__stat,
      facts_and_figures__content:
        factsAndFiguresData.facts_and_figures__content,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__alignment: 'center',
      facts_and_figures__has_icon: 'true',
    })}
  </ul>
  <div class="wrap-for-global-theme" data-global-theme="one">
  <h2>Playground</h2>
    <p>Use the StoryBook controls to see the facts and figures below implement the available variations.</p>
    <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type='single'>
      ${factsAndFiguresTwig({
        facts_and_figures__stat: factsAndFigures,
        facts_and_figures__content: content,
        facts_and_figures__presentation_style: presentationStyle,
        facts_and_figures__font_style: fontStyle,
        facts_and_figures__alignment: alignment,
        facts_and_figures__theme: themeColor,
        facts_and_figures__has_icon: factsAndFiguresIcon ? 'true' : 'false',
        facts_and_figures__icon_name:
          factsAndFiguresIcon &&
          iconName !== factsAndFiguresIconsData.config.none_label
            ? iconName
            : null,
      })}
    </ul>
  </div>
`;
