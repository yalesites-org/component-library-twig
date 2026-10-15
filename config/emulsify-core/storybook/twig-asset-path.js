/* Adds a twig function to get an asset's versioned path (passthrough — no Vite manifest to consult). */
export default function twigAssetPath(twigInstance) {
  // eslint-disable-next-line no-unused-vars
  const getAssetPath = (assetName, directory = null) => assetName;

  twigInstance.extendFunction('getAssetPath', getAssetPath);
}
