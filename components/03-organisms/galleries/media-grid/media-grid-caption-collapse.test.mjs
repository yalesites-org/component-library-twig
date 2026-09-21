/**
 * Guards the pairing between a collapsed gallery caption and its expand button.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/03-organisms/galleries/media-grid/media-grid-caption-collapse.test.mjs
 *
 * Both failures this pins are silent -- `truncate-text` sets `width: fit-content`,
 * so a clamped caption outgrows its parent and not even the ellipsis renders, and
 * a flattened caption looks like text the editor simply never linked. Nothing in
 * Storybook, the browser or a review diff shows either one, which is why the
 * attribute/button pairing and the surviving `<a>` are asserted here.
 *
 * The fixtures mirror the Interactive Grid story in `media-grid.yml`: items 6
 * (heading, no caption), 10 (short caption, no heading), 11 (heading plus short
 * caption) and 1 (heading plus a long caption containing a link).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const componentDir = path.dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
  path.join(componentDir, 'yds-media-grid-interactive.js'),
  'utf8',
);

/**
 * The slice of the DOM the caption loop touches, and nothing more.
 *
 * `children` maps a selector straight to the element it should return, so no
 * selector engine is needed. `textContent` drops markup on assignment exactly
 * as the real setter does -- that is the behaviour the link assertion rests on.
 */
class FakeElement {
  constructor({ html = '', children = {} } = {}) {
    this.html = html;
    this.children = children;
    this.attributes = new Map();
    this.classes = new Set();
    this.styles = new Map();
    this.listeners = new Map();
    this.offsetHeight = 40;
    this.scrollHeight = 120;
  }

  get textContent() {
    return this.html.replace(/<[^>]*>/g, '');
  }

  set textContent(value) {
    this.html = value;
  }

  get classList() {
    return {
      add: (name) => this.classes.add(name),
      contains: (name) => this.classes.has(name),
    };
  }

  get style() {
    return {
      setProperty: (property, value) => this.styles.set(property, value),
      getPropertyValue: (property) => this.styles.get(property) ?? '',
    };
  }

  querySelector(selector) {
    return this.children[selector] ?? null;
  }

  querySelectorAll(selector) {
    return [this.children[selector] ?? []].flat();
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  hasAttribute(name) {
    return this.attributes.has(name);
  }

  addEventListener(type, handler) {
    this.listeners.set(type, handler);
  }

  click() {
    this.listeners.get('click')({ preventDefault: () => {} });
  }
}

/** One `.media-grid-modal__content` block, shaped like the Twig output. */
function buildCaption({ heading = null, caption = null }) {
  const children = {
    '.media-grid-modal__toggle-caption': new FakeElement(),
  };

  if (heading !== null) {
    children['.media-grid-modal__heading'] = new FakeElement({ html: heading });
  }

  if (caption !== null) {
    children['.media-grid-modal__text'] = new FakeElement({ html: caption });
  }

  return {
    content: new FakeElement({ children }),
    toggle: children['.media-grid-modal__toggle-caption'],
    heading: children['.media-grid-modal__heading'] ?? null,
    text: children['.media-grid-modal__text'] ?? null,
  };
}

/** Runs the real behaviour against the fixtures and hands them back. */
function attachBehaviour(items) {
  const grid = new FakeElement({
    children: {
      '.media-grid__modal': new FakeElement(),
      '.media-grid-modal__content': items.map((item) => item.content),
    },
  });
  const context = new FakeElement({
    children: {
      '.media-grid[data-media-grid-variation="interactive"]': grid,
    },
  });
  const sandbox = {
    Drupal: { behaviors: {} },
    document: { querySelector: () => new FakeElement() },
  };

  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  sandbox.Drupal.behaviors.mediaGridInteractive.attach(context);

  return items;
}

const isCollapsed = (item) =>
  item.content.getAttribute('is-expanded') === 'false';
const hasExpandButton = (item) =>
  item.toggle.style.getPropertyValue('display') === 'inline';

const longCaption = `<p>${'Optional caption. '.repeat(12)}</p>`;

/** The four story items the collapsed state behaves differently for. */
const storyItems = () => ({
  headingOnly: buildCaption({
    heading: 'Optional heading for the sixth image (with no text)',
  }),
  shortCaption: buildCaption({
    caption: '<p>Optional tenth caption. A short caption with no heading.</p>',
  }),
  headingAndCaption: buildCaption({
    heading: 'Optional heading for the eleventh image',
    caption:
      '<p>Optional eleventh caption. A short caption with a heading.</p>',
  }),
  headingAndLink: buildCaption({
    heading: 'Optional heading for the first image',
    caption: `<p>Caption with a <a href="/target">real link</a>. ${longCaption}</p>`,
  }),
});

test('no caption is collapsed unless its expand button is shown', () => {
  const items = Object.values(storyItems());

  attachBehaviour(items);

  // Guard against the assertion below passing because nothing collapses at all.
  assert.ok(
    items.some(isCollapsed),
    'no item collapsed, so this test proves nothing',
  );

  const clampedWithNoButton = items.filter(
    (item) => isCollapsed(item) && !hasExpandButton(item),
  );

  assert.equal(
    clampedWithNoButton.length,
    0,
    'a caption is clamped to one line with no button to reveal the rest',
  );
});

test('a heading with no caption text is shown in full', () => {
  const { headingOnly } = storyItems();

  attachBehaviour([headingOnly]);

  assert.equal(headingOnly.content.getAttribute('is-expanded'), null);
});

test('a short caption with no heading is shown in full', () => {
  const { shortCaption } = storyItems();

  attachBehaviour([shortCaption]);

  assert.equal(shortCaption.content.getAttribute('is-expanded'), null);
  assert.equal(
    shortCaption.text.textContent,
    'Optional tenth caption. A short caption with no heading.',
  );
});

test('a caption with a heading keeps its links clickable', () => {
  const { headingAndLink } = storyItems();

  attachBehaviour([headingAndLink]);

  assert.match(
    headingAndLink.text.html,
    /<a href="\/target">real link<\/a>/,
    'the caption was flattened to plain text, so its link is no longer clickable',
  );
});

test('a caption with a heading still expands and collapses', () => {
  const { headingAndCaption } = storyItems();

  attachBehaviour([headingAndCaption]);

  assert.ok(hasExpandButton(headingAndCaption), 'no expand button was shown');
  assert.equal(headingAndCaption.content.getAttribute('is-expanded'), 'false');

  // This class is what hides the caption body while collapsed; without it the
  // heading and the body both show and the toggle reveals nothing.
  assert.ok(
    headingAndCaption.text.classList.contains(
      'media-grid-modal__text--has-heading',
    ),
    'the caption body was not marked as belonging to a heading',
  );

  headingAndCaption.toggle.click();

  assert.equal(headingAndCaption.content.getAttribute('is-expanded'), 'true');
  assert.equal(headingAndCaption.toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(headingAndCaption.toggle.getAttribute('aria-label'), 'collapse');

  headingAndCaption.toggle.click();

  assert.equal(headingAndCaption.content.getAttribute('is-expanded'), 'false');
  assert.equal(headingAndCaption.toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(headingAndCaption.toggle.getAttribute('aria-label'), 'expand');
});
