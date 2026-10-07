import accordionTwig from './yds-accordion.twig';
import accordionData from './accordion.yml';

import './yds-accordion';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createThemeVariations,
  createSectionWrapper,
} from '../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Molecules/Accordion/Visreg',
  parameters: {
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
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

  return `
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
    `;
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
