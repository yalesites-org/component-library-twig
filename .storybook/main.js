export default {
  stories: [
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: [
    '../dist', 
    '../images', 
    '../fonts'
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {
      builder: {
        viteConfigPath: undefined
      }
    }
  },
  docs: {
    autodocs: false,
  },
  async viteFinal(config) {
    // Alias configuration for module resolution to handle ~ prefixed imports
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        // Handle ~ prefixed node_modules imports
        '~@yalesites-org/tokens': '@yalesites-org/tokens',
        '~normalize.css': 'normalize.css',
        '~': 'node_modules/'
      }
    };

    // Configure SCSS preprocessor options
    config.css = {
      ...config.css,
      preprocessorOptions: {
        scss: {
          additionalData: ``,
          // Suppress SASS mixed-decls deprecation warnings that flood console
          quietDeps: true,
          silenceDeprecations: ['mixed-decls']
        }
      }
    };

    // Configure SCSS preprocessor options only
    config.css = {
      ...config.css,
      preprocessorOptions: {
        scss: {
          additionalData: ``,
          quietDeps: true,
          silenceDeprecations: ['mixed-decls']
        }
      }
    };

    return config;
  }
};
