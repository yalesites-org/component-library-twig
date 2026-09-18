/**
 * Every (surface, foreground) pairing the token structure declares
 * (YaleSites-Internal#1632).
 *
 * A *surface* is anything that publishes a background together with the
 * foreground meant to sit on it. The token package already expresses four of
 * them, in two vocabularies:
 *
 * - `component-themes`, `basic-themes` and `button-cta-themes` say it directly,
 *   as `background` / `text` / `heading` on the same object.
 * - Layout Builder sections say it indirectly, as a pair of *slot names* per
 *   section theme, resolved against whichever global theme the site is using.
 *   `section-themes.mjs` already models that mapping, and
 *   `section-background-contrast.test.mjs` already asserts it has not drifted
 *   from `_yds-layout.scss`, so it is imported rather than transcribed a second
 *   time. The data module is imported rather than the audit script that
 *   re-exports it: that script computes and formats three full reports at module
 *   scope, which the gate has no use for.
 *
 * This module is only the enumeration. `contrast-gate.mjs` does the arithmetic
 * and owns the pass/fail verdict.
 *
 * ## What is deliberately NOT in here
 *
 * The Phase 2 (#1631) leak case -- a section's foreground inheriting down onto
 * a *block's* background, which is the failure the Color Surface epic exists to
 * fix -- is reported by the gate's CLI but is not an approved pairing and is not
 * asserted. Nobody approved it; it is what happens when a component paints a
 * background without publishing a foreground. Asserting it here would freeze
 * Phase 2's not-yet-agreed surface model into a build failure, and #1631 owns
 * tracking that burn-down as it converts components.
 *
 * `site-header-themes` and `site-footer-themes` are also out, for a different
 * reason: they use a third key vocabulary (`background-color` / `text-color` /
 * `yale-branding`), and `yale-branding` is a wordmark asset rather than a
 * token-painted foreground. Their measured numbers are in the CLI report so the
 * omission is visible rather than silent -- header themes two and three pair the
 * branding colour with their background at 2.19:1 and 1.64:1, which is worth its
 * own ticket and a designer, not a unilateral gate.
 */

import { createRequire } from 'node:module';

import {
  SECTION_THEMES,
  resolveGlobalTheme as resolveSlots,
} from './section-themes.mjs';
import { AA_NORMAL_TEXT, WCAG_LEVELS } from './contrast-ratio.mjs';

// `createRequire` rather than an import attribute, for the same reason
// `section-background-contrast.mjs` gives: prettier -- which `npm run test`
// runs -- cannot parse `with { type: 'json' }` yet.
const require = createRequire(import.meta.url);
const tokens = require('@yalesites-org/tokens/build/json/tokens.json');

/** `resolveSlots` with this package's global themes supplied. */
const resolveGlobalTheme = (themeName) =>
  resolveSlots(themeName, tokens['global-themes']);

/**
 * AA minimum for non-text: borders and other UI graphics. WCAG 1.4.11.
 *
 * Read from `WCAG_LEVELS` rather than written as `3`, for the same reason
 * `AA_NORMAL_TEXT` is derived rather than written as `4.5` -- there should be
 * one place each of those numbers is stated, and it is the WCAG table.
 */
export const AA_NON_TEXT = WCAG_LEVELS.find(
  (level) => level.id === 'non-text',
).minimum;

/** The surface families the gate enumerates. Used to detect one going silent. */
export const PAIRING_KINDS = ['section', 'block', 'basic', 'cta', 'safe-slot'];

/** How many global themes the section pairings must cover. */
export const GLOBAL_THEME_COUNT = Object.keys(tokens['global-themes']).length;

/**
 * Section-theme roles that carry text, and the one that does not.
 *
 * `content`, `heading` and `link` are read by 1.4.3 at 4.5:1. `border` is
 * `--color-layout-border`, which is non-text under 1.4.11 at 3:1 -- and is also
 * the source of the CTA atom's filled-button background, which is why #1613
 * left it alone rather than re-pointing it.
 */
const SECTION_TEXT_ROLES = ['content', 'heading', 'link'];

/**
 * The three slots #1539 named as safe foregrounds for block content.
 *
 * The rule is real but was derived against a single background (slot-nine, the
 * near-white tint behind section theme five), so it only ever said something
 * about light backgrounds. The gate promotes it to an invariant over the
 * backgrounds the design system *itself* treats as taking a safe foreground --
 * see `safeForegroundBackgrounds()` -- rather than against a transcribed list
 * of "light" slots that would drift the first time a palette changed.
 */
const SAFE_FOREGROUND_SLOTS = ['slot-one', 'slot-six', 'slot-seven'];

/**
 * The section backgrounds the system already pairs with a #1539 safe slot.
 *
 * Derived from `SECTION_THEMES` rather than listed: a section theme whose own
 * content colour is one of the three safe slots is, by the design system's own
 * choice, a background that safe foregrounds sit on. If all three are genuinely
 * interchangeable there -- which is what #1539 claims -- then all three must
 * clear 4.5:1 on it, in every global theme.
 */
function safeForegroundBackgrounds() {
  return [
    ...new Set(
      Object.values(SECTION_THEMES)
        .filter((roles) => SAFE_FOREGROUND_SLOTS.includes(roles.content))
        .map((roles) => roles.background),
    ),
  ];
}

/** One pairing record. `globalTheme` is null for theme-independent surfaces. */
function pairing({
  kind,
  surface,
  globalTheme = null,
  role,
  background,
  foreground,
  minimum,
}) {
  return {
    id: `${kind}/${globalTheme ?? 'any'}/${surface}/${role}`,
    kind,
    surface,
    globalTheme,
    role,
    background,
    foreground,
    minimum,
  };
}

/**
 * Section surfaces: every section theme resolved against every global theme.
 *
 * This is the only family that multiplies by global theme, because a section
 * theme names slots and the slots are what the global theme swaps out.
 */
function sectionPairings() {
  return Object.keys(tokens['global-themes']).flatMap((globalTheme) => {
    const slots = resolveGlobalTheme(globalTheme);

    return Object.entries(SECTION_THEMES).flatMap(([surface, roles]) => {
      const background = {
        name: roles.background,
        value: slots[roles.background],
      };

      return [...SECTION_TEXT_ROLES, 'border'].map((role) =>
        pairing({
          kind: 'section',
          surface,
          globalTheme,
          role,
          background,
          foreground: { name: roles[role], value: slots[roles[role]] },
          minimum: role === 'border' ? AA_NON_TEXT : AA_NORMAL_TEXT,
        }),
      );
    });
  });
}

/**
 * Surfaces that state `background` / `text` / `heading` on the object itself.
 *
 * `component-themes` (the block dial), `basic-themes` and `button-cta-themes`
 * all share that vocabulary, so one walk covers them. Roles absent from a
 * family are skipped rather than defaulted -- `button-cta-themes` has no
 * `heading`, and inventing one would gate a pairing that does not exist.
 */
function declaredPairings(kind, family) {
  return Object.entries(tokens[family]).flatMap(([surface, theme]) =>
    ['text', 'heading']
      .filter((role) => theme[role])
      .map((role) =>
        pairing({
          kind,
          surface,
          role,
          background: {
            name: `${surface}.background`,
            value: theme.background,
          },
          foreground: { name: `${surface}.${role}`, value: theme[role] },
          minimum: AA_NORMAL_TEXT,
        }),
      ),
  );
}

/** The #1539 safe-foreground convention, as an invariant instead of a memo. */
function safeSlotPairings() {
  const backgrounds = safeForegroundBackgrounds();

  return Object.keys(tokens['global-themes']).flatMap((globalTheme) => {
    const slots = resolveGlobalTheme(globalTheme);

    return backgrounds.flatMap((backgroundSlot) =>
      SAFE_FOREGROUND_SLOTS.map((foregroundSlot) =>
        pairing({
          kind: 'safe-slot',
          surface: backgroundSlot,
          globalTheme,
          role: foregroundSlot,
          background: { name: backgroundSlot, value: slots[backgroundSlot] },
          foreground: { name: foregroundSlot, value: slots[foregroundSlot] },
          minimum: AA_NORMAL_TEXT,
        }),
      ),
    );
  });
}

/** Every pairing the gate checks, in a stable order. */
export function approvedPairings() {
  return [
    ...sectionPairings(),
    ...declaredPairings('block', 'component-themes'),
    ...declaredPairings('basic', 'basic-themes'),
    ...declaredPairings('cta', 'button-cta-themes'),
    ...safeSlotPairings(),
  ];
}
