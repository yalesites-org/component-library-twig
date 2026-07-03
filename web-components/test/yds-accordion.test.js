import { describe, it, expect, afterEach } from 'vitest';
import '../src/yds-accordion.js';

// Behavioral tests for the <yds-accordion> Web Component (epic #1351, Wave 10).
// These mirror the Drupal-behavior accordion test (Wave 3b) but exercise the Lit
// port: collapse-on-attach, per-item toggle ARIA, the "toggle all" control (only
// with 2+ items), light-DOM item harvesting, and heading-level outline. Percy is
// blind to all of these.

const ITEMS = [
  { heading: 'First', content: '<p>Body <strong>one</strong>.</p>' },
  { heading: 'Second', content: '<p>Body two.</p>' },
  { heading: 'Third', content: '<p>Body three.</p>' },
];

async function mount({ items, attrs = {}, lightDom } = {}) {
  const el = document.createElement('yds-accordion');
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  if (lightDom) el.innerHTML = lightDom;
  if (items) el.items = items;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const toggles = (el) =>
  el.shadowRoot.querySelectorAll('.accordion-item__toggle');
const toggleAll = (el) => el.shadowRoot.querySelector('.accordion__toggle-all');

afterEach(() => {
  document.body.replaceChildren();
});

describe('<yds-accordion>', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('yds-accordion')).toBeTruthy();
  });

  it('renders one item per items entry, all collapsed on attach', async () => {
    const el = await mount({ items: ITEMS });
    const items = el.shadowRoot.querySelectorAll('.accordion-item');
    expect(items).toHaveLength(3);
    toggles(el).forEach((t) =>
      expect(t.getAttribute('aria-expanded')).toBe('false'),
    );
  });

  it('shows the "toggle all" control only with 2+ items', async () => {
    const one = await mount({ items: [ITEMS[0]] });
    expect(toggleAll(one)).toBeNull();

    const many = await mount({ items: ITEMS });
    expect(toggleAll(many)).toBeTruthy();
    expect(toggleAll(many).textContent).toContain('Expand All');
  });

  it('expands a single item on toggle click and updates ARIA', async () => {
    const el = await mount({ items: ITEMS });
    const first = toggles(el)[0];
    first.click();
    await el.updateComplete;
    expect(first.getAttribute('aria-expanded')).toBe('true');
    // Siblings stay collapsed.
    expect(toggles(el)[1].getAttribute('aria-expanded')).toBe('false');
    const region = el.shadowRoot.getElementById(
      first.getAttribute('aria-controls'),
    );
    expect(region).toBeTruthy();
    expect(el.shadowRoot.querySelector('.accordion-item').getAttribute('data-accordion-expanded')).toBe('true');
  });

  it('toggle-all expands then collapses every item and flips its label', async () => {
    const el = await mount({ items: ITEMS });
    toggleAll(el).click();
    await el.updateComplete;
    toggles(el).forEach((t) =>
      expect(t.getAttribute('aria-expanded')).toBe('true'),
    );
    expect(toggleAll(el).getAttribute('aria-expanded')).toBe('true');
    expect(toggleAll(el).textContent).toContain('Collapse All');

    toggleAll(el).click();
    await el.updateComplete;
    toggles(el).forEach((t) =>
      expect(t.getAttribute('aria-expanded')).toBe('false'),
    );
    expect(toggleAll(el).textContent).toContain('Expand All');
  });

  it('harvests light-DOM items when no items property is given', async () => {
    const el = await mount({
      lightDom:
        '<div data-accordion-heading="Alpha"><p>A</p></div>' +
        '<div data-accordion-heading="Beta"><p>B</p></div>',
    });
    const items = el.shadowRoot.querySelectorAll('.accordion-item');
    expect(items).toHaveLength(2);
    expect(el.shadowRoot.textContent).toContain('Alpha');
  });

  it('injects rich content as HTML, not escaped text', async () => {
    const el = await mount({ items: ITEMS });
    const content = el.shadowRoot.querySelector('.accordion-item__content');
    expect(content.querySelector('strong')).toBeTruthy();
    expect(content.textContent).toContain('one');
  });

  it('uses h2 item headings without a group heading, h3 with one', async () => {
    const flat = await mount({ items: ITEMS });
    expect(flat.shadowRoot.querySelector('h2.accordion-item__heading')).toBeTruthy();
    expect(flat.shadowRoot.querySelector('.accordion__heading')).toBeNull();

    const grouped = await mount({ items: ITEMS, attrs: { heading: 'FAQ' } });
    expect(grouped.shadowRoot.querySelector('h2.accordion__heading')).toBeTruthy();
    expect(grouped.shadowRoot.querySelector('h3.accordion-item__heading')).toBeTruthy();
  });
});
