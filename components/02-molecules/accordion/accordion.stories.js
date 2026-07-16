import accordionTwig from './yds-accordion.twig';
import accordionData from './accordion.yml';
import componentProps from './accordion-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

import './yds-accordion';

export default {
  title: 'Molecules/Accordion',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    heading: accordionData.accordion__item__heading,
    content: accordionData.accordion__item__content,
    accordionHeading: accordionData.accordion__heading,
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
`;
