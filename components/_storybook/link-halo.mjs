/**
 * The link halo check: which stories to visit, what counts as a halo
 * mismatch or a contrast failure, and what to say about it
 * (YaleSites-Internal#1939).
 *
 * Links draw a halo -- a stack of zero-blur `text-shadow`s coloured by
 * `--color-text-shadow` -- so the animated underline appears to skip
 * descenders. The halo is only invisible while its colour matches whatever is
 * painted behind the link. Anything that changes the background without
 * resetting `--color-text-shadow` (a global theme, a section theme, a
 * component dial, a component that paints its own surface) turns the halo into
 * a visible smear and the link reads as bold. That has regressed repeatedly
 * (YaleSites-Internal#1614, #1938), and the token tests in
 * `00-tokens/colors/` cannot see it because the failure only exists in
 * rendered output: the tokens are all fine, a selector just forgot one.
 *
 * So the check reads rendered output. `check-link-halo.mjs` loads every story
 * that renders the theme matrix, and for each visible link in each state
 * (resting, `:hover`, `:focus-visible`) hands this module the raw computed
 * styles of the link's text and of every box painted behind it at that
 * point. Everything this module decides is pure, so it is unit tested in
 * `link-halo.test.mjs` without a browser -- the same split as
 * `visreg-pixel-budget.mjs` and `measure-visreg-pixels.mjs`.
 *
 * ## The baseline
 *
 * The check landed against a library that already fails it, so
 * `link-halo-baseline.json` lists the failures that existed at that point.
 * Exactly those are tolerated: a failure that is not listed fails the run. An
 * entry that stops failing is reported as stale and should be deleted, which
 * `--update-baseline` does for you. A few stale entries are a warning, not a
 * failure, so fixing a bug does not break the build; but an unfiltered run
 * that leaves more than `STALE_SHARE_LIMIT` (10%) of the baseline stale fails,
 * because that is more likely a check that stopped seeing links than a wave
 * of fixes. After a fix that retires that many, run `--update-baseline` in
 * the same change. Entries are keyed by story, theme
 * combination, state, check and link text, and deliberately carry no measured
 * numbers, so a colour that drifts while still failing does not churn the
 * file.
 *
 * ## Large text
 *
 * Contrast uses the WCAG large-text 3:1 minimum for large text, where the
 * repo's functional element contrast gate holds all text to 4.5:1
 * (YaleSites-Internal#1614). The allowance stays, so pass/fail matches the
 * baseline, but the report lists every link that passes only because of it.
 * See `LARGE_TEXT_ALLOWANCE` below.
 *
 * @see link-halo.test.mjs
 * @see check-link-halo.mjs
 * @see link-halo-baseline.json
 */

import {
  AA_NORMAL_TEXT,
  WCAG_LEVELS,
  contrastRatio,
  formatRatio,
} from '../00-tokens/colors/contrast-ratio.mjs';
import { storyEntries } from './visreg-pixel-budget.mjs';

/**
 * How far apart, per 8-bit channel, a halo and its background may be.
 *
 * Not zero, because the two colours rarely arrive by the same route: the
 * background may be a token composited under a translucent layer while the
 * halo is the same token straight, and the hsl-to-rgb conversion rounds each
 * channel independently. Measured differences between colours that are the
 * same token were never more than 1. Anything a person could see is far
 * larger -- the halos this check exists to catch are typically white on a
 * dark blue, a difference of 150 or more -- so 3 leaves room for rounding
 * without letting a real near-miss through.
 */
export const CHANNEL_TOLERANCE = 3;

/**
 * WCAG 2.1 SC 1.4.3 minimums.
 *
 * "Large text" is the WCAG definition -- 18pt (24px), or 14pt (18.66px) at a
 * bold weight -- because several components set their links as headings, and
 * holding a 32px card title to the body-text minimum would report failures no
 * auditor would. Both thresholds are AA, read from the token contrast
 * tables rather than restated.
 *
 * LARGE_TEXT_ALLOWANCE: this differs from the functional element contrast
 * gate (`00-tokens/colors/functional-element-contrast.mjs`, `minimumFor`),
 * which holds all text to 4.5:1 per YaleSites-Internal#1614. The allowance
 * is kept so the baseline's pass/fail is unchanged, but it is never applied
 * silently: every pass that relies on it is listed in the report
 * (`evaluateSample`, `formatReport`), so whoever owns #1614 can decide which
 * rule wins with the cases in front of them.
 */
const CONTRAST_MINIMUM = AA_NORMAL_TEXT;
const LARGE_TEXT_CONTRAST_MINIMUM = WCAG_LEVELS.find(
  (level) => level.id === 'large-aa',
).minimum;
const LARGE_TEXT_PX = 24;
const LARGE_BOLD_TEXT_PX = 18.66;
const BOLD_WEIGHT = 700;

/**
 * The page colour when nothing behind a link paints at all.
 *
 * The Storybook iframe sets no canvas colour, so a fully transparent stack
 * shows the browser default, which is white.
 */
const CANVAS = { r: 255, g: 255, b: 255, a: 1 };

/**
 * The interaction states the check renders every link in.
 *
 * Order matters only for reading the report: resting first, because that is
 * what most people see.
 */
export const STATES = ['rest', 'hover', 'focus-visible'];

/**
 * Elements whose content is pixels the check cannot read from styles.
 *
 * A link drawn over one of these has an unknown background, so it is skipped
 * rather than judged against whatever box happens to be underneath.
 */
const REPLACED_ELEMENTS = new Set([
  'canvas',
  'embed',
  'iframe',
  'img',
  'object',
  'picture',
  'svg',
  'video',
]);

/** "1 story" / "3 stories", and the same for any other noun. */
export const plural = (count, singular, pluralForm = `${singular}s`) =>
  `${count.toLocaleString('en-US')} ${count === 1 ? singular : pluralForm}`;

/**
 * Splits a CSS list on its top-level commas.
 *
 * `text-shadow` and `background-image` are comma-separated lists whose items
 * themselves contain commas (`rgb(1, 2, 3)`), so a plain `split(',')` would
 * cut colours in half.
 *
 * @param {string} value
 *   A computed list value.
 * @return {string[]}
 *   The items, trimmed, with empty items dropped.
 */
export function splitTopLevel(value) {
  const items = [];
  let depth = 0;
  let current = '';

  [...String(value)].forEach((character) => {
    if (character === '(') depth += 1;
    if (character === ')') depth -= 1;
    if (character === ',' && depth === 0) {
      items.push(current);
      current = '';
      return;
    }
    current += character;
  });
  items.push(current);

  return items.map((item) => item.trim()).filter(Boolean);
}

/**
 * Parses a computed colour into 8-bit RGB and an alpha from 0 to 1.
 *
 * Covers the forms Chrome actually serializes a computed colour to:
 * `rgb()`/`rgba()` in either comma or space syntax, `color(srgb ...)`, which
 * is what `color-mix()` in sRGB computes to, hex, and `transparent`. Anything
 * else -- `oklab()`, `lab()`, a wide-gamut space -- returns null, and the
 * caller skips the link rather than guessing.
 *
 * Channels are kept unrounded: a background composited from two layers has
 * fractional channels, and rounding before the comparison is what would make
 * the tolerance necessary in the first place.
 *
 * Runs in the page as well as here (`link-halo-page.mjs`, through
 * `drawsHalo`), so it refers to nothing outside itself.
 *
 * @param {string} value
 *   A computed colour.
 * @return {?{r: number, g: number, b: number, a: number}}
 *   The colour, or null if it is not a form this module understands.
 */
export function parseColor(value) {
  if (typeof value !== 'string') return null;

  const clamp255 = (channel) => Math.min(255, Math.max(0, channel));
  const text = value.trim().toLowerCase();

  if (text === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0 };
  }

  const hex = text.match(/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/);
  if (hex) {
    const digits =
      hex[1].length <= 4
        ? [...hex[1]].map((digit) => digit + digit).join('')
        : hex[1];
    const channel = (index) => parseInt(digits.slice(index, index + 2), 16);
    return {
      r: channel(0),
      g: channel(2),
      b: channel(4),
      a: digits.length === 8 ? channel(6) / 255 : 1,
    };
  }

  const fn = text.match(/^(rgba?|color)\((.*)\)$/);
  if (!fn) return null;

  // Normalise both syntaxes to "c1 c2 c3 [/ alpha]".
  const [channelPart, alphaPart] = fn[2].replace(/,/g, ' ').split('/');
  let parts = channelPart.trim().split(/\s+/);
  let alphaText = alphaPart?.trim();

  if (fn[1] === 'color') {
    if (parts[0] !== 'srgb') return null;
    parts = parts.slice(1);
  } else if (alphaText === undefined && parts.length === 4) {
    // Legacy `rgba(r, g, b, a)`.
    alphaText = parts.pop();
  }

  if (parts.length !== 3) return null;

  const toChannel = (part) => {
    if (part === 'none') return 0;
    const number = parseFloat(part);
    if (!Number.isFinite(number)) return NaN;
    if (part.endsWith('%')) return (number / 100) * 255;
    return fn[1] === 'color' ? number * 255 : number;
  };
  const [r, g, b] = parts.map(toChannel);
  let a = 1;

  if (alphaText !== undefined) {
    const number = parseFloat(alphaText);
    a = alphaText.endsWith('%') ? number / 100 : number;
  }

  if (![r, g, b, a].every(Number.isFinite)) return null;

  return {
    r: clamp255(r),
    g: clamp255(g),
    b: clamp255(b),
    a: Math.min(1, Math.max(0, a)),
  };
}

/**
 * Paints `top` over an opaque `bottom` (source-over).
 *
 * @param {{r: number, g: number, b: number, a: number}} top
 *   The colour in front, with its alpha.
 * @param {{r: number, g: number, b: number}} bottom
 *   The opaque colour behind it.
 * @return {{r: number, g: number, b: number, a: number}}
 *   The opaque result.
 */
export function composite(top, bottom) {
  const mix = (front, back) => front * top.a + back * (1 - top.a);
  return {
    r: mix(top.r, bottom.r),
    g: mix(top.g, bottom.g),
    b: mix(top.b, bottom.b),
    a: 1,
  };
}

/** Largest single-channel difference between two colours. */
const channelDistance = (a, b) =>
  Math.max(Math.abs(a.r - b.r), Math.abs(a.g - b.g), Math.abs(a.b - b.b));

/** `#rrggbb` for a report, rounding fractional channels. */
const toHex = (color) =>
  `#${[color.r, color.g, color.b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')}`;

/**
 * Parses a computed `text-shadow` into its shadows.
 *
 * Chrome serializes each computed shadow colour-first with every length in
 * px (`rgb(255, 255, 255) 0.48px 0px 0px`), but the parser does not depend
 * on the order beyond "the colour is the one token that is not a length".
 *
 * @param {string} value
 *   The computed `text-shadow`.
 * @return {Array<{color: ?object, x: number, y: number, blur: number}>}
 *   One entry per shadow; empty for `none`. `color` is null when it is not a
 *   form `parseColor` understands.
 */
export function parseTextShadow(value) {
  if (!value || value.trim() === 'none') return [];

  return splitTopLevel(value).map((shadow) => {
    const lengths = [];
    const colorTokens = [];
    // Tokens are either a function call (kept whole) or a bare word.
    const tokens = shadow.match(/[a-z-]+\([^)]*\)|[^\s]+/gi) ?? [];

    tokens.forEach((token) => {
      if (/^-?[\d.]+(px)?$/i.test(token)) {
        lengths.push(parseFloat(token));
      } else {
        colorTokens.push(token);
      }
    });

    const [x = 0, y = 0, blur = 0] = lengths;
    return { color: parseColor(colorTokens.join(' ')), x, y, blur };
  });
}

/**
 * The shadows that are part of a descender halo, as opposed to a drop shadow.
 *
 * A halo is a set of zero-blur copies of the glyphs nudged a fraction of an em
 * in each direction. A shadow with blur, or one offset by more than a quarter
 * of the font size, is a deliberate effect (a legibility glow over a photo,
 * say) rather than a halo, and is not something that has to disappear into
 * the background. Fully transparent shadows are not drawn at all.
 *
 * @param {Array<object>} shadows
 *   Output of `parseTextShadow`.
 * @param {number} fontSize
 *   The text's computed font size in px.
 * @return {Array<object>}
 *   The halo shadows that paint something.
 */
export function haloShadows(shadows, fontSize) {
  const reach = fontSize * 0.25;
  return shadows.filter(
    (shadow) =>
      shadow.blur === 0 &&
      Math.abs(shadow.x) <= reach &&
      Math.abs(shadow.y) <= reach &&
      !(shadow.color && shadow.color.a === 0),
  );
}

/**
 * Whether a sample's text draws a halo in its state.
 *
 * The one test both `evaluateSamples` (which judges only halo-drawing links)
 * and `pickSample` (which picks the text node that speaks for a link) use, so
 * the node picked is never one the judging then counts as drawing no halo.
 * Runs in the page as well as here (`link-halo-page.mjs`), with
 * `parseTextShadow`, `haloShadows`, `splitTopLevel` and `parseColor`
 * installed beside it.
 *
 * @param {{textShadow: string, fontSize?: number}} sample
 *   The computed `text-shadow` and font size in px.
 * @return {boolean}
 *   True if at least one of its shadows is part of a halo.
 */
export function drawsHalo(sample) {
  return (
    haloShadows(parseTextShadow(sample.textShadow), sample.fontSize).length > 0
  );
}

/**
 * Works out the opaque colour behind a link's text.
 *
 * `layers` is every box at the text's position, frontmost first, starting
 * with the element that holds the text -- what `document.elementsFromPoint`
 * returns from there down, with any positioned `::before`/`::after` that
 * covers the point inserted in front of the box that owns it (`pseudo:
 * true`). A pseudo-element is composited like any other layer, with its own
 * opacity, so a translucent tint painted by one (the active nav item) is
 * part of the background the halo has to match. Each translucent background is composited over the
 * ones beneath it until an opaque one is reached; if none is, the stack sits
 * on the white canvas.
 *
 * Some backgrounds cannot be resolved from styles: an image, video or SVG
 * under the text, or a `background-image` on a box behind it. Those return a
 * `skip` reason instead of a colour. The one exception is a gradient on the
 * link itself (or inside it): that is the animated underline from
 * `underline-slide-start`, a thin bar under the text rather than a surface
 * behind it, and treating it as unresolvable would skip every link.
 *
 * @param {Array<{label: string, tag: string, backgroundColor: string, backgroundImage: string, opacity?: number, insideLink?: boolean}>} layers
 *   Boxes at the text's position, frontmost first.
 * @return {{color: object}|{skip: string}}
 *   The resolved background, or why it could not be resolved.
 */
export function resolveBackground(layers) {
  const painted = [];

  for (let index = 0; index < layers.length; index += 1) {
    const layer = layers[index];

    if (REPLACED_ELEMENTS.has(layer.tag)) {
      return { skip: `over an image or media element (${layer.label})` };
    }

    const image = layer.backgroundImage ?? 'none';
    if (image !== 'none') {
      // Not for a pseudo-element: one that covers the middle of the text is
      // a surface, whatever it is painted with.
      const underlineOnly =
        layer.insideLink &&
        !layer.pseudo &&
        splitTopLevel(image).every((item) =>
          item.startsWith('linear-gradient('),
        );
      if (!underlineOnly) {
        return { skip: `over a background image or gradient (${layer.label})` };
      }
    }

    const color = parseColor(layer.backgroundColor);
    if (!color) {
      return {
        skip: `unreadable background colour "${layer.backgroundColor}" (${layer.label})`,
      };
    }

    const alpha = color.a * (layer.opacity ?? 1);
    if (alpha > 0) {
      painted.push({ ...color, a: alpha });
      if (alpha >= 1) break;
    }
  }

  // Paint from the back forward. An opaque backmost layer simply replaces the
  // canvas, so starting from the canvas is right either way.
  const color = painted
    .reverse()
    .reduce((behind, layer) => composite(layer, behind), CANVAS);

  return { color };
}

/**
 * Whether text counts as "large" under WCAG 2.1.
 *
 * @param {number} fontSize
 *   Computed font size in px.
 * @param {number} fontWeight
 *   Computed numeric font weight.
 * @return {boolean}
 *   True if the 3:1 minimum applies rather than 4.5:1.
 */
export const isLargeText = (fontSize, fontWeight) =>
  fontSize >= LARGE_TEXT_PX ||
  (fontSize >= LARGE_BOLD_TEXT_PX && fontWeight >= BOLD_WEIGHT);

/**
 * An absolutely positioned pseudo-element's border box, from its computed
 * styles and its containing block.
 *
 * `elementsFromPoint` never returns `::before`/`::after`, so
 * `check-link-halo.mjs` reads a pseudo-element's geometry itself to tell
 * whether it covers a link's text. A pseudo-element's computed geometry is
 * the specified value (`100%`, `auto`), not a used length, so percentages are
 * resolved here against the containing block -- margins and padding against
 * its width on both axes, as CSS does. `auto` is solved from the opposite
 * inset where it can be. Padding and border are added to the size unless
 * `box-sizing` is `border-box`. Transforms are ignored.
 *
 * Runs in the page as well as here: the check sends this function's source
 * to the browser, so it must not refer to anything outside itself.
 *
 * @param {Object<string, string>} style
 *   The pseudo-element's computed style (a `CSSStyleDeclaration` in the
 *   page): insets, `width`/`height`, margins, padding, border widths and
 *   `boxSizing`.
 * @param {{left: number, top: number, width: number, height: number}} block
 *   The containing block's padding box, in viewport coordinates.
 * @return {?{left: number, top: number, right: number, bottom: number}}
 *   The box in viewport coordinates, or null when a value cannot be
 *   resolved (`calc()`, say, or `auto` on both sides).
 */
export function pseudoElementBox(style, block) {
  const length = (value, base) => {
    if (value.endsWith('px')) return parseFloat(value);
    if (value.endsWith('%')) return (parseFloat(value) / 100) * base;
    return value === '0' ? 0 : NaN;
  };
  const axis = (start, end, size, before, after, base) => {
    const startInset = length(style[start], base);
    const endInset = length(style[end], base);
    const marginStart = length(style[`margin${before}`], block.width) || 0;
    const marginEnd = length(style[`margin${after}`], block.width) || 0;
    const extras =
      style.boxSizing === 'border-box'
        ? 0
        : [`padding${before}`, `padding${after}`]
            .map((name) => length(style[name], block.width) || 0)
            .concat(
              [`border${before}Width`, `border${after}Width`].map(
                (name) => parseFloat(style[name]) || 0,
              ),
            )
            .reduce((sum, value) => sum + value, 0);
    let outer = length(style[size], base) + extras;
    if (!Number.isFinite(outer)) {
      outer = base - startInset - endInset - marginStart - marginEnd;
    }
    const offset = Number.isFinite(startInset)
      ? startInset + marginStart
      : base - endInset - marginEnd - outer;
    return [offset, outer];
  };

  const [left, width] = axis(
    'left',
    'right',
    'width',
    'Left',
    'Right',
    block.width,
  );
  const [top, height] = axis(
    'top',
    'bottom',
    'height',
    'Top',
    'Bottom',
    block.height,
  );
  if (![left, top, width, height].every(Number.isFinite)) return null;
  return {
    left: block.left + left,
    top: block.top + top,
    right: block.left + left + width,
    bottom: block.top + top + height,
  };
}

/**
 * Picks which of a link's text nodes speaks for the link.
 *
 * `check-link-halo.mjs` tries a link's text nodes in document order, up to
 * `limit`; each try gives a sample, null when that text is not visible, or
 * undefined when the link has no more text. The first visible node that
 * draws a halo (`drawsHalo`, the test `evaluateSamples` judges by) wins and
 * stops the search, so an eyebrow or icon span ahead of a halo-drawing title,
 * with no shadow or with an ordinary drop shadow, does not make the whole
 * link read as having no halo. Only when no visible node draws one does the
 * first visible node decide (it is then counted as drawing no halo). Tries
 * run one at a time and stop early, because each scrolls the page and
 * hit-tests it.
 *
 * Runs in the page as well as here (`link-halo-page.mjs`), so it refers to
 * nothing outside itself but `drawsHalo`, installed beside it.
 *
 * @param {function(number): (?object|undefined)} attempt
 *   Samples the text node at that position; null if it is not visible,
 *   undefined if there is none.
 * @param {number} [limit]
 *   Most text nodes to try.
 * @return {?object}
 *   The sample that speaks for the link, or null if no text is visible.
 */
export function pickSample(attempt, limit = 6) {
  let fallback = null;
  for (let index = 0; index < limit; index += 1) {
    const sample = attempt(index);
    if (sample === undefined) break;
    if (sample && drawsHalo(sample)) return sample;
    if (sample && !fallback) fallback = sample;
  }
  return fallback;
}

/**
 * The scroll that brings a line box fully on screen, or null if it already
 * is.
 *
 * Every edge must be inside the viewport, not just the centre: a centre
 * within a pixel of the edge hit-tests as nothing, and whether a link landed
 * there depended on where the previous link had scrolled to. The scroll
 * centres the box vertically, and horizontally too when a side is off
 * screen.
 *
 * Runs in the page as well as here (`link-halo-page.mjs`), so it must not
 * refer to anything outside itself.
 *
 * @param {{left: number, top: number, right: number, bottom: number}} rect
 *   The line box, in viewport coordinates.
 * @param {{width: number, height: number}} viewport
 *   The viewport size.
 * @return {?{x: number, y: number}}
 *   Pixels to `scrollBy`, or null when the box is fully visible.
 */
export function scrollToReveal(rect, viewport) {
  const horizontal = rect.left < 0 || rect.right > viewport.width;
  if (!horizontal && rect.top >= 0 && rect.bottom <= viewport.height) {
    return null;
  }
  return {
    x: horizontal ? (rect.left + rect.right) / 2 - viewport.width / 2 : 0,
    y: (rect.top + rect.bottom) / 2 - viewport.height / 2,
  };
}

/**
 * What of a line box is painted, and whether it can be judged where it is.
 *
 * `Range.getClientRects()` gives the text's whole extent, including any part
 * an ancestor clips away: an ellipsis box, or a container wider than the
 * viewport on a page with `overflow-x: hidden`, which no scroll reaches past.
 * So the box is first cut down to every clip rect (each overflow-clipping
 * ancestor's padding box, `collectSamples`), and that painted part is what
 * has to be on screen (`scrollToReveal`).
 *
 * Runs in the page as well as here (`link-halo-page.mjs`), so it refers to
 * nothing outside itself but `scrollToReveal`, installed beside it.
 *
 * @param {{left: number, top: number, right: number, bottom: number}} rect
 *   The line box, in viewport coordinates.
 * @param {Array<{left: number, top: number, right: number, bottom: number}>} clips
 *   The rects it is clipped to, in viewport coordinates; an axis an ancestor
 *   does not clip runs to plus or minus Infinity.
 * @param {{width: number, height: number}} viewport
 *   The viewport size.
 * @return {{hidden: true}|{scroll: {x: number, y: number}}|{box: {left: number, top: number, right: number, bottom: number}}}
 *   `hidden` when less than a pixel of it is painted on either axis;
 *   otherwise the painted box when it is fully on screen, or the scroll that
 *   centres it.
 */
export function visibleLineBox(rect, clips, viewport) {
  const box = clips.reduce(
    (painted, clip) => ({
      left: Math.max(painted.left, clip.left),
      top: Math.max(painted.top, clip.top),
      right: Math.min(painted.right, clip.right),
      bottom: Math.min(painted.bottom, clip.bottom),
    }),
    { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom },
  );
  if (box.right - box.left < 1 || box.bottom - box.top < 1) {
    return { hidden: true };
  }
  const scroll = scrollToReveal(box, viewport);
  return scroll ? { scroll } : { box };
}

/**
 * Brings a line box's painted part fully on screen, or gives up.
 *
 * At most one scroll and one re-check: a box that one scroll does not
 * reveal (the page cannot scroll that far, or the box is taller than the
 * viewport) is skipped rather than chased.
 *
 * Runs in the page as well as here (`link-halo-page.mjs`), so it refers to
 * nothing outside itself but `visibleLineBox`, installed beside it.
 *
 * @param {function(): ?{rect: object, clips: Array<object>, viewport: object}} measure
 *   Reads the line box, its clip rects and the viewport as they are now
 *   (`visibleLineBox`); null if the text has no line box.
 * @param {function(number, number): void} scrollBy
 *   Scrolls the page.
 * @return {?{left: number, top: number, right: number, bottom: number}}
 *   The painted box to hit-test, or null if it is not visible.
 */
export function revealLineBox(measure, scrollBy) {
  const first = measure();
  if (!first) return null;
  const before = visibleLineBox(first.rect, first.clips, first.viewport);
  if (before.box) return before.box;
  if (before.hidden) return null;

  scrollBy(before.scroll.x, before.scroll.y);
  const second = measure();
  if (!second) return null;
  return visibleLineBox(second.rect, second.clips, second.viewport).box ?? null;
}

/**
 * Takes the global theme off an element and every ancestor of it, keeping
 * each value aside so `restoreGlobalThemes` can put it back.
 *
 * The global theme rules are descendant selectors
 * (`[data-global-theme='one'] [data-section-theme='two'] .accordion &`), so
 * they match a `data-global-theme` on any ancestor, not just the nearest.
 * The preview's decorator puts the toolbar's theme on `<body>`, which is an
 * ancestor of every copy in the matrix: left there, a copy meant to show
 * global theme three would also get every theme one rule the nearer wrapper
 * does not override. Parking it leaves each copy's own wrapper as the only
 * global theme above its links. Nothing supplies a theme when no ancestor
 * has the attribute (the slot colours are set only under
 * `[data-global-theme]`), so parking does not fall back to theme one.
 *
 * The parked value goes in `data-link-halo-parked-global`, a name that does
 * not end in `-theme`: every `data-*-theme` on a link's ancestors is read
 * into its theme combination, and so into its baseline key.
 *
 * Runs in the page as well as here (`link-halo-page.mjs`), so it refers to
 * nothing outside itself.
 *
 * @param {?{parentElement: ?object, hasAttribute: function, getAttribute: function, setAttribute: function, removeAttribute: function}} element
 *   Where to start; it is included.
 * @return {number}
 *   How many elements had a global theme parked.
 */
export function parkGlobalThemes(element) {
  let parked = 0;
  for (let node = element; node; node = node.parentElement) {
    if (node.hasAttribute('data-global-theme')) {
      node.setAttribute(
        'data-link-halo-parked-global',
        node.getAttribute('data-global-theme'),
      );
      node.removeAttribute('data-global-theme');
      parked += 1;
    }
  }
  return parked;
}

/**
 * Puts back the global themes `parkGlobalThemes` took off an element and its
 * ancestors.
 *
 * A theme set again while it was parked (the decorator re-rendering) is the
 * newer value and is kept; the parked one is just dropped.
 *
 * Runs in the page as well as here (`link-halo-page.mjs`), so it refers to
 * nothing outside itself.
 *
 * @param {?object} element
 *   Where to start; it is included.
 * @return {number}
 *   How many parked themes were cleared.
 */
export function restoreGlobalThemes(element) {
  let restored = 0;
  for (let node = element; node; node = node.parentElement) {
    if (node.hasAttribute('data-link-halo-parked-global')) {
      if (!node.hasAttribute('data-global-theme')) {
        node.setAttribute(
          'data-global-theme',
          node.getAttribute('data-link-halo-parked-global'),
        );
      }
      node.removeAttribute('data-link-halo-parked-global');
      restored += 1;
    }
  }
  return restored;
}

/**
 * Judges one link in one state.
 *
 * @param {{color: string, textShadow: string, fontSize: number, fontWeight: number, layers: Array<object>}} sample
 *   Raw computed styles for the element holding the link's text, and the
 *   boxes behind it (see `resolveBackground`).
 * @return {{skip: string}|{background: string, problems: Array<{check: string, detail: string}>}}
 *   A skip reason, or the background and any problems found. An empty
 *   `problems` is a pass. A colour that cannot be read leaves its part
 *   unjudged: problems found in the other parts are still returned, and the
 *   sample is a skip only when nothing was found. Wherever the WCAG
 *   large-text 3:1 minimum is applied instead of 4.5:1 it is said so
 *   (`LARGE_TEXT_ALLOWANCE`): a contrast problem under it carries
 *   `largeTextAllowance: true`, and so does a verdict whose contrast passes
 *   only because of it (between 3:1 and 4.5:1), with the measurement in
 *   `contrast`. Large text that clears 4.5:1 is not flagged: the allowance
 *   made no difference to it.
 */
export function evaluateSample(sample) {
  const resolved = resolveBackground(sample.layers);
  if (resolved.skip) return { skip: resolved.skip };

  const background = resolved.color;
  const problems = [];
  // Parts of the sample that could not be judged. Whatever could be judged
  // still is, so one unreadable colour does not hide a problem found in the
  // rest; the sample only passes if every part was judged.
  const unjudged = [];

  const shadows = haloShadows(
    parseTextShadow(sample.textShadow),
    sample.fontSize,
  );
  if (shadows.some((shadow) => !shadow.color)) {
    unjudged.push(`unreadable text-shadow "${sample.textShadow}"`);
  }

  const worst = shadows
    .filter((shadow) => shadow.color)
    .map((shadow) => {
      const painted = composite(shadow.color, background);
      return { painted, distance: channelDistance(painted, background) };
    })
    .sort((a, b) => b.distance - a.distance)[0];

  if (worst && worst.distance > CHANNEL_TOLERANCE) {
    problems.push({
      check: 'halo',
      detail: `halo ${toHex(worst.painted)} on background ${toHex(background)}`,
    });
  }

  const text = parseColor(sample.color);
  let allowance = null;
  if (text) {
    const painted = composite(text, background);
    const ratio = contrastRatio(painted, background);
    const large = isLargeText(sample.fontSize, sample.fontWeight);
    const minimum = large ? LARGE_TEXT_CONTRAST_MINIMUM : CONTRAST_MINIMUM;
    const measured =
      `text ${toHex(painted)} on ${toHex(background)} is ` +
      `${formatRatio(ratio)}:1`;

    if (ratio < minimum) {
      problems.push({
        check: 'contrast',
        detail: `${measured}, needs ${minimum}:1${
          large ? ' (WCAG large text)' : ''
        }`,
        ...(large ? { largeTextAllowance: true } : {}),
      });
    } else if (large && ratio < CONTRAST_MINIMUM) {
      allowance = `${measured}: passes the ${minimum}:1 large-text minimum, not ${CONTRAST_MINIMUM}:1`;
    }
  } else {
    unjudged.push(`unreadable text colour "${sample.color}"`);
  }

  if (problems.length === 0 && unjudged.length > 0) {
    return { skip: unjudged.join('; ') };
  }
  return {
    background: toHex(background),
    problems,
    ...(allowance ? { largeTextAllowance: true, contrast: allowance } : {}),
  };
}

/**
 * Names a theme combination the way the report and the baseline quote it.
 *
 * `themes` is every `data-*-theme` attribute in force on the link, nearest
 * ancestor winning, keyed without the `data-` and `-theme` parts. Global,
 * section and component come first because they are the three the matrix is
 * about; any component-specific ones (`header`, `footer`, `basic`, `cta`)
 * follow alphabetically.
 *
 * @param {Object<string, string>} themes
 *   Theme name to value, e.g. `{global: 'one', section: 'two'}`.
 * @return {string}
 *   E.g. `global=one section=two component=three`.
 */
export function formatThemes(themes) {
  const leading = ['global', 'section', 'component'];
  const names = [
    ...leading.filter((name) => name in themes),
    ...Object.keys(themes)
      .filter((name) => !leading.includes(name))
      .sort(),
  ];
  return names.map((name) => `${name}=${themes[name]}`).join(' ') || 'none';
}

/**
 * Normalises link text for a stable key: collapsed whitespace, capped length.
 *
 * @param {string} text
 *   The link's rendered text.
 * @return {string}
 *   The text as the baseline stores it.
 */
export function normaliseLinkText(text) {
  const collapsed = String(text ?? '')
    .replace(/\s+/g, ' ')
    .trim();
  return collapsed.length > 80 ? `${collapsed.slice(0, 79)}…` : collapsed;
}

/**
 * Names a narrow render's viewport the way keys and the report quote it.
 *
 * @param {?number} viewport
 *   The width of a narrow render, or null for the default width.
 * @return {string}
 *   E.g. `768px`, or '' for the default width.
 */
export const formatViewport = (viewport) => (viewport ? `${viewport}px` : '');

/**
 * The identity of a failure, as stored in the baseline.
 *
 * Built only from things that do not move between runs on an unchanged
 * build. Link text alone is not enough: a visreg story renders several
 * components on each section theme, and two of them can carry the same link
 * text (the Post and Event reference cards share their category fixtures).
 * Keyed on text alone, a newly broken link would be filed under an already
 * known one and pass. `where` is the link's place in the story -- the two
 * nearest enclosing BEM blocks and its own first class, plus `#2`, `#3`...
 * when links still share all of that, counted in document order -- so each
 * link has its own entry. The variation heading is still left out: it is
 * report context, and a reworded heading should not invalidate the file.
 *
 * `args` are the theme args the story was rendered with (`formatArgs`), for a
 * non-visreg story that has any. Most of them also show up in `themes`, as
 * the `data-*-theme` attribute they set, but not all do -- a header accent is
 * `data-header-accent` -- and without them two accents of one header would
 * share a key, so one could hide the other. A render with no theme args
 * leaves the key exactly as it was before args existed.
 *
 * `viewport` is the width of a narrow render (`formatViewport`), for a
 * failure found by the narrow pass (`planPages`). The same link failing at
 * both widths is two entries, so a fix at one width cannot hide behind the
 * other's. A render at the default width has none, and its key is exactly
 * what it was before narrow renders existed.
 *
 * @param {{story: string, themes: string, args?: string, viewport?: number, state: string, check: string, where?: string, link: string}} failure
 *   A failure, or a baseline entry.
 * @return {string}
 *   The key.
 */
export const failureKey = ({
  story,
  themes,
  args = '',
  viewport = null,
  state,
  check,
  where = '',
  link,
}) =>
  [
    story,
    themes,
    ...(args ? [args] : []),
    ...(viewport ? [formatViewport(viewport)] : []),
    state,
    check,
    where,
    link,
  ].join(' | ');

/**
 * Option values a theme dial can take.
 *
 * Every theme set in tokens and `theme-constants.js` -- global, section,
 * component, header, footer, accent -- is keyed by these words, so an arg
 * whose options are all from this list is choosing a theme rather than a
 * layout (`basic`/`mega`) or a count (a `Columns` control also offers `two`
 * and `three`, which is why the label has to say so too; see `themeArgs`).
 */
const THEME_VALUES = new Set([
  'default',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
]);

/**
 * How many theme combinations a story may be crossed into before its theme
 * args are varied one at a time instead.
 *
 * No in-scope story comes near it today: the largest real cross is 49 (a
 * section theme arg and a seven-way dial on one story). It is a safety valve
 * for a future story with many independent dials, whose full cross would
 * multiply into far more renders than it is worth; varying each dial on its
 * own still renders every link in every theme that dial offers. `planPages`
 * marks those pages, and the run names the stories, so the reduction is
 * never silent.
 */
export const THEME_CROSS_LIMIT = 64;

/**
 * The args of a story that choose a theme, from its `argTypes`.
 *
 * An arg counts when its control offers at least two options, every option is
 * a theme key (`THEME_VALUES`), and its label says it is a theme or a dial --
 * the repo's own convention for these controls ("Callout Theme (dial)",
 * "Section Theme", "Header Accent Color (dial)"). Both conditions are needed:
 * "Footer Variation (dial)" offers `basic`/`mega`, and "Columns" offers theme
 * words but is not a theme.
 *
 * @param {Object<string, {name?: string, options?: Array}>} [argTypes]
 *   The story's argTypes, as Storybook's preview resolves them.
 * @return {Array<{name: string, options: string[]}>}
 *   The theme args, sorted by name.
 */
export function themeArgs(argTypes = {}) {
  return Object.entries(argTypes ?? {})
    .filter(
      ([key, argType]) =>
        Array.isArray(argType?.options) &&
        argType.options.length > 1 &&
        argType.options.every(
          (option) => typeof option === 'string' && THEME_VALUES.has(option),
        ) &&
        /theme|dial/i.test(argType.name ?? key),
    )
    .map(([name, argType]) => ({ name, options: [...argType.options] }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Every combination of a story's theme args to render it in.
 *
 * The story's own initial values come first, so the first pass renders what
 * the story shows by default. Up to `THEME_CROSS_LIMIT` combinations the args
 * are crossed in full: a section theme with every dial value, a header theme
 * with every accent. Past it, each arg is varied on its own with the others
 * left at their initial values, and `crossed` is false so the caller can say
 * so.
 *
 * @param {Array<{name: string, options: string[]}>} args
 *   From `themeArgs`.
 * @param {Object<string, *>} [initialArgs]
 *   The story's initial args. A value that is not one of the options (unset,
 *   say) falls back to the first option.
 * @param {number} [limit]
 *   Most combinations to cross in full.
 * @return {{combinations: Array<Object<string, string>>, crossed: boolean}}
 *   One args object per combination, initial values first. A story with no
 *   theme args gets no combinations.
 */
export function themeArgCombinations(
  args,
  initialArgs = {},
  limit = THEME_CROSS_LIMIT,
) {
  if (args.length === 0) return { combinations: [], crossed: true };

  const initial = Object.fromEntries(
    args.map(({ name, options }) => [
      name,
      options.includes(initialArgs?.[name]) ? initialArgs[name] : options[0],
    ]),
  );
  const size = args.reduce((product, arg) => product * arg.options.length, 1);

  if (size > limit) {
    return {
      crossed: false,
      combinations: [
        initial,
        ...args.flatMap(({ name, options }) =>
          options
            .filter((option) => option !== initial[name])
            .map((option) => ({ ...initial, [name]: option })),
        ),
      ],
    };
  }

  // Each arg's options with the initial value moved to the front, so the
  // first combination of the cross is the initial one.
  const ordered = args.map(({ name, options }) => ({
    name,
    options: [initial[name], ...options.filter((o) => o !== initial[name])],
  }));
  return {
    crossed: true,
    combinations: ordered.reduce(
      (combinations, { name, options }) =>
        combinations.flatMap((combination) =>
          options.map((option) => ({ ...combination, [name]: option })),
        ),
      [{}],
    ),
  };
}

/**
 * Args as the report, the baseline and a render key quote them.
 *
 * @param {?Object<string, string>} args
 *   Theme args of a visit, or null.
 * @return {string}
 *   E.g. `bgColor=two sectionTheme=four`, or '' for none.
 */
export const formatArgs = (args) =>
  Object.keys(args ?? {})
    .sort()
    .map((name) => `${name}=${args[name]}`)
    .join(' ');

/**
 * Identifies a render group: a story with one set of theme args, at one
 * width, in every global theme.
 *
 * Also what a baseline entry traces back to (`groupOfEntry`): an entry
 * carries its story, its args and its narrow viewport if it has one, and its
 * global theme is in its `themes`. A render at the default width keys
 * exactly as it did before narrow renders existed.
 *
 * @param {{id: string, args?: ?Object, viewport?: ?number}} visit
 *   A visit, or a render result.
 * @return {string}
 *   The key.
 */
export const visitKey = ({ id, args, viewport = null }) =>
  `${id}|${formatArgs(args)}${viewport ? `|${formatViewport(viewport)}` : ''}`;

/** The render group a baseline entry or failure came from (`visitKey`). */
export const groupOfEntry = ({ story, args = '', viewport = null }) =>
  `${story}|${args}${viewport ? `|${formatViewport(viewport)}` : ''}`;

/**
 * Section themes a component can sit in, `theme-constants.js`'s
 * `sectionThemes` (which plain Node cannot import, as it loads `tokens.json`
 * without an import attribute; `link-halo.test.mjs` pins the two together).
 */
export const SECTION_THEMES = [
  'default',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
];

/**
 * Whether an arg is the story's own section theme control.
 *
 * @param {{name?: string}} argType
 *   The arg's argType, as Storybook resolves it.
 * @return {boolean}
 *   True for a control labelled "Section Theme".
 */
const isSectionArg = (argType) => /^section theme\b/i.test(argType?.name ?? '');

/**
 * Splits a visreg story's name into its global theme and the rest.
 *
 * Visreg files export one story per global theme, named for the theme's label
 * (`OldBlues`, `OldBluesSectionTwo`; see `global-theme-stories.mjs`), and
 * Storybook turns that into "Old Blues Section Two".
 *
 * @param {string} name
 *   The story's display name.
 * @param {Object<string, string>} labels
 *   Global theme key to label.
 * @return {{global: ?string, rest: string}}
 *   The global theme the name starts with (null if none) and what follows.
 */
export function splitGlobalThemeName(name, labels) {
  const match = Object.entries(labels)
    .filter(([, label]) => name === label || name.startsWith(`${label} `))
    .sort((a, b) => b[1].length - a[1].length)[0];
  return match
    ? { global: match[0], rest: name.slice(match[1].length).trim() }
    : { global: null, rest: name };
}

/**
 * Plans the pages the check builds: one per story and set of theme args,
 * each holding a copy of that one render in every combination of global theme
 * and section theme the component supports (YaleSites-Internal#1939).
 *
 * Rendering a story is the slow part, and a global or section theme is only an
 * attribute on an ancestor, so the check renders each story once and then
 * copies the markup into a wrapper per combination on a single page
 * (`check-link-halo.mjs`). A page here is the plan for that:
 *
 * - A non-visreg story, once per combination of its theme args other than
 *   the section theme (`themeArgs`, `themeArgCombinations`): a component dial,
 *   a header accent. Each is copied into every global theme, crossed with:
 *   - every value of the story's own "Section Theme" control, if it has one,
 *     set on the section the story renders (`sectionArg`);
 *   - no section, for a component that only ever sits outside one
 *     (`sectionless`: the header, the footer);
 *   - otherwise no section *and* each section theme, in the section wrapper
 *     the visreg stories use. No section is kept because the Link Grid
 *     regression (YaleSites-Internal#1938) only showed there.
 * - A visreg story, once per set of stories that differ only in global theme
 *   (`OldBluesSectionTwo`, `NewHavenGreenSectionTwo`...): the first is
 *   rendered and copied into every global theme, each copy keyed by the story
 *   that shows that theme. A visreg story with no global theme in its name is
 *   copied into every global theme too, all under its own id.
 *
 * Every page is planned at the default width (`viewport: null`). A story
 * whose component also needs a narrower one (`viewports`) gets a second copy
 * of each of its pages at that width, with the same clones, after every
 * default page: the action banner only stacks its text below its image under
 * the 992px breakpoint, so at the default width its link is never judged
 * (YaleSites-Internal#1955). Only those stories, rather than the whole
 * matrix, so the extra width costs what it is for.
 *
 * @param {object} index
 *   The parsed `index.json` of a built Storybook.
 * @param {object} options
 * @param {string[]} options.globalThemes
 *   Global theme keys, from tokens; the first is the one stories render in.
 * @param {Object<string, string>} options.labels
 *   Global theme key to label.
 * @param {RegExp} [options.filter]
 *   Only keep stories whose id matches.
 * @param {Object<string, {argTypes?: object, initialArgs?: object}>} [options.stories]
 *   Each story's argTypes and initial args, read from the preview.
 * @param {function(object): boolean} [options.inScope]
 *   Only keep index entries this accepts.
 * @param {function(object): boolean} [options.sectionless]
 *   True for an index entry whose component never sits in a section.
 * @param {string[]} [options.sectionThemes]
 *   Section theme keys.
 * @param {function(object): number[]} [options.viewports]
 *   Narrow widths an index entry is also rendered at, besides the default.
 * @return {Array<object>}
 *   Pages, `{id, title, name, importPath, visreg, args, crossed, sectionArg,
 *   viewport, clones}`, where `id` is the story rendered, `args` the theme
 *   args it is rendered with (null for none; the section arg is never among
 *   them), `viewport` the narrow width (null for the default), and each
 *   clone is `{story, global, section}` -- `section` null for none.
 */
export function planPages(
  index,
  {
    globalThemes,
    labels,
    filter,
    stories = {},
    inScope = () => true,
    sectionless = () => false,
    sectionThemes = SECTION_THEMES,
    viewports = () => [],
  },
) {
  const pages = [];
  const visregGroups = new Map();
  const entries = storyEntries(index)
    .filter((entry) => inScope(entry))
    .filter((entry) => !filter || filter.test(entry.id));

  entries.forEach((entry) => {
    const { id, title, name, importPath, tags } = entry;
    const story = { id, title, name, importPath };

    if ((tags ?? []).includes('visreg')) {
      const { global, rest } = splitGlobalThemeName(name, labels);
      if (!global) {
        pages.push({
          ...story,
          visreg: true,
          args: null,
          crossed: true,
          sectionArg: null,
          clones: globalThemes.map((theme) => ({
            story: id,
            global: theme,
            section: null,
          })),
        });
        return;
      }
      const key = `${importPath}|${rest}`;
      if (!visregGroups.has(key)) {
        visregGroups.set(key, { members: new Map(), pages: pages.length });
        pages.push(null);
      }
      visregGroups.get(key).members.set(global, story);
      return;
    }

    const argTypes = stories[id]?.argTypes ?? {};
    const sectionArg =
      Object.entries(argTypes).find(
        ([, argType]) =>
          isSectionArg(argType) &&
          (argType.options ?? []).length > 0 &&
          argType.options.every((option) => sectionThemes.includes(option)),
      )?.[0] ?? null;
    const otherArgTypes = Object.fromEntries(
      Object.entries(argTypes).filter(([arg]) => arg !== sectionArg),
    );
    let sections = [null, ...sectionThemes];
    if (sectionArg) sections = [...argTypes[sectionArg].options];
    else if (sectionless(entry)) sections = [null];

    const { combinations, crossed } = themeArgCombinations(
      themeArgs(otherArgTypes),
      stories[id]?.initialArgs,
    );
    (combinations.length > 0 ? combinations : [null]).forEach((args) => {
      pages.push({
        ...story,
        visreg: false,
        args,
        crossed,
        sectionArg,
        clones: globalThemes.flatMap((global) =>
          sections.map((section) => ({ story: id, global, section })),
        ),
      });
    });
  });

  visregGroups.forEach(({ members, pages: at }) => {
    const first =
      members.get(globalThemes.find((theme) => members.has(theme))) ??
      [...members.values()][0];
    pages[at] = {
      ...first,
      visreg: true,
      args: null,
      crossed: true,
      sectionArg: null,
      clones: globalThemes
        .filter((theme) => members.has(theme))
        .map((theme) => ({
          story: members.get(theme).id,
          global: theme,
          section: null,
        })),
    };
  });

  const atDefault = pages.map((page) => ({ ...page, viewport: null }));
  const narrow = atDefault.flatMap((page) =>
    viewports(page).map((viewport) => ({ ...page, viewport })),
  );

  if (atDefault.length === 0) {
    throw new Error(
      filter
        ? `No stories in scope match ${filter}.`
        : 'No stories to visit in the Storybook index -- checking nothing is not a pass.',
    );
  }
  return [...atDefault, ...narrow];
}

/**
 * The story to boot the preview with while discovering every story's
 * controls: the first one the run will visit.
 *
 * Planned without the stories' argTypes, which are what the boot is for.
 * Theme args only multiply a story's pages, so the first page is the same
 * story either way. An empty plan throws `planPages`'s own error (a filter
 * that matches no in-scope story, or an index with nothing to visit), so the
 * run stops with that message before a browser is started.
 *
 * @param {object} index
 *   The parsed `index.json` of a built Storybook.
 * @param {object} options
 *   As for `planPages`, without `stories`.
 * @return {string}
 *   A story id.
 */
export const bootStoryId = (index, options) =>
  planPages(index, { ...options, stories: {} })[0].id;

/**
 * Orders pages for the worker pool, most copies first (longest processing
 * time first), keeping plan order among equals so the run is repeatable.
 *
 * @param {Array<object>} pages
 *   From `planPages`.
 * @return {Array<object>}
 *   The same pages, reordered.
 */
export const orderPages = (pages) =>
  pages
    .map((page, position) => ({ page, position }))
    .sort(
      (a, b) =>
        b.page.clones.length - a.page.clones.length || a.position - b.position,
    )
    .map(({ page }) => page);

/**
 * Turns the raw per-link samples from every visit into results.
 *
 * Samples for the same story, theme combination, theme args, viewport, state,
 * check, place and link text collapse into one failure, counting how often it
 * occurred; the first occurrence's detail and variation heading are kept for
 * the report.
 *
 * @param {Array<{story: string, title: string, name: string, state: string, themes: Object<string, string>, variant: string, text: string}>} samples
 *   One per visible link per state, each carrying the fields
 *   `evaluateSample` reads.
 * @return {{checked: number, checkedByStory: Map<string, number>, notHalo: number, skipped: Array<object>, failures: Array<object>, largeTextAllowance: Array<object>, combinations: number}}
 *   `failures` sorted by key; `largeTextAllowance` the links whose contrast
 *   passes only through the large-text 3:1 minimum, collapsed and sorted the
 *   same way; `notHalo` counts samples of links that draw no
 *   halo in that state, which are not judged; `combinations` counts distinct
 *   (story, theme combination, theme args, viewport) tuples that had a link
 *   checked.
 */
export function evaluateSamples(samples) {
  const failures = new Map();
  const allowances = new Map();
  const skipped = [];
  const combinations = new Set();
  const checkedByStory = new Map();
  let checked = 0;
  let notHalo = 0;

  samples.forEach((sample) => {
    // Only links that draw the halo are this check's business: a link with
    // no halo shadow in this state (a CTA button, a plain nav link) is
    // counted and left alone, contrast included.
    if (!drawsHalo(sample)) {
      notHalo += 1;
      return;
    }
    const themes = formatThemes(sample.themes ?? {});
    const args = formatArgs(sample.args);
    const viewport = sample.viewport ?? null;
    const link = normaliseLinkText(sample.text);
    const verdict = evaluateSample(sample);

    if (verdict.skip) {
      skipped.push({
        story: sample.story,
        themes,
        args,
        ...(viewport ? { viewport } : {}),
        state: sample.state,
        link,
        reason: verdict.skip,
      });
      return;
    }

    checked += 1;
    checkedByStory.set(
      sample.story,
      (checkedByStory.get(sample.story) ?? 0) + 1,
    );
    combinations.add(
      `${sample.story} | ${themes} | ${args} | ${formatViewport(viewport)}`,
    );

    if (verdict.largeTextAllowance) {
      const entry = {
        story: sample.story,
        themes,
        ...(args ? { args } : {}),
        ...(viewport ? { viewport } : {}),
        state: sample.state,
        check: 'contrast',
        where: sample.where ?? '',
        link,
      };
      const key = failureKey(entry);
      const existing = allowances.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        allowances.set(key, {
          ...entry,
          title: `${sample.title} > ${sample.name}`,
          variant: sample.variant ?? '',
          detail: verdict.contrast,
          count: 1,
        });
      }
    }

    verdict.problems.forEach(({ check, detail, largeTextAllowance }) => {
      const failure = {
        story: sample.story,
        themes,
        ...(args ? { args } : {}),
        ...(viewport ? { viewport } : {}),
        state: sample.state,
        check,
        where: sample.where ?? '',
        link,
      };
      const key = failureKey(failure);
      const existing = failures.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        failures.set(key, {
          ...failure,
          title: `${sample.title} > ${sample.name}`,
          variant: sample.variant ?? '',
          detail,
          // Report context, like `detail`: not part of the key, so the
          // baseline matches a flagged failure exactly as an unflagged one.
          ...(largeTextAllowance ? { largeTextAllowance: true } : {}),
          count: 1,
        });
      }
    });
  });

  return {
    checked,
    checkedByStory,
    notHalo,
    skipped,
    combinations: combinations.size,
    failures: [...failures.values()].sort((a, b) =>
      failureKey(a).localeCompare(failureKey(b)),
    ),
    largeTextAllowance: [...allowances.values()].sort((a, b) =>
      failureKey(a).localeCompare(failureKey(b)),
    ),
  };
}

/**
 * The most of the baseline an unfiltered run may leave stale before it fails.
 *
 * A fix retires a handful of entries, or one component's worth; a run that
 * stopped reproducing a tenth of every known failure has far more likely
 * stopped seeing the links (a render that silently came out empty, a broken
 * selector) than had them all fixed. Past this share the run fails and says
 * so; if the fixes are real, `--update-baseline` records them.
 */
export const STALE_SHARE_LIMIT = 0.1;

/**
 * Judged halo samples per component, from per-story counts.
 *
 * @param {Map<string, number>} checkedByStory
 *   From `evaluateSamples`.
 * @param {function(string): string} componentOfStory
 *   Story id to `<tier>/<component>`.
 * @return {Map<string, number>}
 *   Component to judged samples.
 */
export function componentsChecked(checkedByStory, componentOfStory) {
  const counts = new Map();
  checkedByStory.forEach((count, story) => {
    const component = componentOfStory(story);
    counts.set(component, (counts.get(component) ?? 0) + count);
  });
  return counts;
}

/**
 * Reasons a run cannot be trusted even though it found nothing new.
 *
 * - It judged no halo link at all.
 * - In an unfiltered run, a component it rendered had no halo link judged,
 *   unless that component is expected to have none (`NO_HALO_LINKS` in
 *   `link-halo-scope.mjs`); and one expected to have none that now has some,
 *   so the exemption cannot go stale. A filtered run (`LINK_HALO_STORIES`)
 *   may select only the stories of a component that have no halo link, so
 *   like the stale check this only speaks for a complete run.
 * - An unfiltered run left more than `STALE_SHARE_LIMIT` of the baseline
 *   stale.
 *
 * @param {object} input
 * @param {Map<string, number>} input.checkedByComponent
 *   From `componentsChecked`.
 * @param {string[]} input.components
 *   The components the run rendered.
 * @param {Object<string, string>} [input.expectedEmpty]
 *   Components expected to have no halo link, with the reason.
 * @param {number} input.stale
 *   Stale baseline entries.
 * @param {number} input.baselineSize
 *   Baseline entries.
 * @param {boolean} input.complete
 *   True for an unfiltered run.
 * @return {string[]}
 *   One message per problem; none is a pass.
 */
export function coverageProblems({
  checkedByComponent,
  components,
  expectedEmpty = {},
  stale,
  baselineSize,
  complete,
}) {
  const problems = [];
  const total = [...checkedByComponent.values()].reduce(
    (sum, count) => sum + count,
    0,
  );
  if (total === 0) {
    problems.push(
      'No halo link was judged at all. Checking nothing is not a pass: the ' +
        'stories rendered no link with a halo, or the check could not see ' +
        'them (a filter that matches no halo story, an empty render).',
    );
  }
  (complete ? components : []).forEach((component) => {
    const count = checkedByComponent.get(component) ?? 0;
    if (count === 0 && !(component in expectedEmpty)) {
      problems.push(
        `${component} is in scope, but no halo link in its stories was ` +
          'judged. Its links are hidden, gone, or no longer draw the halo. ' +
          'Fix the story or the styles; if it really has no halo link, add ' +
          'it to NO_HALO_LINKS in link-halo-scope.mjs with the reason.',
      );
    }
    if (count > 0 && component in expectedEmpty) {
      problems.push(
        `${component} is in NO_HALO_LINKS, but ${plural(
          count,
          'halo link sample',
        )} in its stories were judged. Remove it from NO_HALO_LINKS.`,
      );
    }
  });
  if (
    complete &&
    baselineSize > 0 &&
    stale / baselineSize > STALE_SHARE_LIMIT
  ) {
    problems.push(
      `${stale} of ${baselineSize} baseline entries ` +
        `(${Math.round((stale / baselineSize) * 100)}%) were not reproduced, ` +
        `over the ${STALE_SHARE_LIMIT * 100}% limit. The check has most ` +
        'likely stopped seeing links rather than found them fixed; if the ' +
        'fixes are real, run with --update-baseline.',
    );
  }
  return problems;
}

/**
 * Whether this run can judge a baseline entry.
 *
 * A run with no story filter judges every entry: anything it did not render
 * no longer exists -- the story was deleted or renamed, or the dial option was
 * taken away -- so its entries can only be stale. A filtered run cannot tell
 * a render that is gone from one it was told to leave out, so it judges only
 * the renders it selected (`groupOfEntry`, `visitKey`).
 *
 * @param {object} entry
 *   A baseline entry.
 * @param {Set<string>} visited
 *   `visitKey`s of the renders this run selected.
 * @param {boolean} complete
 *   True for a run with no story filter.
 * @return {boolean}
 *   True if the run speaks for this entry.
 */
const judged = (entry, visited, complete) =>
  complete || visited.has(groupOfEntry(entry));

/**
 * Compares this run's failures with the baseline.
 *
 * An entry is stale when the run could have reproduced it and did not (see
 * `judged`). With a story filter in force, only the renders that were made
 * say anything: an entry for one that was filtered out is neither confirmed
 * nor stale. An unfiltered run also retires entries for renders that no
 * longer exist, which would otherwise sit in the file forever.
 *
 * @param {Array<object>} failures
 *   `evaluateSamples(...).failures`.
 * @param {Array<object>} baseline
 *   The baseline file's `failures`.
 * @param {Set<string>} visited
 *   `visitKey`s of the renders this run selected.
 * @param {boolean} [complete]
 *   True for a run with no story filter.
 * @return {{newFailures: Array<object>, known: Array<object>, stale: Array<object>}}
 *   `newFailures` is what fails the run.
 */
export function diffBaseline(failures, baseline, visited, complete = false) {
  const baselineKeys = new Set(baseline.map(failureKey));
  const currentKeys = new Set(failures.map(failureKey));

  return {
    newFailures: failures.filter(
      (failure) => !baselineKeys.has(failureKey(failure)),
    ),
    known: failures.filter((failure) => baselineKeys.has(failureKey(failure))),
    stale: baseline.filter(
      (entry) =>
        judged(entry, visited, complete) && !currentKeys.has(failureKey(entry)),
    ),
  };
}

/**
 * Only the identifying fields, in a fixed order, for the baseline file.
 * `args` and `viewport` are left out when there are none, like they are left
 * out of the key.
 */
const baselineEntry = ({
  story,
  themes,
  args = '',
  viewport = null,
  state,
  check,
  where = '',
  link,
}) => ({
  story,
  themes,
  ...(args ? { args } : {}),
  ...(viewport ? { viewport } : {}),
  state,
  check,
  where,
  link,
});

/**
 * The baseline file's `failures` after an update.
 *
 * This run's failures replace every entry the run can judge (see
 * `judged`): all of them in an unfiltered run, only those for the renders it
 * made in a filtered one. Entries for renders a filter left out are kept, so
 * updating from a partial run cannot silently drop the rest of the file.
 *
 * @param {Array<object>} failures
 *   This run's failures.
 * @param {Array<object>} baseline
 *   The current baseline's `failures`.
 * @param {Set<string>} visited
 *   As for `diffBaseline`.
 * @param {boolean} [complete]
 *   As for `diffBaseline`.
 * @return {Array<object>}
 *   The new entries, sorted by key.
 */
export function updatedBaseline(failures, baseline, visited, complete = false) {
  return [
    ...baseline.filter((entry) => !judged(entry, visited, complete)),
    ...failures,
  ]
    .map(baselineEntry)
    .sort((a, b) => failureKey(a).localeCompare(failureKey(b)));
}

/** One block per failure: what, where, in which themes and state, and why. */
const describeFailure = (failure) =>
  [
    `  ${failure.check} | "${failure.link}" | ${failure.state}`,
    `    story:  ${failure.title} (${failure.story})`,
    `    themes: ${failure.themes}`,
    ...(failure.args ? [`    args:   ${failure.args}`] : []),
    ...(failure.viewport
      ? [`    viewport: ${formatViewport(failure.viewport)}`]
      : []),
    ...(failure.where ? [`    where:  ${failure.where}`] : []),
    ...(failure.variant ? [`    under:  ${failure.variant}`] : []),
    `    ${failure.detail}${
      failure.count > 1 ? ` (${failure.count} links)` : ''
    }`,
  ].join('\n');

/**
 * Renders the report a developer reads in CI output.
 *
 * @param {object} report
 * @param {number} report.visits
 *   Renders, counting each global theme and theme combination of a
 *   non-visreg story.
 * @param {number} report.stories
 *   Distinct stories rendered.
 * @param {object} report.evaluation
 *   `evaluateSamples` output.
 * @param {object} report.diff
 *   `diffBaseline` output.
 * @param {Array<object>} report.errors
 *   Visits that would not render, `{id, globalTheme, args, viewport, error}`.
 * @param {number} [report.limit]
 *   How many new failures to print in full.
 * @return {string}
 *   The report, ready to print.
 */
export function formatReport({
  visits,
  stories,
  evaluation,
  diff,
  errors,
  limit = 50,
}) {
  const { checked, notHalo = 0, skipped, combinations, failures } = evaluation;
  const sections = [
    `Checked ${plural(checked, 'link sample')} (each link once per state: ` +
      `${STATES.join(', ')}) across ${plural(
        combinations,
        'story/theme combination',
      )}, ` +
      `from ${plural(visits, 'render')} of ${plural(
        stories,
        'story',
        'stories',
      )}; ${plural(notHalo, 'link sample')} without a halo left alone.`,
    `${plural(failures.length, 'distinct failure')}: ` +
      `${diff.known.length} in the baseline, ${diff.newFailures.length} new. ` +
      `${plural(
        skipped.length,
        'link sample',
      )} skipped (background could not be resolved).`,
  ];

  if (diff.newFailures.length > 0) {
    const shown = diff.newFailures.slice(0, limit);
    sections.push(
      `${plural(
        diff.newFailures.length,
        'new failure',
      )} not in link-halo-baseline.json:`,
      shown.map(describeFailure).join('\n\n'),
    );
    if (diff.newFailures.length > shown.length) {
      sections.push(
        `...and ${diff.newFailures.length - shown.length} more. Set ` +
          'LINK_HALO_RESULTS_OUT to write every failure to a file.',
      );
    }
    sections.push(
      'A "halo" failure means --color-text-shadow does not match the surface ' +
        'behind the link: reset it wherever that surface is painted. A ' +
        '"contrast" failure is the link text itself. If a failure is known and ' +
        'ticketed, `npm run test:link-halo -- --update-baseline` records it -- ' +
        'see "Link halo check" in components/_storybook/TESTING.md.',
    );
  }

  const allowance = evaluation.largeTextAllowance ?? [];
  if (allowance.length > 0) {
    const shown = allowance.slice(0, limit);
    sections.push(
      `${plural(allowance.length, 'link')} ${
        allowance.length === 1 ? 'passes' : 'pass'
      } contrast only through the WCAG large-text 3:1 minimum. ` +
        'Not a failure here, but the functional element contrast gate ' +
        '(00-tokens/colors/functional-element-contrast.mjs, ' +
        'YaleSites-Internal#1614) holds all text to 4.5:1:',
      shown.map(describeFailure).join('\n\n'),
      ...(allowance.length > shown.length
        ? [
            `...and ${allowance.length - shown.length} more ` +
              '(LINK_HALO_RESULTS_OUT lists them all).',
          ]
        : []),
    );
  }

  if (diff.stale.length > 0) {
    sections.push(
      `${plural(diff.stale.length, 'baseline entry', 'baseline entries')} no ` +
        `longer ${
          diff.stale.length === 1 ? 'fails -- delete it' : 'fail -- delete them'
        }, or run with --update-baseline:`,
      diff.stale.map((entry) => `  ${failureKey(entry)}`).join('\n'),
    );
  }

  if (errors.length > 0) {
    sections.push(
      `${plural(
        errors.length,
        'render',
      )} failed, so their links were not checked:`,
      errors
        .map(
          (entry) =>
            `  ${entry.id}${
              entry.globalTheme || entry.args || entry.viewport
                ? ` (${[
                    entry.globalTheme && `global=${entry.globalTheme}`,
                    formatArgs(entry.args),
                    formatViewport(entry.viewport),
                  ]
                    .filter(Boolean)
                    .join(' ')})`
                : ''
            }: ${entry.error}`,
        )
        .join('\n'),
    );
  }

  return sections.join('\n\n');
}
