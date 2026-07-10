import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

// Module-level counter so every instance gets stable, unique ids for the
// button/region aria-controls relationships.
let instanceCount = 0;

/**
 * <yds-accordion> — Web Component wrapper for the YaleSites accordion molecule.
 *
 * Framework-neutral re-expression of components/02-molecules/accordion
 * (yds-accordion.twig, _yds-accordion-item.twig, _yds-accordion.scss) with the
 * expand/collapse + "toggle all" behavior from yds-accordion.js ported into the
 * Lit lifecycle. Twig cannot run client-side, so markup is re-authored as a Lit
 * template; the Drupal.behaviors init moves into the reactive update cycle.
 *
 * Items may be provided two ways:
 *   1. `items` property — array of `{ heading, content }` (content is an HTML string).
 *      This is the robust, fully-controlled path.
 *   2. Light-DOM authoring — child elements carrying `data-accordion-heading`; their
 *      innerHTML becomes the panel content. Harvested once on connect. This is
 *      convenient for hand-authored HTML but timing-sensitive (see README limitations).
 *
 * Attributes:
 *   heading   optional group heading rendered above all items
 *   theme     "default" | "one".."five" (default "default") — color accent
 *   alignment "center" | "left" (default "center")
 *
 * Parts:
 *   accordion, inner, heading, controls, toggle-all, item, item-heading, toggle,
 *   content, icon
 *
 * Security: `content` (and harvested light-DOM innerHTML) is injected with
 * unsafeHTML — same trust model as the source Twig, which prints author-provided
 * rich text. Do not pass untrusted/user-supplied HTML without sanitizing first.
 */
export class YdsAccordion extends LitElement {
  static properties = {
    heading: { type: String, reflect: true },
    theme: { type: String, reflect: true },
    alignment: { type: String, reflect: true },
    items: { type: Array },
    _expanded: { state: true },
  };

  static styles = css`
    :host {
      display: block;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    .accordion {
      --color-accordion-accent: var(--color-slot-one, var(--color-blue-yale, hsl(210, 100%, 21%)));
      --color-heading: var(--color-gray-800, hsl(0, 0%, 13%));

      margin-block: var(--spacing-page-section, var(--size-spacing-8, 2.5rem));
      color: var(--color-text, inherit);
    }

    /* Per-theme accent, mirroring the source SCSS slot mapping. */
    .accordion[data-component-theme='one'] {
      --color-accordion-accent: var(--color-slot-one, var(--color-blue-yale, hsl(210, 100%, 21%)));
    }
    .accordion[data-component-theme='two'] {
      --color-accordion-accent: var(--color-slot-two, var(--color-blue-yale, hsl(210, 100%, 21%)));
    }
    .accordion[data-component-theme='three'] {
      --color-accordion-accent: var(--color-slot-three, var(--color-blue-yale, hsl(210, 100%, 21%)));
    }
    .accordion[data-component-theme='four'] {
      --color-accordion-accent: var(--color-slot-four, var(--color-blue-yale, hsl(210, 100%, 21%)));
    }
    .accordion[data-component-theme='five'] {
      --color-accordion-accent: var(--color-slot-five, var(--color-blue-yale, hsl(210, 100%, 21%)));
    }

    .accordion__heading {
      /* Source: @include heading(h2) — the h2 heading font (YaleNew by default).
         The --font-style-* tokens inherit through the shadow boundary. */
      font: var(--font-style-heading-h2-yale-new, 400 1.875rem/1.2 'YaleNew', Georgia, serif);
      font-variant-numeric: oldstyle-nums;
      margin: 0 0 var(--size-spacing-5, 1rem);
      color: var(--color-heading, var(--color-gray-800, hsl(0, 0%, 13%)));
    }

    .accordion__controls {
      display: flex;
      list-style: none;
      margin: 0 0 var(--size-spacing-5, 1rem);
      padding: 0;
    }

    .accordion__toggle-all {
      display: inline-flex;
      gap: var(--size-spacing-3, 0.5rem);
      align-items: center;
      /* Source: @include body-s. */
      font: var(--font-style-body-s, 400 0.9375rem/1.5 sans-serif);
      color: inherit;
      background: none;
      border: 0;
      padding: 0;
      cursor: pointer;
    }

    .accordion__toggle-all:hover {
      color: var(--color-link-base, hsl(213, 66%, 45%));
    }

    .accordion__icon {
      height: 1em;
      width: 1em;
      fill: currentColor;
      transition: transform var(--animation-speed-default, 200ms) ease-in-out;
    }

    .accordion__toggle-all[aria-expanded='true'] .accordion__icon {
      transform: rotate(180deg);
    }

    .accordion-item {
      border-bottom: var(--border-thickness-1, 0.063rem) solid;
      padding-top: var(--size-spacing-5, 1rem);
    }

    .accordion-item__heading {
      /* Source: @include body-l (regular weight, not a heading font). */
      font: var(--font-style-body-l, 400 1.1875rem/1.5 sans-serif);
      margin: 0 0 var(--size-spacing-5, 1rem);
    }

    .accordion-item__toggle {
      display: flex;
      gap: var(--size-spacing-5, 1rem);
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: var(--size-spacing-3, 0.5rem) var(--size-spacing-4, 0.75rem)
        var(--size-spacing-3, 0.5rem) 0;
      font: inherit;
      color: inherit;
      text-align: left;
      background: none;
      border: 0;
      cursor: pointer;
    }

    .accordion-item__toggle:hover {
      color: var(--color-link-base, hsl(213, 66%, 45%));
    }

    .accordion-item__icon {
      height: 1em;
      width: 1em;
      flex-shrink: 0;
      fill: currentColor;
      transition: transform var(--animation-speed-default, 200ms) ease-in-out;
    }

    .accordion-item__toggle[aria-expanded='true'] .accordion-item__icon {
      transform: rotate(180deg);
    }

    .accordion-item__content {
      max-height: var(--accordion-item-height, 0);
      overflow: hidden;
      transition: all var(--animation-speed-slow, 800ms) ease-in-out;
    }

    @media (max-width: 991.95px) {
      .accordion-item__content {
        padding-inline-start: var(--size-spacing-6, 1.5rem);
        padding-inline-end: var(--size-spacing-6, 1.5rem);
      }
    }

    @media (min-width: 992px) {
      .accordion-item__content {
        padding-inline-start: var(--size-spacing-8, 2.5rem);
        padding-inline-end: var(--size-spacing-8, 2.5rem);
      }
    }

    .accordion-item[data-accordion-expanded='true'] .accordion-item__content {
      margin-bottom: var(--size-spacing-6, 1.5rem);
    }

    .accordion-item[data-accordion-expanded='false'] .accordion-item__content {
      max-height: 0;
      visibility: hidden;
    }

    /* Non-default themes: accent bar + panel background, per the source SCSS. */
    .accordion[data-component-theme]:not([data-component-theme='default'])
      .accordion-item {
      border-bottom: none;
      background-color: var(--color-gray-100, hsl(0, 0%, 97%));
      padding: var(--size-spacing-3, 0.5rem) var(--size-spacing-4, 0.75rem);
      border-left: var(--border-thickness-6, 0.375rem) solid
        var(--color-accordion-accent);
      margin-bottom: var(--size-spacing-5, 1rem);
      color: var(--color-gray-700, hsl(0, 0%, 29%));
    }

    .accordion[data-component-theme]:not([data-component-theme='default'])
      .accordion-item__heading {
      margin-bottom: 0;
      padding-inline-start: var(--size-spacing-5, 1rem);
    }

    @media (prefers-reduced-motion: reduce) {
      .accordion-item__content,
      .accordion-item__icon,
      .accordion__icon {
        transition: none;
      }
    }
  `;

  constructor() {
    super();
    this.heading = '';
    this.theme = 'default';
    this.alignment = 'center';
    this.items = [];
    // Items start collapsed — mirrors the source JS graceful-degradation model,
    // where the server renders items open and JS collapses them on attach.
    this._expanded = [];
    this._uid = `yds-accordion-${(instanceCount += 1)}`;
  }

  connectedCallback() {
    super.connectedCallback();
    // Harvest light-DOM authored items only if no `items` property was supplied.
    if (!this.items || this.items.length === 0) {
      const harvested = Array.from(
        this.querySelectorAll('[data-accordion-heading]'),
      ).map((el) => ({
        heading: el.getAttribute('data-accordion-heading') || '',
        content: el.innerHTML,
      }));
      if (harvested.length) {
        this.items = harvested;
      }
    }
  }

  willUpdate(changed) {
    // Keep the expanded-state array in lockstep with the items array.
    if (changed.has('items')) {
      const count = this.items ? this.items.length : 0;
      if (this._expanded.length !== count) {
        this._expanded = new Array(count).fill(false);
      }
    }
  }

  updated() {
    // Set each open panel's max-height to its content height so the CSS
    // transition animates open/closed. scrollHeight reports full content height
    // even while the panel is clipped, so it is safe to read at any time.
    const contents = this.renderRoot.querySelectorAll('.accordion-item__content');
    this._expanded.forEach((isOpen, i) => {
      const content = contents[i];
      if (!content) return;
      if (isOpen) {
        content.style.setProperty(
          '--accordion-item-height',
          `${content.scrollHeight}px`,
        );
      } else {
        content.style.removeProperty('--accordion-item-height');
      }
    });
  }

  get _allExpanded() {
    return this._expanded.length > 0 && this._expanded.every(Boolean);
  }

  _toggleItem(index) {
    this._expanded = this._expanded.map((open, i) =>
      i === index ? !open : open,
    );
  }

  _toggleAll() {
    const target = !this._allExpanded;
    this._expanded = this._expanded.map(() => target);
  }

  _angleIcon(className) {
    // Inlined from images/icons/angle-down.svg (Font Awesome angle-down).
    return html`
      <svg
        class=${className}
        part="icon"
        viewBox="0 0 384 512"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M360.5 217.5l-152 143.1C203.9 365.8 197.9 368 192 368s-11.88-2.188-16.5-6.562L23.5 217.5C13.87 208.3 13.47 193.1 22.56 183.5C31.69 173.8 46.94 173.5 56.5 182.6L192 310.9l135.5-128.4c9.562-9.094 24.75-8.75 33.94 .9375C370.5 193.1 370.1 208.3 360.5 217.5z"
        />
      </svg>
    `;
  }

  _renderItem(item, index) {
    const isOpen = Boolean(this._expanded[index]);
    const contentId = `${this._uid}-content-${index}`;
    const toggleId = `${this._uid}-toggle-${index}`;

    const toggle = html`
      <button
        id=${toggleId}
        class="accordion-item__toggle"
        part="toggle"
        type="button"
        aria-expanded=${isOpen ? 'true' : 'false'}
        aria-controls=${contentId}
        @click=${() => this._toggleItem(index)}
      >
        <span>${item.heading}</span>
        ${this._angleIcon('accordion-item__icon')}
      </button>
    `;

    // Heading level follows the source: h2 by default, h3 when a group heading
    // is present so the outline stays valid.
    const itemHeading = this.heading
      ? html`<h3 class="accordion-item__heading" part="item-heading">${toggle}</h3>`
      : html`<h2 class="accordion-item__heading" part="item-heading">${toggle}</h2>`;

    return html`
      <div
        class="accordion-item"
        part="item"
        data-accordion-expanded=${isOpen ? 'true' : 'false'}
      >
        ${itemHeading}
        <div
          id=${contentId}
          class="accordion-item__content"
          part="content"
          role="region"
          aria-labelledby=${toggleId}
        >
          ${unsafeHTML(item.content)}
        </div>
      </div>
    `;
  }

  render() {
    const items = this.items || [];
    const theme = this.theme || 'default';
    const alignment = this.alignment || 'center';
    const allExpanded = this._allExpanded;

    return html`
      <div
        class="accordion"
        part="accordion"
        data-component-theme=${theme}
        data-component-alignment=${alignment}
      >
        <div class="accordion__inner" part="inner">
          ${this.heading
            ? html`<h2 class="accordion__heading" part="heading">
                ${this.heading}
              </h2>`
            : ''}
          ${items.length > 1
            ? html`
                <ul class="accordion__controls" part="controls" aria-label="Section controls">
                  <li>
                    <button
                      class="accordion__toggle-all"
                      part="toggle-all"
                      type="button"
                      aria-expanded=${allExpanded ? 'true' : 'false'}
                      @click=${this._toggleAll}
                    >
                      ${allExpanded ? 'Collapse All' : 'Expand All'}
                      ${this._angleIcon('accordion__icon')}
                    </button>
                  </li>
                </ul>
              `
            : ''}
          ${items.map((item, index) => this._renderItem(item, index))}
        </div>
      </div>
    `;
  }
}

if (!customElements.get('yds-accordion')) {
  customElements.define('yds-accordion', YdsAccordion);
}
