import accordionTwig from './yds-accordion.twig';
import accordionData from './accordion.yml';

import './yds-accordion';

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
      name: 'Component Theme (dial)',
      options: ['default', 'one', 'two', 'three', 'four', 'five'],
      type: 'select',
    },
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: ['default', 'one', 'two', 'three', 'four'],
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
    themeColor: 'default',
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

  const themes = ['default', 'one', 'two', 'three', 'four'];

  return `
  <h2>Interactive Playground</h2>
  <p>Use the StoryBook controls to see the accordion implement the available variations and colors.</p>

  <div data-component-has-divider="false" data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary" style="width: 100%">
        ${accordionTwig({
          accordion__theme: themeColor,
          accordion__heading: accordionHeading,
          accordion__items: accordionItems,
        })}
      </div>
    </div>
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div data-component-has-divider="false" data-component-theme="${theme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary" style="width: 100%">
          <h3>Section Theme: ${theme}</h3>
          ${accordionTwig({
            accordion__theme: themeColor,
            accordion__heading: accordionHeading,
            accordion__items: accordionItems,
          })}
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
