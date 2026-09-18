/**
 * Behavioral tests for the Tabs (Drupal.behaviors.tabs) — Wave 3b (#1357).
 *
 * Percy can't see this: click/keyboard tab activation and the ARIA/is-active
 * state changes. The overflow logic in the behavior is layout-dependent
 * (getBoundingClientRect), which jsdom reports as zero, so it stays inert here;
 * we exercise the activation path (goToTab) via click and arrow keys.
 */
import { readFileSync } from 'node:fs';
import { beforeEach, describe, expect, it } from 'vitest';

const behaviorSrc = readFileSync(
  'components/02-molecules/tabs/yds-tabs.js',
  'utf8',
);

// Fixture mirroring the rendered tabs markup (2 tabs; tab 0 initially active).
const fixture = () => `
  <div class="tabs" data-overflow="none">
    <div class="tabs__tabs">
      <button class="tabs__control tabs__control--left" aria-hidden="true" tabindex="-1"></button>
      <ul class="tabs__nav" role="tablist">
        <li class="tabs__item" role="presentation">
          <a class="tabs__link" role="tab" aria-controls="tab-1-0" href="#tab-1-0" aria-selected="true">One</a>
        </li>
        <li class="tabs__item" role="presentation">
          <a class="tabs__link" role="tab" aria-controls="tab-1-1" href="#tab-1-1" tabindex="-1">Two</a>
        </li>
      </ul>
      <button class="tabs__control tabs__control--right" aria-hidden="true" tabindex="-1"></button>
    </div>
    <div class="tabs__container is-active" role="tabpanel" tabindex="0"><div class="tabs__inner"><div class="tabs__content" id="tab-1-0">Panel one</div></div></div>
    <div class="tabs__container" role="tabpanel" tabindex="0"><div class="tabs__inner"><div class="tabs__content" id="tab-1-1">Panel two</div></div></div>
  </div>`;

function attachBehavior(context) {
  global.Drupal = { behaviors: {} };
  // eslint-disable-next-line no-new-func
  new Function('Drupal', behaviorSrc)(global.Drupal);
  global.Drupal.behaviors.tabs.attach(context);
}

const links = () => [...document.querySelectorAll('.tabs__link')];
const panels = () => [...document.querySelectorAll('.tabs__container')];
const selected = (link) => link.getAttribute('aria-selected') === 'true';
const active = (panel) => panel.classList.contains('is-active');

function pressKey(el, which) {
  const e = new window.KeyboardEvent('keydown', { bubbles: true });
  Object.defineProperty(e, 'which', { value: which });
  el.dispatchEvent(e);
}

describe('Drupal.behaviors.tabs', () => {
  beforeEach(() => {
    document.body.innerHTML = fixture();
  });

  it('starts with the first tab selected and its panel active', () => {
    attachBehavior(document.body);
    expect(selected(links()[0])).toBe(true);
    expect(active(panels()[0])).toBe(true);
    expect(active(panels()[1])).toBe(false);
  });

  it('activates a tab and its panel on click, deactivating the previous', () => {
    attachBehavior(document.body);
    links()[1].click();
    expect(selected(links()[1])).toBe(true);
    expect(active(panels()[1])).toBe(true);
    expect(selected(links()[0])).toBe(false);
    expect(active(panels()[0])).toBe(false);
  });

  it('moves to the next tab with the Right arrow key', () => {
    attachBehavior(document.body);
    pressKey(links()[0], 39);
    expect(selected(links()[1])).toBe(true);
    expect(active(panels()[1])).toBe(true);
  });

  it('moves to the previous tab with the Left arrow key', () => {
    attachBehavior(document.body);
    links()[1].click();
    pressKey(links()[1], 37);
    expect(selected(links()[0])).toBe(true);
    expect(active(panels()[0])).toBe(true);
  });
});
