module.exports = {
  extends: ['@yalesites-org/eslint-config-and-other-formatting'],
  globals: {
    Drupal: true,
    jQuery: true,
    once: true,
  },
  overrides: [
    {
      files: ['**/*.stories.js'],
      rules: {
        'import/no-unresolved': 'off',
      },
    },
  ],
};
