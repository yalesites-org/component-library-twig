import accordionTwig from './yds-accordion.twig';
import accordionData from './accordion.yml';

import './yds-accordion';

export default {
  title: 'Molecules/Accordion',
  tags: ['!dev'],
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
  },
  args: {
    accordionHeading: accordionData.accordion__heading,
    heading: accordionData.accordion__item__heading,
    content: accordionData.accordion__item__content,
    themeColor: 'default',
  },
};

export const Accordion = ({
  accordionHeading,
  heading,
  content,
  themeColor,
}) => `
  ${accordionTwig({
    accordion__theme: themeColor,
    accordion__heading: accordionHeading,
    accordion__items: [
      {
        accordion__item__heading: heading,
        accordion__item__content: content,
      },
    ],
  })}
`;
