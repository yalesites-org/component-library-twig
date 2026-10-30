/**
 * Which components the link halo check covers, and the guard that keeps that
 * list honest (YaleSites-Internal#1939).
 *
 * The halo check only targets links that draw the descender halo: links
 * styled by the mixins in `01-atoms/controls/text-link/_yds-text-link.scss`
 * (`link`, `descender-halo-defaults`, `clickable-component-heading-link`),
 * any mixin that wraps one of those, or a `text-shadow` built from
 * `--color-text-shadow` -- and links inside a component that sets
 * `--color-text-shadow` itself, because that component is choosing the halo
 * colour for whatever links it holds (the site footer and header, the
 * accordion), even when the links are styled by another component's SCSS.
 * `HALO_COMPONENTS` lists the components whose SCSS does either; `check-link-halo.mjs` visits only their stories (visreg and
 * regular alike), so token documentation pages, page examples and components
 * whose links never draw a halo are not rendered at all.
 *
 * The list is declared rather than derived at run time so that it reads as a
 * decision in one place, and `link-halo-scope.test.mjs` runs `auditScope` over
 * the real SCSS on every `npm run test:unit`: a component that starts using
 * the halo without being listed (or without a story the check would visit)
 * fails the unit tests, and so does a listed component that stopped using it.
 *
 * Everything here is pure, so the test can feed it fixtures.
 *
 * @see link-halo-scope.test.mjs
 * @see check-link-halo.mjs
 */
import { posix } from 'node:path';

import { stripComments } from '../00-tokens/colors/strip-comments.mjs';

/**
 * The components the check covers, as `<tier>/<component>` under
 * `components/`. Every story under one of these directories is visited.
 *
 * A component is its directory directly under the tier, which is where its
 * stories live even when its SCSS is in a subdirectory (the text link's SCSS
 * is in `01-atoms/controls/text-link/`, its stories in `01-atoms/controls/`).
 */
export const HALO_COMPONENTS = [
  '01-atoms/controls',
  '01-atoms/images',
  '02-molecules/accordion',
  '02-molecules/alert',
  '02-molecules/banner',
  '02-molecules/callout',
  '02-molecules/cards',
  '02-molecules/content-spotlight-portrait',
  '02-molecules/inline-message',
  '02-molecules/link-grid',
  '02-molecules/link-skip',
  '02-molecules/meta',
  '02-molecules/quick-links',
  '02-molecules/quote-callout',
  '02-molecules/search-result',
  '02-molecules/taxonomy-display',
  '02-molecules/text',
  '02-molecules/text-with-image',
  '02-molecules/wrapped-callout',
  '02-molecules/wrapped-image',
  '03-organisms/calendar',
  '03-organisms/facts-and-figures-group',
  '03-organisms/galleries',
  '03-organisms/layout',
  '03-organisms/menu',
  '03-organisms/site-footer',
  '03-organisms/site-header',
  '03-organisms/site-in-this-section',
];

/**
 * Tiers that are documentation or whole-page compositions rather than
 * components. Never in scope: their links are the components' links, which
 * are checked where those components are.
 */
export const EXCLUDED_TIERS = [
  '00-introduction',
  '00-tokens',
  '05-page-examples',
];

/** The mixins that draw the halo, defined in `_yds-text-link.scss`. */
export const HALO_MIXINS = [
  'link',
  'descender-halo-defaults',
  'clickable-component-heading-link',
];

/**
 * A declaration of `--color-text-shadow` itself: the component picks the halo
 * colour for the links it contains.
 */
const HALO_COLOR_SETTER = /--color-text-shadow\s*:/;

/** How `haloUsers` names a `--color-text-shadow` declaration. */
const SETTER_FOUND = '--color-text-shadow: ...';

/** How `haloUsers` names a `text-shadow` that carries the halo colour. */
const SHADOW_FOUND = 'text-shadow: ... var(--color-text-shadow)';

/** Escapes a string for use inside a regular expression. */
const escape = (text) => text.replace(/[$-]/g, '\\$&');

/**
 * `@include` of one of `names`, bare or module-namespaced
 * (`@include link(...)`, `@include text-link.link(...)`).
 *
 * @param {Set<string>} names
 *   Mixin names, prefixed aliases included (`haloMixins`).
 * @return {RegExp}
 *   A global regex; group 1 is the mixin name.
 */
const includeOf = (names) =>
  new RegExp(
    `@include\\s+(?:[\\w-]+\\.)?(${[...names]
      .map(escape)
      .join('|')})(?![\\w.-])`,
    'g',
  );

/**
 * Every `@mixin` definition in a source, with its body.
 *
 * @param {string} source
 *   SCSS source.
 * @return {Array<{name: string, body: string}>}
 *   The mixins, bodies matched by braces.
 */
export function mixinDefinitions(source) {
  const mixins = [];
  const start = /@mixin\s+([\w-]+)[^{]*\{/g;
  let match = start.exec(source);
  while (match) {
    let depth = 1;
    let index = start.lastIndex;
    while (index < source.length && depth > 0) {
      if (source[index] === '{') depth += 1;
      if (source[index] === '}') depth -= 1;
      index += 1;
    }
    mixins.push({ name: match[1], body: source.slice(start.lastIndex, index) });
    match = start.exec(source);
  }
  return mixins;
}

/**
 * Every `@forward` in a source: the module and the prefix it is forwarded
 * with (`@forward './x/y' as button-*` gives `button-`; none gives '').
 *
 * @param {string} source
 *   SCSS source, comments stripped.
 * @return {Array<{spec: string, prefix: string}>}
 *   The forwards.
 */
const forwardsOf = (source) =>
  [
    ...source.matchAll(/@forward\s+['"]([^'"]+)['"](?:\s+as\s+([\w-]*)\*)?/g),
  ].map((match) => ({ spec: match[1], prefix: match[2] ?? '' }));

/**
 * The file a `@forward` or `@use` spec points at, the way Sass finds it: the
 * file itself, its partial, or the directory's index.
 *
 * @param {string} from
 *   The path of the file holding the rule.
 * @param {string} spec
 *   The module path in the rule.
 * @param {Set<string>} paths
 *   Every scanned path.
 * @return {?string}
 *   The path, or null if it is not among the scanned files.
 */
const resolveModule = (from, spec, paths) => {
  const base = posix.normalize(posix.join(posix.dirname(from), spec));
  const dir = posix.dirname(base);
  const name = posix.basename(base);
  return (
    [
      `${base}.scss`,
      `${dir}/_${name}.scss`,
      `${base}/_index.scss`,
      `${base}/index.scss`,
      base,
    ].find((candidate) => paths.has(candidate)) ?? null
  );
};

/**
 * What carries the halo colour without naming it where it is used: SCSS
 * variables and custom properties whose value is built from
 * `--color-text-shadow`, directly or through another carrier
 * (`$halo: 0.03em 0 var(--color-text-shadow)`, then `text-shadow: $halo`).
 *
 * Resolved over every file by name, transitively, so a carrier defined in one
 * module and used through `@use` (`tokens.$halo`) in another is found. Matching
 * by name rather than by module can only add halo users, never miss one.
 *
 * @param {string[]} sources
 *   Every source, comments stripped.
 * @return {function(string): boolean}
 *   Whether a value carries the halo colour.
 */
const haloCarrier = (sources) => {
  const variables = new Set();
  const properties = new Set();
  const declarations = sources.flatMap((source) =>
    [...source.matchAll(/(\$[\w-]+|--[\w-]+)\s*:\s*([^;{}]*)/g)].map(
      (match) => ({ name: match[1], value: match[2] }),
    ),
  );
  // One regex for every carrier known so far, rebuilt only when the sets
  // grow: `--color-text-shadow` itself, a variable named bare or through a
  // module (`tokens.$halo`), or a custom property read with `var()`.
  let pattern = null;
  let patternSize = -1;
  const carrierPattern = () => {
    if (variables.size + properties.size !== patternSize) {
      const alternation = (names) => [...names].map(escape).join('|');
      pattern = new RegExp(
        [
          '--color-text-shadow(?![\\w-])',
          ...(variables.size > 0
            ? [
                `(?:^|[^\\w-])(?:[\\w-]+\\.)?(?:${alternation(
                  variables,
                )})(?![\\w-])`,
              ]
            : []),
          ...(properties.size > 0
            ? [`var\\(\\s*(?:${alternation(properties)})\\s*[,)]`]
            : []),
        ].join('|'),
      );
      patternSize = variables.size + properties.size;
    }
    return pattern;
  };
  const carries = (value) => carrierPattern().test(value);

  // Until nothing new carries it: each pass can only add, so this ends.
  const grow = () =>
    declarations.filter(({ name, value }) => {
      const set = name.startsWith('$') ? variables : properties;
      if (name === '--color-text-shadow' || set.has(name) || !carries(value)) {
        return false;
      }
      set.add(name);
      return true;
    }).length > 0;
  while (grow());
  return carries;
};

/**
 * Whether a source sets a `text-shadow` that carries the halo colour.
 *
 * @param {string} source
 *   SCSS or CSS, comments stripped.
 * @param {function(string): boolean} carries
 *   From `haloCarrier`.
 * @return {boolean}
 *   True if any `text-shadow` value carries it.
 */
const drawsHaloShadow = (source, carries) =>
  [...source.matchAll(/text-shadow\s*:\s*([^;{}]*)/g)].some((match) =>
    carries(match[1]),
  );

/**
 * The halo mixins and the halo carrier of a set of files, worked out once
 * from the comment-stripped sources, which are returned too so `haloUsers`
 * does not strip them again.
 *
 * @param {Array<{path: string, source: string}>} files
 *   Every scanned file.
 * @return {{names: Set<string>, carries: function(string): boolean, sources: Array<{path: string, source: string}>}}
 *   `names` as `haloMixins` returns them, `carries` from `haloCarrier`.
 */
function analyse(files) {
  const sources = files.map((file) => ({
    path: file.path,
    source: stripComments(file.source),
  }));
  const paths = new Set(sources.map((file) => file.path));
  const byPath = new Map(sources.map((file) => [file.path, file.source]));
  const carries = haloCarrier(sources.map((file) => file.source));
  const definitions = sources.flatMap((file) => mixinDefinitions(file.source));

  // The mixin names a module exposes: its own, and everything it forwards,
  // prefixed as forwarded.
  const exported = (path, seen = new Set()) => {
    if (seen.has(path)) return [];
    seen.add(path);
    const source = byPath.get(path) ?? '';
    return [
      ...mixinDefinitions(source).map(({ name }) => name),
      ...forwardsOf(source).flatMap(({ spec, prefix }) => {
        const target = resolveModule(path, spec, paths);
        return target
          ? exported(target, seen).map((name) => `${prefix}${name}`)
          : [];
      }),
    ];
  };
  const prefixed = sources.flatMap(({ path, source }) =>
    forwardsOf(source)
      .filter(({ prefix }) => prefix)
      .flatMap(({ spec, prefix }) => {
        const target = resolveModule(path, spec, paths);
        return target
          ? exported(target).map((name) => ({
              name,
              alias: `${prefix}${name}`,
            }))
          : [];
      }),
  );

  const names = new Set(HALO_MIXINS);
  // Until nothing new is a halo mixin: each pass can only add, so this ends.
  const grow = () => {
    const include = new RegExp(includeOf(names).source);
    const added = [
      ...definitions
        .filter(
          ({ name, body }) =>
            !names.has(name) &&
            (include.test(body) || drawsHaloShadow(body, carries)),
        )
        .map(({ name }) => name),
      ...prefixed
        .filter(({ name, alias }) => names.has(name) && !names.has(alias))
        .map(({ alias }) => alias),
    ];
    added.forEach((name) => names.add(name));
    return added.length > 0;
  };
  while (grow());
  return { names, carries, sources };
}

/**
 * The names of every mixin that draws the halo: the three in `HALO_MIXINS`,
 * plus any mixin, in any file, that includes one of them or sets a
 * `text-shadow` carrying `--color-text-shadow` -- resolved transitively, so a
 * wrapper around a wrapper is still a halo mixin. A module forwarded with a
 * prefix (`@forward './button' as button-*`) exposes its halo mixins under
 * the prefixed name too, so `@include atoms.button-my-link` is caught.
 *
 * @param {Array<{path: string, source: string}>} files
 *   Every scanned file.
 * @return {Set<string>}
 *   Mixin names, prefixed aliases included.
 */
export const haloMixins = (files) => analyse(files).names;

/**
 * The files that apply the halo, and what in each does it.
 *
 * @param {Array<{path: string, source: string}>} files
 *   Every scanned file.
 * @return {Array<{path: string, found: string[]}>}
 *   One entry per halo-using file, `found` naming the mixins included, a
 *   `text-shadow` carrying the halo colour, or a `--color-text-shadow`
 *   declaration.
 */
export function haloUsers(files) {
  const { names, carries, sources } = analyse(files);
  const include = includeOf(names);
  return sources
    .map(({ path, source }) => {
      const found = new Set(
        [...source.matchAll(include)].map((match) => `@include ${match[1]}`),
      );
      if (drawsHaloShadow(source, carries)) found.add(SHADOW_FOUND);
      if (HALO_COLOR_SETTER.test(source)) found.add(SETTER_FOUND);
      return { path, found: [...found].sort() };
    })
    .filter(({ found }) => found.length > 0);
}

/**
 * A path with any leading `./` and `components/` removed.
 *
 * @param {string} path
 *   A scanned path or a story's `importPath`.
 * @return {string}
 *   E.g. `01-atoms/controls/x.scss`, or `lib/x.scss` outside `components/`.
 */
const inComponents = (path) =>
  path.replace(/^\.\//, '').replace(/^components\//, '');

/** Whether a path is inside a component tier (`components/<NN-tier>/`). */
const isComponentPath = (path) => /^\d\d-[^/]+\//.test(inComponents(path));

/** A path as the guard prints it: from the repo root. */
const shown = (path) =>
  isComponentPath(path) ? `components/${inComponents(path)}` : path;

/**
 * The component a file belongs to: `<tier>/<component>`.
 *
 * @param {string} path
 *   A path relative to `components/`, `/`-separated (a leading `./` or
 *   `./components/` is ignored, so a story's `importPath` works too).
 * @return {string}
 *   E.g. `01-atoms/controls`.
 */
export const componentOf = (path) =>
  inComponents(path).split('/').slice(0, 2).join('/');

/**
 * In-scope components that only ever sit outside a layout section on a real
 * site -- page chrome. A section theme is set by a `yds-layout` section in
 * the main content; these render around it, so the check copies their stories
 * into every global theme (set on the page's `.layout-container`, see
 * `04-page-layouts/_yds-base.twig`) but never into a section, because no site
 * can put them in one:
 *
 * - `alert`: the site-wide alert, rendered at the top of the page above the
 *   header (`page__header`), before any section.
 * - `link-skip`: the "Skip to main content" link, the first thing in
 *   `html.html.twig`, outside the layout container's content entirely.
 * - `site-header`, `site-footer`: the `page__header` and `page__footer`
 *   blocks of `_yds-base.twig`, siblings of `<main>`, which holds the
 *   sections. They have their own theme dials instead.
 */
export const SECTIONLESS_COMPONENTS = [
  '02-molecules/alert',
  '02-molecules/link-skip',
  '03-organisms/site-footer',
  '03-organisms/site-header',
];

/**
 * Whether a story's component never sits in a section.
 *
 * @param {{importPath: string}} entry
 *   A Storybook index entry.
 * @return {boolean}
 *   True for page chrome (`SECTIONLESS_COMPONENTS`).
 */
export const storySectionless = ({ importPath }) =>
  SECTIONLESS_COMPONENTS.includes(componentOf(importPath));

/**
 * The narrower width some components are checked at as well as the default
 * (`VIEWPORT_WIDTH`, 1200px): `$break-m`, inside the stacked layout every
 * component switches to below `$break-l` (992px).
 */
export const NARROW_VIEWPORT_WIDTH = 768;

/**
 * In-scope components whose stories are also rendered at
 * `NARROW_VIEWPORT_WIDTH`, with the reason. Only these, rather than every
 * story, so the second width costs one component's renders and not the
 * whole run's.
 */
export const NARROW_VIEWPORT_COMPONENTS = {
  '02-molecules/banner':
    'at 1200px the action banner text sits over its image in every layout, so `.cta-banner__link` is skipped as over an image; below 992px the text stacks under the image and is judged',
};

/**
 * The narrow widths the check renders a story at, besides the default.
 *
 * @param {{importPath: string}} entry
 *   A Storybook index entry, or a planned page.
 * @return {number[]}
 *   `[NARROW_VIEWPORT_WIDTH]` for a component in
 *   `NARROW_VIEWPORT_COMPONENTS`, else none.
 */
export const storyViewports = ({ importPath }) =>
  componentOf(importPath) in NARROW_VIEWPORT_COMPONENTS
    ? [NARROW_VIEWPORT_WIDTH]
    : [];

/**
 * In-scope components whose stories have no halo link the check can judge,
 * at any width it renders them, with the reason. `npm run test:link-halo`
 * fails when any other component it renders has none judged, and when one
 * listed here does have some at any width (`coverageProblems` counts every
 * viewport together), so this list cannot quietly go stale.
 *
 * A component is listed for one of two reasons:
 *
 * - It only sets the halo colour for links inside it, and none of the links
 *   it renders draws a halo (the skip link, the site header).
 * - It styles a halo link that its template cannot render (quick links, the
 *   secondary nav, In This Section). The template would have to change
 *   before a story could show one.
 */
export const NO_HALO_LINKS = {
  '02-molecules/link-skip':
    'sets the halo colour; the skip link itself draws no halo',
  '02-molecules/quick-links':
    'styles `.quick-links__link`, but the template renders every link as a `.quick-links__cta` button and has no text link option',
  '03-organisms/menu':
    'secondary nav styles `a:not([data-link-style])` with the halo, but the template renders only menu items, which are text-link atoms carrying `data-link-style`, and has no rich-text slot',
  '03-organisms/site-header':
    'sets the halo colour; every header link is a nav or branding link with no halo',
  '03-organisms/site-in-this-section':
    'styles `a:not([data-link-style])` with the halo, but the template renders only the secondary nav, whose menu items carry `data-link-style`, and has no rich-text slot',
};

/**
 * Whether the check visits a story, judged from its index entry.
 *
 * @param {{importPath: string}} entry
 *   A Storybook index entry.
 * @param {string[]} [components]
 *   The in-scope components.
 * @return {boolean}
 *   True if the story belongs to an in-scope component.
 */
export const storyInScope = ({ importPath }, components = HALO_COMPONENTS) =>
  components.includes(componentOf(importPath));

/**
 * Compares the halo users in the SCSS with the declared scope.
 *
 * @param {object} input
 * @param {Array<{path: string, source: string}>} input.scss
 *   Every SCSS and CSS file the build ships: `components/...` (or relative
 *   to `components/`) and `lib/...`.
 * @param {string[]} input.stories
 *   Every `*.stories.js` path, relative to `components/`.
 * @param {string[]} [input.components]
 *   The in-scope components.
 * @return {{missing: Array<object>, noStories: string[], stale: string[], excluded: Array<object>, outside: Array<object>}}
 *   `missing`: halo users whose component is not listed. `noStories`: listed
 *   components the check would visit no story of. `stale`: listed components
 *   with no halo user any more. `excluded`: halo users in an excluded tier,
 *   which are reported rather than silently dropped. `outside`: halo users
 *   outside any component (`lib/`), which no story covers. All empty is a
 *   pass.
 */
export function auditScope({ scss, stories, components = HALO_COMPONENTS }) {
  const users = haloUsers(scss);
  const tierOf = (path) => inComponents(path).split('/')[0];
  const inside = users.filter(({ path }) => isComponentPath(path));
  const usingComponents = new Set(inside.map(({ path }) => componentOf(path)));
  const withStories = new Set(stories.map(componentOf));
  // The token tier defines every theme's `--color-text-shadow` on the
  // `data-*-theme` selectors that components then carry, so setting it there
  // is expected; drawing the halo there is not.
  const excluded = inside.filter(
    ({ path, found }) =>
      EXCLUDED_TIERS.includes(tierOf(path)) &&
      found.some((what) => what !== SETTER_FOUND),
  );

  return {
    missing: inside.filter(
      ({ path }) =>
        !EXCLUDED_TIERS.includes(tierOf(path)) &&
        !components.includes(componentOf(path)),
    ),
    noStories: components.filter((component) => !withStories.has(component)),
    stale: components.filter((component) => !usingComponents.has(component)),
    excluded,
    outside: users.filter(({ path }) => !isComponentPath(path)),
  };
}

/**
 * The guard's failure message, naming each problem and its fix.
 *
 * @param {ReturnType<typeof auditScope>} audit
 *   From `auditScope`.
 * @return {string}
 *   The message; empty when there is nothing wrong.
 */
export function formatAudit({
  missing,
  noStories,
  stale,
  excluded,
  outside = [],
}) {
  const lines = [];
  missing.forEach(({ path, found }) => {
    lines.push(
      `${shown(path)} draws the link halo (${found.join(', ')}) but ` +
        `"${componentOf(path)}" is not in HALO_COMPONENTS, so the link halo ` +
        `check never renders it. Add '${componentOf(path)}' to ` +
        'HALO_COMPONENTS in components/_storybook/link-halo-scope.mjs.',
    );
  });
  noStories.forEach((component) => {
    lines.push(
      `"${component}" is in HALO_COMPONENTS but has no *.stories.js under ` +
        `components/${component}/, so the check has nothing to visit. Add a ` +
        'story (and a *.visreg.stories.js for the theme matrix).',
    );
  });
  stale.forEach((component) => {
    lines.push(
      `"${component}" is in HALO_COMPONENTS but none of its SCSS draws the ` +
        'halo or sets its colour any more. Remove it from HALO_COMPONENTS.',
    );
  });
  excluded.forEach(({ path, found }) => {
    lines.push(
      `${shown(path)} draws the link halo (${found.join(', ')}) in an ` +
        `excluded tier (${EXCLUDED_TIERS.join(
          ', ',
        )}). Move the styles into a ` +
        'component, or make the case for checking that tier.',
    );
  });
  outside.forEach(({ path, found }) => {
    lines.push(
      `${path} draws the link halo (${found.join(', ')}) outside any ` +
        'component, so no story the check renders is known to cover it. ' +
        'Move the rule into the component under components/ whose links it ' +
        'styles (and list that component in HALO_COMPONENTS), so the check ' +
        'renders those links.',
    );
  });
  return lines.length > 0
    ? `${lines.join(
        '\n',
      )}\nSee "Link halo check" in components/_storybook/TESTING.md.`
    : '';
}
