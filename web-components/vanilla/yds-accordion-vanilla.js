/**
 * <yds-accordion-vanilla> — the SAME accordion as web-components/src/yds-accordion.js,
 * but written with NO framework: native Custom Elements + Shadow DOM only. It sits
 * beside the Lit version in Storybook so stakeholders can compare the two.
 *
 * A distinct tag (`-vanilla`) is required — a tag name registers only once per page.
 *
 * This file is the interesting comparison. Read it against ../src/yds-accordion.js
 * to see what Lit does for you. Doing it by hand here we must:
 *   - call `attachShadow` and build the markup as strings (no `html` template tag);
 *   - escape interpolated text ourselves (Lit auto-escapes; `content` is the
 *     deliberate raw-HTML exception, matching Lit's `unsafeHTML`);
 *   - wire events manually with `addEventListener` (no `@click`);
 *   - keep `_expanded` state and push it to the DOM by hand — and, to avoid the
 *     focus loss a naive full re-render would cause on every click, do TARGETED
 *     attribute updates instead of rebuilding (Lit's diffing gives you this free);
 *   - manage a unique id per instance for aria-controls wiring.
 * The CSS, BEM classes, DOM structure, heading levels and `part` names match the
 * Lit version (the one deliberate difference: the "toggle all" label is wrapped in
 * a span so it can be updated in place), so the rendered result is the same.
 *
 * Attributes: heading, theme ("default"|"one".."five"), alignment ("center"|"left").
 * Property:   items — array of { heading, content } (content is an HTML string).
 * Parts: accordion, inner, heading, controls, toggle-all, item, item-heading,
 *        toggle, content, icon
 *
 * Security: `content` (and harvested light-DOM innerHTML) is injected raw — same
 * trust model as the Lit `unsafeHTML` and the source Twig. Do not pass untrusted
 * HTML without sanitizing first.
 */

let instanceCount = 0;

// Same styles as the Lit version's `static styles`, as a plain string.
const STYLES = `
  :host { display: block; }
  *, *::before, *::after { box-sizing: border-box; }

  .accordion {
    --color-accordion-accent: var(--color-slot-one, var(--color-blue-yale, hsl(210, 100%, 21%)));
    --color-heading: var(--color-gray-800, hsl(0, 0%, 13%));
    margin-block: var(--spacing-page-section, var(--size-spacing-8, 2.5rem));
    color: var(--color-text, inherit);
  }

  .accordion[data-component-theme='one']   { --color-accordion-accent: var(--color-slot-one, var(--color-blue-yale, hsl(210, 100%, 21%))); }
  .accordion[data-component-theme='two']   { --color-accordion-accent: var(--color-slot-two, var(--color-blue-yale, hsl(210, 100%, 21%))); }
  .accordion[data-component-theme='three'] { --color-accordion-accent: var(--color-slot-three, var(--color-blue-yale, hsl(210, 100%, 21%))); }
  .accordion[data-component-theme='four']  { --color-accordion-accent: var(--color-slot-four, var(--color-blue-yale, hsl(210, 100%, 21%))); }
  .accordion[data-component-theme='five']  { --color-accordion-accent: var(--color-slot-five, var(--color-blue-yale, hsl(210, 100%, 21%))); }

  .accordion__heading {
    /* Source: @include heading(h2) — the h2 heading font (YaleNew by default).
       The --font-style-* tokens inherit through the shadow boundary. */
    font: var(--font-style-heading-h2-yale-new, 400 1.875rem/1.2 'YaleNew', Georgia, serif);
    font-variant-numeric: oldstyle-nums;
    margin: 0 0 var(--size-spacing-5, 1rem);
    color: var(--color-heading, var(--color-gray-800, hsl(0, 0%, 13%)));
  }

  .accordion__controls { display: flex; list-style: none; margin: 0 0 var(--size-spacing-5, 1rem); padding: 0; }

  .accordion__toggle-all {
    display: inline-flex; gap: var(--size-spacing-3, 0.5rem); align-items: center;
    /* Source: @include body-s. */
    font: var(--font-style-body-s, 400 0.9375rem/1.5 sans-serif); color: inherit;
    background: none; border: 0; padding: 0; cursor: pointer;
  }
  .accordion__toggle-all:hover { color: var(--color-link-base, hsl(213, 66%, 45%)); }

  .accordion__icon {
    height: 1em; width: 1em; fill: currentColor;
    transition: transform var(--animation-speed-default, 200ms) ease-in-out;
  }
  .accordion__toggle-all[aria-expanded='true'] .accordion__icon { transform: rotate(180deg); }

  .accordion-item { border-bottom: var(--border-thickness-1, 0.063rem) solid; padding-top: var(--size-spacing-5, 1rem); }

  .accordion-item__heading {
    /* Source: @include body-l (regular weight, not a heading font). */
    font: var(--font-style-body-l, 400 1.1875rem/1.5 sans-serif);
    margin: 0 0 var(--size-spacing-5, 1rem);
  }

  .accordion-item__toggle {
    display: flex; gap: var(--size-spacing-5, 1rem); justify-content: space-between; align-items: center;
    width: 100%;
    padding: var(--size-spacing-3, 0.5rem) var(--size-spacing-4, 0.75rem) var(--size-spacing-3, 0.5rem) 0;
    font: inherit; color: inherit; text-align: left; background: none; border: 0; cursor: pointer;
  }
  .accordion-item__toggle:hover { color: var(--color-link-base, hsl(213, 66%, 45%)); }

  .accordion-item__icon {
    height: 1em; width: 1em; flex-shrink: 0; fill: currentColor;
    transition: transform var(--animation-speed-default, 200ms) ease-in-out;
  }
  .accordion-item__toggle[aria-expanded='true'] .accordion-item__icon { transform: rotate(180deg); }

  .accordion-item__content {
    max-height: var(--accordion-item-height, 0); overflow: hidden;
    transition: all var(--animation-speed-slow, 800ms) ease-in-out;
  }
  .accordion-item[data-accordion-expanded='true'] .accordion-item__content { margin-bottom: var(--size-spacing-6, 1.5rem); }
  .accordion-item[data-accordion-expanded='false'] .accordion-item__content { max-height: 0; visibility: hidden; }

  .accordion[data-component-theme]:not([data-component-theme='default']) .accordion-item {
    border-bottom: none; background-color: var(--color-gray-100, hsl(0, 0%, 97%));
    padding: var(--size-spacing-3, 0.5rem) var(--size-spacing-4, 0.75rem);
    border-left: var(--border-thickness-6, 0.375rem) solid var(--color-accordion-accent);
    margin-bottom: var(--size-spacing-5, 1rem); color: var(--color-gray-700, hsl(0, 0%, 29%));
  }
  .accordion[data-component-theme]:not([data-component-theme='default']) .accordion-item__heading {
    padding-inline-start: var(--size-spacing-5, 1rem);
  }

  @media (prefers-reduced-motion: reduce) {
    .accordion-item__content, .accordion-item__icon, .accordion__icon { transition: none; }
  }
`;

// Lit auto-escapes interpolated text; by hand we must do it ourselves.
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (ch) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]),
  );

// Inlined from images/icons/angle-down.svg (Font Awesome angle-down) — same as Lit.
const angleIcon = (className) => `
  <svg class="${className}" part="icon" viewBox="0 0 384 512" aria-hidden="true" focusable="false">
    <path d="M360.5 217.5l-152 143.1C203.9 365.8 197.9 368 192 368s-11.88-2.188-16.5-6.562L23.5 217.5C13.87 208.3 13.47 193.1 22.56 183.5C31.69 173.8 46.94 173.5 56.5 182.6L192 310.9l135.5-128.4c9.562-9.094 24.75-8.75 33.94 .9375C370.5 193.1 370.1 208.3 360.5 217.5z"/>
  </svg>
`;

export class YdsAccordionVanilla extends HTMLElement {
  static get observedAttributes() {
    return ['heading', 'theme', 'alignment'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._items = [];
    this._expanded = [];
    this._uid = `yds-accordion-vanilla-${(instanceCount += 1)}`;
  }

  // `items` is a JS property (arrays can't be attributes) — the setter is our
  // manual stand-in for a Lit reactive property: store, keep _expanded in
  // lockstep, and re-render when connected.
  get items() {
    return this._items;
  }

  set items(value) {
    this._items = Array.isArray(value) ? value : [];
    if (this._expanded.length !== this._items.length) {
      this._expanded = new Array(this._items.length).fill(false);
    }
    if (this.isConnected) this._renderStructure();
  }

  connectedCallback() {
    // Recover a property assigned BEFORE this element was upgraded. If `items`
    // was set (e.g. by Storybook's lazy-loaded story) before customElements
    // registered this instance, it became an own data property that shadows the
    // accessor below — so the setter never ran and the data would be lost,
    // rendering an empty accordion. Lit's ReactiveElement handles this for you;
    // in vanilla we must do it by hand (the "lazy properties" gotcha).
    this._upgradeProperty('items');

    // Harvest light-DOM authored items only if no `items` property was supplied.
    if (this._items.length === 0) {
      const harvested = Array.from(
        this.querySelectorAll('[data-accordion-heading]'),
      ).map((el) => ({
        heading: el.getAttribute('data-accordion-heading') || '',
        content: el.innerHTML,
      }));
      if (harvested.length) {
        this._items = harvested;
        this._expanded = new Array(harvested.length).fill(false);
      }
    }
    this._renderStructure();
  }

  // theme/heading/alignment changes affect the structure (heading levels, group
  // heading, data-attrs), so rebuild — this is not a focus-sensitive moment.
  attributeChangedCallback() {
    if (this.isConnected) this._renderStructure();
  }

  // Move a pre-upgrade own property back onto the prototype accessor so the
  // setter runs. (Lit does this automatically for reactive properties.)
  _upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  get _allExpanded() {
    return this._expanded.length > 0 && this._expanded.every(Boolean);
  }

  // Full rebuild of the shadow tree + (re)wire listeners. Called on connect, on
  // items change, and on attribute change — NOT on toggle (see _applyExpanded).
  _renderStructure() {
    const heading = this.getAttribute('heading') || '';
    const theme = this.getAttribute('theme') || 'default';
    const alignment = this.getAttribute('alignment') || 'center';
    const items = this._items;

    const groupHeading = heading
      ? `<h2 class="accordion__heading" part="heading">${escapeHtml(heading)}</h2>`
      : '';

    const controls =
      items.length > 1
        ? `
        <ul class="accordion__controls" part="controls" aria-label="Section controls">
          <li>
            <button class="accordion__toggle-all" part="toggle-all" type="button" aria-expanded="false">
              <span class="accordion__toggle-all-label">Expand All</span>
              ${angleIcon('accordion__icon')}
            </button>
          </li>
        </ul>`
        : '';

    // Item heading level follows the source: h2 by default, h3 under a group heading.
    const level = heading ? 'h3' : 'h2';
    const itemsMarkup = items
      .map((item, i) => {
        const contentId = `${this._uid}-content-${i}`;
        const toggleId = `${this._uid}-toggle-${i}`;
        return `
        <div class="accordion-item" part="item" data-accordion-expanded="false">
          <${level} class="accordion-item__heading" part="item-heading">
            <button id="${toggleId}" class="accordion-item__toggle" part="toggle" type="button"
              aria-expanded="false" aria-controls="${contentId}" data-index="${i}">
              <span>${escapeHtml(item.heading)}</span>
              ${angleIcon('accordion-item__icon')}
            </button>
          </${level}>
          <div id="${contentId}" class="accordion-item__content" part="content" role="region" aria-labelledby="${toggleId}">
            ${item.content || ''}
          </div>
        </div>`;
      })
      .join('');

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="accordion" part="accordion" data-component-theme="${escapeHtml(theme)}" data-component-alignment="${escapeHtml(alignment)}">
        <div class="accordion__inner" part="inner">
          ${groupHeading}
          ${controls}
          ${itemsMarkup}
        </div>
      </div>
    `;

    // Wire events by hand (Lit does this declaratively with @click).
    this.shadowRoot
      .querySelectorAll('.accordion-item__toggle')
      .forEach((btn) =>
        btn.addEventListener('click', () =>
          this._toggleItem(Number(btn.dataset.index)),
        ),
      );
    const toggleAll = this.shadowRoot.querySelector('.accordion__toggle-all');
    if (toggleAll) {
      toggleAll.addEventListener('click', () => this._toggleAll());
    }

    this._applyExpanded();
  }

  _toggleItem(index) {
    this._expanded[index] = !this._expanded[index];
    this._applyExpanded();
  }

  _toggleAll() {
    const target = !this._allExpanded;
    this._expanded = this._expanded.map(() => target);
    this._applyExpanded();
  }

  // Push _expanded state to the DOM with TARGETED updates (no rebuild) so the
  // clicked button keeps focus — the behavior Lit's diffing gives for free.
  _applyExpanded() {
    const items = this.shadowRoot.querySelectorAll('.accordion-item');
    const toggles = this.shadowRoot.querySelectorAll('.accordion-item__toggle');
    const contents = this.shadowRoot.querySelectorAll('.accordion-item__content');

    this._expanded.forEach((isOpen, i) => {
      if (items[i]) {
        items[i].setAttribute(
          'data-accordion-expanded',
          isOpen ? 'true' : 'false',
        );
      }
      if (toggles[i]) {
        toggles[i].setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
      if (contents[i]) {
        if (isOpen) {
          // scrollHeight reports full content height even while clipped.
          contents[i].style.setProperty(
            '--accordion-item-height',
            `${contents[i].scrollHeight}px`,
          );
        } else {
          contents[i].style.removeProperty('--accordion-item-height');
        }
      }
    });

    const toggleAll = this.shadowRoot.querySelector('.accordion__toggle-all');
    if (toggleAll) {
      const all = this._allExpanded;
      toggleAll.setAttribute('aria-expanded', all ? 'true' : 'false');
      const label = toggleAll.querySelector('.accordion__toggle-all-label');
      if (label) label.textContent = all ? 'Collapse All' : 'Expand All';
    }
  }
}

if (!customElements.get('yds-accordion-vanilla')) {
  customElements.define('yds-accordion-vanilla', YdsAccordionVanilla);
}
