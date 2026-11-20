/**
 * Behavioral tests for the Modal (Drupal.behaviors.ysModal) — Wave 3b (#1357).
 *
 * Visual regression can't see this: opening from a trigger, the aria-hidden
 * state, Escape and close-button dismissal, and the focus trap.
 *
 * MicroModal keeps a module-level registry keyed by modal id, and Vitest loads
 * it once for the whole file, so each test uses its own modal id.
 */
// eslint-disable-next-line import/no-unresolved -- package uses an exports map the resolver can't read
import once from '@drupal/once';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

let n = 0;
let id;

const fixture = () => `
  <button id="open" data-micromodal-trigger="${id}">Open</button>
  <div class="micromodal-slide" id="${id}" aria-hidden="true">
    <div tabindex="-1" data-micromodal-close>
      <div role="dialog" aria-modal="true" aria-labelledby="${id}-title">
        <h2 id="${id}-title">Title</h2>
        <button id="first" type="button">First</button>
        <button id="last" type="button" data-micromodal-close>Close</button>
      </div>
    </div>
  </div>`;

const modal = () => document.getElementById(id);
const isOpen = () => modal().classList.contains('is-open');
const pressKey = (key, opts = {}) =>
  document.activeElement.dispatchEvent(
    new window.KeyboardEvent('keydown', { key, bubbles: true, ...opts }),
  );

describe('Drupal.behaviors.ysModal', () => {
  beforeAll(async () => {
    global.Drupal = { behaviors: {} };
    global.once = once;
    await import('./yds-modal');
    // jsdom has no layout, so offsetParent is null; MicroModal's focus trap
    // ignores controls it thinks are hidden.
    Object.defineProperty(window.HTMLElement.prototype, 'offsetParent', {
      configurable: true,
      get() {
        return this.parentNode;
      },
    });
  });

  beforeEach(() => {
    n += 1;
    id = `modal-${n}`;
    document.body.innerHTML = fixture();
    global.Drupal.behaviors.ysModal.attach(document);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('is hidden until opened', () => {
    expect(isOpen()).toBe(false);
    expect(modal().getAttribute('aria-hidden')).toBe('true');
  });

  it('opens from its trigger and exposes the dialog', () => {
    document.getElementById('open').click();
    expect(isOpen()).toBe(true);
    expect(modal().getAttribute('aria-hidden')).toBe('false');
  });

  it('moves focus into the dialog when opened', () => {
    document.getElementById('open').click();
    expect(modal().contains(document.activeElement)).toBe(true);
  });

  it('closes and re-hides when a close button is clicked', () => {
    document.getElementById('open').click();
    document.getElementById('last').click();
    expect(isOpen()).toBe(false);
    expect(modal().getAttribute('aria-hidden')).toBe('true');
  });

  it('closes when the backdrop is clicked', () => {
    document.getElementById('open').click();
    modal().querySelector('[tabindex="-1"]').click();
    expect(isOpen()).toBe(false);
    expect(modal().getAttribute('aria-hidden')).toBe('true');
  });

  it('closes on Escape', () => {
    document.getElementById('open').click();
    document.getElementById('first').focus();
    pressKey('Escape');
    // awaitCloseAnimation waits for the CSS animation to end.
    modal().dispatchEvent(new window.Event('animationend'));
    expect(isOpen()).toBe(false);
    expect(modal().getAttribute('aria-hidden')).toBe('true');
  });

  it('traps Tab: from the last control focus wraps to the first', () => {
    document.getElementById('open').click();
    document.getElementById('last').focus();
    pressKey('Tab');
    expect(document.activeElement.id).toBe('first');
  });

  it('traps Shift+Tab: from the first control focus wraps to the last', () => {
    document.getElementById('open').click();
    document.getElementById('first').focus();
    pressKey('Tab', { shiftKey: true });
    expect(document.activeElement.id).toBe('last');
  });
});
