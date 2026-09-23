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
  overrides: [
    {
      // The pixel-ceiling measurement script is a CLI, not story code: it
      // imports a devDependency (Puppeteer), reports through `console`, and
      // measures stories one at a time on purpose so a shared browser page can
      // be reused rather than opening 518 of them at once.
      files: ['components/_storybook/measure-visreg-pixels.mjs'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
        'no-await-in-loop': 'off',
        'no-console': 'off',
      },
    },
    {
      // Likewise `mjs`: the shared config's devDependency globs don't cover the
      // `.test.mjs` files `node --test` picks up, so a test importing a
      // build-time devDependency (sass, postcss) is flagged as an extraneous
      // runtime import. Scoped as an override so the shared config's own globs
      // stay in force everywhere else.
      files: ['**/*.test.mjs', '**/*.test.js'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
  ],
};
