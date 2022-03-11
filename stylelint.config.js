module.exports = {
  extends: [
    '@yalesites-org/eslint-config-and-other-formatting/stylelint.config',
  ],
  rules: {
    // kebab-case that allows curly braces
    'custom-property-pattern': '^([a-z#/{/}][a-z0-9#/{/}]*)(-[a-z0-9#/{/}]+)*$',
  },
};
