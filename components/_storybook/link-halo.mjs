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
 * entry that stops failing is reported as stale -- a warning, not a failure,
 * so fixing a bug never breaks the build -- and should be deleted, which
 * `--update-baseline` does for you. Entries are keyed by story, theme
 * combination, state, check and link text, and deliberately carry no measured
 * numbers, so a colour that drifts while still failing does not churn the
 * file.
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

const clamp255 = (value) => Math.min(255, Math.max(0, value));

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
 * @param {string} value
 *   A computed colour.
 * @return {?{r: number, g: number, b: number, a: number}}
 *   The colour, or null if it is not a form this module understands.
 */
export function parseColor(value) {
  if (typeof value !== 'string') return null;

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
 * Judges one link in one state.
 *
 * @param {{color: string, textShadow: string, fontSize: number, fontWeight: number, layers: Array<object>}} sample
 *   Raw computed styles for the element holding the link's text, and the
 *   boxes behind it (see `resolveBackground`).
 * @return {{skip: string}|{background: string, problems: Array<{check: string, detail: string}>}}
 *   A skip reason, or the background and any problems found. An empty
 *   `problems` is a pass.
 */
export function evaluateSample(sample) {
  const resolved = resolveBackground(sample.layers);
  if (resolved.skip) return { skip: resolved.skip };

  const background = resolved.color;
  const problems = [];

  const shadows = haloShadows(
    parseTextShadow(sample.textShadow),
    sample.fontSize,
  );
  const unreadable = shadows.find((shadow) => !shadow.color);
  if (unreadable) {
    return { skip: `unreadable text-shadow "${sample.textShadow}"` };
  }

  const worst = shadows
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
  if (!text) {
    return { skip: `unreadable text colour "${sample.color}"` };
  }
  const painted = composite(text, background);
  const ratio = contrastRatio(painted, background);
  const minimum = isLargeText(sample.fontSize, sample.fontWeight)
    ? LARGE_TEXT_CONTRAST_MINIMUM
    : CONTRAST_MINIMUM;

  if (ratio < minimum) {
    problems.push({
      check: 'contrast',
      detail:
        `text ${toHex(painted)} on ${toHex(background)} is ` +
        `${formatRatio(ratio)}:1, needs ${minimum}:1`,
    });
  }

  return { background: toHex(background), problems };
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
 * @param {{story: string, themes: string, state: string, check: string, where?: string, link: string}} failure
 *   A failure, or a baseline entry.
 * @return {string}
 *   The key.
 */
export const failureKey = ({ story, themes, state, check, where = '', link }) =>
  [story, themes, state, check, where, link].join(' | ');

/**
 * Picks the stories to visit, and the global themes to visit them in.
 *
 * Two kinds of story are visited:
 *
 * - Every `visreg`-tagged story, once. These already render the theme matrix:
 *   one story per global theme (`global-theme-stories.mjs`), each showing the
 *   component on every section theme and with every component dial. That is
 *   the global x section x component matrix for every component that has a
 *   `*.visreg.stories.js`, with no extra rendering work from this check.
 * - Every other story, once per global theme, set through the `globalTheme`
 *   Storybook global. These get every global theme, and whatever section and
 *   component themes their default args render. They cannot be left to the
 *   visreg stories even where a component has one: the visreg stories always
 *   wrap the component in a section, and the Link Grid regression this check
 *   was written for (YaleSites-Internal#1938) only shows with no section
 *   around it -- which is exactly how the interactive story renders it.
 *
 * Not every one of those renders is made: `splitVisits` and
 * `deferredToRender` skip the extra global themes of a story that turned out
 * to have no links.
 *
 * @param {object} index
 *   The parsed `index.json` of a built Storybook.
 * @param {string[]} globalThemes
 *   Global theme keys, from tokens.
 * @param {RegExp} [filter]
 *   Only keep stories whose id matches.
 * @return {Array<{id: string, title: string, name: string, importPath: string, globalTheme: ?string}>}
 *   One visit per story and global theme, ordered by id then theme. A
 *   `globalTheme` of null means the story sets its own.
 */
export function selectVisits(index, globalThemes, filter) {
  const visits = [];
  storyEntries(index)
    .filter((entry) => !filter || filter.test(entry.id))
    .forEach(({ id, title, name, importPath, tags }) => {
      const story = { id, title, name, importPath };
      if ((tags ?? []).includes('visreg')) {
        visits.push({ ...story, globalTheme: null });
      } else {
        globalThemes.forEach((globalTheme) => {
          visits.push({ ...story, globalTheme });
        });
      }
    });

  if (visits.length === 0) {
    throw new Error(
      filter
        ? `No stories match ${filter}.`
        : 'No stories to visit in the Storybook index -- checking nothing is not a pass.',
    );
  }

  return visits;
}

/**
 * Splits the visits into a first pass and the renders that can wait on it.
 *
 * About half the non-visreg stories have no links at all (token tables,
 * layout shells, image atoms), and rendering each of them in all seven
 * global themes was a quarter of the run time for nothing. A global theme is
 * a `data-global-theme` attribute on `<body>`; no template branches on it, so
 * it cannot add or remove a link. The first pass is therefore every visreg
 * story plus every other story in the first global theme, and the remaining
 * global themes of a story are only rendered if that first render found a
 * link (`deferredToRender`). On the build this was written against, link
 * counts agreed across all seven global themes for every one of the 173
 * non-visreg stories, so the pruning skips nothing that has a link.
 *
 * @param {Array<object>} visits
 *   From `selectVisits`.
 * @param {string[]} globalThemes
 *   Global theme keys, the first being the one the first pass uses.
 * @return {{first: Array<object>, deferred: Array<object>}}
 *   Both in `selectVisits` order.
 */
export function splitVisits(visits, globalThemes) {
  const [firstTheme] = globalThemes;
  const isFirst = (visit) =>
    visit.globalTheme === null || visit.globalTheme === firstTheme;
  return {
    first: visits.filter(isFirst),
    deferred: visits.filter((visit) => !isFirst(visit)),
  };
}

/**
 * The deferred visits still worth rendering after the first pass.
 *
 * A story is dropped only when its first render succeeded and found no link.
 * One that failed to render is kept: it already fails the run, and its other
 * global themes say whether the failure is the story or the theme.
 *
 * @param {Array<object>} deferred
 *   From `splitVisits`.
 * @param {Array<{id: string, links: number, error?: string}>} firstResults
 *   Results of the first pass.
 * @return {Array<object>}
 *   The deferred visits to render.
 */
export function deferredToRender(deferred, firstResults) {
  const linkless = new Set(
    firstResults
      .filter((result) => !result.error && result.links === 0)
      .map((result) => result.id),
  );
  return deferred.filter((visit) => !linkless.has(visit.id));
}

/**
 * Turns the raw per-link samples from every visit into results.
 *
 * Samples for the same story, theme combination, state, check and link text
 * collapse into one failure, counting how often it occurred; the first
 * occurrence's detail and variation heading are kept for the report.
 *
 * @param {Array<{story: string, title: string, name: string, state: string, themes: Object<string, string>, variant: string, text: string}>} samples
 *   One per visible link per state, each carrying the fields
 *   `evaluateSample` reads.
 * @return {{checked: number, skipped: Array<object>, failures: Array<object>, combinations: number}}
 *   `failures` sorted by key; `combinations` counts distinct
 *   (story, theme combination) pairs that had a link checked.
 */
export function evaluateSamples(samples) {
  const failures = new Map();
  const skipped = [];
  const combinations = new Set();
  let checked = 0;

  samples.forEach((sample) => {
    const themes = formatThemes(sample.themes ?? {});
    const link = normaliseLinkText(sample.text);
    const verdict = evaluateSample(sample);

    if (verdict.skip) {
      skipped.push({
        story: sample.story,
        themes,
        state: sample.state,
        link,
        reason: verdict.skip,
      });
      return;
    }

    checked += 1;
    combinations.add(`${sample.story} | ${themes}`);

    verdict.problems.forEach(({ check, detail }) => {
      const failure = {
        story: sample.story,
        themes,
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
          count: 1,
        });
      }
    });
  });

  return {
    checked,
    skipped,
    combinations: combinations.size,
    failures: [...failures.values()].sort((a, b) =>
      failureKey(a).localeCompare(failureKey(b)),
    ),
  };
}

/**
 * Whether this run can judge a baseline entry: its story was rendered, or the
 * run covered the whole index and the story is no longer in it.
 *
 * @param {object} entry
 *   A baseline entry.
 * @param {Set<string>} visitedStories
 *   Story ids this run rendered.
 * @param {?Set<string>} indexedStories
 *   Every story id in the index, or null for a filtered run.
 * @return {boolean}
 *   True if the run speaks for this entry.
 */
const judged = (entry, visitedStories, indexedStories) =>
  visitedStories.has(entry.story) ||
  (indexedStories !== null && !indexedStories.has(entry.story));

/**
 * Compares this run's failures with the baseline.
 *
 * An entry is stale when the run could have reproduced it and did not. With a
 * story filter in force, only the stories that were rendered say anything:
 * an entry for one that was filtered out is neither confirmed nor stale. An
 * unfiltered run (`indexedStories` given) also judges entries for stories
 * that are no longer in the index at all -- a deleted or renamed story --
 * which would otherwise sit in the file forever.
 *
 * @param {Array<object>} failures
 *   `evaluateSamples(...).failures`.
 * @param {Array<object>} baseline
 *   The baseline file's `failures`.
 * @param {Set<string>} visitedStories
 *   Story ids this run rendered.
 * @param {?Set<string>} [indexedStories]
 *   Every story id in the index, for an unfiltered run; null (the default)
 *   for a filtered one.
 * @return {{newFailures: Array<object>, known: Array<object>, stale: Array<object>}}
 *   `newFailures` is what fails the run.
 */
export function diffBaseline(
  failures,
  baseline,
  visitedStories,
  indexedStories = null,
) {
  const baselineKeys = new Set(baseline.map(failureKey));
  const currentKeys = new Set(failures.map(failureKey));

  return {
    newFailures: failures.filter(
      (failure) => !baselineKeys.has(failureKey(failure)),
    ),
    known: failures.filter((failure) => baselineKeys.has(failureKey(failure))),
    stale: baseline.filter(
      (entry) =>
        judged(entry, visitedStories, indexedStories) &&
        !currentKeys.has(failureKey(entry)),
    ),
  };
}

/** Only the identifying fields, in a fixed order, for the baseline file. */
const baselineEntry = ({ story, themes, state, check, where = '', link }) => ({
  story,
  themes,
  state,
  check,
  where,
  link,
});

/**
 * The baseline file's `failures` after an update.
 *
 * This run's failures replace every entry the run can judge (see
 * `diffBaseline`): those for the stories it visited and, in an unfiltered
 * run, those for stories no longer in the index. Entries for stories a
 * filter left out are kept, so updating from a partial run cannot silently
 * drop the rest of the file.
 *
 * @param {Array<object>} failures
 *   This run's failures.
 * @param {Array<object>} baseline
 *   The current baseline's `failures`.
 * @param {Set<string>} visitedStories
 *   Story ids this run rendered.
 * @param {?Set<string>} [indexedStories]
 *   As for `diffBaseline`.
 * @return {Array<object>}
 *   The new entries, sorted by key.
 */
export function updatedBaseline(
  failures,
  baseline,
  visitedStories,
  indexedStories = null,
) {
  return [
    ...baseline.filter(
      (entry) => !judged(entry, visitedStories, indexedStories),
    ),
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
 *   Story renders, counting each global theme of a non-visreg story.
 * @param {number} report.stories
 *   Distinct stories rendered.
 * @param {object} report.evaluation
 *   `evaluateSamples` output.
 * @param {object} report.diff
 *   `diffBaseline` output.
 * @param {Array<object>} report.errors
 *   Visits that would not render, `{id, globalTheme, error}`.
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
  const { checked, skipped, combinations, failures } = evaluation;
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
      )}.`,
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
              entry.globalTheme ? ` (global=${entry.globalTheme})` : ''
            }: ${entry.error}`,
        )
        .join('\n'),
    );
  }

  return sections.join('\n\n');
}
