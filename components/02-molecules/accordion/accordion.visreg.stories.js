import accordionTwig from './yds-accordion.twig';
import accordionData from './accordion.yml';

import './yds-accordion';

import {
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import {
  createThemeVariations,
  createSectionWrapper,
} from '../../_storybook/playground-utils';

export default {
  title: 'Molecules/Accordion/Visreg',
  parameters: {
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const themeColor = 'one';
  const accordionHeading = accordionData.accordion__heading;
  const accordionItems = Array.from({ length: 3 }, () => ({
    accordion__item__heading: accordionData.accordion__item__heading,
    accordion__item__content: accordionData.accordion__item__content,
  }));

  // Render function for theme variations
  const renderAccordion = () =>
    accordionTwig({
      accordion__theme: themeColor,
      accordion__heading: accordionHeading,
      accordion__items: accordionItems,
    });

  return `
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
