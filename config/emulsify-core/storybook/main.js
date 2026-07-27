import { fileURLToPath } from 'url';
import path from 'path';

const _dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(_dirname, '../../../');

export default {
  addons: [
    '@storybook/addon-docs', // Core's default addon set doesn't compile .mdx docs pages
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
      path.resolve(_dirname, 'preview-decorators.js'),
    ],
  };
}
