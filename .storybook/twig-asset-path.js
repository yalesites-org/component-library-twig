/**
 * Custom Twig function to get versioned asset paths from webpack manifest.
 *
 * This is the Storybook (JavaScript) equivalent of the Drupal PHP function
 * in CoreTwigExtension.php.
 */
const path = require('path');
const fs = require('fs');

module.exports = function twigAssetPath(twigInstance) {
  /**
   * Get the versioned asset path from the webpack manifest.
   *
   * @param {string} assetName - The original asset filename (e.g., 'icons.svg')
   * @param {string} directory - Optional directory path (used in Drupal, ignored in Storybook)
   * @returns {string} The versioned asset path, or original filename if not found
   */
  const getAssetPath = (assetName, directory = null) => {
    try {
      // In Storybook context, always load from dist/manifest.json
      // The directory parameter is only used in Drupal context, so we ignore it here
      const manifestPath = path.join(__dirname, '..', 'dist', 'manifest.json');

      if (fs.existsSync(manifestPath)) {
        const manifestContent = fs.readFileSync(manifestPath, 'utf8');
        const manifest = JSON.parse(manifestContent);

        // Return versioned filename if found in manifest
        if (manifest[assetName]) {
          return manifest[assetName];
        }
      }
    } catch (error) {
      // Fail gracefully - log warning but don't break rendering
      console.warn(`getAssetPath: Could not load manifest or find "${assetName}":`, error.message);
    }

    // Fallback to original filename (matches Drupal behavior)
    return assetName;
  };

  // Register the function with Twig
  twigInstance.extendFunction('getAssetPath', getAssetPath);
};
