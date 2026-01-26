import accordionTwig from './yds-accordion.twig';
import accordionData from './accordion.yml';

import './yds-accordion';

import {
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
  createSectionWrapper,
} from '../../_storybook/playground-utils';

export default {
  title: 'Molecules/Accordion/Playground',
  argTypes: {
    accordionHeading: {
      name: 'Accordion Heading',
      type: 'string',
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
    content: {
      name: 'Content',
      type: 'string',
    },
    themeColor: {
      name: 'Accordion Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      options: componentThemes,
      type: 'select',
    },
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
    itemsToDisplay: {
      name: 'Items to Display',
      options: {
        'One Item': 1,
        'Multiple Items': 3,
      },
      type: 'select',
    },
  },
  args: {
    accordionHeading: accordionData.accordion__heading,
    heading: accordionData.accordion__item__heading,
    content: accordionData.accordion__item__content,
    themeColor: 'one',
    sectionTheme: 'default',
    itemsToDisplay: 3,
  },
};

export const Playground = ({
  accordionHeading,
  heading,
  content,
  themeColor,
  itemsToDisplay,
  sectionTheme,
}) => {
  const accordionItems = Array.from({ length: itemsToDisplay }, (_, index) => ({
    accordion__item__heading:
      index === 0 ? heading : accordionData.accordion__item__heading,
    accordion__item__content:
      index === 0 ? content : accordionData.accordion__item__content,
  }));

  // Render function for theme variations
  const renderAccordion = () =>
    accordionTwig({
      accordion__theme: themeColor,
      accordion__heading: accordionHeading,
      accordion__items: accordionItems,
    });

  return `
  ${createPlaygroundIntro(
    'Use the Storybook controls to see the accordion implement the available variations and colors.',
  )}

  ${createSectionWrapper(sectionTheme, renderAccordion(), {
    width: 'site',
    primaryWidth: '100%',
  })}

  <hr class="sb-section__divider">

  ${createThemeVariations(
    (theme) =>
      createSectionWrapper(theme, renderAccordion(), {
        width: 'site',
        primaryWidth: '100%',
      }),
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations for visual regression testing.',
    'Section Theme',
  )}
  `;
};
