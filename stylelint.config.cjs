// The `--color-layout-*` containment rule below is the enforcement half of the
// Color Surface work (YaleSites-Internal#1628).
//
// `--color-layout-theme|content|border` are declared only on `.yds-layout`, and
// only inside `[data-component-theme='...']`. Any component that reads one is
// reaching back up the tree for a property it cannot see unless it happens to
// be a descendant of a themed section -- and where it is not, the `var()` is
// invalid-at-computed-value-time, the declaration is dropped, and the only
// symptom is a wrong colour (or a missing divider) on one section theme. Every
// stage of the build stays green, which is how five of these accumulated.
//
// Components should read the inheritable section contract instead --
// `--color-section-background` / `--color-section-foreground` /
// `--color-section-accent`, documented in
// components/03-organisms/layout/layout/_yds-layout.scss -- with their existing
// colour as the CSS fallback.
//
// The ticket asks for this to land as a ratchet, with the five known violations
// carried as documented per-file exceptions and retired one at a time. All five
// are fixed in the same change, so the exception list is empty: if you are here
// because the rule just failed, the fix is to read the contract, not to add an
// entry back.
// Matches a `var()` READ, which is the failure mode that matters: the property
// resolves to nothing outside `.yds-layout` and the declaration is dropped.
// Sass interpolation is covered too, since `var(--color-layout-#{$x})` still
// begins `var(--color-layout-`, and `\s*` absorbs the line break prettier
// inserts after `var(` when a declaration wraps.
//
// It catches READS, not a component *declaring* `--color-layout-foo` itself.
// That was tried: stylelint 14's `property-disallowed-list` does not apply to
// custom properties (verified against this tree with regex, string and nested
// forms -- none matched `--color-layout-theme: red`), and `custom-property-pattern`
// is disabled repo-wide because Sass interpolation in property names defeats it.
// So the declaration half is enforced by
// components/00-tokens/colors/color-system-defects.test.mjs, which flags any
// occurrence of the name outside the layout organism, not just reads. Declaring
// one is a smell rather than a silent failure, so lint-vs-test is an acceptable
// split -- but they are two halves of one rule, so change them together.
const layoutColorProperties = /var\(\s*--color-layout-/;

// The colour-literal ban below is the stylelint half of the Color Surface
// contrast gate (YaleSites-Internal#1632).
//
// A literal in foreground position is the one thing the gate genuinely cannot
// see: the gate checks the pairings the token structure declares, and a
// hardcoded `#fff` or `white` is in no pairing, under no theme, so it is not
// merely failing -- it is unmeasured. `.taxonomy-list--tags` is the case the
// ticket cites; the same shape was in the pager's hover state.
//
// Only `color` and `-webkit-text-fill-color` are covered. The custom-property
// half (`--color-text: #fff`) is NOT enforceable here for the reason the
// paragraph above already establishes -- stylelint's property matching does not
// reach custom-property declarations in this tree -- so it lives in
// components/00-tokens/colors/foreground-purity.test.mjs alongside the
// raw-palette-token ratchet. Same lint-vs-test split as the rule above, same
// caveat: they are two halves of one rule, so change them together.
//
// Background position is deliberately out of scope. A background is the thing a
// foreground has to contrast with, and the gate does check the declared ones; a
// literal background is a smaller problem than a literal foreground and banning
// it is a separate, larger change.
// Kept in step with NAMED_COLORS in
// components/00-tokens/colors/foreground-purity.mjs, which applies the same ban
// to the custom-property declarations stylelint cannot reach. The CSS-wide
// keywords are deliberately absent: `currentcolor` is the *correct* value in
// several components, and `transparent` / `inherit` are not swatches.
const namedColors =
  '(?:aqua|black|blue|fuchsia|gold|gray|green|grey|lime|maroon|navy|olive|' +
  'orange|purple|red|silver|teal|white|yellow)';

// Case-insensitive throughout: CSS colour keywords and function names are
// ASCII case-insensitive, so `color: White` and `color: RGB(0 0 0)` are the
// same declarations as their lowercase forms and have to fail the same way.
const colorLiterals = [
  /#[0-9a-fA-F]{3,8}/,
  /\b(?:rgba?|hsla?)\(/i,
  // Anchored to the whole value: unanchored, `white` would match inside
  // `var(--color-basic-white)`, which is a token, not a literal.
  new RegExp(`^\\s*${namedColors}\\s*(?:!important)?\\s*$`, 'i'),
];

// Storybook chrome and the colour-token documentation pages. Not rendered on a
// site, not inside a themed section, and their literals are the point -- the
// swatch demos exist to show a fixed colour.
//
// Path *prefixes*, so the same list can be read by
// components/00-tokens/colors/foreground-purity.mjs, whose scan matches with
// `startsWith` rather than globs. Keeping one list means the two halves of the
// rule cannot start exempting different files; a drift test in
// foreground-purity.test.mjs fails if they do.
const UNTHEMED_DOCUMENTATION_CHROME = [
  'components/_storybook/',
  'components/00-tokens/colors/cl-colors.scss',
];

/** A prefix ending in `/` is a directory; anything else is already a file. */
const asGlob = (prefix) =>
  prefix.endsWith('/') ? `${prefix}**/*.scss` : prefix;

// The two halves of the disallowed-value rule, named once each so the overrides
// below can select one without restating it.
const layoutPropertyRule = { '/.*/': [layoutColorProperties] };
const colorLiteralRule = {
  '/^(?:color|-webkit-text-fill-color)$/': colorLiterals,
};

// The guidance a developer sees when either half of the rule fires. Named so
// the overrides below carry it too -- stylelint does not inherit the secondary
// options object, so an override that omits it leaves the developer with a bare
// `Unexpected value "#fff" for property "color"` and no idea what to do.
const disallowedValueMessage = {
  message:
    'Do not read --color-layout-* outside 03-organisms/layout/, and do ' +
    'not hardcode a colour in foreground position. --color-layout-* is ' +
    'declared only on .yds-layout, so elsewhere it resolves to nothing; ' +
    'a colour literal cannot follow the theme at all and is invisible to ' +
    'the contrast gate. Read --color-text / --color-heading / ' +
    '--color-link-base, or the section contract ' +
    '--color-section-background / --color-section-foreground / ' +
    '--color-section-accent, with the existing colour as the CSS ' +
    'fallback (YaleSites-Internal#1628, #1632).',
};

module.exports = {
  extends: [
    '@yalesites-org/eslint-config-and-other-formatting/stylelint.config',
  ],
  rules: {
    // Need to figure out a regex for kebab-case that allows `#`, `{`, and `}`
    'custom-property-pattern': null,
    'declaration-property-value-disallowed-list': [
      { ...layoutPropertyRule, ...colorLiteralRule },
      disallowedValueMessage,
    ],
  },
  overrides: [
    {
      // The layout organism owns the --color-layout-* properties, so it is the
      // one place allowed to read them. The literal ban still applies, so the
      // rule is narrowed here rather than switched off.
      files: ['components/03-organisms/layout/**/*.scss'],
      rules: {
        'declaration-property-value-disallowed-list': [
          colorLiteralRule,
          disallowedValueMessage,
        ],
      },
    },
    {
      // Conversely, documentation chrome keeps the --color-layout-* rule and
      // drops only the literal ban.
      files: UNTHEMED_DOCUMENTATION_CHROME.map(asGlob),
      rules: {
        'declaration-property-value-disallowed-list': [
          layoutPropertyRule,
          disallowedValueMessage,
        ],
      },
    },
  ],
};

// Read by components/00-tokens/colors/foreground-purity.mjs, the node-test half
// of the same rule, so the two cannot drift apart. stylelint 14 ignores unknown
// top-level config keys -- verified by a clean full `lint:styles` run with these
// present -- so this is only a placement preference, not a workaround.
module.exports.UNTHEMED_DOCUMENTATION_CHROME = UNTHEMED_DOCUMENTATION_CHROME;
module.exports.COLOR_LITERALS = colorLiterals;
