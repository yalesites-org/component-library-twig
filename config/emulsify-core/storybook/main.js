import { fileURLToPath } from 'url';
import path from 'path';

const _dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(_dirname, '../../../');

// Emulsify Core's own preview.js only merges a project override's `parameters`
// export (see src/storybook/preview-parameters.js) — it does not read
// `decorators`, `globalTypes`, or `tags`. Registering our preview.js as a
// Storybook `previewAnnotations` entry instead makes Storybook natively
// compose those alongside Emulsify Core's own preview.js.
//
// Emulsify Core's default `buildStoryGlobs()` only discovers `*.stories.js`
// files, not `.mdx` docs pages. Many components here only expose their
// interactive story via `tags: ['!dev']` (hidden from the sidebar) and rely
// on the component's `.mdx` doc page to embed it — so without this glob,
// those components show no docs page and no visible story at all.
export default {
  addons: [
    // Required to compile .mdx docs pages — Emulsify Core's default addon
    // set (a11y, links, themes) doesn't include it.
    '@storybook/addon-docs',
    // Local preset registering the Visreg sidebar-filter toggle (see
    // visreg-toggle-manager.js). Not part of the addon-docs package.
    path.resolve(_dirname, 'visreg-toggle-preset.js'),
  ],
};

export function extendConfig(config) {
  return {
    ...config,
    stories: [
      ...(config.stories || []),
      path.resolve(projectRoot, 'components/[0-9]*/**/*.mdx'),
    ],
    previewAnnotations: [
      ...(config.previewAnnotations || []),
      path.resolve(_dirname, 'preview.js'),
    ],
  };
}
