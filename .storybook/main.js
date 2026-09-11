module.exports = {
  stories: [
    '../components/[0-9]*/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  // Each entry is served at the root, so '../images' exposes images/patterns/wavy.png
  // as /patterns/wavy.png -- NOT /images/patterns/wavy.png. The `/images/...` URLs the
  // fixtures use resolve through '../dist', which only carries them because
  // webpack/plugins.js copies them there. A new subdirectory of images/ therefore needs
  // its own CopyWebpackPlugin entry before `/images/<subdir>/...` will resolve.
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
