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

const ManifestPlugin = new WebpackManifestPlugin({
  fileName: 'manifest.json',
  publicPath: '',
  useEntryKeys: false,
  writeToFileEmit: true,
  generate: (seed, files, entrypoints) => {
    // Only include icons.svg in manifest.
    const manifest = {};
    const distDir = path.resolve(__dirname, '../dist');
    const iconsSvgPath = path.join(distDir, 'icons.svg');

    // Try to find icons.svg in the files array first
    let iconsFile = null;
    if (files && Array.isArray(files)) {
      for (const file of files) {
        const fileName = typeof file === 'string' ? file : (file.name || file.path || '');
        if (fileName && (fileName.includes('icons.svg') || fileName.endsWith('icons.svg'))) {
          iconsFile = typeof file === 'string' ? file : (file.path || file.name);
          break;
        }
      }
    }

    // Use the file from the array if found, otherwise check filesystem
    const fileToProcess = iconsFile || iconsSvgPath;

    // Check if the file exists
    if (fs.existsSync(fileToProcess)) {
      try {
        // Calculate hash from file content
        const fileContent = fs.readFileSync(fileToProcess, 'utf8');
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
            try {
              fs.unlinkSync(oldFile);
            } catch (error) {
              // Ignore errors if file doesn't exist or is locked
            }
          }
        });

        // Create the hashed file (overwrite if it exists)
        fs.copyFileSync(fileToProcess, hashedFilePath);

        // Add only icons.svg to manifest
        manifest['icons.svg'] = hashedFilename;
      } catch (error) {
        // If there's an error reading the file, log it but don't fail the build
        console.warn('ManifestPlugin: Error processing icons.svg:', error.message);
      }
    }

    return manifest;
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
