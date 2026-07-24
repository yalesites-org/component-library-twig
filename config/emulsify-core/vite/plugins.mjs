// Sass imports of npm packages (e.g. `@use '@yalesites-org/tokens/...'`) used
// the webpack-only `~` prefix before this migration. Dart Sass has no bundler
// alias for node_modules, so it needs an explicit load path instead.
export const extendConfig = () => ({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['node_modules'],
      },
    },
  },
});
