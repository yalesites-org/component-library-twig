import { describe, it, expect, afterEach } from 'vitest';
import '../vanilla/yds-accordion-vanilla.js';

// Runtime tests for the vanilla <yds-accordion-vanilla> — the SAME assertions as
// the Lit yds-accordion test, proving the no-framework port behaves identically:
// collapse-on-attach, per-item toggle ARIA, "toggle all" (2+ items only),
// light-DOM harvesting, rich content, heading-level outline. Vanilla renders
// synchronously, so there is no updateComplete to await.

const ITEMS = [
  { heading: 'First', content: '<p>Body <strong>one</strong>.</p>' },
  { heading: 'Second', content: '<p>Body two.</p>' },
  { heading: 'Third', content: '<p>Body three.</p>' },
];

function mount({ items, attrs = {}, lightDom } = {}) {
  const el = document.createElement('yds-accordion-vanilla');
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  if (lightDom) el.innerHTML = lightDom;
  if (items) el.items = items;
  document.body.appendChild(el);
  return el;
}

const toggles = (el) =>
  el.shadowRoot.querySelectorAll('.accordion-item__toggle');
const toggleAll = (el) => el.shadowRoot.querySelector('.accordion__toggle-all');

afterEach(() => {
  document.body.replaceChildren();
});

describe('<yds-accordion-vanilla>', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('yds-accordion-vanilla')).toBeTruthy();
  });

  it('renders one item per items entry, all collapsed on attach', () => {
    const el = mount({ items: ITEMS });
    expect(el.shadowRoot.querySelectorAll('.accordion-item')).toHaveLength(3);
    toggles(el).forEach((t) =>
      expect(t.getAttribute('aria-expanded')).toBe('false'),
    );
  });

  it('shows the "toggle all" control only with 2+ items', () => {
    const one = mount({ items: [ITEMS[0]] });
    expect(toggleAll(one)).toBeNull();

    const many = mount({ items: ITEMS });
    expect(toggleAll(many)).toBeTruthy();
    expect(toggleAll(many).textContent).toContain('Expand All');
  });

  it('expands a single item on toggle click and updates ARIA', () => {
    const el = mount({ items: ITEMS });
    const first = toggles(el)[0];
    first.click();
    expect(first.getAttribute('aria-expanded')).toBe('true');
    expect(toggles(el)[1].getAttribute('aria-expanded')).toBe('false');
    const region = el.shadowRoot.getElementById(
      first.getAttribute('aria-controls'),
    );
    expect(region).toBeTruthy();
    expect(el.shadowRoot.querySelector('.accordion-item').getAttribute('data-accordion-expanded')).toBe('true');
  });

  it('toggle-all expands then collapses every item and flips its label', () => {
    const el = mount({ items: ITEMS });
    toggleAll(el).click();
    toggles(el).forEach((t) =>
      expect(t.getAttribute('aria-expanded')).toBe('true'),
    );
    expect(toggleAll(el).getAttribute('aria-expanded')).toBe('true');
    expect(toggleAll(el).textContent).toContain('Collapse All');

    toggleAll(el).click();
    toggles(el).forEach((t) =>
      expect(t.getAttribute('aria-expanded')).toBe('false'),
    );
    expect(toggleAll(el).textContent).toContain('Expand All');
  });

  it('harvests light-DOM items when no items property is given', () => {
    const el = mount({
      lightDom:
        '<div data-accordion-heading="Alpha"><p>A</p></div>' +
        '<div data-accordion-heading="Beta"><p>B</p></div>',
    });
    expect(el.shadowRoot.querySelectorAll('.accordion-item')).toHaveLength(2);
    expect(el.shadowRoot.textContent).toContain('Alpha');
  });

  it('injects rich content as HTML, not escaped text', () => {
    const el = mount({ items: ITEMS });
    const content = el.shadowRoot.querySelector('.accordion-item__content');
    expect(content.querySelector('strong')).toBeTruthy();
    expect(content.textContent).toContain('one');
  });

  it('uses h2 item headings without a group heading, h3 with one', () => {
    const flat = mount({ items: ITEMS });
    expect(flat.shadowRoot.querySelector('h2.accordion-item__heading')).toBeTruthy();
    expect(flat.shadowRoot.querySelector('.accordion__heading')).toBeNull();

    const grouped = mount({ items: ITEMS, attrs: { heading: 'FAQ' } });
    expect(grouped.shadowRoot.querySelector('h2.accordion__heading')).toBeTruthy();
    expect(grouped.shadowRoot.querySelector('h3.accordion-item__heading')).toBeTruthy();
  });
});
