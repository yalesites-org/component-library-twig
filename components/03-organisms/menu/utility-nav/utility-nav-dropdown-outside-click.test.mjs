/**
 * Pins that the Utility Nav dropdown closes when the click lands outside it.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/03-organisms/menu/utility-nav/utility-nav-dropdown-outside-click.test.mjs
 *
 * The primary and secondary navs already close on outside click, so a Utility
 * Nav dropdown that stays open reads as broken -- and it is what lets the
 * dropdown sit on top of a mega menu opened afterwards from the main nav.
 *
 * The trap, and the reason this is pinned rather than left to review: the
 * containment check has two plausible-looking subjects and only one of them
 * works. `.utility-nav__dropdown` (the `nav`) wraps BOTH the CTA toggle and the
 * panel; `.utility-nav__dropdown-content` (the `content`) wraps only the panel.
 * Checking containment against `content` reads correctly line by line, but the
 * toggle's own click bubbles to the same window listener, so every open would
 * be undone by the click that opened it and the dropdown would never appear at
 * all. Nothing in the diff shows that -- only firing a real click through the
 * toggle and then out to the window does.
 *
 * The second pinned property is that closing sets state rather than merely
 * hiding: `aria-expanded` on the nav AND the toggle, `aria-hidden` on the
 * content. A close that only flips a class looks identical on screen and is
 * invisible to a screen reader user (WCAG 2.1 AA, 4.1.2).
 *
 * Rather than stub the behavior's decisions, this drives the real source file
 * in a `node:vm` sandbox over a DOM harness small enough to read in one sitting
 * and faithful in the two ways that decide the outcome: listeners fire on the
 * target before they fire on the ancestors it bubbles through, and
 * `setAttribute` stringifies its value the way a real element does (the
 * behavior passes raw booleans).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const componentDir = path.dirname(fileURLToPath(import.meta.url));
const behaviorSource = fs.readFileSync(
  path.join(componentDir, 'utility-nav-dropdown-menu.js'),
  'utf8',
);

/**
 * Matches the `.class` and `.class[attr="value"]` selectors the behavior uses.
 *
 * @param {string} selector - The selector to split.
 *
 * @returns {{className: string, attribute: ?string, value: ?string}} its parts.
 */
const parseSelector = (selector) => {
  const [, className, attribute, value] =
    /^\.([\w-]+)(?:\[([\w-]+)="([^"]+)"\])?$/.exec(selector) || [];

  assert.ok(className, `the harness cannot match the selector "${selector}"`);

  return { className, attribute, value };
};

/** A DOM element with just the surface the behavior touches. */
class HarnessElement {
  constructor(classNames = [], attributes = {}) {
    this.classList = new Set(classNames);
    this.attributes = new Map(
      Object.entries(attributes).map(([name, value]) => [name, String(value)]),
    );
    this.children = [];
    this.parentNode = null;
    this.listeners = new Map();
    this.style = {};

    // `Set` already provides `add`; only `remove` needs aliasing onto `delete`.
    this.classList.remove = (name) =>
      Set.prototype.delete.call(this.classList, name);
  }

  append(...children) {
    children.forEach((child) => {
      const element = child;
      element.parentNode = this;
      this.children.push(element);
    });

    return this;
  }

  /** Real elements stringify the value; the behavior passes raw booleans. */
  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  matches(selector) {
    const { className, attribute, value } = parseSelector(selector);

    return (
      this.classList.has(className) &&
      (!attribute || this.getAttribute(attribute) === value)
    );
  }

  /** Self and every descendant, in document order. */
  get tree() {
    return this.children.reduce(
      (nodes, child) => nodes.concat(child.tree),
      [this],
    );
  }

  contains(node) {
    return this.tree.includes(node);
  }

  querySelectorAll(selector) {
    return this.tree.slice(1).filter((node) => node.matches(selector));
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }

  addEventListener(type, listener) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }

    this.listeners.get(type).push(listener);
  }

  /** Fixed and non-zero: the behavior only sizes the panel with it. */
  // eslint-disable-next-line class-methods-use-this
  getBoundingClientRect() {
    return { x: 100, left: 100, right: 300, width: 200, height: 40 };
  }
}

/**
 * Builds a site header holding two Utility Nav dropdowns and a mega menu
 * toggle, plus a page region outside the header entirely.
 *
 * @returns {object} the elements a test needs to reach, keyed by role.
 */
const buildHeader = () => {
  const dropdown = (label) => {
    // `yds-control.twig` always injects a chevron into a dropdown CTA, so most
    // real clicks on the toggle land on the icon and `event.target` is a
    // descendant of the toggle rather than the toggle itself.
    const toggleIcon = new HarnessElement(['cta__icon']);
    const toggle = new HarnessElement(['utility-nav__cta'], {
      'data-cta-control-type': 'dropdown',
      'aria-expanded': false,
    }).append(toggleIcon);
    const link = new HarnessElement([`utility-nav-dropdown__link--${label}`]);
    const menu = new HarnessElement(['utility-nav-dropdown__menu']).append(
      link,
    );
    const content = new HarnessElement(['utility-nav__dropdown-content'], {
      'aria-hidden': true,
    }).append(menu);
    const nav = new HarnessElement(['utility-nav__dropdown'], {
      'aria-expanded': false,
    }).append(toggle, content);

    return { nav, toggle, toggleIcon, content, link };
  };

  const first = dropdown('first');
  const second = dropdown('second');
  const megaMenuToggle = new HarnessElement(['primary-nav__toggle--level-0']);
  const utilityBar = new HarnessElement(['utility-bar']).append(
    first.nav,
    second.nav,
  );
  const primaryNav = new HarnessElement(['primary-nav']).append(megaMenuToggle);
  const header = new HarnessElement(['site-header__menu-wrapper']).append(
    utilityBar,
    primaryNav,
  );
  const pageBody = new HarnessElement(['page-body']);
  const body = new HarnessElement(['body']).append(header, pageBody);

  return { body, first, second, megaMenuToggle, pageBody };
};

/**
 * Attaches the real behavior to a fresh header.
 *
 * @returns {object} the header elements, plus a `click` that really bubbles.
 */
const attachBehavior = () => {
  const header = buildHeader();
  const { body } = header;
  const window = {
    innerWidth: 1200,
    listeners: new Map(),
    addEventListener: HarnessElement.prototype.addEventListener,
  };

  const document = {
    querySelector: (selector) => body.querySelector(selector),
    querySelectorAll: (selector) => body.querySelectorAll(selector),
  };

  const sandbox = {
    Drupal: { behaviors: {} },
    document,
    window,
    setTimeout,
    clearTimeout,
  };

  vm.runInNewContext(behaviorSource, sandbox, { filename: 'utility-nav.js' });

  assert.ok(
    sandbox.Drupal.behaviors.utilityDropdownNav,
    'the behavior did not register',
  );
  sandbox.Drupal.behaviors.utilityDropdownNav.attach(document);

  /**
   * Dispatches a click the way the DOM does: the target first, then every
   * ancestor it bubbles up through, and finally the window.
   *
   * @param {HarnessElement} target - Where the click lands.
   */
  const click = (target) => {
    const event = { type: 'click', target };
    const propagationPath = [];

    for (let node = target; node; node = node.parentNode) {
      propagationPath.push(node);
    }

    propagationPath.push(window);
    propagationPath.forEach((node) =>
      (node.listeners.get('click') || []).forEach((listener) =>
        listener.call(node, event),
      ),
    );
  };

  return { ...header, click };
};

/**
 * Reads the dropdown's state off the three attributes that carry it.
 *
 * @param {object} dropdown - A `{nav, toggle, content}` group.
 *
 * @returns {object} the attribute values, as strings.
 */
const stateOf = ({ nav, toggle, content }) => ({
  nav: nav.getAttribute('aria-expanded'),
  toggle: toggle.getAttribute('aria-expanded'),
  content: content.getAttribute('aria-hidden'),
});

const OPEN = { nav: 'true', toggle: 'true', content: 'false' };
const CLOSED = { nav: 'false', toggle: 'false', content: 'true' };

test('the toggle still opens the dropdown its own click bubbles out of', () => {
  const { first, click } = attachBehavior();

  click(first.toggle);

  // Fails if the outside-click handler tests containment against the content
  // panel instead of the dropdown wrapper: the toggle sits outside the panel,
  // so its own click would immediately close what it just opened.
  assert.deepEqual(
    stateOf(first),
    OPEN,
    'clicking the toggle did not leave the dropdown open',
  );
});

test('the chevron inside the toggle opens the dropdown too', () => {
  const { first, click } = attachBehavior();

  click(first.toggleIcon);

  // Without this, an implementation that recognises only the toggle element
  // itself (`event.target !== toggle`) passes every other test here while
  // closing the dropdown the instant a real user clicks the chevron -- which is
  // where most clicks on the control actually land.
  assert.deepEqual(
    stateOf(first),
    OPEN,
    'a click on the CTA icon did not leave the dropdown open',
  );
});

test('a click outside the dropdown closes it, and says so to assistive tech', () => {
  const { first, pageBody, click } = attachBehavior();

  click(first.toggle);
  click(pageBody);

  // All three attributes, not just the visible panel: a close that only flips a
  // class leaves aria-expanded stale and the dropdown "open" to a screen reader.
  assert.deepEqual(
    stateOf(first),
    CLOSED,
    'the dropdown did not close on a click outside it',
  );
});

test('opening a mega menu closes the dropdown instead of stacking on it', () => {
  const { first, megaMenuToggle, click } = attachBehavior();

  click(first.toggle);
  click(megaMenuToggle);

  assert.deepEqual(
    stateOf(first),
    CLOSED,
    'the dropdown stayed open over the mega menu',
  );
});

test('a click inside the open panel leaves it open', () => {
  const { first, click } = attachBehavior();

  click(first.toggle);
  click(first.link);

  assert.deepEqual(
    stateOf(first),
    OPEN,
    'following a link inside the dropdown closed it out from under the click',
  );
});

test('opening one dropdown closes the other', () => {
  const { first, second, click } = attachBehavior();

  click(first.toggle);
  click(second.toggle);

  assert.deepEqual(stateOf(second), OPEN, 'the second dropdown did not open');
  assert.deepEqual(stateOf(first), CLOSED, 'both dropdowns were open at once');
});

test('the toggle still closes the dropdown when clicked again', () => {
  const { first, click } = attachBehavior();

  click(first.toggle);
  click(first.toggle);

  assert.deepEqual(
    stateOf(first),
    CLOSED,
    'the toggle stopped closing its own dropdown',
  );
});
