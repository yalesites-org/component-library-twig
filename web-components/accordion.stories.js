// Accordion — original (Twig) vs Web Component (Lit) vs Web Component (vanilla).
// Uses the ORIGINAL accordion's props.yml (identical controls) and the same three
// items the original story builds, so the only variable is the implementation.
// Purpose: validate the web components are a faithful refactor of the original.
import accordionTwig from '../components/02-molecules/accordion/yds-accordion.twig';
import accordionData from '../components/02-molecules/accordion/accordion.yml';
import componentProps from '../components/02-molecules/accordion/accordion-props.yml';
import { toArgTypes, toArgs } from '../components/_storybook/component-props';
// The original component's Drupal behavior (collapse-on-attach + animation).
import '../components/02-molecules/accordion/yds-accordion';

import './src/yds-accordion.js';
import './vanilla/yds-accordion-vanilla.js';

export default {
  title: 'Web Components/Accordion',
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    heading: accordionData.accordion__item__heading,
    content: accordionData.accordion__item__content,
    accordionHeading: accordionData.accordion__heading,
  },
};

// The same three items the original accordion story assembles.
const twigItems = ({ heading, content }) => [
  { accordion__item__heading: heading, accordion__item__content: content },
  {
    accordion__item__heading: accordionData.accordion__item__heading,
    accordion__item__content: accordionData.accordion__item__content,
  },
  {
    accordion__item__heading: accordionData.accordion__item__heading,
    accordion__item__content: accordionData.accordion__item__content,
  },
];

// Same items, reshaped to the web components' { heading, content } prop.
const wcItems = (a) =>
  twigItems(a).map((i) => ({
    heading: i.accordion__item__heading,
    content: i.accordion__item__content,
  }));

const originalHTML = (a) =>
  accordionTwig({
    accordion__theme: a.themeColor,
    accordion__heading: a.accordionHeading,
    accordion__items: twigItems(a),
  });

const makeWebComponent = (tag, a) => {
  const el = document.createElement(tag);
  if (a.accordionHeading) el.setAttribute('heading', a.accordionHeading);
  if (a.themeColor) el.setAttribute('theme', a.themeColor);
  el.items = wcItems(a);
  return el;
};

const label = (text) => {
  const p = document.createElement('p');
  p.style.cssText = 'font: 600 0.9rem sans-serif; margin: 2rem 0 0.5rem;';
  p.textContent = text;
  return p;
};

const twigNode = (a) => {
  const div = document.createElement('div');
  div.innerHTML = originalHTML(a);
  return div;
};

// The validation view: all three, same controls + items, stacked for a 1-1 check.
export const Comparison = (a) => {
  const root = document.createElement('div');
  root.append(label('Original (Twig)'), twigNode(a));
  root.append(label('Web Component — Lit'), makeWebComponent('yds-accordion', a));
  root.append(
    label('Web Component — Vanilla (no framework)'),
    makeWebComponent('yds-accordion-vanilla', a),
  );
  return root;
};

export const Original = (a) => twigNode(a);
export const Lit = (a) => makeWebComponent('yds-accordion', a);
export const Vanilla = (a) => makeWebComponent('yds-accordion-vanilla', a);
