module.exports = {
  extends: ['@yalesites-org/eslint-config-and-other-formatting'],
  globals: {
    Drupal: true,
    jQuery: true,
    once: true,
  },
  rules: {
    // Same as the shared config except for `mjs`. Node's ESM resolver has no
    // extension guessing, so a .mjs helper that `node --test` runs directly has
    // to be imported by its full filename. Bundled .js imports stay extensionless.
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', mjs: 'always', jsx: 'never' },
    ],
  },
};
