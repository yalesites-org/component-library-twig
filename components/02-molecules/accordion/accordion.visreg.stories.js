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
  title: 'Molecules/Accordion/Visreg',
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

export const Visreg = ({
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

  <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

  <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
    <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
    <p style="margin: 0; font-size: 1rem; line-height: 1.5;">
      The sections below show all variations of the accordion component for visual regression testing.
      These are static examples captured by Percy for automated visual testing.
    </p>
  </div>

  ${createThemeVariations(
    (theme) =>
      createSectionWrapper(theme, renderAccordion(), {
        width: 'site',
        primaryWidth: '100%',
      }),
    sectionThemes,
    'All Section Theme Variations',
    'Below are all section theme variations for visual regression testing.',
    'Section Theme',
  )}

  ${createThemeVariations(
    (theme) =>
      createSectionWrapper(
        'one',
        accordionTwig({
          accordion__theme: theme,
          accordion__heading: accordionHeading,
          accordion__items: accordionItems,
        }),
        {
          width: 'site',
          primaryWidth: '100%',
        },
      ),
    componentThemes,
    'All Component Theme Variations',
    'Below are all accordion theme (dial) variations.',
    'Accordion Theme',
  )}
  `;
};
