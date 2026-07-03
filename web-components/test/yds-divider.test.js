import { describe, it, expect, afterEach } from 'vitest';
import '../src/yds-divider.js';

// Behavioral tests for the <yds-divider> Web Component (epic #1351, Wave 10).
// Percy covers the visual rendering of the Twig source; these cover the parts a
// screenshot cannot: attribute reflection and the enum-validation fallbacks that
// the Lit render() applies (an out-of-range width/position must not reach the DOM).

async function mount(attrs = {}) {
  const el = document.createElement('yds-divider');
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe('<yds-divider>', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('yds-divider')).toBeTruthy();
  });

  it('defaults to width 100 / position center', async () => {
    const el = await mount();
    const inner = el.shadowRoot.querySelector('.divider__inner');
    const rule = el.shadowRoot.querySelector('.divider');
    expect(inner.getAttribute('data-divider-position')).toBe('center');
    expect(rule.getAttribute('data-divider-width')).toBe('100');
  });

  it('reflects a valid width and position', async () => {
    const el = await mount({ width: '50', position: 'left' });
    expect(el.shadowRoot.querySelector('.divider').getAttribute('data-divider-width')).toBe('50');
    expect(el.shadowRoot.querySelector('.divider__inner').getAttribute('data-divider-position')).toBe('left');
  });

  it('falls back to 100 for an out-of-enum width', async () => {
    const el = await mount({ width: '999' });
    expect(el.shadowRoot.querySelector('.divider').getAttribute('data-divider-width')).toBe('100');
  });

  it('falls back to center for an out-of-enum position', async () => {
    const el = await mount({ position: 'diagonal' });
    expect(el.shadowRoot.querySelector('.divider__inner').getAttribute('data-divider-position')).toBe('center');
  });

  it('exposes the separator semantics for assistive tech', async () => {
    const el = await mount();
    const rule = el.shadowRoot.querySelector('.divider');
    expect(rule.getAttribute('role')).toBe('separator');
    expect(rule.getAttribute('aria-orientation')).toBe('horizontal');
  });
});
