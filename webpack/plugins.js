/* eslint-disable no-underscore-dangle */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const _MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _ImageminPlugin = require('imagemin-webpack-plugin').default;
const _SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const _CopyWebpackPlugin = require('copy-webpack-plugin');
// For webpack 5, use WebpackManifestPlugin class
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const crypto = require('crypto');
const fs = require('fs');
const glob = require('glob');

const imagePath = path.resolve(__dirname, '../images');

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});

const ImageminPlugin = new _ImageminPlugin({
  disable: process.env.NODE_ENV !== 'production',
  externalImages: {
    context: imagePath,
    sources: glob.sync(path.resolve(imagePath, '**/*.{png,jpg,gif,svg}')),
    destination: imagePath,
  },
});

const SpriteLoaderPlugin = new _SpriteLoaderPlugin({
  plainSprite: true,
});

const ProgressPlugin = new webpack.ProgressPlugin();

const CopyWebpackPlugin = new _CopyWebpackPlugin([
  {
  from: './fonts',
  to: './fonts',
  },
  {
    from: './images/patterns',
    to: './images/patterns',
  }
]);

// Custom plugin to update manifest after files are emitted
const ManifestUpdatePlugin = {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('ManifestUpdatePlugin', () => {
      const distDir = path.resolve(__dirname, '../dist');
      const iconsSvgPath = path.join(distDir, 'icons.svg');
      const manifestPath = path.join(distDir, 'manifest.json');

      if (fs.existsSync(iconsSvgPath) && fs.existsSync(manifestPath)) {
        try {
          // Read current manifest
          const manifestContent = fs.readFileSync(manifestPath, 'utf8');
          const manifest = JSON.parse(manifestContent || '{}');

          // Calculate hash from icons.svg
          const fileContent = fs.readFileSync(iconsSvgPath, 'utf8');
          const hash = crypto
            .createHash('md5')
            .update(fileContent)
            .digest('hex')
            .substring(0, 8);
          const hashedFilename = `icons.${hash}.svg`;
          const hashedFilePath = path.join(distDir, hashedFilename);

          // Clean up old hashed versions
          const oldHashedFiles = glob.sync(path.join(distDir, 'icons.*.svg'));
          oldHashedFiles.forEach((oldFile) => {
            const basename = path.basename(oldFile);
            if (basename !== 'icons.svg' && basename !== hashedFilename) {
              try {
                fs.unlinkSync(oldFile);
              } catch (error) {
                // Ignore errors
              }
            }
          });

          // Create the hashed file
          fs.copyFileSync(iconsSvgPath, hashedFilePath);

          // Update manifest
          manifest['icons.svg'] = hashedFilename;

          // Write updated manifest
          fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        } catch (error) {
          // Silently fail - manifest will fall back to original filename
        }
      }
    });
  },
};

const ManifestPlugin = new WebpackManifestPlugin({
  fileName: 'manifest.json',
  publicPath: '',
  useEntryKeys: false,
  generate: () => {
    // Return empty manifest initially - will be updated by ManifestUpdatePlugin
    return {};
  },
});

module.exports = {
  ProgressPlugin,
  MiniCssExtractPlugin,
  ImageminPlugin,
  SpriteLoaderPlugin,
  CopyWebpackPlugin,
  ManifestPlugin,
  ManifestUpdatePlugin,
  CleanWebpackPlugin: new CleanWebpackPlugin({
    protectWebpackAssets: false, // Required for removal of extra, unwanted dist/css/*.js files.
    cleanOnceBeforeBuildPatterns: ['!*.{png,jpg,gif,svg}'],
    cleanAfterEveryBuildPatterns: [
      'remove/**',
      '!js',
      'css/**/*.js', // Remove all unwanted, auto generated JS files from dist/css folder.
      'css/**/*.js.map',
      '!*.{png,jpg,gif,svg}',
      '!images/**/*.{png,jpg,gif,svg}',
      '!fonts/**',
    ],
  }),
};
