/**
 * Scans component SCSS for raw palette tokens read in foreground position
 * (YaleSites-Internal#1632).
 *
 * The verdict lives in `foreground-purity.test.mjs`; this module only finds
 * things, so the same scan can be printed as a report:
 *
 *   node components/00-tokens/colors/foreground-purity.mjs
 *
 * ## What counts as a raw palette token
 *
 * `@yalesites-org/tokens` names the fixed swatches `--color-<group>-<shade>`
 * (`--color-gray-700`, `--color-blue-yale`, `--color-basic-white`) and the
 * role-based tokens for what they do (`--color-text`, `--color-heading`,
 * `--color-link-base`). The two live side by side under `color` in the token
 * package, so the list of palette names is derived from that tree rather than
 * transcribed -- see `paletteTokenNames()` for the one small exclusion it needs.
 *
 * A palette token is a fixed value: it cannot follow the theme. Read in
 * foreground position it produces exactly the failure the Color Surface epic is
 * about, and it does so invisibly, because the color never appears in any
 * declared pairing for the contrast gate to check.
 *
 * `components/_global-config.scss` is exempt on purpose: the `:root` block is
 * where a semantic token is *defined* as `var(--color-theme-x, var(--color-<raw>))`,
 * and that terminal fallback is the sanctioned home for a palette token.
 * Storybook and token-documentation chrome is exempt because it is never
 * rendered on a site and is not themed.
 *
 * ## Why regex over SCSS rather than a stylelint rule
 *
 * Same split, and the same reason, as Phase 0's `--color-layout-*` rule (see
 * the comment at the top of `stylelint.config.js`): stylelint's property lists
 * do not apply to custom properties, and `custom-property-pattern` is off
 * repo-wide because Sass interpolation in property names defeats it. The half
 * stylelint *can* do -- color literals in `color:` -- is a stylelint rule; this
 * is the half it cannot. They are two halves of one rule, so change them
 * together.
 *
 * ## Known limitation
 *
 * Sass interpolation in a *property name* is not matched:
 * `--color-link-#{$theme}: var(--color-gray-700)` would slip through. That is
 * the same thing that defeats `custom-property-pattern` repo-wide, and no such
 * declaration exists in the tree today -- interpolation here is always in the
 * value (`--color-link-base: var(--color-link-theme-#{$theme}-base)`), which is
 * matched normally. Recorded rather than papered over with a regex that would
 * be wrong in a harder-to-see way.
 *
 * A declaration naming two palette tokens
 * (`color: var(--color-gray-700, var(--color-basic-white))`) counts as one hit,
 * because a pattern matches a declaration rather than each token inside it.
 * Harmless for a per-file ratchet -- that file is already above zero and
 * already owned by Phase 2 -- but it does mean a second violation added to an
 * existing violating declaration will not move the number.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';

const require = createRequire(import.meta.url);
const tokens = require('@yalesites-org/tokens/build/json/tokens.json');

/** Committed per-file counts. May only ever go down. */
export const {
  counts: BASELINE,
} = require('./foreground-purity-baseline.json');

/** The stylelint half of this rule, read for the paths it already exempts. */
export const STYLELINT_CONFIG = require('../../../stylelint.config');

/**
 * Repo-relative paths where a palette token in foreground position is fine.
 *
 * The documentation-chrome entries are READ FROM `stylelint.config.js` rather
 * than restated, because the two halves of this rule exempting different files
 * is exactly the kind of drift nothing else would catch. `_global-config.scss`
 * is on top of that list and only here: it declares the semantic tokens
 * themselves, so a palette token as the terminal fallback of the chain is the
 * documented pattern -- but it has no colour *literals*, so stylelint has
 * nothing to exempt there.
 */
export const EXEMPT_PATHS = [
  'components/_global-config.scss',
  ...STYLELINT_CONFIG.UNTHEMED_DOCUMENTATION_CHROME,
];

/**
 * The foreground properties stylelint cannot reach.
 *
 * Custom properties are where most of the damage is:
 * `--color-heading: var(--color-gray-700)` inside a themed block is a fixed
 * heading color that no theme can move. They are also split out from the list
 * below because they get a second check the plain CSS properties do not -- a
 * colour *literal* in `color:` is a stylelint error, but the identical mistake
 * in `--color-heading: #fff` is not, so it has to be caught here or nowhere.
 * There are none in the tree today; the check exists so the first one does not
 * land unnoticed.
 */
const CUSTOM_PROPERTY_FOREGROUNDS = [
  '--color-text',
  '--color-heading',
  '--color-link[a-z-]*',
  '--color-action[a-z-]*',
  '--color-section-foreground',
];

/** Every property that puts a color on text. */
const FOREGROUND_PROPERTIES = [
  'color',
  '-webkit-text-fill-color',
  ...CUSTOM_PROPERTY_FOREGROUNDS,
];

/**
 * A colour written out rather than named, anywhere in the value: `#fff`,
 * `rgb(...)`. Safe unanchored -- neither shape occurs inside a token name.
 */
const FUNCTIONAL_OR_HEX_LITERAL = String.raw`#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(`;

/**
 * A named colour, and only as the *whole* value.
 *
 * Unanchored it would fire on the `white` inside `var(--color-basic-white)`,
 * which is a token, not a literal -- so the value has to be the name and
 * nothing else, terminated by the end of the declaration. `!important` is
 * allowed between the two, or `--color-text: white !important` would slip past
 * the anchor.
 *
 * The CSS-wide keywords (`currentcolor`, `transparent`, `inherit`, `unset`) are
 * deliberately NOT here. They are not fixed swatches -- `currentcolor` in
 * particular is the *correct* answer in several components, so banning it would
 * push people off the good pattern.
 */
const NAMED_COLORS = [
  'aqua',
  'black',
  'blue',
  'fuchsia',
  'gold',
  'gray',
  'green',
  'grey',
  'lime',
  'maroon',
  'navy',
  'olive',
  'orange',
  'purple',
  'red',
  'silver',
  'teal',
  'white',
  'yellow',
];

const NAMED_COLOR_LITERAL = String.raw`\s*(?:${NAMED_COLORS.join(
  '|',
)})\s*(?:!important)?\s*(?=[;}]|$)`;

/**
 * Groups under `tokens.color` that are semantic roles rather than palettes.
 *
 * Everything else at that level is a hue family. The test asserts both
 * directions of this -- that known swatches are still derived and that known
 * roles are still excluded -- so a token restructure fails loudly instead of
 * quietly emptying the list.
 */
const SEMANTIC_GROUPS = ['link', 'alert'];

/** Every `--color-<name>` in the token package that is a fixed swatch. */
export function paletteTokenNames() {
  return Object.entries(tokens.color).flatMap(([group, value]) =>
    typeof value === 'string' || SEMANTIC_GROUPS.includes(group)
      ? []
      : Object.keys(value).map((shade) => `${group}-${shade}`),
  );
}

/** Every `.scss` under `components/`, as `[repoRelativePath, contents]`. */
export function readAllScss(directory = 'components') {
  const root = fileURLToPath(new URL('../../..', import.meta.url));

  const walk = (current) =>
    readdirSync(current).flatMap((entry) => {
      const path = join(current, entry);
      if (statSync(path).isDirectory()) return walk(path);
      return path.endsWith('.scss') ? [path] : [];
    });

  return walk(join(root, directory)).map((path) => [
    relative(root, path),
    readFileSync(path, 'utf8'),
  ]);
}

/**
 * Is the `//` at this offset part of a URL rather than the start of a comment?
 *
 * Preceded by `:` it is a scheme (`https://`); preceded by `(` it is a
 * protocol-relative URL (`url(//cdn/...)`). Everything else is a comment,
 * including a decorative `////////` banner at column zero.
 */
function isUrlSlashes(source, index) {
  const preceding = source[index - 1];
  return preceding === ':' || preceding === '(';
}

/**
 * Blank out comments, keeping line numbering intact.
 *
 * One pass over the source tracking string and comment state, rather than two
 * regex replaces, because the two comment forms can nest either way round and a
 * source-order-blind pass gets it wrong in both directions:
 *
 * - Block-comments-first blanks real code when a `//` line comment happens to
 *   contain `/*` -- everything up to the next `*` + `/` disappears. This repo's
 *   comment style writes worked examples routinely, so that is a live hazard.
 * - Line-comments-first eats the tail of any line containing a URL. Both
 *   `_yds-form.scss` and `_yds-select.scss` carry
 *   `background-image: url("data:image/svg+xml,...http://www.w3.org/2000/svg...")`
 *   and both are in the purity baseline, so that shape is really in the tree.
 *
 * Either way the symptom is the same and it is the worst one an enforcement
 * tool can have: it silently stops looking, and the build stays green.
 *
 * Newlines are preserved throughout -- block comments are blanked to spaces,
 * line comments are dropped up to but not including their newline -- so a hit's
 * reported line number still matches the file.
 */
export function stripComments(source) {
  let output = '';
  let quote = null;
  let index = 0;

  while (index < source.length) {
    const char = source[index];
    const next = source[index + 1];

    if (quote) {
      output += char;
      if (char === '\\') {
        output += next ?? '';
        index += 2;
      } else {
        if (char === quote) quote = null;
        index += 1;
      }
    } else if (char === '"' || char === "'") {
      quote = char;
      output += char;
      index += 1;
    } else if (char === '/' && next === '*') {
      const close = source.indexOf('*/', index + 2);
      const block = source.slice(index, close === -1 ? undefined : close + 2);
      output += block.replace(/[^\n]/g, ' ');
      index += block.length;
    } else if (char === '/' && next === '/' && !isUrlSlashes(source, index)) {
      // Skip to (not past) the newline, so the line count is unchanged.
      const newline = source.indexOf('\n', index);
      index = newline === -1 ? source.length : newline;
    } else {
      output += char;
      index += 1;
    }
  }

  return output;
}

/**
 * Find raw palette tokens, and foreground colour literals, in SCSS source.
 *
 * @param {Object} [options]
 * @param {Array} [options.sources] `[path, contents]` pairs; defaults to the
 *   whole `components/` tree. Supplying them is how the tests exercise the
 *   matcher without writing fixture files.
 */
export function scanForegroundPurity({ sources = readAllScss() } = {}) {
  const palette = paletteTokenNames().join('|');

  /**
   * `<one of these properties>: <anything up to the end of the value><what>`.
   *
   * `what` is wrapped in a non-capturing group: it is an alternation, and
   * without the group its `|` would split the whole pattern instead, leaving a
   * branch that matches a bare `rgb(` anywhere in the file.
   */
  const declaration = (properties, what) =>
    new RegExp(
      String.raw`(?:^|[\s;{])(?:${properties.join('|')})\s*:[^;{}]*(?:${what})`,
      // Case-insensitive: CSS property names and colour keywords are ASCII
      // case-insensitive, so `COLOR: White` is the same declaration as
      // `color: white` and has to be caught the same way. Custom property
      // NAMES are technically case-sensitive, but `--COLOR-TEXT` is a
      // different (undefined) property nobody writes, so folding them too
      // costs nothing.
      'gi',
    );

  const patterns = [
    declaration(
      FOREGROUND_PROPERTIES,
      String.raw`var\(\s*--color-(?:${palette})\b`,
    ),
    declaration(CUSTOM_PROPERTY_FOREGROUNDS, FUNCTIONAL_OR_HEX_LITERAL),
    // A named colour has to be the whole value, so this one cannot go through
    // the `[^;{}]*` prefix the other two share.
    new RegExp(
      String.raw`(?:^|[\s;{])(?:${CUSTOM_PROPERTY_FOREGROUNDS.join(
        '|',
      )})\s*:${NAMED_COLOR_LITERAL}`,
      'gi',
    ),
  ];

  const byFile = {};

  sources
    .filter(([path]) => !EXEMPT_PATHS.some((prefix) => path.startsWith(prefix)))
    .forEach(([path, contents]) => {
      // The patterns run against the whole file rather than line by line: their
      // `[^;{}]*` middle happily crosses a newline, which is what makes a
      // prettier-wrapped `var(--a, var(--b))` match, and `match.index` gives the
      // offset to turn back into a line number.
      const code = stripComments(contents);
      const hits = patterns.flatMap((pattern) => [...code.matchAll(pattern)]);
      if (!hits.length) return;

      byFile[path] = hits
        .map((hit) => ({
          line: code.slice(0, hit.index).split('\n').length,
          text: hit[0].replace(/\s+/g, ' ').trim(),
        }))
        .sort((a, b) => a.line - b.line);
    });

  return {
    byFile,
    counts: Object.fromEntries(
      Object.entries(byFile).map(([path, hits]) => [path, hits.length]),
    ),
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { counts, byFile } = scanForegroundPurity();
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  const report = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(
      ([path, count]) =>
        `${path}: ${count} (baseline ${BASELINE[path] ?? 0})\n${byFile[path]
          .map((hit) => `    ${hit.line}: ${hit.text}`)
          .join('\n')}`,
    )
    .join('\n');

  process.stdout.write(
    `Raw palette tokens in foreground position (YaleSites-Internal#1632)\n\n` +
      `${total} across ${Object.keys(counts).length} files\n\n${report}\n`,
  );
}
