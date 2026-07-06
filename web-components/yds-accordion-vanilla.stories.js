// Storybook story for the vanilla (no-Lit) <yds-accordion-vanilla> web component.
// Same controls, items, and behavior as the Lit Accordion story — compare the
// source (web-components/src/yds-accordion.js vs
// web-components/vanilla/yds-accordion-vanilla.js) to see what Lit does for you.
import './vanilla/yds-accordion-vanilla.js';

const SAMPLE_ITEMS = [
  {
    heading: 'What is a Single Directory Component?',
    content:
      '<p>A Drupal render component defined by a <strong>schema</strong> plus a Twig template in one directory.</p>',
  },
  {
    heading: 'Why a web component?',
    content:
      '<p>To consume YaleSites components <strong>outside</strong> Drupal (e.g. OutSystems), framework-neutral.</p>',
  },
  {
    heading: 'Lit or vanilla?',
    content:
      '<p>Compare this with the <em>Lit</em> grouping to see the difference.</p>',
  },
];

export default {
  title: 'Web Components/Vanilla/Accordion',
  tags: ['!dev'],
  argTypes: {
    accordionHeading: {
      control: 'text',
      description: 'Optional group heading above all items',
    },
    theme: {
      control: 'select',
      options: ['default', 'one', 'two', 'three', 'four', 'five'],
      description: 'Color accent',
    },
    alignment: {
      control: 'select',
      options: ['center', 'left'],
    },
  },
  args: { accordionHeading: '', theme: 'default', alignment: 'center' },
};

export const Accordion = ({ accordionHeading, theme, alignment }) => {
  const el = document.createElement('yds-accordion-vanilla');
  if (accordionHeading) el.setAttribute('heading', accordionHeading);
  el.setAttribute('theme', theme);
  el.setAttribute('alignment', alignment);
  el.items = SAMPLE_ITEMS;
  return el;
};
