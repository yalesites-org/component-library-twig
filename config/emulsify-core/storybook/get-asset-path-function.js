/**
 * Twig function returning an asset filename. This is the Storybook
 * equivalent of the Drupal PHP function in CoreTwigExtension.php. There's no
 * Vite equivalent of the old webpack manifest-hash lookup, so this returns
 * the asset name unchanged (matches the original function's own fallback
 * behavior for the common case).
 *
 * @param {string} assetName - The original asset filename (e.g., 'icons.svg')
 * @param {string} directory - Optional directory path (used in Drupal, ignored in Storybook)
 * @returns {string} The asset filename.
 */
export default function getAssetPath(assetName, directory = null) { // eslint-disable-line no-unused-vars
  return assetName;
}
