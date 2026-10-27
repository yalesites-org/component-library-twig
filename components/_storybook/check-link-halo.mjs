/**
 * Checks every link of the components that draw the link halo for a halo that
 * does not match the background behind it, and for text below WCAG AA
 * contrast, in every global x section x component theme combination and
 * interaction state (YaleSites-Internal#1939).
 *
 * Usage (needs a built Storybook, so run `npm run storybook:build` first):
 *   npm run test:link-halo
 *   npm run test:link-halo -- --update-baseline
 *
 * The browser has to be present. `npm ci` normally downloads it through
 * Puppeteer's postinstall, but newer npm gates install scripts, so fetch it
 * explicitly if the run cannot find one:
 *   npx puppeteer browsers install chrome
 *
 * Environment overrides:
 *   LINK_HALO_STORIES          only visit stories whose id matches this regex
 *   LINK_HALO_CONCURRENCY      pages working in parallel (default: CPUs, at
 *                              most 4)
 *   LINK_HALO_STORY_TIMEOUT    per-story timeout in ms (default 60,000)
 *   LINK_HALO_UPDATE_BASELINE  set to 1 to rewrite the baseline (same as the
 *                              --update-baseline flag)
 *   LINK_HALO_RESULTS_OUT      write every failure and skip to this JSON file
 *
 * Like `measure-visreg-pixels.mjs`, this file is only the I/O: serve the
 * build, drive a headless browser, read computed styles, and hand them to
 * `link-halo.mjs`, which is where every decision lives and where it is unit
 * tested. What is left here -- reading the page, forcing states, the worker
 * pool -- is verified by running it against a real browser.
 *
 * Puppeteer rather than Playwright, although Playwright is the stated default
 * for new browser tests in this repo: Puppeteer is already installed, cached
 * in CI and driving the sibling pixel check, and this check needs nothing
 * Playwright adds (it is Chromium-only by nature -- it forces pseudo-classes
 * through the Chrome DevTools Protocol). Adding a second browser dependency
 * for one script was not worth it.
 *
 * ## What "behind the link" means
 *
 * For each visible link, the check finds the first text node that actually
 * renders and draws a halo (or, if none does, the first that renders;
 * `pickSample`), scrolls the painted part of its first line box fully into
 * view (`revealLineBox`), and asks the browser what is painted at the centre
 * of that part (`document.elementsFromPoint`). That stack --
 * the element holding the text and every box beneath it -- is what the halo
 * has to match. Using the hit-test stack rather than walking `parentElement`
 * is what catches text that is positioned over something other than its
 * parent: a banner caption over an image, a card body over a sibling panel.
 * It is also what makes hidden links drop out: text that is clipped by a
 * collapsed panel, pushed off-canvas, or visually hidden is not at that
 * point, so it is not checked. The hit-test never returns `::before` or
 * `::after`, so positioned pseudo-elements that cover the point are read
 * separately and composited in front of the box that owns them
 * (`pseudoLayers` in `collectSamples`).
 *
 * ## States
 *
 * `:hover` and `:focus-visible` are forced through `CSS.forcePseudoState`,
 * which is the only way to make `:focus-visible` match without a real
 * keyboard. A real hover also matches every ancestor, and a real focus makes
 * every ancestor `:focus-within`, so those are forced on the ancestors too --
 * otherwise `.card:hover .card__link` rules would never apply. All links in a
 * story are forced at once, which is the one way this differs from a person
 * hovering one link: every menu that opens on hover is open at the same time.
 * Only links that draw a text-shadow at rest, and their ancestors, are forced
 * (`tagLinks`); a link with none is never judged.
 * Each link is still judged against what is behind *it*, so that only
 * matters where one opened panel covers another link, which then reads as
 * hidden for that state. Before any story is checked, each worker proves
 * forcing works on a probe page, so a browser change that made it a no-op
 * fails loudly instead of passing every state as "same as resting".
 *
 * Transitions and animations are cut to zero so a forced state is read at
 * its end value rather than partway through the underline slide.
 *
 * ## The matrix: render once, copy into every theme
 *
 * Rendering is the slow part, and a global or section theme is only an
 * attribute on an ancestor. So each story is rendered once per combination of
 * its other theme controls (component dial, header accent...; read from the
 * preview by `discoverStories`, since the built index carries no argTypes, and
 * set through `updateStoryArgs` as the Controls panel does), and its markup is
 * then copied, on the same page, into a wrapper for every global theme and
 * section theme it supports (`planPages`, `cloneMarkup`, `mountMatrix`). The
 * wrappers are the ones the visreg stories and the real page use, and the
 * copies were shown to give exactly the samples one render per combination
 * gives (see "Link halo check" in TESTING.md). Each matrix is a new container,
 * removed once sampled, so copies never pile up across renders.
 *
 * ## Widths
 *
 * Every story is checked at `VIEWPORT_WIDTH` (1200px). The stories of the
 * components in `NARROW_VIEWPORT_COMPONENTS` are checked again at
 * `NARROW_VIEWPORT_WIDTH`, below the 992px breakpoint, where a layout that
 * puts link text over an image at 1200px (the action banner) stacks it
 * instead (YaleSites-Internal#1955). Those are extra pages in the same plan
 * (`planPages`), each carrying its width; a worker resizes its page and loads
 * `iframe.html` afresh whenever the next page's width differs, so no story is
 * ever read at the width the previous one left behind. Failures at the narrow
 * width carry it in their baseline key, so they never collide with the same
 * link's at 1200px.
 *
 * @see link-halo.mjs
 * @see serve-storybook-build.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import puppeteer from 'puppeteer';

import {
  STATES,
  THEME_CROSS_LIMIT,
  bootStoryId,
  coverageProblems,
  componentsChecked,
  diffBaseline,
  evaluateSamples,
  formatReport,
  orderPages,
  planPages,
  plural,
  updatedBaseline,
  visitKey,
} from './link-halo.mjs';
import { PAGE_HELPERS, pageHelpersScript } from './link-halo-page.mjs';
import {
  HALO_COMPONENTS,
  NARROW_VIEWPORT_COMPONENTS,
  NARROW_VIEWPORT_WIDTH,
  NO_HALO_LINKS,
  componentOf,
  storyInScope,
  storySectionless,
  storyViewports,
} from './link-halo-scope.mjs';
// Node needs the extension; Storybook's bundler is what lets stories omit it.
// eslint-disable-next-line import/extensions
import { createSectionWrapper } from './playground-utils.js';
import {
  BLOCKED_MEDIA,
  serveDirectory,
  storyUrl,
} from './serve-storybook-build.mjs';
import {
  VIEWPORT_WIDTH,
  requirePositiveNumber,
  storyEntries,
} from './visreg-pixel-budget.mjs';

const require = createRequire(import.meta.url);
const tokens = require('@yalesites-org/tokens/build/json/tokens.json');

/**
 * Global theme keys, in token order.
 *
 * The first is the theme the Storybook toolbar starts on
 * (`globalTypes.globalTheme.defaultValue` in
 * `config/emulsify-core/storybook/preview-decorators.js`) and the one every
 * story is rendered in: visreg stories set their own theme on wrappers, so it
 * only keeps `<body>` predictable, and each render is then copied into a
 * wrapper for every global theme (`planPages`, `cloneMarkup`, `mountMatrix`).
 */
const globalThemes = Object.keys(tokens['global-themes']);
const globalThemeLabels = Object.fromEntries(
  Object.entries(tokens['global-themes']).map(([theme, { label }]) => [
    theme,
    label,
  ]),
);

const here = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.resolve(here, '../..', '.out');
const baselinePath = path.join(here, 'link-halo-baseline.json');

// One page per CPU, at most four: the work is the browser's, and each
// worker's page runs in its own renderer process. GitHub's ubuntu runner has
// 4. On a 10-core laptop 4 workers finished in 138s, 10 in 184s and 20 in
// 191s: past four, the renderers and the browser process contend for more
// than the pool gains.
const concurrency = requirePositiveNumber(
  'LINK_HALO_CONCURRENCY',
  process.env.LINK_HALO_CONCURRENCY,
  Math.min(os.availableParallelism(), 4),
);
const storyTimeout = requirePositiveNumber(
  'LINK_HALO_STORY_TIMEOUT',
  process.env.LINK_HALO_STORY_TIMEOUT,
  60000,
);
const storyFilter = process.env.LINK_HALO_STORIES
  ? new RegExp(process.env.LINK_HALO_STORIES)
  : undefined;
const updateBaseline =
  process.argv.includes('--update-baseline') ||
  process.env.LINK_HALO_UPDATE_BASELINE === '1';
const resultsOut = process.env.LINK_HALO_RESULTS_OUT;

/** Where the matrix of copies lives on the page while it is sampled. */
const MATRIX = '#link-halo-matrix';

/**
 * Freezes every transition and animation at its end value, and makes every
 * box in the matrix hit-testable.
 *
 * Zero duration rather than `none`: an element that animates in from
 * `opacity: 0` would stay invisible with no animation at all, whereas a
 * zero-length one lands on its final frame.
 *
 * `document.elementsFromPoint` skips `pointer-events: none` boxes, and the
 * decorative overlays behind some link text set exactly that
 * (`.callouts__overlay_image`, `.cta-banner__overlay_image`), so without this
 * a link over one would be judged against whatever is beneath the overlay.
 * Nothing in the check relies on pointer events: states are forced through
 * the devtools protocol, never by moving a mouse.
 */
const FREEZE_MOTION = `
  *, *::before, *::after {
    animation-delay: 0s !important;
    animation-duration: 0s !important;
    transition-delay: 0s !important;
    transition-duration: 0s !important;
  }
  ${MATRIX}, ${MATRIX} * {
    pointer-events: auto !important;
  }
`;

/**
 * Everything not served from the local build, blocked.
 *
 * The pixel check lets remote requests through because remote images change
 * a story's height. Nothing remote can change a link's colours, though, and
 * letting it through cost twice over: the remote webfont stylesheet held each
 * first page load for ~20s, and the third-party embed scripts (Instagram,
 * SoundCloud) intermittently tore down the page's JavaScript context mid-check,
 * which failed the story and, through the retry, added minutes to the run.
 * The build is served over plain `http://` on loopback, so blocking `https://`
 * blocks every remote host the stories use without touching the build. Links
 * still lay out in the fallback font, which moves them but cannot recolour
 * them; links *inside* a third-party iframe were never checked anyway.
 */
const BLOCKED_REMOTE = ['https://*'];

/**
 * The pseudo-classes forced for each non-resting state.
 *
 * `focus` alongside `focus-visible` because a real keyboard focus matches
 * both, and the library has rules on each.
 */
const FORCED = {
  hover: { link: ['hover'], ancestor: ['hover'] },
  'focus-visible': {
    link: ['focus', 'focus-visible'],
    ancestor: ['focus-within'],
  },
};

/**
 * Tags every link in the matrix, and marks the ones whose states are forced.
 *
 * Runs in the page. Links are `a[href]` -- the only element the halo mixins
 * are applied to. Every link gets `data-link-halo` (its index), which is what
 * `collectSamples` reads. Only links that draw a text-shadow somewhere in
 * their text at rest also get `data-link-halo-forced`, and only their
 * ancestors `data-link-halo-ancestor`: a link with no shadow is never judged
 * (`evaluateSamples`), so forcing its states and its ancestors' was most of
 * the devtools traffic for nothing. The halo mixins set the shadow on the
 * resting link and only recolour it in other states, so this drops no link
 * that has a halo in some state; `TESTING.md` records the run that showed the
 * failure set and halo sample count unchanged. Ancestors stop at the root, so
 * `<body>` never matches `:hover`.
 *
 * @param {string} rootSelector
 *   The element holding the links: the matrix (`mountMatrix`).
 * @return {number}
 *   How many links were tagged.
 */
function tagLinks(rootSelector) {
  const root = document.querySelector(rootSelector);
  const links = [...root.querySelectorAll('a[href]')];
  const shadowed = (link) =>
    [link, ...link.querySelectorAll('*')].some(
      (element) => getComputedStyle(element).textShadow !== 'none',
    );

  links.forEach((link, index) => {
    link.setAttribute('data-link-halo', String(index));
    if (!shadowed(link)) return;
    link.setAttribute('data-link-halo-forced', '');
    for (
      let node = link.parentElement;
      node && node !== root.parentElement;
      node = node.parentElement
    ) {
      if (node.hasAttribute('data-link-halo-ancestor')) break;
      if (!node.hasAttribute('data-link-halo')) {
        node.setAttribute('data-link-halo-ancestor', '');
      }
    }
  });

  return links.length;
}

/**
 * Reads, for every tagged link, the styles of its text and of what is behind
 * it.
 *
 * Runs in the page, so it cannot import anything: every decision is left to
 * `link-halo.mjs` and this only gathers facts. The one judgement it has to
 * make itself is whether the link is visible at all, because that needs the
 * live layout. The pseudo-element box maths it needs comes from the helpers
 * `pageHelpersScript` installed on the page.
 *
 * @param {{rootSelector: string, helpers: string}} request
 *   The element holding the links (the matrix, `mountMatrix`), and the
 *   `window` property the page helpers are under (`PAGE_HELPERS`).
 * @return {{samples: Array<object>, hidden: number}}
 *   One sample per visible link, and how many links were not visible.
 */
function collectSamples({ rootSelector, helpers }) {
  const { pickSample, pseudoElementBox, revealLineBox } = window[helpers] ?? {};
  if (
    ![pickSample, pseudoElementBox, revealLineBox].every(
      (helper) => typeof helper === 'function',
    )
  ) {
    throw new Error(`The page helpers (window.${helpers}) are not installed.`);
  }
  const links = [...document.querySelectorAll('[data-link-halo]')];
  const samples = [];
  let hidden = 0;

  const label = (element) => {
    const className =
      typeof element.className === 'string'
        ? element.className.trim().split(/\s+/)[0]
        : '';
    return `<${element.tagName.toLowerCase()}${
      className ? `.${className}` : ''
    }>`;
  };

  const themesOf = (element) => {
    const themes = {};
    for (let node = element; node; node = node.parentElement) {
      [...node.attributes].forEach((attribute) => {
        const match = attribute.name.match(/^data-(.+)-theme$/);
        if (match && attribute.value && !(match[1] in themes)) {
          themes[match[1]] = attribute.value;
        }
      });
    }
    return themes;
  };

  // The variation heading the link is rendered under, e.g. "All Section
  // Theme Variations > Section Theme: two". Report context only.
  const variantOf = (element) => {
    for (
      let container = element.closest('.sb-section__container');
      container;
      container = container.parentElement?.closest('.sb-section__container')
    ) {
      const subheading = container.querySelector(
        ':scope > .sb-section__subheading',
      );
      if (subheading) {
        let heading = container.previousElementSibling;
        while (heading && !heading.matches('.sb-section__heading')) {
          heading = heading.previousElementSibling;
        }
        return [heading?.textContent, subheading.textContent]
          .filter(Boolean)
          .map((text) => text.trim())
          .join(' > ');
      }
    }
    return '';
  };

  // The element's first BEM element class (`block__element`), or ''.
  //
  // Only `__` classes are used because they come from the templates. Plain
  // classes are not stable: behaviours add them after render -- `link`,
  // `external-link`, `link-purpose-*`, `ys_linked`, `active` -- and whether
  // they are there yet when the check reads the page is a race, which made
  // the same link's place differ between two runs of one build.
  const elementClass = (element) =>
    typeof element.className === 'string'
      ? element.className
          .trim()
          .split(/\s+/)
          .find((name) => name.includes('__')) ?? ''
      : '';

  // Where in the story a link sits, for telling apart links that share their
  // text: the blocks of the two nearest enclosing BEM elements and the
  // link's own BEM element class, e.g.
  // `card-collection reference-card a.reference-card__heading-link`. Built
  // from template class names only, so it is the same on every run of an
  // unchanged build.
  const storyRoot = document.querySelector(rootSelector);
  const whereOf = (link) => {
    const blocks = [];
    for (
      let node = link.parentElement;
      node && node !== storyRoot && blocks.length < 2;
      node = node.parentElement
    ) {
      const block = elementClass(node).split('__')[0];
      if (block && block !== blocks[blocks.length - 1]) blocks.push(block);
    }
    const own = elementClass(link);
    return [...blocks.reverse(), `a${own ? `.${own}` : ''}`].join(' ');
  };

  // An absolutely positioned pseudo-element's border box, in viewport
  // coordinates, or null when its geometry cannot be read.
  //
  // `elementsFromPoint` never returns `::before`/`::after`, so a surface one
  // of them paints behind the text (an active nav item's tint, a card's
  // overlay) would otherwise be invisible to the check. Its offsets resolve
  // against the containing block -- the nearest positioned or transformed
  // ancestor's padding box, or the viewport for `fixed` -- which is found
  // here from the live layout; the box maths is `pseudoElementBox` in
  // `link-halo.mjs`, installed on the page by `pageHelpersScript`.
  const pseudoBox = (element, style) => {
    let block;
    if (style.position === 'fixed') {
      block = {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    } else {
      let holder = element;
      while (
        holder &&
        holder !== document.documentElement &&
        getComputedStyle(holder).position === 'static' &&
        getComputedStyle(holder).transform === 'none'
      ) {
        holder = holder.parentElement;
      }
      const target = holder ?? document.documentElement;
      const rect = target.getBoundingClientRect();
      const holderStyle = getComputedStyle(target);
      const border = (side) => parseFloat(holderStyle[`border${side}Width`]);
      block = {
        left: rect.left + border('Left'),
        top: rect.top + border('Top'),
        width: rect.width - border('Left') - border('Right'),
        height: rect.height - border('Top') - border('Bottom'),
      };
    }

    return pseudoElementBox(style, block);
  };

  // Layers for whatever `element`'s pseudo-elements paint at (x, y),
  // frontmost (`::after`) first. Only absolutely or fixed positioned ones
  // count: an in-flow pseudo sits beside the text, not behind it. A masked
  // one is an icon drawn in the background colour, not a surface. When the
  // box cannot be read, the pseudo is assumed to cover the point, so an
  // unreadable surface is judged rather than silently dropped.
  const pseudoLayers = (element, x, y, insideLink) =>
    ['::after', '::before'].flatMap((pseudo) => {
      const style = getComputedStyle(element, pseudo);
      if (
        style.content === 'none' ||
        style.content === 'normal' ||
        style.display === 'none' ||
        style.visibility !== 'visible' ||
        (style.position !== 'absolute' && style.position !== 'fixed') ||
        (style.maskImage ?? 'none') !== 'none' ||
        (style.webkitMaskImage ?? 'none') !== 'none'
      ) {
        return [];
      }
      const box = pseudoBox(element, style);
      if (
        box &&
        !(x >= box.left && x < box.right && y >= box.top && y < box.bottom)
      ) {
        return [];
      }
      return [
        {
          label: `${label(element).slice(0, -1)}${pseudo}>`,
          tag: 'pseudo',
          backgroundColor: style.backgroundColor,
          backgroundImage: style.backgroundImage,
          opacity: parseFloat(style.opacity),
          insideLink,
          pseudo: true,
        },
      ];
    });

  const firstLineBox = (range) =>
    [...range.getClientRects()].find(
      (rect) => rect.width >= 2 && rect.height >= 2,
    );

  // The rects that clip what an element paints: the padding box of every
  // ancestor (the element included) whose computed `overflow-x` or
  // `overflow-y` is not `visible`, on that axis only. The root's overflow,
  // and the body's when the root's is `visible`, applies to the viewport
  // instead, so it clips to the viewport, and only where it is `hidden` or
  // `clip` (where it scrolls, the page scroll reaches past it). An
  // absolutely positioned box escapes the static ancestors between it and
  // its containing block, and a fixed one every ancestor above it. Inline
  // and `display: contents` boxes report an overflow they do not apply.
  // `clip` and `clip-path` are not read: the hit-test still drops text they
  // hide.
  const clipRects = (holder) => {
    const root = document.documentElement;
    const rootStyle = getComputedStyle(root);
    const rootVisible =
      rootStyle.overflowX === 'visible' && rootStyle.overflowY === 'visible';
    const fixed = (value) => value === 'hidden' || value === 'clip';
    const clips = [];
    let escaping = false;

    for (let element = holder; element; element = element.parentElement) {
      const style = getComputedStyle(element);
      const clipsX = style.overflowX !== 'visible';
      const clipsY = style.overflowY !== 'visible';
      const applies =
        (clipsX || clipsY) &&
        !['inline', 'contents'].includes(style.display) &&
        !(
          escaping &&
          style.position === 'static' &&
          style.transform === 'none'
        );

      if (
        applies &&
        (element === root || (element === document.body && rootVisible))
      ) {
        clips.push({
          left: fixed(style.overflowX) ? 0 : -Infinity,
          right: fixed(style.overflowX) ? window.innerWidth : Infinity,
          top: fixed(style.overflowY) ? 0 : -Infinity,
          bottom: fixed(style.overflowY) ? window.innerHeight : Infinity,
        });
      } else if (applies) {
        const rect = element.getBoundingClientRect();
        const left = rect.left + element.clientLeft;
        const top = rect.top + element.clientTop;
        clips.push({
          left: clipsX ? left : -Infinity,
          right: clipsX ? left + element.clientWidth : Infinity,
          top: clipsY ? top : -Infinity,
          bottom: clipsY ? top + element.clientHeight : Infinity,
        });
      }

      if (style.position === 'fixed') break;
      if (style.position === 'absolute') {
        escaping = true;
      } else if (style.position !== 'static' || style.transform !== 'none') {
        escaping = false;
      }
    }
    return clips;
  };

  // Samples one text node of a link, or returns null if that text is not
  // visible where it sits.
  const sampleTextNode = (link, node, text, where) => {
    const holder = node.parentElement;
    if (
      !holder.checkVisibility({
        contentVisibilityAuto: true,
        opacityProperty: true,
        visibilityProperty: true,
      })
    ) {
      return null;
    }

    // Text with no shadow at all draws no halo in this state, so it is never
    // judged (`evaluateSamples`): skip the hit-test and pseudo-element reads,
    // which are nearly all the cost of a sample.
    const holderStyle = getComputedStyle(holder);
    if (holderStyle.textShadow === 'none') {
      return {
        index: Number(link.getAttribute('data-link-halo')),
        text,
        where,
        themes: themesOf(link),
        textShadow: 'none',
        layers: [],
      };
    }

    const range = document.createRange();
    range.selectNodeContents(node);

    // The whole painted line box must be on screen, not just its centre: a
    // centre within a pixel of the viewport edge hit-tests as nothing, and
    // whether a link landed there depended on where the previous link had
    // scrolled to, which made the same link visible in one run and hidden in
    // the next. "Painted" is the line box cut down to its clipping ancestors
    // (`clipRects`): the range's rect runs on past an ellipsis or an
    // `overflow-x: hidden` page edge. A box with any painted edge off screen
    // is scrolled to the middle once, and only sampled if it is then fully
    // on screen (`revealLineBox`).
    const box = revealLineBox(
      () => {
        const rect = firstLineBox(range);
        return rect
          ? {
              rect,
              clips: clipRects(holder),
              viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
              },
            }
          : null;
      },
      (x, y) => window.scrollBy(x, y),
    );
    if (!box) return null;
    const x = (box.left + box.right) / 2;
    const y = (box.top + box.bottom) / 2;

    const stack = document.elementsFromPoint(x, y);
    // The text counts as visible only if the hit-test reaches the element
    // holding it, or something between that element and the link. An
    // outer ancestor being hit proves nothing: a collapsed panel's wrapper
    // is still there when the panel's content is clipped away.
    const top = stack.findIndex(
      (element) =>
        element === holder ||
        (link.contains(element) && element.contains(holder)),
    );
    if (top < 0) return null;

    const style = getComputedStyle(holder);
    return {
      index: Number(link.getAttribute('data-link-halo')),
      text,
      where,
      themes: themesOf(link),
      variant: variantOf(link),
      color: style.color,
      textShadow: style.textShadow,
      fontSize: parseFloat(style.fontSize),
      fontWeight: parseFloat(style.fontWeight),
      // Each box's pseudo-elements paint above its own background, so they
      // go in front of it in this frontmost-first list.
      layers: stack.slice(top).flatMap((element) => {
        const layerStyle = getComputedStyle(element);
        const insideLink = link.contains(element);
        return [
          ...pseudoLayers(element, x, y, insideLink),
          {
            label: label(element),
            tag:
              element instanceof SVGElement
                ? 'svg'
                : element.tagName.toLowerCase(),
            backgroundColor: layerStyle.backgroundColor,
            backgroundImage: layerStyle.backgroundImage,
            opacity: parseFloat(layerStyle.opacity),
            insideLink,
          },
        ];
      }),
    };
  };

  // Links that still share story, themes, place and text are told apart by
  // their order in the document: `#2` for the second one. Counted over every
  // link, visible or not, so a link's number does not change with the state.
  const seen = new Map();
  const placeOf = (link, text) => {
    const where = whereOf(link);
    const signature = JSON.stringify([themesOf(link), where, text]);
    const occurrence = (seen.get(signature) ?? 0) + 1;
    seen.set(signature, occurrence);
    return occurrence > 1 ? `${where} #${occurrence}` : where;
  };

  links.forEach((link) => {
    const text = (link.innerText || link.getAttribute('aria-label') || '')
      .replace(/\s+/g, ' ')
      .trim();
    const where = placeOf(link, text);
    const walker = document.createTreeWalker(link, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) =>
        /\S/.test(node.data)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP,
    });
    // A few text nodes at most, and the first visible one that draws a halo
    // decides; one that draws none (an eyebrow, an icon label, a soft drop
    // shadow) only decides if no visible node draws one (`pickSample`). A link whose
    // first several are all hidden is not worth hunting through.
    const sample = pickSample(() => {
      const node = walker.nextNode();
      return node ? sampleTextNode(link, node, text, where) : undefined;
    });

    if (sample) {
      sample.story = link
        .closest('[data-link-halo-clone]')
        ?.getAttribute('data-link-halo-story');
      samples.push(sample);
    } else {
      hidden += 1;
    }
  });

  window.scrollTo(0, 0);
  return { samples, hidden };
}

/**
 * Puts every tagged link into a state, and returns how to put it back.
 *
 * Releasing has to target the very node ids that were forced. Forced states
 * are held against node ids, and every `DOM.getDocument` rebinds those ids,
 * so a release that looked the nodes up again would clear nothing -- the
 * probe in `proveForcedStates` exists because exactly that happened once.
 *
 * @param {import('puppeteer').CDPSession} session
 *   The page's devtools session, with DOM and CSS enabled.
 * @param {string} state
 *   One of `STATES`.
 * @return {Promise<function(): Promise<void>>}
 *   Releases the forced state. A no-op for the resting state.
 */
async function forceState(session, state) {
  const forced = FORCED[state];
  if (!forced) return async () => {};

  const { root } = await session.send('DOM.getDocument', { depth: 0 });
  const force = (nodeIds, pseudoClasses) =>
    Promise.all(
      nodeIds.map((nodeId) =>
        session.send('CSS.forcePseudoState', {
          nodeId,
          forcedPseudoClasses: pseudoClasses,
        }),
      ),
    );
  const targets = await Promise.all(
    [
      ['[data-link-halo-forced]', forced.link],
      ['[data-link-halo-ancestor]', forced.ancestor],
    ].map(async ([selector, pseudoClasses]) => {
      const { nodeIds } = await session.send('DOM.querySelectorAll', {
        nodeId: root.nodeId,
        selector,
      });
      await force(nodeIds, pseudoClasses);
      return nodeIds;
    }),
  );

  return async () => {
    await Promise.all(targets.map((nodeIds) => force(nodeIds, [])));
  };
}

/**
 * Proves forced states take effect before trusting them on real stories.
 *
 * If a Chrome update ever made `CSS.forcePseudoState` stop applying a state,
 * the hover and focus passes would quietly re-check the resting styles and
 * report them clean. A probe link whose colour changes in each state catches
 * that; its border colour, set from an ancestor's `:hover` or
 * `:focus-within`, proves the ancestors are forced too.
 *
 * @param {import('puppeteer').Page} page
 *   A fresh page.
 * @param {import('puppeteer').CDPSession} session
 *   Its devtools session, with DOM and CSS enabled.
 * @return {Promise<void>}
 */
async function proveForcedStates(page, session) {
  await page.setContent(`
    <style>
      a {
        color: rgb(0, 0, 0);
        border: 1px solid rgb(0, 0, 0);
        text-shadow: 1px 0 rgb(0, 0, 0);
      }
      a:hover { color: rgb(1, 2, 3); }
      a:focus-visible { color: rgb(4, 5, 6); }
      div:hover > a { border-color: rgb(7, 8, 9); }
      div:focus-within > a { border-color: rgb(10, 11, 12); }
    </style>
    <div id="storybook-root"><a href="#probe">probe</a></div>
  `);
  await page.evaluate(tagLinks, '#storybook-root');

  const expected = {
    hover: 'rgb(1, 2, 3) rgb(7, 8, 9)',
    'focus-visible': 'rgb(4, 5, 6) rgb(10, 11, 12)',
  };
  const read = () =>
    page.evaluate(() => {
      const style = getComputedStyle(document.querySelector('a'));
      return `${style.color} ${style.borderTopColor}`;
    });

  // One state at a time: forcing both at once would prove nothing.
  const states = Object.keys(expected);
  for (let index = 0; index < states.length; index += 1) {
    const state = states[index];
    const release = await forceState(session, state);
    const forced = await read();
    await release();
    const released = await read();
    if (
      forced !== expected[state] ||
      released !== 'rgb(0, 0, 0) rgb(0, 0, 0)'
    ) {
      throw new Error(
        `Forcing :${state} through the devtools protocol did not behave ` +
          `(probe read "${forced}" forced and "${released}" released, ` +
          `expected "${expected[state]}" then "rgb(0, 0, 0) rgb(0, 0, 0)"). ` +
          `The ${state} checks would be meaningless, so the run stops here.`,
      );
    }
  }
}

/**
 * Shows a story in the iframe that is already loaded, without reloading.
 *
 * Runs in the page. Loading `iframe.html` costs about two seconds before a
 * story even starts rendering -- the whole preview bundle is parsed again --
 * and that, not the checking, was most of the run time. Storybook's own
 * channel switches stories and globals in place, which is how the manager
 * UI does it, so this asks for the story the same way and waits for the
 * preview to say it has rendered.
 *
 * Globals are sent first. If the story is already showing, that re-render
 * is the one awaited; otherwise the preview re-renders the old story, which
 * is ignored, then renders the new one with the new globals. The waiting is
 * `waitForRender` in `link-halo-page.mjs`, shared with `applyArgs`.
 *
 * @param {{id: string, globals: Object<string, string>, timeout: number, helpers: string}} request
 *   What to show, and the `window` property of the page helpers.
 * @return {Promise<void>}
 *   Resolves once the story has rendered; rejects if it errors or times out.
 */
function showStory({ id, globals, timeout, helpers }) {
  // Storybook's own name for the preview's channel.
  // eslint-disable-next-line no-underscore-dangle
  const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
  return window[helpers].waitForRender(
    channel,
    id,
    timeout,
    () => {
      channel.emit('updateGlobals', { globals });
      channel.emit('setCurrentStory', { storyId: id, viewMode: 'story' });
    },
    'switching to',
  );
}

/**
 * Sets a story's theme args, the way the Controls panel does, and waits for
 * the re-render.
 *
 * Runs in the page, after the story has rendered. Storybook re-renders on
 * every `updateStoryArgs`, even when nothing changed, so there is always a
 * `storyRendered` to wait for. Args are kept per story for the life of the
 * page, so every visit of a story with theme args sets all of them, defaults
 * included, rather than trusting what an earlier visit left behind.
 *
 * @param {{id: string, args: Object<string, string>, timeout: number, helpers: string}} request
 *   The story and the args to set, and the `window` property of the page
 *   helpers.
 * @return {Promise<void>}
 *   Resolves once the story has re-rendered; rejects if it errors or times
 *   out.
 */
function applyArgs({ id, args, timeout, helpers }) {
  // eslint-disable-next-line no-underscore-dangle
  const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
  return window[helpers].waitForRender(
    channel,
    id,
    timeout,
    () => channel.emit('updateStoryArgs', { storyId: id, updatedArgs: args }),
    'setting args on',
  );
}

/**
 * Reads every story's argTypes and initial args from the preview.
 *
 * Runs in the page. The built `index.json` has no argTypes, so the only
 * place to learn which controls a story has is the preview's own story
 * store, after it has loaded every CSF file. Only options and labels are
 * kept: that is all `themeArgs` looks at, and the rest does not serialize.
 *
 * @return {Promise<Object<string, {argTypes: object, initialArgs: object}>>}
 *   Story id to its argTypes and initial args.
 */
async function readStories() {
  // eslint-disable-next-line no-underscore-dangle
  const store = window.__STORYBOOK_PREVIEW__?.storyStoreValue;
  if (!store?.cacheAllCSFFiles || !store?.extract) {
    throw new Error(
      'The Storybook preview has no story store to read argTypes from.',
    );
  }
  await store.cacheAllCSFFiles();
  return Object.fromEntries(
    Object.entries(store.extract()).map(([id, story]) => [
      id,
      {
        initialArgs: Object.fromEntries(
          Object.entries(story.initialArgs ?? {}).filter(
            ([, value]) => typeof value === 'string',
          ),
        ),
        argTypes: Object.fromEntries(
          Object.entries(story.argTypes ?? {})
            .filter(([, argType]) => Array.isArray(argType.options))
            .map(([name, argType]) => [
              name,
              {
                name: argType.name,
                options: argType.options.filter(
                  (option) => typeof option === 'string',
                ),
              },
            ]),
        ),
      },
    ]),
  );
}

/**
 * Loads the preview once and reads every story's controls from it.
 *
 * @param {import('puppeteer').Browser} browser
 *   The launched browser.
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {string} id
 *   A story id to load the preview with: one the run will visit, so the
 *   preview boots on a story that is known to be in scope.
 * @return {Promise<Object<string, {argTypes: object, initialArgs: object}>>}
 *   From `readStories`.
 */
async function discoverStories(browser, origin, id) {
  const context = await browser.createBrowserContext();
  try {
    const page = await context.newPage();
    const session = await page.createCDPSession();
    await session.send('Network.enable');
    await session.send('Network.setBlockedURLs', {
      urls: [...BLOCKED_MEDIA, ...BLOCKED_REMOTE],
    });
    await page.goto(storyUrl(origin, id), {
      waitUntil: 'load',
      timeout: storyTimeout,
    });
    await page.waitForFunction(
      // eslint-disable-next-line no-underscore-dangle
      () => window.__STORYBOOK_PREVIEW__?.storyStoreValue,
      { timeout: storyTimeout, polling: 50 },
    );
    return await page.evaluate(readStories);
  } finally {
    await context.close();
  }
}

/**
 * Chrome switches that keep every worker's page running at full speed.
 *
 * Only one page is the front tab. Without these, the others get no animation
 * frames and throttled timers, and `layoutReady` waits for two frames.
 */
const UNTHROTTLED = [
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-renderer-backgrounding',
];

/**
 * Waits until an element is laid out for good: fonts loaded, every image in
 * it loaded or failed (an image arriving late moves everything below it), and
 * two frames drawn. No fixed delay: under load a fixed one let the story be
 * copied, or the matrix sampled, before that, which changed which links were
 * visible from run to run.
 *
 * Lazy images are switched to eager first. Left lazy, one loads only when
 * sampling scrolls near it, so whether it has pushed the next link down by
 * the time that link is hit-tested was a race.
 *
 * Runs in the page.
 *
 * @param {{selector: string, timeout: number}} request
 *   The element, and how long to wait at most before failing the render.
 * @return {Promise<void>}
 */
function layoutReady({ selector, timeout }) {
  const all = [...document.querySelectorAll(`${selector} img`)];
  all.forEach((image) => {
    if (image.loading === 'lazy') image.setAttribute('loading', 'eager');
  });
  const images = all.filter((image) => !image.complete);
  const settled = Promise.all([
    document.fonts?.ready,
    ...images.map(
      (image) =>
        new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        }),
    ),
  ]).then(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      }),
  );
  let timer;
  return Promise.race([
    settled,
    new Promise((resolve, reject) => {
      timer = setTimeout(
        () => reject(new Error(`The matrix was not ready after ${timeout}ms.`)),
        timeout,
      );
    }),
  ]).finally(() => clearTimeout(timer));
}

/**
 * Brings a story up on the page, in the given global theme and theme args.
 *
 * @param {import('puppeteer').Page} page
 *   The worker's page.
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {{id: string, args: ?Object<string, string>}} visit
 *   The story, and the theme args to set on it (null for none).
 * @param {string} theme
 *   Global theme key.
 * @param {?{id: string, theme: string}} current
 *   What the page is already showing, to switch in place from; null to load
 *   `iframe.html`. If it is this very story in this global theme, there is
 *   nothing to switch -- the switch would never re-render, and so never
 *   finish -- and only the args are set.
 * @return {Promise<void>}
 */
async function renderVisit(page, origin, visit, theme, current) {
  const { id, args } = visit;
  if (current) {
    if (current.id !== id || current.theme !== theme) {
      await page.evaluate(showStory, {
        id,
        globals: { globalTheme: theme },
        timeout: storyTimeout,
        helpers: PAGE_HELPERS,
      });
    }
  } else {
    await page.goto(storyUrl(origin, id, { globalTheme: theme }), {
      waitUntil: 'load',
      timeout: storyTimeout,
    });
    // Inserted directly rather than through `page.addStyleTag`, which waits
    // for the style element's load event.
    await page.evaluate((css) => {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.append(style);
    }, FREEZE_MOTION);
  }
  await page.waitForFunction(
    () => document.querySelector('#storybook-root')?.childElementCount > 0,
    { timeout: storyTimeout, polling: 50 },
  );
  // The decorator sets the body attribute in an effect, after render.
  await page.waitForFunction(
    (expected) => document.body.getAttribute('data-global-theme') === expected,
    { timeout: storyTimeout, polling: 50 },
    theme,
  );
  if (args) {
    await page.evaluate(applyArgs, {
      id,
      args,
      timeout: storyTimeout,
      helpers: PAGE_HELPERS,
    });
  }
  // Behaviours and images settle after the render event; the markup is
  // copied from here, so it must be final.
  await page.evaluate(layoutReady, {
    selector: '#storybook-root',
    timeout: storyTimeout,
  });
}

/**
 * The markup of one copy of a render: the story's markup in a global theme
 * wrapper, and in a section if the copy has one.
 *
 * The global theme wrapper is the one the visreg stories use
 * (`renderThemeSection` in `global-theme-stories.mjs`), the section the one
 * they wrap components in (`createSectionWrapper`, with the options every
 * visreg story passes). A story with its own section control already renders
 * a section; its copies get no second one, and `mountMatrix` sets the theme
 * on the story's own instead.
 *
 * @param {object} plan
 *   A page from `planPages`.
 * @param {{story: string, global: string, section: ?string}} clone
 *   The copy.
 * @param {number} index
 *   Its position on the page.
 * @param {string} html
 *   The rendered story.
 * @return {string}
 *   The copy's markup.
 */
const cloneMarkup = (plan, clone, index, html) => {
  const content =
    clone.section && !plan.sectionArg
      ? createSectionWrapper(clone.section, html, {
          width: 'site',
          primaryWidth: '100%',
        })
      : html;
  const ownSection =
    clone.section && plan.sectionArg
      ? ` data-link-halo-section="${clone.section}"`
      : '';
  return `<div data-global-theme="${clone.global}" data-link-halo-clone="${index}" data-link-halo-story="${clone.story}"${ownSection}>${content}</div>`;
};

/**
 * Puts the matrix of copies on the page, in a new container, with the
 * story's own render hidden.
 *
 * Runs in the page. The container is always new: a page whose last matrix is
 * still there is a bug that would multiply links on every render, so it
 * throws instead of reusing it. Theme attributes that the markup carries
 * itself are set to the copy's: a story's own global theme wrapper (every
 * visreg story has one), and a story's own section.
 *
 * Each copy must be styled by its own global theme only, so the global theme
 * the preview puts on `<body>` (and any other ancestor of the container) is
 * parked while the matrix is on the page (`parkGlobalThemes`) and put back by
 * `unmountMatrix`. Without that, every copy also matched the descendant rules
 * of the toolbar's theme, one, and half the matrix judged the wrong
 * background.
 *
 * @param {{markup: string, selector: string, helpers: string}} request
 *   The copies, the container's id as a selector, and the `window` property
 *   of the page helpers.
 * @return {number}
 *   Links in the matrix.
 */
function mountMatrix({ markup, selector, helpers }) {
  if (document.querySelector(selector)) {
    throw new Error('The previous matrix is still on the page.');
  }
  const root = document.querySelector('#storybook-root');
  const container = document.createElement('div');
  container.id = selector.slice(1);
  container.innerHTML = markup;
  root.style.display = 'none';
  root.after(container);
  window[helpers].parkGlobalThemes(container.parentElement);

  container.querySelectorAll('[data-link-halo-clone]').forEach((clone) => {
    const section = clone.getAttribute('data-link-halo-section');
    if (section) {
      const own = clone.querySelector('[data-section-theme]');
      if (!own) {
        throw new Error(
          'The story has a section theme control but renders no section.',
        );
      }
      own.setAttribute('data-section-theme', section);
    }
    const global = clone.getAttribute('data-global-theme');
    clone.querySelectorAll('[data-global-theme]').forEach((element) => {
      element.setAttribute('data-global-theme', global);
    });
  });

  return container.querySelectorAll('a[href]').length;
}

/**
 * Takes the matrix off the page, puts back the global themes `mountMatrix`
 * parked, and shows the story again.
 *
 * Runs in the page.
 *
 * @param {{selector: string, helpers: string}} request
 *   The container's id as a selector, and the `window` property of the page
 *   helpers.
 */
function unmountMatrix({ selector, helpers }) {
  const root = document.querySelector('#storybook-root');
  // Removing the matrix and showing the story come first, so a restore that
  // throws still leaves the story on the page.
  document.querySelectorAll(selector).forEach((element) => element.remove());
  root?.style.removeProperty('display');
  window[helpers].restoreGlobalThemes(root?.parentElement ?? document.body);
}

/**
 * Throws if a global theme is back on an ancestor of the matrix.
 *
 * Runs in the page, before each state is sampled. `mountMatrix` parks the
 * preview's global theme; if the decorator set it again on a re-render, every
 * copy would match that theme's descendant rules too, and the samples would
 * judge the wrong background without any sign of it.
 *
 * @param {string} selector
 *   The container's id as a selector.
 */
function assertThemesParked(selector) {
  const container = document.querySelector(selector);
  for (let node = container?.parentElement; node; node = node.parentElement) {
    if (node.hasAttribute('data-global-theme')) {
      throw new Error(
        `<${node.tagName.toLowerCase()}> has data-global-theme="${node.getAttribute(
          'data-global-theme',
        )}" again while the matrix is mounted, so every copy would also get that theme.`,
      );
    }
  }
}

/**
 * Disclosure controls the check opens before it copies a story, so the links
 * they hide are judged rather than counted as hidden. The accordion renders
 * every item closed, which left all of its links unjudged; its own
 * "Expand All" control opens them the way a visitor would, and the measured
 * heights it sets travel with the copied markup.
 */
const OPEN_BEFORE_COPY = ['.accordion__toggle-all[aria-expanded="false"]'];

/**
 * Clicks every control in `OPEN_BEFORE_COPY` in the rendered story.
 *
 * Runs in the page.
 *
 * @param {string[]} selectors
 *   The controls.
 * @return {number}
 *   How many were clicked.
 */
function openDisclosures(selectors) {
  const root = document.querySelector('#storybook-root');
  const controls = selectors.flatMap((selector) => [
    ...root.querySelectorAll(selector),
  ]);
  controls.forEach((control) => control.click());
  return controls.length;
}

/**
 * Renders one story once, copies it into every theme combination of its
 * page, and samples every link in every copy, in every state.
 *
 * The first render on a page loads `iframe.html`; later ones switch in place
 * (`showStory`), falling back to a full load once if the switch fails. Any
 * error that survives that drops back to a full load for the next page.
 *
 * @param {import('puppeteer').Page} page
 *   A page sized to the plan's viewport (`checkAll`).
 * @param {import('puppeteer').CDPSession} session
 *   Its devtools session.
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {object} plan
 *   A page from `planPages`.
 * @param {?{id: string, theme: string}} current
 *   What the page is showing if it has a working preview, else null.
 * @return {Promise<{result: object, current: ?{id: string, theme: string}}>}
 *   The page's result -- `links`, `hidden`, `samples`, `ms`, `renderMs` --
 *   or `error`; and what the browser page now shows.
 */
async function checkPage(page, session, origin, plan, current) {
  const { id, title, name, importPath, args, viewport } = plan;
  const result = {
    id,
    title,
    name,
    importPath,
    args,
    viewport,
    clones: plan.clones,
  };
  const theme = globalThemes[0];
  const started = Date.now();
  let fallback;

  try {
    try {
      await renderVisit(page, origin, { id, args }, theme, current);
    } catch (error) {
      if (!current) throw error;
      fallback = error.message;
      await renderVisit(page, origin, { id, args }, theme, null);
    }
    if ((await page.evaluate(openDisclosures, OPEN_BEFORE_COPY)) > 0) {
      await page.evaluate(layoutReady, {
        selector: '#storybook-root',
        timeout: storyTimeout,
      });
    }
    const renderedAt = Date.now();

    const html = await page.evaluate(
      () => document.querySelector('#storybook-root').innerHTML,
    );
    const samples = [];
    let links = 0;
    let hidden = 0;

    if (/<a\s[^>]*href/i.test(html)) {
      const markup = plan.clones
        .map((clone, index) => cloneMarkup(plan, clone, index, html))
        .join('');
      let failure;
      try {
        links = await page.evaluate(mountMatrix, {
          markup,
          selector: MATRIX,
          helpers: PAGE_HELPERS,
        });
        await page.evaluate(layoutReady, {
          selector: MATRIX,
          timeout: storyTimeout,
        });
        await page.evaluate(tagLinks, MATRIX);

        // One state at a time: they are forced on the same nodes.
        for (let index = 0; index < STATES.length; index += 1) {
          const state = STATES[index];
          await page.evaluate(assertThemesParked, MATRIX);
          const release = await forceState(session, state);
          const collected = await page.evaluate(collectSamples, {
            rootSelector: MATRIX,
            helpers: PAGE_HELPERS,
          });
          await release();
          hidden += collected.hidden;
          collected.samples.forEach((sample) => {
            samples.push({ ...sample, title, name, state, args, viewport });
          });
        }
      } catch (error) {
        failure = error;
      }
      // Always unmount; if sampling failed, report that error rather than
      // one from cleaning up after it.
      try {
        await page.evaluate(unmountMatrix, {
          selector: MATRIX,
          helpers: PAGE_HELPERS,
        });
      } catch (error) {
        failure ??= error;
      }
      if (failure) throw failure;
    }

    return {
      result: {
        ...result,
        links,
        hidden,
        samples,
        ms: Date.now() - started,
        renderMs: renderedAt - started,
        ...(fallback ? { fallback } : {}),
      },
      current: { id, theme },
    };
  } catch (error) {
    return {
      current: null,
      result: {
        ...result,
        links: 0,
        hidden: 0,
        samples: [],
        error: error.message,
      },
    };
  }
}

/**
 * Checks every page, one browser page per worker, each worker taking the next
 * from the front of the queue (`orderPages`).
 *
 * Every page is checked; none is skipped on the strength of another page's
 * result, because which page finishes first depends on timing.
 *
 * @param {import('puppeteer').Browser} browser
 *   The launched browser.
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {Array<object>} plans
 *   What to check, in order.
 * @param {number} workers
 *   Pages to run in parallel.
 * @return {Promise<{results: Array<object>}>}
 *   One result per page.
 */
async function checkAll(browser, origin, plans, workers) {
  const results = [];
  const progressEvery = Math.max(1, Math.ceil(plans.length / 10));
  let next = 0;
  let done = 0;

  const worker = async () => {
    // A browser context per worker, not just a page: pages of one origin in
    // one context can share a renderer process, and then the pool is pages
    // taking turns on one main thread.
    const context = await browser.createBrowserContext();
    const page = await context.newPage();

    try {
      const resize = (width) =>
        page.setViewport({ width, height: 800, deviceScaleFactor: 1 });
      let width = VIEWPORT_WIDTH;
      await resize(width);
      // Every document this page loads gets the helpers the in-page code
      // shares (`link-halo-page.mjs`); switching stories in place keeps the
      // document, and with it the helpers.
      await page.evaluateOnNewDocument(pageHelpersScript());
      const session = await page.createCDPSession();
      await session.send('Network.enable');
      await session.send('Network.setBlockedURLs', {
        urls: [...BLOCKED_MEDIA, ...BLOCKED_REMOTE],
      });
      await session.send('DOM.enable');
      await session.send('CSS.enable');
      await proveForcedStates(page, session);
      let current = null;

      while (next < plans.length) {
        const plan = plans[next];
        next += 1;
        // A narrow page (`planPages`) needs the page at its width. The story
        // is then loaded afresh rather than switched in place, so behaviours
        // that read the width when they attach see the new one.
        const planWidth = plan.viewport ?? VIEWPORT_WIDTH;
        if (planWidth !== width) {
          width = planWidth;
          await resize(width);
          current = null;
        }
        const checked = await checkPage(page, session, origin, plan, current);
        results.push(checked.result);
        ({ current } = checked);
        done += 1;
        if (done % progressEvery === 0 || done === plans.length) {
          console.log(`  ${done}/${plans.length} pages`);
        }
      }
    } finally {
      await context.close();
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(workers, plans.length) }, worker),
  );

  return { results };
}

/**
 * Re-checks any page that failed, one at a time.
 *
 * Same reasoning as the pixel check: the largest stories can miss a timeout
 * while competing for the CPU, and one that fails alone is genuinely broken
 * -- which still fails the run.
 *
 * @param {import('puppeteer').Browser} browser
 *   The launched browser.
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {Array<object>} results
 *   Results from the parallel pass.
 * @param {Array<object>} plans
 *   The pages they came from.
 * @return {Promise<Array<object>>}
 *   The same results, with retried entries replaced.
 */
async function retryFailures(browser, origin, results, plans) {
  const failed = new Set(results.filter((entry) => entry.error).map(visitKey));
  if (failed.size === 0) return results;

  console.log(`\nRetrying ${plural(failed.size, 'page')} one at a time.`);
  const retried = new Map(
    (
      await checkAll(
        browser,
        origin,
        plans.filter((plan) => failed.has(visitKey(plan))),
        1,
      )
    ).results.map((entry) => [visitKey(entry), entry]),
  );

  return results.map((entry) =>
    entry.error ? retried.get(visitKey(entry)) : entry,
  );
}

/**
 * Reads the baseline's entries, or none if the file does not exist yet.
 *
 * @return {Promise<Array<object>>}
 *   The `failures` array.
 */
async function readBaseline() {
  try {
    return JSON.parse(await readFile(baselinePath, 'utf8')).failures ?? [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw new Error(`Could not read ${baselinePath}: ${error.message}`);
  }
}

/**
 * The baseline file, explaining itself to whoever opens it.
 *
 * @param {Array<object>} failures
 *   Entries, from `updatedBaseline`.
 * @return {string}
 *   The file contents.
 */
const baselineFile = (failures) =>
  `${JSON.stringify(
    {
      $comment: [
        'Link halo and contrast failures that existed when the check landed',
        '(YaleSites-Internal#1939). The check tolerates exactly these; any',
        'failure not listed here fails `npm run test:link-halo`.',
        '',
        'This is a burn-down list. Fix the component, then delete its entries',
        '(or rerun with --update-baseline, which drops every entry that no',
        'longer fails). Adding an entry to turn a red build green is not a fix.',
        'See "Link halo check" in components/_storybook/TESTING.md.',
      ],
      failures,
    },
    null,
    2,
  )}\n`;

async function main() {
  const indexPath = path.join(buildDir, 'index.json');
  let index;

  try {
    index = JSON.parse(await readFile(indexPath, 'utf8'));
    if (storyEntries(index).length === 0) {
      throw new Error('The index has no stories.');
    }
  } catch (error) {
    console.error(`Could not read stories from ${indexPath}.`);
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  const baseline = await readBaseline();
  const started = Date.now();
  let plans;
  let results;

  // Both closed on every path, for the reason given in the pixel check: a
  // leaked server keeps the event loop alive and hangs CI.
  const server = await serveDirectory(buildDir);

  try {
    const scope = {
      globalThemes,
      labels: globalThemeLabels,
      filter: storyFilter,
      inScope: storyInScope,
      sectionless: storySectionless,
      viewports: storyViewports,
    };
    // Chosen before the browser starts, so a filter that matches no in-scope
    // story stops the run with `planPages`'s message straight away.
    const bootId = bootStoryId(index, scope);
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--hide-scrollbars',
        ...UNTHROTTLED,
      ],
      protocolTimeout: storyTimeout * 4,
    });

    try {
      const stories = await discoverStories(browser, server.origin, bootId);
      plans = planPages(index, { ...scope, stories });

      const oneAtATime = [
        ...new Set(
          plans.filter((plan) => !plan.crossed).map((plan) => plan.id),
        ),
      ];
      const copies = plans.reduce((sum, plan) => sum + plan.clones.length, 0);
      const narrow = plans.filter((plan) => plan.viewport).length;
      console.log(
        `Checking links in ${plural(plans.length, 'render')} of the ` +
          `${HALO_COMPONENTS.length} components that draw the halo, copied ` +
          `into ${plural(
            copies,
            'theme combination',
          )}, at ${VIEWPORT_WIDTH}px ` +
          `wide${
            narrow > 0
              ? ` (${narrow} of them ${Object.keys(
                  NARROW_VIEWPORT_COMPONENTS,
                ).join(', ')} again at ${NARROW_VIEWPORT_WIDTH}px)`
              : ''
          }, ${concurrency} at a time.`,
      );
      if (oneAtATime.length > 0) {
        console.log(
          `Theme controls varied one at a time rather than crossed (over ` +
            `${THEME_CROSS_LIMIT} combinations): ${oneAtATime.join(', ')}.`,
        );
      }

      const checked = await checkAll(
        browser,
        server.origin,
        orderPages(plans),
        concurrency,
      );
      results = await retryFailures(
        browser,
        server.origin,
        checked.results,
        plans,
      );
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
    return;
  } finally {
    await server.close();
  }

  // Every planned page is rendered: nothing is skipped on another page's
  // result, so the set of pages never depends on timing.
  if (results.length !== plans.length) {
    console.error(
      `Checked ${results.length} of ${plans.length} planned pages; every ` +
        'page must be checked.',
    );
    process.exitCode = 1;
    return;
  }

  const visits = plans.flatMap((plan) =>
    plan.clones.map((clone) => ({
      id: clone.story,
      args: plan.args,
      viewport: plan.viewport,
    })),
  );
  const visitedStories = new Set(visits.map((visit) => visit.id));
  const storyPaths = new Map(
    storyEntries(index).map((entry) => [entry.id, entry.importPath]),
  );
  const visited = new Set(visits.map(visitKey));
  const complete = !storyFilter;
  const errors = results.filter((entry) => entry.error);
  const evaluation = evaluateSamples(results.flatMap((entry) => entry.samples));
  const diff = diffBaseline(evaluation.failures, baseline, visited, complete);
  const links = results.reduce((sum, entry) => sum + entry.links, 0);
  const hidden = results.reduce((sum, entry) => sum + entry.hidden, 0);
  const withLinks = new Set(
    results.filter((entry) => entry.links > 0).map((entry) => entry.id),
  );

  console.log(
    `\nFound ${plural(links, 'link')} in ${plural(
      withLinks.size,
      'story',
      'stories',
    )}; ${plural(hidden, 'link sample')} not visible in that state and not ` +
      `checked. Took ${Math.round((Date.now() - started) / 1000)}s.`,
  );

  if (resultsOut) {
    await writeFile(
      resultsOut,
      `${JSON.stringify(
        {
          failures: evaluation.failures,
          skipped: evaluation.skipped,
          largeTextAllowance: evaluation.largeTextAllowance,
          errors,
          // Per render: links found, links hidden, and how long it took --
          // what to look at when the run gets slow.
          renders: results.map(({ samples, clones, ...render }) => ({
            ...render,
            clones: clones.length,
          })),
        },
        null,
        2,
      )}\n`,
    );
    console.log(`Wrote every failure and skip to ${resultsOut}.`);
  }

  const report = `\n${formatReport({
    visits: results.length,
    stories: visitedStories.size,
    evaluation,
    diff,
    errors,
  })}`;

  // A run that judged nothing, or stopped judging a component, or no longer
  // reproduces much of the baseline, has most likely stopped seeing links
  // rather than found them all fixed, so it fails instead of passing quietly.
  const problems = coverageProblems({
    checkedByComponent: componentsChecked(evaluation.checkedByStory, (id) =>
      componentOf(storyPaths.get(id) ?? id),
    ),
    components: [
      ...new Set(plans.map((plan) => componentOf(plan.importPath))),
    ].sort(),
    expectedEmpty: NO_HALO_LINKS,
    // An update rewrites the baseline, so only an ordinary run can leave it
    // stale.
    stale: updateBaseline ? 0 : diff.stale.length,
    baselineSize: baseline.length,
    complete,
  });
  const untrusted =
    problems.length > 0
      ? `\nThe run cannot be trusted:\n${problems
          .map((problem) => `  ${problem}`)
          .join('\n')}`
      : '';

  if (updateBaseline) {
    // Printed whichever way the update goes, so a refusal still shows the
    // failed renders and the failures behind it.
    console.log(report);
    if (untrusted) {
      console.error(`${untrusted}\n\nSo the baseline was not updated.`);
      process.exitCode = 1;
      return;
    }
    if (errors.length > 0) {
      console.error(
        `\n${plural(
          errors.length,
          'render',
        )} failed, so the baseline was not ` +
          'updated -- it would drop entries for stories that were never checked.',
      );
      process.exitCode = 1;
      return;
    }
    const entries = updatedBaseline(
      evaluation.failures,
      baseline,
      visited,
      complete,
    );
    await writeFile(baselinePath, baselineFile(entries));
    console.log(
      `\nWrote ${plural(entries.length, 'entry', 'entries')} to ${path.relative(
        process.cwd(),
        baselinePath,
      )}.`,
    );
    return;
  }

  console.log(report);
  if (untrusted) console.log(untrusted);

  if (diff.newFailures.length > 0 || errors.length > 0 || problems.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
