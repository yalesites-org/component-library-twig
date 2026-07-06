import { fileURLToPath } from 'url';
import path from 'path';

const _dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(_dirname, '../../../');

export default {
  addons: [
    '@storybook/addon-docs', // Core's default addon set doesn't compile .mdx docs pages
    '@chromatic-com/storybook', // Surfaces Chromatic visual test results in the Storybook UI
    path.resolve(_dirname, 'visreg-toggle-preset.js'),
  ],
};

export function extendConfig(config) {
  return {
    ...config,
    stories: [
      ...(config.stories || []),
      path.resolve(projectRoot, 'components/[0-9]*/**/*.mdx'),
      // Web Component (Lit + vanilla) demo stories; top-level only so we don't
      // scan web-components/node_modules.
      path.resolve(projectRoot, 'web-components/*.mdx'),
      path.resolve(projectRoot, 'web-components/*.stories.@(js|jsx|ts|tsx)'),
    ],
    previewAnnotations: [
      ...(config.previewAnnotations || []),
      path.resolve(_dirname, 'preview-decorators.js'),
    ],
  };
}
