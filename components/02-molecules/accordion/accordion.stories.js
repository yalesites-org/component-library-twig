import accordionTwig from './yds-accordion.twig';

import accordionData from './accordion.yml';

import './yds-accordion';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Accordion',
  argTypes: {
    accordionHeading: {
      name: 'Accordion Heading',
      type: 'string',
      defaultValue: accordionData.accordion__heading,
    },
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: accordionData.accordion__item__heading,
    },
    content: {
      name: 'Content',
      type: 'string',
      defaultValue: accordionData.accordion__item__content,
    },
  },
};

export const Accordion = ({ accordionHeading, heading, content }) => {
  return `
  <h2>With multiple items</h2>
  <div>
    ${accordionTwig({
      accordion__heading: accordionHeading,
      accordion__items: [
        {
          accordion__item__heading: heading,
          accordion__item__content: content,
        },
        {
          accordion__item__heading: accordionData.accordion__item__heading,
          accordion__item__content: accordionData.accordion__item__content,
        },
        {
          accordion__item__heading: accordionData.accordion__item__heading,
          accordion__item__content: accordionData.accordion__item__content,
        },
      ],
    })}
  </div>
  <h2>With one item</h2>
  <div>
    ${accordionTwig({
      accordion__heading: accordionHeading,
      accordion__items: [
        {
          accordion__item__heading: heading,
          accordion__item__content: content,
        },
      ],
    })}
  </div>
    `;
};
