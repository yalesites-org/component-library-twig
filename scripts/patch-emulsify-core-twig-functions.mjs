// @emulsify/core gives each compiled Twig module its own isolated Twig.js
// factory instance (deliberately — see its migration guide, to avoid
// global template-store collisions). Every instance registers whatever
// src/extensions/twig/function-map.js's getTwigFunctionMap() returns, and
// that map is hardcoded to only `add_attributes`/`bem` with no project-level
// extension point. Registering custom functions from preview.js (or a Vite
// resolve.alias — tried and confirmed non-functional, since Vite plugins
// like twig-module.js run directly in Node.js and never pass through Vite's
// own module resolution) never reaches these per-module instances.
//
// This is the only thing found that does: patch the installed function map
// directly, the same way patch-linkpurpose.mjs works. Idempotent (checked
// before writing) so it's safe regardless of how many times install runs or
// whether node_modules is restored from a build cache.
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
