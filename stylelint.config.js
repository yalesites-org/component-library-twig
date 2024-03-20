module.exports = {
  extends: [
    '@yalesites-org/eslint-config-and-other-formatting/stylelint.config',
  ],
  rules: {
    // Need to figure out a regex for kebab-case that allows `#`, `{`, and `}`
    'custom-property-pattern': null,
    // @container is not known to stylelint, yet, will need to update/remove this in the future
    'scss/at-rule-no-unknown': null,
    'at-rule-no-unknown': null,
  },
};
