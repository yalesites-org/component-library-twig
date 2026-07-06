module.exports = {
  stories: [
    '../components/[0-9]*/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    // Web Component (Lit + vanilla) demo stories — top-level only so we don't
    // scan web-components/node_modules.
    '../web-components/*.mdx',
    '../web-components/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: [
    '../dist', 
    '../images', 
    '../fonts'
  ],
  core: {
    disableTelemetry: true,
  },
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          // Replaces existing CSS rules to support PostCSS
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { importLoaders: 1 },
              },
            ],
          },
        ],
      },
    },
    '@storybook/addon-webpack5-compiler-babel',
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {}
  },
  docs: {
    autodocs: false,
  }
};
