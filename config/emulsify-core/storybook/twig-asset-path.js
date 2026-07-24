/**
 * Custom Twig function to get versioned asset paths.
 *
 * This is the Storybook (JavaScript) equivalent of the Drupal PHP function
 * in CoreTwigExtension.php. Under the Vite build there is no hand-rolled
 * webpack manifest to consult, so this returns the asset name unchanged,
 * matching the function's original fallback behavior.
 */
export default function twigAssetPath(twigInstance) {
  /**
   * Get the asset path/filename.
   *
   * @param {string} assetName - The original asset filename (e.g., 'icons.svg')
   * @param {string} directory - Optional directory path (used in Drupal, ignored in Storybook)
   * @returns {string} The asset filename.
   */
  const getAssetPath = (assetName, directory = null) => assetName; // eslint-disable-line no-unused-vars

  twigInstance.extendFunction('getAssetPath', getAssetPath);
}
