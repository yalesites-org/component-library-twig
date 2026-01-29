import factsAndFiguresTwig from './yds-facts-and-figures.twig';
import factsAndFiguresData from './facts-and-figures.yml';
import factsAndFiguresIconsData from './facts-and-figures-icons.yml';

import { componentThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';
import { createIconMapping, hasIcon } from '../../_storybook/icon-utils';

const iconDisplayToValueMap = createIconMapping(factsAndFiguresIconsData);

export default {
  title: 'Molecules/Facts and Figures/Visreg',
  argTypes: {
    factsAndFigures: {
      name: 'Fact or Figure',
      type: 'string',
    },
    content: {
      name: 'Content',
      type: 'string',
    },
    presentationStyle: {
      name: 'Presentation Style',
      options: ['basic', 'icon-only'],
      type: 'select',
    },
    fontStyle: {
      name: 'Font Style',
      options: ['normal', 'numeric-oldstyle'],
      type: 'select',
    },
    alignment: {
      name: 'Alignment',
      options: ['left', 'center'],
      type: 'select',
    },
    themeColor: {
      name: 'Facts and Figures Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      options: componentThemes,
      type: 'select',
    },
    iconName: {
      name: 'Icon Selection',
      options: iconDisplayToValueMap,
      type: 'select',
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

export const Visreg = ({
  factsAndFigures,
  content,
  presentationStyle,
  fontStyle,
  alignment,
  themeColor,
  iconName,
}) => {
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
  ${createPlaygroundIntro(
    'Use the Storybook controls to see the facts and figures implement the available variations.',
  )}

  ${renderFactsAndFigures(themeColor)}

  <div class="vrt-divider"></div>

  ${createThemeVariations(
    renderFactsAndFigures,
    componentThemes,
    'All Component Theme Variations',
    'Below are all component theme variations for visual regression testing.',
    'Component Theme',
  )}
  `;
};
