/**
 * Behavioral tests for the Alert (Drupal.behaviors.alert) — Wave 3b (#1357).
 *
 * Visual regression can't see this: the toggle's aria-expanded and
 * data-alert-state changes, dismissal, and the remembered state in
 * localStorage (including when storage is blocked).
 */
import { readFileSync } from 'node:fs';
// eslint-disable-next-line import/no-unresolved -- package uses an exports map the resolver can't read
import once from '@drupal/once';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const behaviorSrc = readFileSync(
  'components/02-molecules/alert/yds-alert.js',
  'utf8',
);

const fixture = (type, id = 'ys-alert-id-1') => `
  <div class="alert" data-alert-id="${id}" data-alert-state="expanded" data-alert-type="${type}">
    <button class="alert__toggle" aria-expanded="true">Toggle</button>
  </div>`;

function attachBehavior(context) {
  global.Drupal = { behaviors: {} };
  // core/once is a Drupal global in production; supply it to the behavior source.
  // eslint-disable-next-line no-new-func
  new Function('Drupal', 'once', behaviorSrc)(global.Drupal, once);
  global.Drupal.behaviors.alert.attach(context);
}

const alertEl = () => document.querySelector('.alert');
const toggle = () => document.querySelector('.alert__toggle');
const state = () => alertEl().getAttribute('data-alert-state');
const expanded = () => toggle().getAttribute('aria-expanded');

describe('Drupal.behaviors.alert', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('emergency alert', () => {
    beforeEach(() => {
      document.body.innerHTML = fixture('emergency');
    });

    it('starts expanded', () => {
      attachBehavior(document.body);
      expect(state()).toBe('expanded');
      expect(expanded()).toBe('true');
    });

    it('collapses and updates aria-expanded when the toggle is clicked', () => {
      attachBehavior(document.body);
      toggle().click();
      expect(state()).toBe('collapsed');
      expect(expanded()).toBe('false');
    });

    it('expands again on a second click', () => {
      attachBehavior(document.body);
      toggle().click();
      toggle().click();
      expect(state()).toBe('expanded');
      expect(expanded()).toBe('true');
    });

    it('remembers the collapsed state for the next page load', () => {
      attachBehavior(document.body);
      toggle().click();
      expect(localStorage.getItem('ys-alert-id-1')).toBe('collapsed');

      document.body.innerHTML = fixture('emergency');
      attachBehavior(document.body);
      expect(state()).toBe('collapsed');
      expect(expanded()).toBe('false');
    });
  });

  describe('non-emergency alert', () => {
    beforeEach(() => {
      document.body.innerHTML = fixture('announcement');
    });

    it('is dismissed, with the animation class, when the toggle is clicked', () => {
      attachBehavior(document.body);
      toggle().click();
      expect(state()).toBe('dismissed');
      expect(alertEl().classList.contains('alert__animate')).toBe(true);
    });

    it('stays dismissed on the next page load', () => {
      attachBehavior(document.body);
      toggle().click();

      document.body.innerHTML = fixture('announcement');
      attachBehavior(document.body);
      expect(state()).toBe('dismissed');
    });
  });

  it('clears stale stored alerts when every alert on the page is new', () => {
    localStorage.setItem('ys-alert-id-old', 'dismissed');
    localStorage.setItem('unrelated-key', 'keep');
    document.body.innerHTML = fixture('announcement', 'ys-alert-id-new');
    attachBehavior(document.body);
    expect(localStorage.getItem('ys-alert-id-old')).toBeNull();
    expect(localStorage.getItem('unrelated-key')).toBe('keep');
  });

  it('still toggles when localStorage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    document.body.innerHTML = fixture('emergency');
    attachBehavior(document.body);
    toggle().click();
    expect(state()).toBe('collapsed');
    expect(expanded()).toBe('false');
  });
});
