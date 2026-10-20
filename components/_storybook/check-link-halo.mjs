/**
 * Checks every link in the built Storybook for a halo that does not match the
 * background behind it, and for text below WCAG AA contrast, in every theme
 * combination and interaction state (YaleSites-Internal#1939).
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
 *   LINK_HALO_CONCURRENCY      stories rendered in parallel (default 4)
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
 * renders, scrolls it into view, and asks the browser what is painted at the
 * centre of its first line box (`document.elementsFromPoint`). That stack --
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
 * Each link is still judged against what is behind *it*, so that only
 * matters where one opened panel covers another link, which then reads as
 * hidden for that state. Before any story is checked, each worker proves
 * forcing works on a probe page, so a browser change that made it a no-op
 * fails loudly instead of passing every state as "same as resting".
 *
 * Transitions and animations are cut to zero so a forced state is read at
 * its end value rather than partway through the underline slide.
 *
 * @see link-halo.mjs
 * @see serve-storybook-build.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import puppeteer from 'puppeteer';

import {
  STATES,
  deferredToRender,
  diffBaseline,
  evaluateSamples,
  formatReport,
  plural,
  selectVisits,
  splitVisits,
  updatedBaseline,
} from './link-halo.mjs';
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
 * `config/emulsify-core/storybook/preview-decorators.js`), the one visreg
 * stories are shown under (they set their own theme on a wrapper, so it only
 * keeps `<body>` predictable), and the one `splitVisits` uses for the first
 * pass.
 */
const globalThemes = Object.keys(tokens['global-themes']);

const here = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.resolve(here, '../..', '.out');
const baselinePath = path.join(here, 'link-halo-baseline.json');

const concurrency = requirePositiveNumber(
  'LINK_HALO_CONCURRENCY',
  process.env.LINK_HALO_CONCURRENCY,
  4,
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

/**
 * Freezes every transition and animation at its end value.
 *
 * Zero duration rather than `none`: an element that animates in from
 * `opacity: 0` would stay invisible with no animation at all, whereas a
 * zero-length one lands on its final frame.
 */
const FREEZE_MOTION = `
  *, *::before, *::after {
    animation-delay: 0s !important;
    animation-duration: 0s !important;
    transition-delay: 0s !important;
    transition-duration: 0s !important;
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
 * Tags every link in the story, and every ancestor of one, for forcing.
 *
 * Runs in the page. Links are `a[href]` -- the only element the halo mixins
 * are applied to. Ancestors stop at the Storybook root, so `<body>` never
 * matches `:hover` and nothing outside the story is disturbed.
 *
 * @return {number}
 *   How many links were tagged.
 */
function tagLinks() {
  const root = document.querySelector('#storybook-root') ?? document.body;
  const links = [...root.querySelectorAll('a[href]')];

  links.forEach((link, index) => {
    link.setAttribute('data-link-halo', String(index));
    for (
      let node = link.parentElement;
      node && node !== root.parentElement;
      node = node.parentElement
    ) {
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
 * live layout.
 *
 * @return {{samples: Array<object>, hidden: number}}
 *   One sample per visible link, and how many links were not visible.
 */
function collectSamples() {
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
  const storyRoot = document.querySelector('#storybook-root');
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
  // ancestor's padding box, or the viewport for `fixed` -- which is all
  // computed styles can tell. Transforms on the pseudo itself are ignored.
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

    // A pseudo-element's computed geometry is the specified value (`100%`,
    // `auto`), not a used length, so percentages are resolved here against
    // the containing block. `auto` stays NaN and is solved from the opposite
    // inset where it can be.
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

  const inViewport = (x, y) =>
    x >= 0 && y >= 0 && x < window.innerWidth && y < window.innerHeight;

  const firstLineBox = (range) =>
    [...range.getClientRects()].find(
      (rect) => rect.width >= 2 && rect.height >= 2,
    );

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

    const range = document.createRange();
    range.selectNodeContents(node);
    let box = firstLineBox(range);
    if (!box) return null;

    let x = box.left + box.width / 2;
    let y = box.top + box.height / 2;
    if (!inViewport(x, y)) {
      window.scrollBy(
        x < 0 || x >= window.innerWidth ? x - window.innerWidth / 2 : 0,
        y - window.innerHeight / 2,
      );
      box = firstLineBox(range);
      if (!box) return null;
      x = box.left + box.width / 2;
      y = box.top + box.height / 2;
      if (!inViewport(x, y)) return null;
    }

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
    let sample = null;

    // A few text nodes at most: the first visible one decides, and a link
    // whose first several are all hidden is not worth hunting through.
    for (
      let node = walker.nextNode(), tries = 0;
      node && tries < 6 && !sample;
      node = walker.nextNode(), tries += 1
    ) {
      sample = sampleTextNode(link, node, text, where);
    }

    if (sample) {
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
      ['[data-link-halo]', forced.link],
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
      a { color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); }
      a:hover { color: rgb(1, 2, 3); }
      a:focus-visible { color: rgb(4, 5, 6); }
      div:hover > a { border-color: rgb(7, 8, 9); }
      div:focus-within > a { border-color: rgb(10, 11, 12); }
    </style>
    <div id="storybook-root"><a href="#probe">probe</a></div>
  `);
  await page.evaluate(tagLinks);

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
 * is ignored, then renders the new one with the new globals.
 *
 * @param {{id: string, globals: Object<string, string>, timeout: number}} request
 *   What to show.
 * @return {Promise<void>}
 *   Resolves once the story has rendered; rejects if it errors or times out.
 */
function showStory({ id, globals, timeout }) {
  // Storybook's own name for the preview's channel.
  // eslint-disable-next-line no-underscore-dangle
  const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
  if (!channel) {
    return Promise.reject(new Error('The Storybook channel is not available.'));
  }

  return new Promise((resolve, reject) => {
    const failures = ['storyErrored', 'storyMissing', 'storyThrewException'];
    // Declared first and assigned below: the listeners and `finish` refer to
    // each other.
    let timer;
    let onRendered;
    let onFailure;
    const finish = (error) => {
      clearTimeout(timer);
      channel.off('storyRendered', onRendered);
      failures.forEach((event) => channel.off(event, onFailure));
      if (error) reject(error);
      else resolve();
    };
    onRendered = (renderedId) => {
      if (renderedId === id) finish();
    };
    onFailure = (detail) => {
      finish(
        new Error(
          `Story failed to render: ${
            detail?.title ?? detail?.message ?? String(detail)
          }`,
        ),
      );
    };

    timer = setTimeout(
      () =>
        finish(new Error(`Timed out after ${timeout}ms switching to ${id}.`)),
      timeout,
    );
    channel.on('storyRendered', onRendered);
    failures.forEach((event) => channel.on(event, onFailure));
    channel.emit('updateGlobals', { globals });
    channel.emit('setCurrentStory', { storyId: id, viewMode: 'story' });
  });
}

/**
 * How long to let fonts and the last layout pass settle before sampling.
 *
 * Bounded, because only one of the workers' pages is the browser's front
 * tab: a background tab gets no animation frames at all, so an unbounded
 * `requestAnimationFrame` (or `document.fonts.ready` behind a stalled font
 * load) held a worker until the 4-minute protocol timeout. The reads that
 * follow -- computed styles and `elementsFromPoint` -- force a synchronous
 * layout anyway, so a frame is a nicety rather than a requirement.
 */
const SETTLE_MS = 250;

/**
 * Brings a story up on the page, in the given global theme.
 *
 * @param {import('puppeteer').Page} page
 *   The worker's page.
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {string} id
 *   Story id.
 * @param {string} theme
 *   Global theme key.
 * @param {boolean} inPlace
 *   Switch the already loaded preview rather than loading `iframe.html`.
 * @return {Promise<void>}
 */
async function renderVisit(page, origin, id, theme, inPlace) {
  if (inPlace) {
    await page.evaluate(showStory, {
      id,
      globals: { globalTheme: theme },
      timeout: storyTimeout,
    });
  } else {
    await page.goto(storyUrl(origin, id, { globalTheme: theme }), {
      waitUntil: 'load',
      timeout: storyTimeout,
    });
    // Inserted directly rather than through `page.addStyleTag`, which waits
    // for the style element's load event -- one more thing a background tab
    // can sit on.
    await page.evaluate((css) => {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.append(style);
    }, FREEZE_MOTION);
  }
  // Polled on a timer: the default polls on animation frames, which a
  // background tab never gets (see SETTLE_MS).
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
  await page.evaluate(
    (budget) =>
      Promise.race([
        Promise.all([
          document.fonts?.ready,
          new Promise((resolve) => {
            requestAnimationFrame(() => requestAnimationFrame(resolve));
          }),
        ]),
        new Promise((resolve) => {
          setTimeout(resolve, budget);
        }),
      ]),
    SETTLE_MS,
  );
}

/**
 * Renders one story and samples every link in it, in every state.
 *
 * The first visit on a page loads `iframe.html`; later visits switch in
 * place (`showStory`), falling back to a full load once if the switch fails.
 * Any error that survives that drops back to a full load for the next visit,
 * so one broken story cannot leave the next one rendering into a confused
 * preview.
 *
 * @param {import('puppeteer').Page} page
 *   A page sized to the check viewport.
 * @param {import('puppeteer').CDPSession} session
 *   Its devtools session.
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {object} visit
 *   From `selectVisits`.
 * @param {boolean} loaded
 *   Whether the page already has a working preview loaded.
 * @return {Promise<{result: object, loaded: boolean}>}
 *   The visit with `samples`, `links`, `hidden` and `ms`, or with `error`;
 *   and whether the page now has a working preview, for the next visit.
 */
async function checkVisit(page, session, origin, visit, loaded) {
  const { id, title, name, importPath, globalTheme } = visit;
  const result = { id, title, name, importPath, globalTheme };
  const theme = globalTheme ?? globalThemes[0];
  const started = Date.now();
  let fallback;

  try {
    try {
      await renderVisit(page, origin, id, theme, loaded);
    } catch (error) {
      // An in-place switch can still turn into a real navigation (a story
      // whose embed script reloads the frame does this), which destroys the
      // page's context under the switch. One full load of the same story
      // recovers that without spending a retry on it.
      if (!loaded) throw error;
      fallback = error.message;
      await renderVisit(page, origin, id, theme, false);
    }

    const links = await page.evaluate(tagLinks);
    const samples = [];
    let hidden = 0;

    if (links > 0) {
      // One state at a time: they are forced on the same nodes.
      for (let index = 0; index < STATES.length; index += 1) {
        const state = STATES[index];
        const release = await forceState(session, state);
        const collected = await page.evaluate(collectSamples);
        await release();
        hidden += collected.hidden;
        collected.samples.forEach((sample) => {
          samples.push({ ...sample, story: id, title, name, state });
        });
      }
    }

    return {
      result: {
        ...result,
        links,
        hidden,
        samples,
        ms: Date.now() - started,
        ...(fallback ? { fallback } : {}),
      },
      loaded: true,
    };
  } catch (error) {
    return {
      loaded: false,
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
 * Checks every visit, a few at a time, one page per worker.
 *
 * @param {import('puppeteer').Browser} browser
 *   The launched browser.
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {Array<object>} visits
 *   What to render.
 * @param {number} workers
 *   Pages to run in parallel.
 * @return {Promise<Array<object>>}
 *   One result per visit, in order.
 */
async function checkAll(browser, origin, visits, workers) {
  const results = new Array(visits.length);
  const progressEvery = Math.max(1, Math.ceil(visits.length / 10));
  let next = 0;
  let done = 0;

  const worker = async () => {
    // A browser context per worker, not just a page: pages of one origin in
    // one context can share a renderer process, and then "four at a time"
    // is four pages taking turns on one main thread.
    const context = await browser.createBrowserContext();
    const page = await context.newPage();

    try {
      await page.setViewport({
        width: VIEWPORT_WIDTH,
        height: 800,
        deviceScaleFactor: 1,
      });
      const session = await page.createCDPSession();
      await session.send('Network.enable');
      await session.send('Network.setBlockedURLs', {
        urls: [...BLOCKED_MEDIA, ...BLOCKED_REMOTE],
      });
      await session.send('DOM.enable');
      await session.send('CSS.enable');
      await proveForcedStates(page, session);
      let loaded = false;

      while (next < visits.length) {
        const index = next;
        next += 1;
        const checked = await checkVisit(
          page,
          session,
          origin,
          visits[index],
          loaded,
        );
        results[index] = checked.result;
        loaded = checked.loaded;
        done += 1;
        if (done % progressEvery === 0 || done === visits.length) {
          console.log(`  rendered ${done}/${visits.length}`);
        }
      }
    } finally {
      await context.close();
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(workers, visits.length) }, worker),
  );

  return results;
}

/**
 * Re-renders anything that failed, one at a time.
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
 * @return {Promise<Array<object>>}
 *   The same results, with retried entries replaced.
 */
async function retryFailures(browser, origin, results) {
  const failed = results.filter((entry) => entry.error);
  if (failed.length === 0) return results;

  console.log(`\nRetrying ${plural(failed.length, 'render')} one at a time.`);
  const key = ({ id, globalTheme }) => `${id}|${globalTheme}`;
  const retried = new Map(
    (await checkAll(browser, origin, failed, 1)).map((entry) => [
      key(entry),
      entry,
    ]),
  );

  return results.map((entry) =>
    entry.error ? retried.get(key(entry)) : entry,
  );
}

/**
 * Renders a set of visits in parallel, then retries what failed.
 *
 * @param {import('puppeteer').Browser} browser
 *   The launched browser.
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {Array<object>} visits
 *   What to render.
 * @return {Promise<Array<object>>}
 *   One result per visit, in order.
 */
async function renderAll(browser, origin, visits) {
  return retryFailures(
    browser,
    origin,
    await checkAll(browser, origin, visits, concurrency),
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
  let visits;
  // Every story in the index, so an unfiltered run can retire baseline
  // entries for stories that no longer exist. A filtered run cannot tell a
  // deleted story from one it was told to leave out, so it gets null.
  let indexedStories = null;

  try {
    const index = JSON.parse(await readFile(indexPath, 'utf8'));
    visits = selectVisits(index, globalThemes, storyFilter);
    if (!storyFilter) {
      indexedStories = new Set(storyEntries(index).map((entry) => entry.id));
    }
  } catch (error) {
    console.error(`Could not select stories from ${indexPath}.`);
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  const visitedStories = new Set(visits.map((visit) => visit.id));
  const baseline = await readBaseline();
  const started = Date.now();

  const { first, deferred } = splitVisits(visits, globalThemes);

  console.log(
    `Checking links in up to ${plural(visits.length, 'render')} of ` +
      `${plural(visitedStories.size, 'story', 'stories')} at ` +
      `${VIEWPORT_WIDTH}px wide, ${concurrency} at a time.`,
  );

  // Both closed on every path, for the reason given in the pixel check: a
  // leaked server keeps the event loop alive and hangs CI.
  const server = await serveDirectory(buildDir);
  let results;

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
      protocolTimeout: storyTimeout * 4,
    });

    try {
      // Two passes: every visreg story and every other story in the first
      // global theme, then the other global themes of the stories that
      // turned out to have links (see `splitVisits`).
      console.log(`First pass: ${plural(first.length, 'render')}.`);
      const firstResults = await renderAll(browser, server.origin, first);
      const rest = deferredToRender(deferred, firstResults);
      console.log(
        `Second pass: ${plural(rest.length, 'render')} in the other global ` +
          `themes; ${plural(deferred.length - rest.length, 'render')} of ` +
          'stories with no links skipped.',
      );
      results = [
        ...firstResults,
        ...(await renderAll(browser, server.origin, rest)),
      ];
    } finally {
      await browser.close();
    }
  } finally {
    await server.close();
  }

  const errors = results.filter((entry) => entry.error);
  const evaluation = evaluateSamples(results.flatMap((entry) => entry.samples));
  const diff = diffBaseline(
    evaluation.failures,
    baseline,
    visitedStories,
    indexedStories,
  );
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
          errors,
          // Per render: links found, links hidden, and how long it took --
          // what to look at when the run gets slow.
          renders: results.map(({ samples, ...render }) => render),
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

  if (updateBaseline) {
    if (errors.length > 0) {
      console.error(
        `\n${plural(
          errors.length,
          'render',
        )} failed, so the baseline was not ` +
          'updated -- it would drop entries for stories that were never checked.',
      );
      console.log(report);
      process.exitCode = 1;
      return;
    }
    const entries = updatedBaseline(
      evaluation.failures,
      baseline,
      visitedStories,
      indexedStories,
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

  if (diff.newFailures.length > 0 || errors.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
