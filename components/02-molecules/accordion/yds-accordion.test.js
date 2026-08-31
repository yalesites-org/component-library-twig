/**
 * Behavioral tests for the Accordion (Drupal.behaviors.accordion).
 *
 * This is the pattern Wave 3b extends to the other interactive components. It
 * exercises the JS behavior directly against a DOM fixture that mirrors the
 * rendered accordion markup, asserting the things Percy cannot see: initial
 * collapsed state, expand/collapse on activation, keyboard operability (the
 * toggles are native <button>s), ARIA state changes, and the Expand/Collapse-all
 * control.
 */
import { readFileSync } from 'node:fs';
import { beforeEach, describe, expect, it } from 'vitest';

const behaviorSrc = readFileSync(
  'components/02-molecules/accordion/yds-accordion.js',
  'utf8',
);

// A fixture mirroring the rendered accordion markup the behavior operates on
// (.accordion / .accordion-item / .accordion-item__toggle / __content /
// .accordion__controls / .accordion__toggle-all). Two items so the toggle-all
// control is shown (the behavior hides it for a single item).
const fixture = (items = 2) => {
  const rows = Array.from({ length: items })
    .map(
      (_, i) => `
      <div class="accordion-item" data-accordion-expanded="true">
        <h3 class="accordion-item__heading">
          <button class="accordion-item__toggle" aria-expanded="true">Item ${
            i + 1
          }</button>
        </h3>
        <div class="accordion-item__content">Content ${i + 1}</div>
      </div>`,
    )
    .join('');
  return `
    <div class="accordion" data-component-theme="one">
      <div class="accordion__inner">
        <ul class="accordion__controls">
          <li><button class="accordion__toggle-all" aria-expanded="false">Expand All</button></li>
        </ul>
        ${rows}
      </div>
    </div>`;
};

function attachBehavior(context) {
  // yds-accordion.js assigns Drupal.behaviors.accordion using a global Drupal.
  global.Drupal = { behaviors: {} };
  // eslint-disable-next-line no-new-func
  new Function('Drupal', behaviorSrc)(global.Drupal);
  global.Drupal.behaviors.accordion.attach(context);
}

const items = () => [...document.querySelectorAll('.accordion-item')];
const toggle = (item) => item.querySelector('.accordion-item__toggle');
const expanded = (item) =>
  item.getAttribute('data-accordion-expanded') === 'true';

describe('Drupal.behaviors.accordion', () => {
  beforeEach(() => {
    document.body.innerHTML = fixture(2);
  });

  it('collapses all items on attach', () => {
    attachBehavior(document.body);
    items().forEach((item) => {
      expect(expanded(item)).toBe(false);
      expect(toggle(item).getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('expands a single item when its toggle is activated, leaving others collapsed', () => {
    attachBehavior(document.body);
    toggle(items()[0]).click();
    expect(expanded(items()[0])).toBe(true);
    expect(toggle(items()[0]).getAttribute('aria-expanded')).toBe('true');
    expect(expanded(items()[1])).toBe(false);
  });

  it('collapses an expanded item when its toggle is activated again', () => {
    attachBehavior(document.body);
    const first = items()[0];
    toggle(first).click();
    expect(expanded(first)).toBe(true);
    toggle(first).click();
    expect(expanded(first)).toBe(false);
    expect(toggle(first).getAttribute('aria-expanded')).toBe('false');
  });

  it('toggles are native buttons (keyboard operable) and update ARIA on activation', () => {
    attachBehavior(document.body);
    const btn = toggle(items()[0]);
    expect(btn.tagName).toBe('BUTTON');
    // Enter/Space on a native button dispatch a click; assert the activation
    // path updates the ARIA state the behavior manages.
    btn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('Expand All control expands every item', () => {
    attachBehavior(document.body);
    document.querySelector('.accordion__toggle-all').click();
    items().forEach((item) => {
      expect(expanded(item)).toBe(true);
    });
  });

  it('hides the Expand/Collapse-all control when there is only one item', () => {
    document.body.innerHTML = fixture(1);
    attachBehavior(document.body);
    expect(document.querySelector('.accordion__controls').style.display).toBe(
      'none',
    );
  });
});
