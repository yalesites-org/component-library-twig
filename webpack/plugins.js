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
    compiler.hooks.afterEmit.tap('ManifestUpdatePlugin', (compilation) => {
      const distDir = path.resolve(__dirname, '../dist');
      const iconsSvgPath = path.join(distDir, 'icons.svg');
      const manifestPath = path.join(distDir, 'manifest.json');

      // Wait a bit for files to be fully written
      setTimeout(() => {
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
            console.log('ManifestUpdatePlugin: Updated manifest with', hashedFilename);
          } catch (error) {
            console.warn('ManifestUpdatePlugin: Error updating manifest:', error.message);
          }
        }
      }, 100); // Small delay to ensure files are written
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

// Minimal inline plugin to hash icons.svg after sprite generation
// This runs in processAssets hook at an early stage to ensure the hashed file exists
// before webpack-manifest-plugin generates the manifest
const IconsRenamePlugin = {
  apply(compiler) {
    compiler.hooks.compilation.tap('IconsRenamePlugin', (compilation) => {
      // Use processAssets hook which runs before manifest generation
      // Run at PROCESS_ASSETS_STAGE_ADDITIONS (100) to run early
      compilation.hooks.processAssets.tap(
        {
          name: 'IconsRenamePlugin',
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        () => {
          const distDir = path.resolve(__dirname, '../dist');
          const iconsFile = path.join(distDir, 'icons.svg');

          if (!fs.existsSync(iconsFile)) {
            return;
          }

          try {
            const fileContent = fs.readFileSync(iconsFile, 'utf8');
            const hash = crypto
              .createHash('md5')
              .update(fileContent)
              .digest('hex')
              .substring(0, 8);

            const hashedFilename = `icons.${hash}.svg`;
            const hashedFilePath = path.join(distDir, hashedFilename);

            // Clean up old hashed versions before creating the new one
            const oldHashedFiles = glob.sync(path.join(distDir, 'icons.*.svg'));
            oldHashedFiles.forEach((oldFile) => {
              // Don't delete icons.svg (the unhashed version) or the current hashed version
              const basename = path.basename(oldFile);
              if (basename !== 'icons.svg' && basename !== hashedFilename) {
                fs.unlinkSync(oldFile);
              }
            });

            // Create the hashed version (overwrite if it exists)
            fs.copyFileSync(iconsFile, hashedFilePath);
          } catch (error) {
            compilation.errors.push(new Error(`IconsRenamePlugin: ${error.message}`));
          }
        }
      );
    });
  },
};

module.exports = {
  ProgressPlugin,
  MiniCssExtractPlugin,
  ImageminPlugin,
  SpriteLoaderPlugin,
  CopyWebpackPlugin,
  ManifestPlugin,
  ManifestUpdatePlugin,
  IconsRenamePlugin,
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
