import tokens from '@yalesites-org/tokens/build/json/tokens.json';

// facts_and_figures__group twig
import factsAndFiguresGroupTwig from './yds-facts-and-figures-group.twig';

// Stat default data
import factsAndFiguresGroupData from './facts-and-figures-group.yml';

// Image atom component - generic images for demo
import imageData from '../../01-atoms/images/image/image.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);
/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Facts and Figures Group',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    themeColor: {
      name: 'Component Theme (dial)',
      options: colorPairingsData,
      type: 'select',
      defaultValue: 'one',
    },
    factsAndFiguresGroupHeading: {
      name: 'Infographic Group Heading',
      type: 'string',
      defaultValue: factsAndFiguresGroupData.facts_and_figures__group__heading,
    },
    factsAndFiguresGroupContent: {
      name: 'Infographic Group Content',
      type: 'string',
      defaultValue: factsAndFiguresGroupData.facts_and_figures__group__content,
    },
    factsAndFiguresGroupLink: {
      name: 'Infographic Group Link',
      type: 'string',
      defaultValue:
        factsAndFiguresGroupData.facts_and_figures__group__link__content,
    },
    image: {
      name: 'With image',
      type: 'boolean',
      defaultValue: true,
    },
    factsAndFiguresGroupIcons: {
      name: 'Infographic Group Icons',
      type: 'boolean',
      defaultValue: false,
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
    columnCount: {
      name: 'Column Count',
      options: ['two', 'three', 'four'],
      type: 'select',
      defaultValue: 'three',
    },
    alignment: {
      name: 'Alignment',
      options: ['left', 'center'],
      type: 'select',
      defaultValue: 'left',
    },
  },
};

export const FactsAndFiguresGroup = ({
  factsAndFiguresGroupHeading,
  factsAndFiguresGroupContent,
  factsAndFiguresGroupIcons,
  presentationStyle,
  fontStyle,
  columnCount,
  alignment,
  themeColor,
  image,
}) => {
  return `
    <div class="wrap-for-global-theme">
      ${factsAndFiguresGroupTwig({
        facts_and_figures__group__heading: factsAndFiguresGroupHeading,
        facts_and_figures__group__content: factsAndFiguresGroupContent,
        facts_and_figures__group__has_icon: factsAndFiguresGroupIcons
          ? 'true'
          : 'false',
        facts_and_figures__group__grid_count: columnCount,
        facts_and_figures__group__alignment: alignment,
        facts_and_figures__group__presentation_style: presentationStyle,
        facts_and_figures__group__font_style: fontStyle,
        facts_and_figures__group__theme: themeColor,
        facts_and_figures__group__bg_image: image,
        ...factsAndFiguresGroupData,
        ...imageData.responsive_images['16x9'],
      })}
    </div>
    `;
};
