export const extendConfig = () => ({
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
});
