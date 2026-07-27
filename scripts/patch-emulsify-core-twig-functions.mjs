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

if (!content.includes(marker)) {
  const patched = content
    .replace(
      "import { bemTwigFunction } from './functions/bem.js';",
      "import { bemTwigFunction } from './functions/bem.js';\n" +
        `// ${marker}\n` +
        "import getUrlType from '../../../../../../config/emulsify-core/storybook/get-url-type-function.js';\n" +
        "import getAssetPath from '../../../../../../config/emulsify-core/storybook/get-asset-path-function.js';",
    )
    .replace(
      'bem: bemTwigFunction,\n  };',
      'bem: bemTwigFunction,\n    getUrlType,\n    getAssetPath,\n  };',
    );

  if (patched === content) {
    throw new Error(
      'patch-emulsify-core-twig-functions: expected content not found — @emulsify/core/src/extensions/twig/function-map.js may have changed shape. Check this script against the current file.',
    );
  }

  fs.writeFileSync(target, patched);
}
