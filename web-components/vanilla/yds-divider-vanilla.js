/**
 * <yds-divider-vanilla> — the SAME divider as web-components/src/yds-divider.js,
 * but written with NO framework: just the native Custom Elements + Shadow DOM
 * W3C APIs. It exists side-by-side with the Lit version so stakeholders can
 * compare the two implementations in Storybook.
 *
 * A distinct tag name (`-vanilla`) is required: a custom-element name can be
 * registered only once per page, so this cannot reuse `yds-divider`.
 *
 * Compare this file with ../src/yds-divider.js:
 *   - No `lit` import / dependency.
 *   - We call `attachShadow` ourselves and set `shadowRoot.innerHTML` by hand.
 *   - Reactivity is manual: `observedAttributes` + `attributeChangedCallback`
 *     re-render; there is no reactive-property system.
 *   - The CSS and markup are otherwise identical (same BEM classes, same
 *     `var(--token, fallback)` theming, same `part` names), so the rendered
 *     output matches the Lit version exactly.
 *
 * Attributes:
 *   width    "100" | "75" | "50" | "25"  (default "100")
 *   position "left" | "center"           (default "center")
 * Parts: wrapper, inner, divider
 */

// Same styles as the Lit version's `static styles`, as a plain string.
const STYLES = `
  :host {
    display: block;
  }

  .divider__wrapper {
    margin-block: var(--spacing-page-section, var(--size-spacing-8, 2.5rem));
  }

  .divider__inner {
    display: flex;
    justify-content: var(--position-divider, center);
  }

  .divider__inner[data-divider-position='left'] {
    --position-divider: var(--layout-flex-position-left, flex-start);
  }

  .divider__inner[data-divider-position='center'] {
    --position-divider: var(--layout-flex-position-center, center);
  }

  .divider {
    background: var(--color-divider, var(--color-gray-500, hsl(0, 0%, 46%)));
    height: var(--thickness-divider, var(--size-thickness-1, 0.063rem));
    width: var(--width-divider, var(--layout-width-100, 100%));
  }

  .divider[data-divider-width='100'] { --width-divider: var(--layout-width-100, 100%); }
  .divider[data-divider-width='75']  { --width-divider: var(--layout-width-75, 75%); }
  .divider[data-divider-width='50']  { --width-divider: var(--layout-width-50, 50%); }
  .divider[data-divider-width='25']  { --width-divider: var(--layout-width-25, 25%); }
`;

export class YdsDividerVanilla extends HTMLElement {
  // The native equivalent of Lit's reactive `properties` — but it only tells the
  // browser which attributes to watch; we still have to re-render ourselves.
  static get observedAttributes() {
    return ['width', 'position'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  // Called by the browser on every observed-attribute change — our manual
  // stand-in for Lit's automatic re-render on property change.
  attributeChangedCallback() {
    if (this.shadowRoot) this.render();
  }

  render() {
    const width = ['100', '75', '50', '25'].includes(this.getAttribute('width'))
      ? this.getAttribute('width')
      : '100';
    const position = ['left', 'center'].includes(this.getAttribute('position'))
      ? this.getAttribute('position')
      : 'center';

    // No template engine: build the markup as a string and assign it. There is
    // no diffing, so the whole shadow tree is replaced each render (fine for a
    // static element like this; contrast with the accordion, where we avoid it).
    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="divider__wrapper" part="wrapper">
        <div class="divider__inner" part="inner" data-divider-position="${position}">
          <div
            class="divider"
            part="divider"
            role="separator"
            aria-orientation="horizontal"
            data-divider-width="${width}"
          ></div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('yds-divider-vanilla')) {
  customElements.define('yds-divider-vanilla', YdsDividerVanilla);
}
