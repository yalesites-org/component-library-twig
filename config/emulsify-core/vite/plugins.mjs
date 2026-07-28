import path from 'path';

// yalesites-project's build runs `npm ci --ignore-scripts`, so postinstall
// patches never apply there. linkpurpose ships with no export statement at
// all; patch it at transform time instead, since that runs regardless of
// how node_modules was installed.
const patchLinkpurpose = () => ({
  name: 'patch-linkpurpose-default-export',
  transform(code, id) {
    if (!id.includes('linkpurpose/js/linkpurpose.js')) return null;
    if (code.includes('export default LinkPurpose')) return null;
    return `${code}\nexport default LinkPurpose;\n`;
  },
});

export default [patchLinkpurpose()];

export const extendConfig = (config, { env }) => ({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['node_modules'], // Dart Sass has no bundler alias for the webpack-only `~` prefix
      },
    },
  },
  resolve: {
    alias: {
      // @storybook/blocks moved into @storybook/addon-docs as of Storybook 9
      '@storybook/blocks': '@storybook/addon-docs/blocks',
    },
  },
  build: {
    rollupOptions: {
      input: {
        // lib/ and the root style.scss sit outside the declared component
        // tiers, so Core's own entry scan never picks them up. atomic's
        // Drupal libraries expect all three as top-level dist/ files.
        'css/style': path.resolve(env.projectDir, 'components/style.scss'),
        'css/link-treatment': path.resolve(
          env.projectDir,
          'lib/link-treatment/link-treatment.scss',
        ),
        'js/link-treatment': path.resolve(
          env.projectDir,
          'lib/link-treatment/link-treatment.js',
        ),
      },
    },
  },
});
