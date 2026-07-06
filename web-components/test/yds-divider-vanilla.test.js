import { describe, it, expect, afterEach } from 'vitest';
import '../vanilla/yds-divider-vanilla.js';

// Runtime tests for the vanilla <yds-divider-vanilla> — the SAME assertions as
// the Lit yds-divider test, proving the no-framework port renders identically.
// Vanilla renders synchronously (connectedCallback / attributeChangedCallback),
// so there is no updateComplete to await.

function mount(attrs = {}) {
  const el = document.createElement('yds-divider-vanilla');
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  document.body.appendChild(el);
  return el;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe('<yds-divider-vanilla>', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('yds-divider-vanilla')).toBeTruthy();
  });

  it('defaults to width 100 / position center', () => {
    const el = mount();
    expect(el.shadowRoot.querySelector('.divider__inner').getAttribute('data-divider-position')).toBe('center');
    expect(el.shadowRoot.querySelector('.divider').getAttribute('data-divider-width')).toBe('100');
  });

  it('reflects a valid width and position', () => {
    const el = mount({ width: '50', position: 'left' });
    expect(el.shadowRoot.querySelector('.divider').getAttribute('data-divider-width')).toBe('50');
    expect(el.shadowRoot.querySelector('.divider__inner').getAttribute('data-divider-position')).toBe('left');
  });

  it('falls back to 100 for an out-of-enum width', () => {
    const el = mount({ width: '999' });
    expect(el.shadowRoot.querySelector('.divider').getAttribute('data-divider-width')).toBe('100');
  });

  it('falls back to center for an out-of-enum position', () => {
    const el = mount({ position: 'diagonal' });
    expect(el.shadowRoot.querySelector('.divider__inner').getAttribute('data-divider-position')).toBe('center');
  });

  it('exposes the separator semantics for assistive tech', () => {
    const el = mount();
    const rule = el.shadowRoot.querySelector('.divider');
    expect(rule.getAttribute('role')).toBe('separator');
    expect(rule.getAttribute('aria-orientation')).toBe('horizontal');
  });
});
