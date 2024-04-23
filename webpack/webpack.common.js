const path = require('path');
const glob = require('glob');
const loaders = require('./loaders');
const plugins = require('./plugins');

const webpackDir = path.resolve(__dirname);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

function getEntries(pattern) {
  const entries = {};

  glob.sync(pattern).forEach((file) => {
    const filePath = file.split('components/')[1];
    const newfilePath = `js/${filePath.replace('.js', '')}`;
    entries[newfilePath] = file;
  });

  entries.svgSprite = path.resolve(webpackDir, 'svgSprite.js');
  entries.css = path.resolve(webpackDir, 'css.js');
  glob.sync(pattern).forEach((file) => {
    const filePath = file.split('components/')[1];
    const newfilePath = `js/${filePath.replace('.js', '')}`;
    entries[newfilePath] = file;
  });
  entries['js/ys-link'] = path.resolve(rootDir, 'lib/ys_link/index.js');

  return entries;
}

module.exports = {
  stats: {
    errorDetails: true,
  },
  entry: getEntries(
    path.resolve(
      rootDir,
      'components/**/!(*.stories|*.component|*.min|*.test).js',
    ),
  ),
  module: {
    rules: [
      loaders.CSSLoader,
      loaders.SVGSpriteLoader,
      loaders.ImageLoader,
      loaders.JSLoader,
      {
        test: /linkpurpose\/js\/linkpurpose\.js/,
        loader: 'exports-loader',
        options: {
          exports: 'LinkPurpose',
        },
      },
    ],
  },
  plugins: [
    plugins.MiniCssExtractPlugin,
    plugins.ImageminPlugin,
    plugins.SpriteLoaderPlugin,
    plugins.ProgressPlugin,
    plugins.CleanWebpackPlugin,
    plugins.CopyWebpackPlugin,
  ],
  output: {
    path: distDir,
    filename: '[name].js',
  },
};
