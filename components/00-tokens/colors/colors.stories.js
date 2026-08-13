import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import getGlobalThemes from './color-global-themes';
import {
  AA_NORMAL_TEXT,
  WCAG_LEVELS,
  contrastRatio,
  evaluateRatio,
  findIsolatedSlots,
  formatContrastReport,
  formatRatio,
  parseHex,
  parseHsl,
  rgbToHex,
  rgbToString,
  thresholdGroups,
} from './contrast-ratio.mjs';
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

// The color math lives in contrast-ratio.mjs so these stories and the
// Contrast Matrix share one implementation, checked by contrast-ratio.test.mjs.
const hslToHex = (hslStr) => rgbToHex(parseHsl(hslStr));
const hslToRgb = (hslStr) => rgbToString(parseHsl(hslStr));

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

// ---------------------------------------------------------------------------
// Contrast matrix
//
// Everything below is derived from tokens.json `global-themes` — themes, slots,
// and thresholds are all read, never listed here, so a theme or slot added
// upstream shows up with no edit to this file. The math itself lives in
// contrast-ratio.mjs and is checked by contrast-ratio.test.mjs.
// ---------------------------------------------------------------------------

const globalThemes = tokens['global-themes'];

// Slot keys for the custom checker's inputs, taken from the first theme. Each
// theme's own matrix reads that theme's slots, so themes may differ.
const contrastSlotKeys = Object.keys(Object.values(globalThemes)[0].colors);

// Slots six, seven and eight are Yale's brand colors (blue, near-black,
// white) -- they are not exposed for customization anywhere in the design
// system, so the custom checker below renders them read-only rather than
// inviting an edit that could never ship.
const BRAND_SLOTS = ['slot-six', 'slot-seven', 'slot-eight'];

// Slot token keys spell the number out ("slot-six") but every doc and label
// refers to slots by numeral, so map back. An unrecognised word falls through
// unchanged, which keeps a slot added upstream rendering rather than blank.
const SLOT_NUMERALS = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const slotNumber = (slot) => {
  const word = slot.replace('slot-', '');
  return SLOT_NUMERALS[word] || word;
};

const slotLabel = (slot) => `Slot ${slotNumber(slot)}`;

/**
 * Verdicts, worst to best. Each carries a word and a symbol so the result never
 * depends on the cell's color alone (WCAG 1.4.1 Use of Color) — which would be
 * an unfortunate way for a contrast story to fail.
 *
 * The five WCAG criteria use only three distinct minimums (3, 4.5 and 7), so
 * these four tiers encode every one of them: a cell's tier says which of the
 * three boundaries the pairing clears.
 */
const CONTRAST_TIERS = {
  aaa: {
    id: 'aaa',
    label: 'AAA',
    symbol: '★',
    summary: 'Passes AA and AAA for normal text.',
  },
  aa: {
    id: 'aa',
    label: 'AA',
    symbol: '✓',
    summary: 'Passes AA for normal text, large text, and non-text.',
  },
  large: {
    id: 'large',
    label: 'AA large only',
    symbol: '◐',
    summary: 'Passes AA for large text and non-text. Fails AA normal text.',
  },
  fail: {
    id: 'fail',
    label: 'Fail',
    symbol: '✕',
    summary: 'Below every WCAG 2.1 contrast threshold.',
  },
};

/**
 * Reduce a ratio to a single verdict, reading the thresholds from
 * evaluateRatio so no minimum is restated here.
 */
function tierFor(ratio) {
  const levels = evaluateRatio(ratio);
  const passes = (id) =>
    levels.some((level) => level.id === id && level.passes);

  if (passes('normal-aaa')) return CONTRAST_TIERS.aaa;
  if (passes('normal-aa')) return CONTRAST_TIERS.aa;
  if (passes('large-aa')) return CONTRAST_TIERS.large;
  return CONTRAST_TIERS.fail;
}

/** Slot name to RGB for one theme. */
const themePalette = (theme) =>
  Object.fromEntries(
    Object.entries(theme.colors).map(([slot, hsl]) => [slot, parseHsl(hsl)]),
  );

/** Drop slots with no usable color, so a blank input never reads as a failure. */
const usablePalette = (palette) =>
  Object.fromEntries(Object.entries(palette).filter(([, rgb]) => rgb));

/** Every unordered pairing in a palette, with its ratio, computed once. */
function palettePairs(palette) {
  const slots = Object.keys(palette);

  return slots.flatMap((slot, index) =>
    slots.slice(index + 1).map((other) => ({
      slots: [slot, other],
      ratio: contrastRatio(palette[slot], palette[other]),
    })),
  );
}

/**
 * How a palette fares at each distinct WCAG minimum.
 *
 * Reported per minimum rather than only at 4.5:1, because "does every slot
 * have a usable partner" has a different answer for icons (3:1) than for body
 * text (4.5:1) than for AAA (7:1), and a reader needs all three at once.
 */
function paletteStats(palette) {
  const pairs = palettePairs(palette);

  return {
    total: pairs.length,
    thresholds: thresholdGroups().map((group) => ({
      ...group,
      passing: pairs.filter((pair) => pair.ratio >= group.minimum).length,
      isolated: findIsolatedSlots(palette, group.minimum),
    })),
  };
}

/** The strictest minimum at which no slot is stranded, or null if none is. */
function strictestCleanThreshold(stats) {
  const clean = stats.thresholds.filter((t) => !t.isolated.length);
  return clean.length ? clean[clean.length - 1] : null;
}

/** The strongest pairing available to one slot — used to say how far off it is. */
function bestPartner(palette, slot) {
  return Object.keys(palette)
    .filter((other) => other !== slot)
    .map((other) => ({
      slot: other,
      ratio: contrastRatio(palette[slot], palette[other]),
    }))
    .sort((a, b) => b.ratio - a.ratio)[0];
}

function renderSwatchChip(rgb) {
  return `<span class="cl-contrast__chip" style="background:${rgbToHex(
    rgb,
  )};"></span>`;
}

function renderMatrixCell(palette, rowSlot, colSlot) {
  if (rowSlot === colSlot) {
    return `
      <td class="cl-contrast__cell cl-contrast__cell--self">
        <span aria-hidden="true">—</span>
        <span class="visually-hidden">Same color, not a pairing</span>
      </td>`;
  }

  const ratio = contrastRatio(palette[rowSlot], palette[colSlot]);
  const tier = tierFor(ratio);

  return `
    <td class="cl-contrast__cell cl-contrast__cell--${tier.id}">
      <span class="cl-contrast__ratio">${formatRatio(
        ratio,
      )}<span class="visually-hidden"> to 1</span></span>
      <span class="cl-contrast__badge"><span aria-hidden="true">${
        tier.symbol
      }</span> ${tier.label}</span>
    </td>`;
}

/**
 * The pairing grid for one palette. Rows and columns are the same slots, so the
 * grid is symmetrical; it is rendered in full rather than as a triangle so a
 * row can be read straight across as "this slot against everything else".
 */
function renderMatrixTable(palette, caption) {
  const slots = Object.keys(palette);

  const headCells = slots
    .map(
      (slot) => `
        <th scope="col" class="cl-contrast__head">
          ${renderSwatchChip(palette[slot])}
          <span>${slotLabel(slot)}</span>
        </th>`,
    )
    .join('');

  const rows = slots
    .map(
      (rowSlot) => `
        <tr>
          <th scope="row" class="cl-contrast__head">
            ${renderSwatchChip(palette[rowSlot])}
            <span>${slotLabel(rowSlot)}</span>
            <span class="cl-contrast__hex">${rgbToHex(palette[rowSlot])}</span>
          </th>
          ${slots
            .map((colSlot) => renderMatrixCell(palette, rowSlot, colSlot))
            .join('')}
        </tr>`,
    )
    .join('');

  return `
    <div class="sb-table-scroll" role="region" aria-label="${caption}" tabindex="0">
      <table class="cl-contrast__table">
        <caption class="visually-hidden">${caption}</caption>
        <thead>
          <tr>
            <th scope="col" class="cl-contrast__head"><span class="visually-hidden">Slot</span></th>
            ${headCells}
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

/** "Normal text (AA), Large text (AAA)" — what a given minimum is used for. */
const thresholdUsedFor = (group) =>
  group.levels.map((level) => `${level.label} (${level.level})`).join(', ');

/**
 * The gist in one sentence, phrased around the strictest minimum that leaves
 * nothing stranded — the number a reader can actually design to.
 *
 * Shared by the visible headline and the checker's spoken announcement so the
 * two cannot drift apart.
 */
function strandedSentence(stats) {
  const clean = strictestCleanThreshold(stats);
  const strictest = stats.thresholds[stats.thresholds.length - 1];

  if (clean === strictest) {
    return {
      tone: 'ok',
      text: `Every slot has at least one partner even at ${strictest.minimum}:1, the strictest WCAG minimum. Nothing here is stranded.`,
    };
  }

  if (!clean) {
    return {
      tone: 'warn',
      text: `Some slots have no partner at any WCAG minimum, not even ${stats.thresholds[0].minimum}:1. See the table.`,
    };
  }

  return {
    tone: 'ok',
    text: `Every slot has at least one partner up to ${clean.minimum}:1. Above that some slots have none — see the table.`,
  };
}

function renderStrandedHeadline(stats) {
  const { tone, text } = strandedSentence(stats);
  return `<p class="cl-contrast__notice cl-contrast__notice--${tone}">
    <span aria-hidden="true">${tone === 'ok' ? '✓' : '!'}</span> ${text}
  </p>`;
}

/** Which slots are stranded at one minimum, and how far short they fall. */
function renderIsolatedCell(palette, group) {
  if (!group.isolated.length) return 'None';

  return group.isolated
    .map((slot) => {
      const best = bestPartner(palette, slot);
      const shortfall = best ? ` (best ${formatRatio(best.ratio)}:1)` : '';
      return `${slotLabel(slot)}${shortfall}`;
    })
    .join(', ');
}

/**
 * The per-threshold breakdown that goes above each grid.
 *
 * Every distinct minimum gets its own row rather than only 4.5:1, because
 * whether a palette works depends on what it is being used for: icons need
 * 3:1, body text 4.5:1, AAA body text 7:1.
 */
function renderPaletteSummary(palette, stats) {
  if (!stats.total) {
    return `<p class="cl-contrast__notice">Enter at least two colors to compare.</p>`;
  }

  const rows = stats.thresholds
    .map(
      (group) => `
        <tr>
          <th scope="row">${group.minimum}:1</th>
          <td>${thresholdUsedFor(group)}</td>
          <td><strong>${group.passing}</strong> of ${stats.total}</td>
          <td>${renderIsolatedCell(palette, group)}</td>
        </tr>`,
    )
    .join('');

  return `${renderStrandedHeadline(stats)}
    <div class="sb-table-scroll" role="region" aria-label="Pairings meeting each WCAG minimum" tabindex="0">
      <table class="cl-contrast__table cl-contrast__table--summary">
        <thead>
          <tr>
            <th scope="col">Minimum</th>
            <th scope="col">Used for</th>
            <th scope="col">Pairings that pass</th>
            <th scope="col">Slots with no partner</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

/** Threshold key, built from WCAG_LEVELS so the numbers are never retyped. */
function renderThresholdKey() {
  const rows = WCAG_LEVELS.map(
    (level) => `
      <tr>
        <th scope="row">${level.label}</th>
        <td>${level.level}</td>
        <td>${level.minimum}:1</td>
        <td>SC ${level.criterion}</td>
      </tr>`,
  ).join('');

  const tiers = Object.values(CONTRAST_TIERS)
    .map(
      (tier) => `
      <li class="cl-contrast__legend-item">
        <span class="cl-contrast__badge cl-contrast__badge--${tier.id}"><span aria-hidden="true">${tier.symbol}</span> ${tier.label}</span>
        ${tier.summary}
      </li>`,
    )
    .join('');

  return `
    <div class="cl-contrast__key">
      <h3>What the grid means</h3>
      <ul class="cl-contrast__legend">${tiers}</ul>
      <div class="sb-table-scroll" role="region" aria-label="WCAG 2.1 contrast thresholds" tabindex="0">
        <table class="cl-contrast__table cl-contrast__table--key">
          <caption>WCAG 2.1 contrast thresholds. Level A has no contrast criterion, so it is not listed.</caption>
          <thead>
            <tr>
              <th scope="col">Content</th>
              <th scope="col">Level</th>
              <th scope="col">Minimum</th>
              <th scope="col">Criterion</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

/**
 * Pair totals across every global theme, computed rather than asserted — the
 * Theming Reference quotes these so its accessibility claim cannot drift away
 * from what the matrix actually shows.
 */
const globalThemeContrastTotals = Object.values(globalThemes).reduce(
  (totals, theme) => {
    const stats = paletteStats(usablePalette(themePalette(theme)));
    const normalText = stats.thresholds.find(
      (group) => group.minimum === AA_NORMAL_TEXT,
    );
    return {
      passing: totals.passing + normalText.passing,
      total: totals.total + stats.total,
    };
  },
  { passing: 0, total: 0 },
);

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
        <li><strong>Accessibility:</strong> Contrast is not automatic. Only ${globalThemeContrastTotals.passing} of the ${globalThemeContrastTotals.total} global theme slot pairings clear the WCAG 2.1 AA ${AA_NORMAL_TEXT}:1 minimum for normal text — check a specific pairing in the Contrast Matrix story before relying on it</li>
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
  const themeColorSlots = themeSlots.filter((s) => !BRAND_SLOTS.includes(s));

  // Headings list the slots actually rendered. The previous hardcoded
  // "Slots 1–5" heading sat above six swatches, because slot-nine is a theme
  // color slot too.
  const slotsHeading = (slots) => `Slots ${slots.map(slotNumber).join(', ')}`;

  const renderSwatch = (slot, hsl) => {
    const hex = hslToHex(hsl);
    const num = slotNumber(slot);
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
          letter-spacing:0.06em;color:var(--color-gray-600);margin-bottom:8px;
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
        `Theme Colors — ${slotsHeading(themeColorSlots)}`,
        themeColorSlots,
        theme.colors,
        '#f9fafb',
        '#e5e7eb',
      );
      const brandGroup = renderGroup(
        `Yale Brand Colors — ${slotsHeading(BRAND_SLOTS)}`,
        BRAND_SLOTS,
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

// ---------------------------------------------------------------------------
// Contrast Matrix — every slot pairing in every global theme, with its ratio.
// ---------------------------------------------------------------------------
export const ThemeContrastMatrix = () => {
  const themeSections = Object.entries(globalThemes)
    .map(([key, theme]) => {
      const palette = usablePalette(themePalette(theme));
      const stats = paletteStats(palette);
      const caption = `Contrast ratios between every color slot in the ${theme.label} theme`;

      return `
        <section class="cl-contrast__theme">
          <h3 class="cl-contrast__theme-title">
            ${key.charAt(0).toUpperCase() + key.slice(1)}: ${theme.label}
          </h3>
          ${renderPaletteSummary(palette, stats)}
          ${renderMatrixTable(palette, caption)}
        </section>`;
    })
    .join('');

  return `
    <div class="cl-contrast">
      ${renderThresholdKey()}
      ${themeSections}
    </div>`;
};
ThemeContrastMatrix.storyName = 'Contrast Matrix';
ThemeContrastMatrix.tags = ['!dev'];

// ---------------------------------------------------------------------------
// Custom Palette Contrast Checker — the same calculation, on colors you type.
// ---------------------------------------------------------------------------
const HEX_HINT = 'Enter a 3- or 6-digit hex color, for example #00356b.';

export const CustomPaletteContrastChecker = () => {
  const root = document.createElement('div');
  root.className = 'cl-contrast';

  // Seeded from the first theme so the grid is populated on arrival and the
  // expected format is obvious; every field can be cleared or replaced.
  const seed = Object.values(globalThemes)[0].colors;

  const renderField = (slot) => {
    const id = `cl-contrast-input-${slot}`;
    const hex = rgbToHex(parseHsl(seed[slot]));

    // Slots six, seven and eight are Yale's brand colors — read-only, so
    // they still take part in the comparison below but cannot be typed
    // over.
    if (BRAND_SLOTS.includes(slot)) {
      return `
        <div class="form-item cl-contrast__field cl-contrast__field--static">
          <label class="form-item__label" for="${id}">${slotLabel(
        slot,
      )} color</label>
          <input
            class="form-item__textfield"
            type="text"
            id="${id}"
            data-slot="${slot}"
            value="${hex}"
            readonly
            aria-describedby="${id}-hint"
          />
          <p class="cl-contrast__field-hint" id="${id}-hint">Fixed Yale brand color — not editable.</p>
        </div>`;
    }

    // Uses the design system's own form atom classes rather than restyling an
    // input from scratch — see 01-atoms/forms/textfields.
    return `
      <div class="form-item cl-contrast__field">
        <label class="form-item__label" for="${id}">${slotLabel(
      slot,
    )} color</label>
        <input
          class="form-item__textfield"
          type="text"
          id="${id}"
          data-slot="${slot}"
          value="${hex}"
          placeholder="#000000"
          maxlength="7"
          spellcheck="false"
          autocomplete="off"
          aria-describedby="${id}-error"
        />
        <p class="form-item__error-text" id="${id}-error"></p>
      </div>`;
  };

  // Rendered as two row groups rather than one flowing grid, split right
  // before the first brand slot. A single auto-fill grid wraps wherever the
  // viewport happens to fit a column break, which can strand slot six on the
  // editable fields' row while seven, eight and nine wrap alone below it --
  // each group still wraps responsively on its own, just never mixed with
  // the other.
  const firstBrandIndex = contrastSlotKeys.findIndex((slot) =>
    BRAND_SLOTS.includes(slot),
  );
  const fieldGroups = [
    contrastSlotKeys.slice(0, firstBrandIndex),
    contrastSlotKeys.slice(firstBrandIndex),
  ];
  const fields = fieldGroups
    .map(
      (slots) =>
        `<div class="cl-contrast__fields">${slots
          .map(renderField)
          .join('')}</div>`,
    )
    .join('');

  root.innerHTML = `
    ${renderThresholdKey()}
    <form class="cl-contrast__form">
      <fieldset>
        <legend>Colors to check</legend>
        <p class="cl-contrast__form-hint">
          Type a hex color into any editable field to see how your palette
          scores against your colors and Yale's fixed brand colors. ${HEX_HINT}
          Leave an editable field empty to leave that slot out. Slots six,
          seven and eight are Yale's brand colors and cannot be edited.
        </p>
        ${fields}
      </fieldset>
    </form>
    <div class="cl-contrast__results"></div>
    <button type="button" class="cl-contrast__download">
      Download these results as a text file
    </button>
    <p class="cl-contrast__download-hint">
      A plain-text summary of the colors, the coverage table and every pairing —
      for sending to someone who is not looking at this page.
    </p>
    <p class="visually-hidden" aria-live="polite"></p>`;

  const results = root.querySelector('.cl-contrast__results');
  const announcer = root.querySelector('[aria-live]');
  const download = root.querySelector('.cl-contrast__download');
  const inputs = Array.from(root.querySelectorAll('input[data-slot]'));

  /** Read the fields, flagging bad values rather than silently dropping them. */
  const readPalette = () => {
    const palette = {};

    inputs.forEach((input) => {
      // Brand-color fields are read-only and always valid — they have no
      // error element to update, so they skip the validation path entirely
      // and go straight into the palette.
      if (input.readOnly) {
        palette[input.dataset.slot] = parseHex(input.value);
        return;
      }

      const raw = input.value.trim();
      const rgb = parseHex(raw);
      const invalid = raw !== '' && !rgb;

      input.setAttribute('aria-invalid', String(invalid));
      input.classList.toggle('form-item__textfield--error', invalid);
      root.querySelector(`#${input.id}-error`).textContent = invalid
        ? HEX_HINT
        : '';

      if (rgb) palette[input.dataset.slot] = rgb;
    });

    return palette;
  };

  /**
   * Nothing the visitor types reaches innerHTML: the grid is rebuilt from the
   * parsed {r, g, b} integers, and the one place raw input would show (the
   * per-field error) is set with textContent.
   */
  const render = () => {
    const palette = readPalette();
    const stats = paletteStats(palette);

    results.innerHTML = `
      ${renderPaletteSummary(palette, stats)}
      ${
        stats.total
          ? renderMatrixTable(
              palette,
              'Contrast ratios between every color you entered',
            )
          : ''
      }`;

    // Nothing to export until there are two colors to compare.
    download.disabled = !stats.total;

    return { palette, stats };
  };

  let { palette, stats } = render();

  root.addEventListener('input', () => {
    ({ palette, stats } = render());
  });

  // The spoken summary updates on commit rather than on every keystroke, which
  // would otherwise queue one announcement per character typed. `change` only
  // fires after the value changed, so the last `input` render is current.
  root.addEventListener('change', () => {
    if (!stats.total) {
      announcer.textContent = 'Enter at least two colors to compare.';
      return;
    }
    // "N of M at X:1" rather than "N meet X:1" sidesteps verb agreement when
    // there is exactly one pairing.
    const counts = stats.thresholds
      .map(
        (group) => `${group.passing} of ${stats.total} at ${group.minimum}:1`,
      )
      .join('. ');
    const pairings = stats.total === 1 ? 'pairing' : 'pairings';
    announcer.textContent = `${stats.total} ${pairings} compared. ${counts}. ${
      strandedSentence(stats).text
    }`;
  });

  download.addEventListener('click', () => {
    const generatedOn = new Date().toISOString().slice(0, 10);
    const text = formatContrastReport({
      generatedOn,
      colors: Object.keys(palette).map((slot) => ({
        label: slotLabel(slot),
        hex: rgbToHex(palette[slot]),
      })),
      thresholds: stats.thresholds.map((group) => ({
        minimum: group.minimum,
        usedFor: thresholdUsedFor(group),
        passing: group.passing,
        total: stats.total,
        isolated: group.isolated.map(slotLabel),
      })),
      pairs: palettePairs(palette).map((pair) => ({
        a: slotLabel(pair.slots[0]),
        b: slotLabel(pair.slots[1]),
        ratio: pair.ratio,
        verdict: tierFor(pair.ratio).label,
      })),
    });

    const filename = `yalesites-contrast-check-${generatedOn}.txt`;
    const url = URL.createObjectURL(
      new Blob([text], { type: 'text/plain;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    // Revoked on the next tick rather than immediately: Safari has not always
    // finished reading the blob by the time click() returns.
    setTimeout(() => URL.revokeObjectURL(url), 0);

    announcer.textContent = `Downloaded ${filename}.`;
  });

  return root;
};
CustomPaletteContrastChecker.storyName = 'Custom Palette Contrast Checker';
CustomPaletteContrastChecker.tags = ['!dev'];
