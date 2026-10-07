// @emulsify/core's src/extensions/twig/function-map.js hardcodes the Twig
// functions registered on every compiled component (add_attributes/bem only),
// with no project-level extension point. Patches the installed file directly
// to add YaleSites' custom functions. Idempotent via marker check.
import { patchFile } from './patch-emulsify-core.mjs';

const target = new URL(
  '../node_modules/@emulsify/core/src/extensions/twig/function-map.js',
  import.meta.url,
);

const marker = 'YALESITES_CUSTOM_TWIG_FUNCTIONS';

patchFile({
  target,
  marker,
  scriptName: 'patch-emulsify-core-twig-functions',
  replacements: [
    {
      from: "import { bemTwigFunction } from './functions/bem.js';",
      to:
        "import { bemTwigFunction } from './functions/bem.js';\n" +
        `// ${marker}\n` +
        "import getUrlType from '../../../../../../config/emulsify-core/storybook/get-url-type-function.js';\n" +
        "import getAssetPath from '../../../../../../config/emulsify-core/storybook/get-asset-path-function.js';",
    },
    {
      from: 'bem: bemTwigFunction,\n  };',
      to: 'bem: bemTwigFunction,\n    getUrlType,\n    getAssetPath,\n  };',
    },
  ],
});
