import accordionTwig from './yds-accordion.twig';
import accordionData from './accordion.yml';

import './yds-accordion';

import {
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
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
  const accordionHeading = accordionData.accordion__heading;
  const accordionItems = Array.from({ length: 3 }, () => ({
    accordion__item__heading: accordionData.accordion__item__heading,
    accordion__item__content: accordionData.accordion__item__content,
  }));

  const renderAccordion = (dialTheme) =>
    accordionTwig({
      accordion__theme: dialTheme,
      accordion__heading: accordionHeading,
      accordion__items: accordionItems,
    });

  return createGlobalThemeVariations(
    () => `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderAccordion('one'), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper('one', renderAccordion(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Accordion Theme Variations',
        '',
        'Accordion Theme',
      )}
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
