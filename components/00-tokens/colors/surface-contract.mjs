/**
 * The surface-contract guardrail (YaleSites-Internal#1631, Phase 2).
 *
 * ## The invariant
 *
 * **If a component paints a background, it must publish the contract.**
 *
 * A component that paints a background and says nothing else leaves everything
 * inside it reading the *enclosing* surface's foreground against the background
 * *it* just painted. Neither palette is wrong on its own; the pairing that
 * reaches the screen is one nobody chose. That is the root cause the Color
 * Surface epic exists to close. `contrast-gate.mjs`'s `leakSurvey()` puts a
 * ceiling on it -- 105 of 210 (global theme x section theme x block theme)
 * combinations land below AA. Note that figure is pure token arithmetic: it is
 * the theoretical worst case, and converting components does not move it.
 *
 * The fix is per-component and mechanical: alongside the background, declare
 * `--color-section-background` (what was painted) and `--color-section-
 * foreground` (the approved foreground for it), so descendants derive their
 * colour from the nearest surface rather than from one two containers away.
 * `02-molecules/callout/_yds-callout.scss` is the reference implementation.
 *
 * ## Why this is a test rather than a stylelint rule
 *
 * The check is a co-occurrence *across a rule block* -- see a background being
 * painted, then look for sibling custom-property declarations. stylelint 14's
 * property rules do not apply to custom properties at all (see the note at
 * `stylelint.config.js:26-40`), and this repo has no custom-plugin
 * infrastructure to build one on. Structural invariants over SCSS source are
 * asserted with `node --test` here -- `color-system-defects.test.mjs` and
 * `section-dial-split.test.mjs` are the precedents.
 *
 * ## Why there is a baseline
 *
 * Same reason `contrast-gate-baseline.json` has one, and the same rules apply.
 * Phase 2 converts components in measured-risk order, so a guardrail that
 * demanded every surface at once would be unmergeable. `surface-contract-
 * baseline.json` lists the surfaces still to convert, each with the reason it
 * is still there. The list is a ratchet: `surface-contract.test.mjs` fails if a
 * surface not on it is unconverted (a NEW leak), and equally if a listed
 * surface has since been converted (delete the entry) or no longer exists.
 * Adding an entry to turn a red build green is not a fix.
 *
 * Print the current state with:
 *
 *   node components/00-tokens/colors/surface-contract.mjs
 */

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import {
  EXEMPT_PATHS,
  readAllScss,
  stripComments,
} from './foreground-purity.mjs';

const require = createRequire(import.meta.url);

/** Surfaces not yet converted, keyed by repo-relative path. */
export const { pending: PENDING } = require('./surface-contract-baseline.json');

/**
 * Paths the invariant does not apply to.
 *
 * `EXEMPT_PATHS` is READ from `foreground-purity.mjs` rather than restated --
 * which in turn reads the documentation-chrome half out of `stylelint.config.js`
 * -- because three lists of untheme-exempt paths drifting apart is exactly the
 * kind of thing nothing else would catch. Only the entry that is genuinely new
 * to this gate is added here.
 */
const EXEMPT = [
  ...EXEMPT_PATHS,
  // The dials themselves, and the gates that police them: both quote the very
  // declarations they are about.
  'components/00-tokens/colors/',
];

export { stripComments };

/** Every component stylesheet, as `[repoRelativePath, sourceWithoutComments]`. */
export function readComponentScss() {
  return readAllScss()
    .filter(([path]) => !EXEMPT.some((exempt) => path.startsWith(exempt)))
    .map(([path, source]) => [path, stripComments(source)]);
}

/** Values that set no colour, so declaring one is not painting a surface. */
const NOT_A_COLOUR = /^(transparent|none|inherit|initial|unset|revert)$/;

/** Every `background` / `background-color` declaration, with its line index. */
function backgroundPaints(source) {
  return source.split('\n').flatMap((line, index) => {
    const paint = line.match(/(?:^|[;{}\s])background(?:-color)?:\s*([^;]+);/);
    if (!paint) return [];

    const value = paint[1].trim();
    if (NOT_A_COLOUR.test(value) || value.startsWith('url(')) return [];

    return [{ line: index, value }];
  });
}

/**
 * The line ranges covered by a `[data-component-theme...]` rule block.
 *
 * The one place this module models SCSS nesting, so the fragile part -- brace
 * counting over text -- exists once. Known limits, neither of them live in this
 * tree because prettier reformats to one declaration per line:
 *
 * - A rule whose brace, body and close all share a line is invisible, since the
 *   boundary lines are excluded.
 * - A brace inside a quoted string would be counted.
 * - A themed selector wrapped across lines does not open a scope, because the
 *   selector and its `{` must be on the same line.
 * - A `background:` value wrapped across lines is not seen, because the
 *   declaration and its `;` must be on the same line.
 * -
 * Verified against the whole tree: none of these is live today -- the files
 * that do wrap a themed selector paint nothing.
 *
 * Compiling the SCSS and walking real rules would remove both, and the repo
 * has `sass` available (`breadcrumbs-scroll-controls.test.mjs` compiles). That
 * is the better long-term shape; it is not done here because the assertions
 * this feeds are about the cascade AS WRITTEN, which is the stated house
 * position in `section-dial-split.test.mjs:21-25`.
 */
export function themedScopes(source) {
  const selector = /\[data-component-theme[^\]]*\]/;
  const scopes = [];
  let depth = null;
  let current = 0;

  source.split('\n').forEach((line, index) => {
    const opened = (line.match(/\{/g) ?? []).length;
    const closed = (line.match(/\}/g) ?? []).length;

    if (depth === null && selector.test(line) && opened > 0) {
      depth = current;
      scopes.push({ from: index, to: Infinity });
    }

    current += opened - closed;

    if (depth !== null && current <= depth) {
      scopes[scopes.length - 1].to = index;
      depth = null;
    }
  });

  return scopes;
}

/**
 * The custom properties a file assigns inside a block-dial scope.
 *
 * A component rarely paints `var(--color-background)` directly. The common
 * shape is to name a private variable in the dial block
 * (`--color-callouts-background: var(--component-themes-...-background)`) and
 * paint with it at the component root, outside any `[data-component-theme]`
 * block. That shape is only visible by collecting the dial's property names
 * first.
 */
export function themedProperties(source) {
  const scopes = themedScopes(source);

  return new Set(
    source
      .split('\n')
      .filter((_, line) =>
        scopes.some((scope) => line > scope.from && line < scope.to),
      )
      .flatMap((line) => line.match(/(--[\w-]+)\s*:/)?.[1] ?? []),
  );
}

/**
 * Does this file paint a themed background?
 *
 * Two shapes count, and both are genuinely painting a surface inside a themed
 * block:
 *
 * 1. **Painted in the dial block.** `background-color` declared lexically
 *    inside a `[data-component-theme]` scope. The AC's wording -- anything that
 *    sets a background at a themed scope without publishing the contract leaves
 *    its descendants reading a stale ancestor. The literal value does not
 *    matter: a flat `--color-gray-100` painted at a themed scope leaks exactly
 *    as badly as a slot colour, and worse, because it does not move with the
 *    theme at all.
 * 2. **Named in the dial block, painted at the root.** The more common shape --
 *    the dial names a private variable
 *    (`--color-callouts-background: var(--component-themes-...-background)`)
 *    and the component root paints with it, outside any themed block. Only
 *    visible by collecting the dial's property names first.
 *
 * Known gap: a component that paints a fixed background at NO themed scope --
 * the meta chip lists (`.event-meta__event-types__type` and friends, #1662) --
 * is not detectable this way without flagging every piece of flat chrome in the
 * library. Those are converted by hand and held by the consumer table in
 * `section-background-contrast.test.mjs` instead.
 */
export function paintsThemedBackground(source) {
  const paints = backgroundPaints(source);
  if (paints.length === 0) return false;

  const scopes = themedScopes(source);
  const paintedInDialBlock = paints.some(({ line }) =>
    scopes.some((scope) => line > scope.from && line < scope.to),
  );
  if (paintedInDialBlock) return true;

  const themed = themedProperties(source);

  return paints.some(({ value }) =>
    [...value.matchAll(/var\(\s*(--[\w-]+)/g)].some((read) =>
      themed.has(read[1]),
    ),
  );
}

/**
 * Does this file publish the surface contract?
 *
 * Two spellings count. `tokens.publish-surface(...)` is the one to write --
 * `_surface-contract.scss` explains why -- but the raw declarations are
 * accepted too, because a component that needs to publish only part of the
 * contract, or to publish it conditionally, should not have to fight the
 * guardrail to do so.
 */
export function publishesContract(source) {
  if (/@include\s+[\w-]*\.?publish-surface\s*\(/.test(source)) return true;

  return (
    /--color-section-background:/.test(source) &&
    /--color-section-foreground:/.test(source)
  );
}

/**
 * Themed scopes that paint but do not publish inside themselves.
 *
 * `publishesContract` asks a FILE-level question, and the invariant is really
 * block-level: a component whose theme-one block publishes and whose theme-two
 * block paints and does not would satisfy the file-level check while leaking
 * from theme two. That is not hypothetical -- theme `six` is not a
 * `component-themes` key, so every converted component in this library needs a
 * second, hand-written publish for it, and forgetting one is the single most
 * likely way to get this wrong.
 *
 * Only scopes that paint IN THE SCOPE are checked. The other painting shape --
 * the dial names a private variable and the component root paints with it --
 * has its paint outside any themed scope by construction, so it stays a
 * file-level question and is handled by `publishesContract`.
 */
export function unpublishedPaintingScopes(source) {
  const lines = source.split('\n');
  const paints = backgroundPaints(source);

  return themedScopes(source).filter((scope) => {
    const inScope = ({ line }) => line > scope.from && line < scope.to;
    if (!paints.some(inScope)) return false;

    return !publishesContract(lines.slice(scope.from, scope.to + 1).join('\n'));
  });
}

/**
 * Classify every component stylesheet against the invariant and the baseline.
 *
 * `newLeaks` is the gate. The other two keep the baseline honest, exactly as
 * `contrast-gate.mjs` does: a converted surface still listed as pending would
 * silently stop being enforced, and a listed path that no longer paints
 * suppresses nothing while looking like it suppresses something.
 */
export function surveySurfaces(files = readComponentScss()) {
  // One pass, then three filters over the tagged list, so the four fields read
  // as the partition they are rather than three independent predicates.
  const painting = files
    .filter(([, source]) => paintsThemedBackground(source))
    .map(([path, source]) => ({
      path,
      publishes:
        publishesContract(source) &&
        unpublishedPaintingScopes(source).length === 0,
      pending: path in PENDING,
    }));

  const paths = new Set(painting.map(({ path }) => path));
  const select = (predicate) =>
    painting.filter(predicate).map(({ path }) => path);

  return {
    converted: select(({ publishes }) => publishes),
    newLeaks: select(({ publishes, pending }) => !publishes && !pending),
    fixedPending: select(({ publishes, pending }) => publishes && pending),
    stalePending: Object.keys(PENDING).filter((path) => !paths.has(path)),
  };
}

/** The human-readable report. Also what the CLI prints. */
export function formatSurfaceReport(result = surveySurfaces()) {
  const section = (title, paths) =>
    paths.length === 0 ? [] : ['', title, ...paths.map((path) => `  ${path}`)];

  return [
    'Surface contract (YaleSites-Internal#1631)',
    '',
    `converted: ${result.converted.length}   pending: ${
      Object.keys(PENDING).length
    }`,
    ...section(
      'CONVERTED -- publishes --color-section-background/-foreground',
      result.converted,
    ),
    ...section(
      'NEW LEAK -- paints a themed background without publishing the contract',
      result.newLeaks,
    ),
    ...section(
      'CONVERTED BUT STILL BASELINED -- delete these from surface-contract-baseline.json',
      result.fixedPending,
    ),
    ...section(
      'STALE BASELINE -- no longer paints a themed background, delete the entry',
      result.stalePending,
    ),
    '',
  ].join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = surveySurfaces();
  process.stdout.write(`${formatSurfaceReport(result)}\n`);
  if (result.newLeaks.length > 0) process.exitCode = 1;
}
