// @emulsify/core's config/vite/plugins/index.js globs the icon folder twice:
// `${projectDir}/assets/icons/**/*.svg` and the cwd-relative
// `assets/icons/**/*.svg` resolve to the same files, so dist/assets/icons.svg
// ships every icon twice (the repeat renamed `<name>-2`). Drops the relative
// glob, keeping the absolute one. Idempotent via marker check.
import { patchFile } from './patch-emulsify-core.mjs';

const target = new URL(
  '../node_modules/@emulsify/core/config/vite/plugins/index.js',
  import.meta.url,
);

const marker = 'YALESITES_ICON_SPRITE_SINGLE_GLOB';

patchFile({
  target,
  marker,
  scriptName: 'patch-emulsify-core-icon-sprite',
  replacements: [
    {
      from:
        `        \`\${toPosixPath(projectDir)}/assets/icons/**/*.svg\`,\n` +
        "        'assets/icons/**/*.svg',\n",
      to:
        `        // ${marker}\n` +
        `        \`\${toPosixPath(projectDir)}/assets/icons/**/*.svg\`,\n`,
    },
  ],
});
