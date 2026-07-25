// Sass imports of npm packages (e.g. `@use '@yalesites-org/tokens/...'`) used
// the webpack-only `~` prefix before this migration. Dart Sass has no bundler
// alias for node_modules, so it needs an explicit load path instead.
//
// `@storybook/blocks` (used by ~80 .mdx docs pages for Meta/Story/Canvas/etc.)
// was deprecated as a standalone package as of Storybook 9 and now ships from
// within @storybook/addon-docs. Aliasing rather than rewriting every .mdx file.
//
// YaleSites-specific custom Twig functions (getUrlType, getAssetPath) are
// registered via scripts/patch-emulsify-core-twig-functions.mjs (postinstall),
// not here — a resolve.alias targeting @emulsify/core's function-map.js was
// tried first and doesn't work, since twig-module.js (the Vite plugin that
// compiles .twig files) runs directly in Node.js and never passes through
// Vite's own module resolution/aliasing.
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
