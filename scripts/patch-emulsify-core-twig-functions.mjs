// @emulsify/core's src/extensions/twig/function-map.js hardcodes the Twig
// functions registered on every compiled component (add_attributes/bem only),
// with no project-level extension point. Patches the installed file directly
// to add YaleSites' custom functions. Idempotent via marker check.
import fs from 'fs';

const target = new URL(
  '../node_modules/@emulsify/core/src/extensions/twig/function-map.js',
  import.meta.url,
);

const marker = 'YALESITES_CUSTOM_TWIG_FUNCTIONS';

const content = fs.readFileSync(target, 'utf8');

// Each replacement is checked on its own. Checking only the combined result lets
// a half-applied patch through: if the import anchor matches but the function-map
// anchor does not, the imports land, the functions are never registered, and the
// script still exits 0 -- then every component calling getUrlType() throws at
// render time, which is the failure this script exists to prevent.
const applyOrFail = (source, anchor, replacement) => {
  if (!source.includes(anchor)) {
    throw new Error(
      `patch-emulsify-core-twig-functions: anchor not found in @emulsify/core/src/extensions/twig/function-map.js:\n  ${anchor}\n` +
        'The upstream file changed shape. Update this script against the current file.',
    );
  }

  return source.replace(anchor, replacement);
};

if (!content.includes(marker)) {
  let patched = applyOrFail(
    content,
    "import { bemTwigFunction } from './functions/bem.js';",
    "import { bemTwigFunction } from './functions/bem.js';\n" +
      `// ${marker}\n` +
      "import getUrlType from '../../../../../../config/emulsify-core/storybook/get-url-type-function.js';\n" +
      "import getAssetPath from '../../../../../../config/emulsify-core/storybook/get-asset-path-function.js';",
  );

  patched = applyOrFail(
    patched,
    'bem: bemTwigFunction,\n  };',
    'bem: bemTwigFunction,\n    getUrlType,\n    getAssetPath,\n  };',
  );

  fs.writeFileSync(target, patched);
}
