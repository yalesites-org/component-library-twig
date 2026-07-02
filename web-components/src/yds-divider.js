import { LitElement, html, css } from 'lit';

/**
 * <yds-divider> — Web Component wrapper for the YaleSites divider atom.
 *
 * Framework-neutral re-expression of components/01-atoms/divider (yds-divider.twig
 * + _yds-divider.scss). Twig cannot run in the browser, so the markup is authored
 * once as a Lit template and the SCSS is ported into the shadow root's `styles`.
 *
 * Theming: internal colors/sizes reference design tokens via `var(--token, fallback)`.
 * CSS custom properties inherit through the shadow boundary, so a consumer can theme
 * by setting the underlying tokens (or `--color-divider` / `--thickness-divider`
 * directly) on any ancestor — no build step required. `::part()` hooks are exposed for
 * structural overrides that a bare custom property cannot reach.
 *
 * Attributes:
 *   width    "100" | "75" | "50" | "25"  (default "100") — divider width as a % of container
 *   position "left" | "center"           (default "center") — horizontal alignment
 *
 * Parts:
 *   wrapper, inner, divider
 */
export class YdsDivider extends LitElement {
  static properties = {
    width: { type: String, reflect: true },
    position: { type: String, reflect: true },
  };

  static styles = css`
    :host {
      display: block;
    }

    /*
     * In Drupal the vertical section spacing is supplied by the parent layout
     * region, not by the divider itself (the SCSS spacing-page-section mixin is a
     * no-op with default args). Standalone we approximate that spacing here so the
     * component has breathing room outside a Drupal layout.
     */
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
      /* --color-divider default in the library resolves to --color-gray-500. */
      background: var(--color-divider, var(--color-gray-500, hsl(0, 0%, 46%)));
      /* --thickness-divider default in the library resolves to --size-thickness-1. */
      height: var(--thickness-divider, var(--size-thickness-1, 0.063rem));
      width: var(--width-divider, var(--layout-width-100, 100%));
    }

    .divider[data-divider-width='100'] {
      --width-divider: var(--layout-width-100, 100%);
    }

    .divider[data-divider-width='75'] {
      --width-divider: var(--layout-width-75, 75%);
    }

    .divider[data-divider-width='50'] {
      --width-divider: var(--layout-width-50, 50%);
    }

    .divider[data-divider-width='25'] {
      --width-divider: var(--layout-width-25, 25%);
    }
  `;

  constructor() {
    super();
    this.width = '100';
    this.position = 'center';
  }

  render() {
    const width = ['100', '75', '50', '25'].includes(this.width)
      ? this.width
      : '100';
    const position = ['left', 'center'].includes(this.position)
      ? this.position
      : 'center';

    return html`
      <div class="divider__wrapper" part="wrapper">
        <div class="divider__inner" part="inner" data-divider-position=${position}>
          <div
            class="divider"
            part="divider"
            role="separator"
            aria-orientation="horizontal"
            data-divider-width=${width}
          ></div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('yds-divider')) {
  customElements.define('yds-divider', YdsDivider);
}
