// Storybook story for the Lit <yds-accordion> web component.
import './src/yds-accordion.js';

// `items` is a JS array property (arrays can't be HTML attributes), so it can't
// be driven by a Storybook control — we seed a representative set here and let
// the controls drive heading / theme / alignment.
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
      '<p>Compare this with the <em>Vanilla</em> grouping to see the difference.</p>',
  },
];

export default {
  title: 'Web Components/Lit/Accordion',
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

// Return a DOM node (the html renderer accepts one) so we can set the `items`
// property, then let connectedCallback render.
export const Accordion = ({ accordionHeading, theme, alignment }) => {
  const el = document.createElement('yds-accordion');
  if (accordionHeading) el.setAttribute('heading', accordionHeading);
  el.setAttribute('theme', theme);
  el.setAttribute('alignment', alignment);
  el.items = SAMPLE_ITEMS;
  return el;
};
