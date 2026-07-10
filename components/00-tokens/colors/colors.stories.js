import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import getGlobalThemes from './color-global-themes';
import colorMeta from './color-data.yml';
import printColorsMeta from './print-colors.yml';
import '../../01-atoms/controls/text-copy-button/yds-text-copy-button';

import colorsTwig from './colors.twig';
import webColorsTwig from './web-colors.twig';
import colorComponentThemeTwig from './color-component-theme-pairings.twig';
import colorGlobalThemeTwig from './color-global-themes.twig';
import colorGlobalThemePairingTwig from './color-global-theme-pairings.twig';
import colorBasicThemesTwig from './color-basic-themes.twig';

import utilityNavData from '../../03-organisms/menu/utility-nav/utility-nav.yml';
import primaryNavData from '../../03-organisms/menu/primary-nav/primary-nav.yml';

// JavaScript to handle size
import '../../03-organisms/site-header/yds-site-header';
import '../../02-molecules/menu/menu-toggle/yds-menu-toggle';
import '../../02-molecules/tabs/yds-tabs';

import quickLinksData from '../../02-molecules/quick-links/quick-links.yml';
import imageData from '../../01-atoms/images/image/image.yml';
import { exampleSiteNameImageSvg } from '../../_storybook/theme-constants';
import tabData from '../../02-molecules/tabs/tabs.yml';
import bannerData from '../../02-molecules/banner/banner.yml';

function hslToComponents(hslStr) {
  const match = hslStr.match(
    /hsl\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)%,\s*(\d+(?:\.\d+)?)%\)/,
  );
  if (!match) return null;
  const h = parseFloat(match[1]);
  const s = parseFloat(match[2]) / 100;
  const l = parseFloat(match[3]) / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return { r: f(0), g: f(8), b: f(4) };
}

function hslToHex(hslStr) {
  const rgb = hslToComponents(hslStr);
  if (!rgb) return null;
  const toHex = (n) => n.toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function hslToRgb(hslStr) {
  const rgb = hslToComponents(hslStr);
  if (!rgb) return null;
  return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function mergeColorData(tokenGroup, metaGroup = {}) {
  return Object.fromEntries(
    Object.entries(tokenGroup).map(([key, hslValue]) => {
      const meta = metaGroup[key] || {};
      return [
        key,
        {
          name: meta.name || key,
          hex: hslToHex(hslValue),
          rgb: hslToRgb(hslValue),
          cmyk: meta.cmyk || '--',
          pantone: meta.pantone || '--',
        },
      ];
    }),
  );
}

const colorGroups = [
  'blue',
  'green',
  'orange',
  'yellow',
  'basic',
  'gray',
  'brown',
  'purple',
];

const hiddenColors = [
  'purple.visited',
  'purple.visited-hover',
  'purple.visited-light',
  'purple.visited-light-hover',
];

function getAvailableGroups() {
  return colorGroups.filter((g) => tokens.color[g]);
}

function isVisibleColor(group, key) {
  return !hiddenColors.includes(`${group}.${key}`);
}

function filterHiddenColors(group, mergedColors) {
  const allColors = Object.entries(mergedColors);
  const visibleColors = allColors.filter(([key]) => isVisibleColor(group, key));
  return Object.fromEntries(visibleColors);
}

function isNonEmptyGroup([, colors]) {
  return Object.keys(colors).length > 0;
}

function buildVisibleColorGroups() {
  const groups = getAvailableGroups().map((g) => [
    g,
    filterHiddenColors(g, mergeColorData(tokens.color[g], colorMeta[g])),
  ]);

  return Object.fromEntries(groups.filter(isNonEmptyGroup));
}

const colorsData = { colors: buildVisibleColorGroups() };

// Shared live region for copy announcements. aria-live="polite" (without
// aria-atomic) announces to VoiceOver on all activation methods — CTRL+OPT+Space,
// Enter, and mouse click — regardless of where the VO cursor is. Intentionally
// NOT role="status" (which implies aria-atomic="true"): aria-atomic causes
// VoiceOver to treat clearing the region as a full update, shifting its virtual
// cursor and auto-reading forward. Without aria-atomic, an empty-string update
// has no content and VoiceOver ignores it, so clearing is safe.
// Created eagerly so VoiceOver registers it before the first copy — lazy creation
// causes the first announcement to be missed.
// ID guard prevents duplicates on Storybook HMR re-evaluation.
let clColorsAnnouncer = document.getElementById('cl-colors-copy-announcer');
if (!clColorsAnnouncer) {
  clColorsAnnouncer = document.createElement('div');
  clColorsAnnouncer.id = 'cl-colors-copy-announcer';
  clColorsAnnouncer.setAttribute('aria-live', 'polite');
  Object.assign(clColorsAnnouncer.style, {
    position: 'absolute',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
  });
  document.body.appendChild(clColorsAnnouncer);
}

// Guard prevents stacking duplicate listeners on Storybook HMR re-evaluation.
// A module-level variable would reset on HMR while the DOM node persists, so
// the flag lives on the announcer element — which survives re-evaluation with
// its ID intact — rather than in a module-level variable.
if (!clColorsAnnouncer.dataset.listenerAttached) {
  clColorsAnnouncer.dataset.listenerAttached = 'true';
  document.addEventListener('text-copy-button:copied', (e) => {
    if (!e.detail.button.closest('.cl-colors')) return;
    e.preventDefault();
    const btn = e.detail.button;

    clColorsAnnouncer.textContent = 'Copied!';

    // Clear any in-flight timeout on this button before starting a new one.
    // Without this, rapid clicks accumulate timeouts that remove --copied at
    // staggered times, leaving the button in the wrong visual state.
    clearTimeout(Number(btn.dataset.copyTimeout));
    btn.classList.add('cl-colors__copy-btn--copied');
    btn.dataset.copyTimeout = setTimeout(() => {
      btn.classList.remove('cl-colors__copy-btn--copied');
      // Safe to clear without aria-atomic — empty update has no content for
      // VoiceOver to announce or navigate to.
      clColorsAnnouncer.textContent = '';
    }, 1700);
  });
}

const colorComponentThemeData = { themes: tokens['component-themes'] };
const colorBasicThemeData = { themes: tokens['basic-themes'] };
const colorGlobalThemeData = { globalThemes: tokens['global-themes'] };
const siteHeaderThemes = { themes: tokens['site-header-themes'] };
const siteHeaderThemeOptions = Object.keys(tokens['site-header-themes']);
const siteFooterThemes = { themes: tokens['site-footer-themes'] };
const siteFooterThemeOptions = Object.keys(tokens['site-footer-themes']);
const siteHeaderAccents = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
];
const siteFooterAccents = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
];

const ctaButtonThemeOptions = Object.keys(tokens['button-cta-themes']);

// get global themes as `label` : `key` values to pass into options as array.
const siteGlobalThemeOptions = getGlobalThemes(tokens['global-themes']);

export default {
  title: 'Tokens/Colors',
};

export const Colors = () => colorsTwig(colorsData);
Colors.tags = ['!dev'];

// ---------------------------------------------------------------------------
// Web Colors — HEX values only (for digital use).
// ---------------------------------------------------------------------------
export const WebColors = () =>
  webColorsTwig({ ...colorsData, print_colors: printColorsMeta });
WebColors.storyName = 'Identity Colors';
WebColors.tags = ['!dev'];

// ---------------------------------------------------------------------------
// Section stories — used by web-colors.mdx Canvas blocks.
// ---------------------------------------------------------------------------
const printData = { print_colors: printColorsMeta };

// Restructure web accent colors to match PDF groupings (Cyan, Green, Yellow, Red/Orange, Gray).
// Each color carries its own css_var so the twig template can reference the correct token
// even when the group key no longer matches the token group name.
function withVar(tokenGroup, entries) {
  return Object.fromEntries(
    entries.map(([key, color]) => [
      key,
      { ...color, css_var: `--color-${tokenGroup}-${key}` },
    ]),
  );
}

const c = colorsData.colors;

// Yale Blue web hex — passed separately so Yale Blue section can show both web + print values.
const yaleBlueWeb = c.blue?.yale
  ? { hex: c.blue.yale.hex, css_var: '--color-blue-yale' }
  : null;

export const YaleBlue = () =>
  webColorsTwig({
    ...printData,
    yale_blue_web: yaleBlueWeb,
    section: 'yale-blue',
  });
YaleBlue.storyName = 'Yale Blue';
YaleBlue.tags = ['!dev'];

export const CoreColors = () =>
  webColorsTwig({ ...printData, section: 'core' });
CoreColors.storyName = 'Core Colors';
CoreColors.tags = ['!dev'];

export const AccentPrint = () =>
  webColorsTwig({ ...printData, section: 'accent-print' });
AccentPrint.storyName = 'Accent Colors for Print';
AccentPrint.tags = ['!dev'];

const accentWebColors = {
  yale_blue_web: yaleBlueWeb,
  colors: {
    // Cyan = our blue tokens (minus yale, which has its own section)
    Cyan: withVar(
      'blue',
      Object.entries(c.blue || {}).filter(([key]) => key !== 'yale'),
    ),
    // Green = our green tokens
    Green: withVar('green', Object.entries(c.green || {})),
    // Yellow = yellow tokens + orange.peach (PDF groups peach under Yellow)
    Yellow: {
      ...withVar('yellow', Object.entries(c.yellow || {})),
      ...(c.orange?.peach
        ? { peach: { ...c.orange.peach, css_var: '--color-orange-peach' } }
        : {}),
    },
    // Red/Orange = orange.coral is the closest token we have
    'Red/Orange': {
      ...(c.orange?.coral
        ? { coral: { ...c.orange.coral, css_var: '--color-orange-coral' } }
        : {}),
    },
    // Gray = our gray tokens
    Gray: withVar('gray', Object.entries(c.gray || {})),
  },
};

export const AccentWeb = () =>
  webColorsTwig({ ...accentWebColors, ...printData, section: 'accent-web' });
AccentWeb.storyName = 'Accent Colors for Web';
AccentWeb.tags = ['!dev'];

export const ComponentColorSlots = () => `
  <div style="max-width: 1200px; margin: 40px auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <h1 style="color: #00356b; margin-bottom: 20px;">Component Color Slots Reference</h1>
    <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px;">
      This reference lists all components in the YaleSites Design System that support color theming through "dials" or "slots".
      These controls allow you to customize the visual appearance of components while maintaining accessibility standards.
    </p>

    <div style="background-color: #f8f9fa; border-left: 4px solid #00356b; padding: 20px; margin-bottom: 30px;">
      <h3 style="margin-top: 0;">What are Color Slots?</h3>
      <p style="margin-bottom: 0; line-height: 1.6;">
        Color slots (also called "dials" or "themes") are predefined color combinations that have been tested for accessibility.
        Each slot typically includes coordinated colors for backgrounds, text, borders, and accents that work together harmoniously.
      </p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <thead>
        <tr style="background-color: #00356b; color: white;">
          <th style="padding: 15px; text-align: left; font-weight: 600;">Component</th>
          <th style="padding: 15px; text-align: left; font-weight: 600;">Available Color Slots</th>
          <th style="padding: 15px; text-align: left; font-weight: 600;">Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Banner</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Controls background theme</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Button (CTA)</td>
          <td style="padding: 15px;">Multiple theme options</td>
          <td style="padding: 15px;">Varies by button type and context</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Callout</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Background color themes</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Quick Links</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Background color themes</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Pull Quote</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Accent theme for quote styling</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Standalone Quote</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Accent theme for quote styling</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Tabs</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Tab navigation theme</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Site Header</td>
          <td style="padding: 15px;">Multiple theme options + Accent colors (1-8)</td>
          <td style="padding: 15px;">Combines theme with accent color selection</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Site Footer</td>
          <td style="padding: 15px;">Multiple theme options + Accent colors (1-8)</td>
          <td style="padding: 15px;">Combines theme with accent color selection</td>
        </tr>
      </tbody>
    </table>

    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin-top: 30px;">
      <h3 style="margin-top: 0;">💡 Usage Tips</h3>
      <ul style="margin-bottom: 0; line-height: 1.8;">
        <li><strong>Global Theme:</strong> Set via the toolbar at the top of Storybook - affects overall site color palette</li>
        <li><strong>Component Themes:</strong> Individual "dial" settings for specific components</li>
        <li><strong>Accessibility:</strong> All color combinations are tested to meet WCAG 2.1 AA standards</li>
        <li><strong>Consistency:</strong> Using the same slot numbers across components creates visual cohesion</li>
      </ul>
    </div>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #dee2e6;">
      <h2 style="color: #00356b; margin-bottom: 15px;">Exploring Color Options</h2>
      <p style="line-height: 1.6; margin-bottom: 15px;">
        To see these color slots in action, visit these stories:
      </p>
      <ul style="line-height: 1.8;">
        <li><strong>Component Theme Color Pairings:</strong> View all component themes side-by-side</li>
        <li><strong>Global Theme Color Pairings:</strong> See how components adapt to global theme changes</li>
        <li><strong>Color Basic Themes:</strong> Review accessibility-tested background color options</li>
      </ul>
    </div>
  </div>
`;
ComponentColorSlots.tags = ['!dev'];

export const ColorGlobalThemes = () => {
  const themes = tokens['global-themes'];

  const themeSlots = Object.keys(Object.values(themes)[0].colors);
  const brandSlots = ['slot-six', 'slot-seven', 'slot-eight'];
  const themeColorSlots = themeSlots.filter((s) => !brandSlots.includes(s));

  const renderSwatch = (slot, hsl) => {
    const hex = hslToHex(hsl);
    const num = slot.replace('slot-', '');
    return `
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
        <div style="
          width:64px;height:64px;border-radius:8px;
          background:${hsl};
          border:1px solid rgba(0,0,0,0.1);
        "></div>
        <span style="font-size:11px;font-weight:600;color:#444;">Slot ${num}</span>
        <span style="font-size:11px;color:#666;font-family:monospace;">${hex}</span>
      </div>`;
  };

  const renderGroup = (
    label,
    slots,
    colors,
    bgColor,
    borderColor,
    shrink = false,
  ) => {
    const swatches = slots
      .map((slot) => renderSwatch(slot, colors[slot]))
      .join('');
    return `
      <div style="${shrink ? 'flex:0 0 auto;' : 'flex:1;min-width:0;'}">
        <div style="
          font-size:11px;font-weight:700;text-transform:uppercase;
          letter-spacing:0.06em;color:#888;margin-bottom:8px;
        ">${label}</div>
        <div style="
          background:${bgColor};border:1px solid ${borderColor};
          border-radius:10px;padding:14px;
          display:flex;flex-wrap:wrap;gap:12px;
        ">
          ${swatches}
        </div>
      </div>`;
  };

  const themeCards = Object.entries(themes)
    .map(([key, theme]) => {
      const themeGroup = renderGroup(
        'Theme Colors — Slots 1–5',
        themeColorSlots,
        theme.colors,
        '#f9fafb',
        '#e5e7eb',
      );
      const brandGroup = renderGroup(
        'Yale Brand Colors — Slots 6–8',
        brandSlots,
        theme.colors,
        '#f0f4ff',
        '#c7d4f0',
        true,
      );

      return `
      <div style="margin-bottom:1.5rem;padding:1.5rem;background:#fff;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="margin:0 0 1.25rem;font-size:1.35rem;font-weight:700;color:#111;">
          ${key.charAt(0).toUpperCase() + key.slice(1)}: ${theme.label}
        </h2>
        <div style="display:flex;gap:1.5rem;flex-wrap:wrap;">
          ${themeGroup}
          ${brandGroup}
        </div>
      </div>`;
    })
    .join('');

  return `
    <div style="padding:2rem;max-width:960px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      ${themeCards}
    </div>`;
};
ColorGlobalThemes.tags = ['!dev'];

export const ColorBasicThemes = () => `
  <h2>These pairings are selected to support accessibility standards.</h2>
  <p>This page is useful to check the accessibility of various components against the available background colors.</p>

  ${colorBasicThemesTwig(colorBasicThemeData)}
`;
ColorBasicThemes.tags = ['!dev'];

export const ComponentThemeColorPairings = ({
  heading,
  description,
  image,
  calloutTheme,
  ctaButtonTheme,
  qlTheme,
  quoteTheme,
  standaloneQuoteTheme,
  tabTheme,
  bannerTheme,
  primaryNavPosition,
  menuVariation,
  siteHeaderImage,
  siteHeaderSiteNameImage,
  siteHeaderTwig,
  siteHeaderTheme,
  siteFooterTheme,
  siteHeaderAccent,
  siteFooterAccent,
  siteFooterVariation,
}) =>
  colorComponentThemeTwig({
    ...imageData.responsive_images['16x9'],
    ...tabData,
    ...bannerData,
    ...siteHeaderTwig,
    ...siteHeaderThemes,
    ...siteFooterThemes,
    ...colorComponentThemeData,
    ...utilityNavData,
    ...primaryNavData,
    ...siteHeaderAccents,
    ...siteFooterAccents,
    ...ctaButtonThemeOptions,
    site_header__site_name: 'Department of Chemistry',
    site_header__site_link: '/',
    site_header__border_thickness: '8',
    site_header__nav_position: primaryNavPosition,
    site_header__menu__variation: menuVariation,
    site_header__theme: siteHeaderTheme,
    site_header__background_image: siteHeaderImage,
    site_header__branding_link: 'https://www.yale.edu',
    site_header__site_name_image: siteHeaderSiteNameImage
      ? exampleSiteNameImageSvg
      : false,
    site_header__accent: siteHeaderAccent,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    quick_links__heading: heading,
    quick_links__description: description,
    quick_links__image: image,
    quick_links__background_color: qlTheme,
    callout__background_color: calloutTheme,
    cta_button__component_theme: ctaButtonTheme,
    quick_links__links: quickLinksData.quick_links__links,
    tabs__theme: tabTheme,
    banner__content__background: bannerTheme,
    pull_quote__accent_theme: quoteTheme,
    standalone_quote__accent_theme: standaloneQuoteTheme,
    site_footer__theme: siteFooterTheme,
    site_footer__accent: siteFooterAccent,
    site_footer__variation: siteFooterVariation,
  });
ComponentThemeColorPairings.argTypes = {
  primaryNavPosition: {
    name: 'Header: Navigation Position',
    options: ['left', 'center', 'right'],
    type: 'select',
  },
  menuVariation: {
    name: 'Header: Menu Variation',
    options: ['basic', 'mega', 'focus'],
    type: 'select',
  },
  siteHeaderTheme: {
    name: 'Header: Theme (dial)',
    options: siteHeaderThemeOptions,
    type: 'select',
  },
  siteHeaderAccent: {
    name: 'Header: Accent Color (dial)',
    options: siteHeaderAccents,
    type: 'select',
  },
  siteHeaderImage: {
    name: 'Header: With image',
    type: 'boolean',
  },
  siteHeaderSiteNameImage: {
    name: 'Header: Site Name is an Image',
    type: 'boolean',
  },
  bannerTheme: {
    name: 'Banner Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  ctaButtonTheme: {
    name: 'Button CTA Theme (dial)',
    type: 'select',
    options: ctaButtonThemeOptions,
  },
  qlTheme: {
    name: 'Quick Links Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  quoteTheme: {
    name: 'Quote Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  standaloneQuoteTheme: {
    name: 'Standalone Quote Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  calloutTheme: {
    name: 'Callout Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  tabTheme: {
    name: 'Tabs Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  siteFooterTheme: {
    name: 'Footer: Theme (dial)',
    options: siteFooterThemeOptions,
    type: 'select',
  },
  siteFooterAccent: {
    name: 'Footer: Accent Color (dial)',
    options: siteFooterAccents,
    type: 'select',
  },
  siteFooterVariation: {
    name: 'Footer: Variation (dial)',
    options: ['basic', 'mega'],
    type: 'select',
  },
};

ComponentThemeColorPairings.args = {
  primaryNavPosition: 'left',
  menuVariation: 'basic',
  siteHeaderTheme: 'one',
  siteHeaderAccent: 'one',
  siteHeaderImage: false,
  siteHeaderSiteNameImage: false,
  bannerTheme: 'one',
  ctaButtonTheme: 'one',
  qlTheme: 'one',
  quoteTheme: 'one',
  standaloneQuoteTheme: 'one',
  calloutTheme: 'one',
  tabTheme: 'one',
  siteFooterTheme: 'one',
  siteFooterAccent: 'one',
  siteFooterVariation: 'basic',
};
ComponentThemeColorPairings.tags = ['!dev'];

export const GlobalThemeColorPairings = ({
  heading,
  description,
  image,
  globalTheme,
  calloutTheme,
  ctaButtonTheme,
  qlTheme,
  quoteTheme,
  standaloneQuoteTheme,
  tabTheme,
  bannerTheme,
  primaryNavPosition,
  menuVariation,
  siteHeaderTwig,
  siteHeaderTheme,
  siteHeaderAccent,
  siteHeaderImage,
  siteHeaderSiteNameImage,
  siteFooterTheme,
  siteFooterAccent,
  siteFooterVariation,
}) =>
  colorGlobalThemePairingTwig({
    ...imageData.responsive_images['16x9'],
    ...colorGlobalThemeData,
    ...colorGlobalThemeTwig,
    ...tabData,
    ...bannerData,
    ...siteHeaderTwig,
    ...siteHeaderThemes,
    ...siteFooterThemes,
    ...utilityNavData,
    ...primaryNavData,
    ...siteHeaderAccents,
    ...siteFooterAccents,
    site_global__theme: globalTheme,
    site_header__site_name: 'Department of Chemistry',
    site_header__site_link: '/',
    site_header__border_thickness: '8',
    site_header__nav_position: primaryNavPosition,
    site_header__menu__variation: menuVariation,
    site_header__theme: siteHeaderTheme,
    site_header__background_image: siteHeaderImage,
    site_header__branding_link: 'https://www.yale.edu',
    site_header__site_name_image: siteHeaderSiteNameImage
      ? exampleSiteNameImageSvg
      : false,
    site_header__accent: siteHeaderAccent,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    quick_links__heading: heading,
    quick_links__description: description,
    quick_links__image: image,
    quick_links__background_color: qlTheme,
    callout__background_color: calloutTheme,
    cta_button__component_theme: ctaButtonTheme,
    quick_links__links: quickLinksData.quick_links__links,
    tabs__theme: tabTheme,
    banner__content__background: bannerTheme,
    pull_quote__accent_theme: quoteTheme,
    standalone_quote__accent_theme: standaloneQuoteTheme,
    site_footer__theme: siteFooterTheme,
    site_footer__accent: siteFooterAccent,
    site_footer__variation: siteFooterVariation,
  });

GlobalThemeColorPairings.argTypes = {
  globalTheme: {
    name: 'Site: Global Theme (lever)',
    options: siteGlobalThemeOptions,
    type: 'select',
  },
  primaryNavPosition: {
    name: 'Header: Navigation Position',
    options: ['left', 'center', 'right'],
    type: 'select',
  },
  menuVariation: {
    name: 'Header: Menu Variation',
    options: ['basic', 'mega', 'focus'],
    type: 'select',
  },
  siteHeaderTheme: {
    name: 'Header: Theme (dial)',
    options: siteHeaderThemeOptions,
    type: 'select',
  },
  siteHeaderAccent: {
    name: 'Header: Accent Color (dial)',
    options: siteHeaderAccents,
    type: 'select',
  },
  siteHeaderImage: {
    name: 'Header: With Image',
    type: 'boolean',
  },
  siteHeaderSiteNameImage: {
    name: 'Header: Site Name Is An Image',
    type: 'boolean',
  },
  bannerTheme: {
    name: 'Banner Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  ctaButtonTheme: {
    name: 'Button CTA Theme (dial)',
    type: 'select',
    options: ctaButtonThemeOptions,
  },
  qlTheme: {
    name: 'Quick Links Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  quoteTheme: {
    name: 'Quote Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  standaloneQuoteTheme: {
    name: 'Standalone Quote Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  calloutTheme: {
    name: 'Callout Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  tabTheme: {
    name: 'Tabs Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  siteFooterTheme: {
    name: 'Footer: Theme (dial)',
    options: siteFooterThemeOptions,
    type: 'select',
  },
  siteFooterAccent: {
    name: 'Footer: Accent Color (dial)',
    options: siteFooterAccents,
    type: 'select',
  },
  siteFooterVariation: {
    name: 'Footer: Variation (dial)',
    options: ['basic', 'mega'],
    type: 'select',
  },
};
GlobalThemeColorPairings.tags = ['!dev'];

GlobalThemeColorPairings.args = {
  globalTheme: 'one',
  primaryNavPosition: 'left',
  menuVariation: 'basic',
  siteHeaderTheme: 'one',
  siteHeaderAccent: 'one',
  siteHeaderImage: false,
  siteHeaderSiteNameImage: false,
  bannerTheme: 'one',
  ctaButtonTheme: 'one',
  qlTheme: 'one',
  quoteTheme: 'one',
  standaloneQuoteTheme: 'one',
  calloutTheme: 'one',
  tabTheme: 'one',
  siteFooterTheme: 'one',
  siteFooterAccent: 'one',
  siteFooterVariation: 'basic',
};
