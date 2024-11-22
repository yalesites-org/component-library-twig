module.exports = {
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
};
