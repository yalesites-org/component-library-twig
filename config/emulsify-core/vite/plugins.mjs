// Sass imports of npm packages (e.g. `@use '@yalesites-org/tokens/...'`) used
// the webpack-only `~` prefix before this migration. Dart Sass has no bundler
// alias for node_modules, so it needs an explicit load path instead.
//
// `@storybook/blocks` (used by ~80 .mdx docs pages for Meta/Story/Canvas/etc.)
// was deprecated as a standalone package as of Storybook 9 and now ships from
// within @storybook/addon-docs. Aliasing rather than rewriting every .mdx file.
export const extendConfig = () => ({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['node_modules'],
      },
    },
  },
  resolve: {
    alias: {
      '@storybook/blocks': '@storybook/addon-docs/blocks',
    },
  },
});
