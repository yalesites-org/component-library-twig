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

module.exports = {
  extends: [
    '@yalesites-org/eslint-config-and-other-formatting/stylelint.config',
  ],
  rules: {
    // Need to figure out a regex for kebab-case that allows `#`, `{`, and `}`
    'custom-property-pattern': null,
    'declaration-property-value-disallowed-list': [
      { '/.*/': [layoutColorProperties] },
      {
        message:
          'Do not read --color-layout-* outside 03-organisms/layout/. It is ' +
          'declared only on .yds-layout, so elsewhere it resolves to nothing. ' +
          'Read --color-section-background / --color-section-foreground / ' +
          '--color-section-accent instead, with the existing colour as the ' +
          'CSS fallback (YaleSites-Internal#1628).',
      },
    ],
  },
  overrides: [
    {
      // The layout organism owns these properties, so it is the one place
      // allowed to read them.
      files: ['components/03-organisms/layout/**/*.scss'],
      rules: {
        'declaration-property-value-disallowed-list': null,
      },
    },
  ],
};
