import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Static files Drupal reads out of dist/ that no import produces.
//
// Vite emits only what a declared component tier imports, so anything consumed by
// URL or from PHP has to be copied in. The webpack build did this with
// CopyWebpackPlugin entries, which left with webpack/plugins.js.
//
// This has to be a plugin rather than a step chained after `vite build`, because
// Vite empties outDir at the start of EVERY build in a watch session -- so
// `npm run vite` / `npm run develop` would delete these on each rebuild and never
// put them back, taking fontawesome and the Site Global Theme colours out of the
// local Drupal site. `writeBundle` runs per build, so watch mode is covered too.
// Same hook and `enforce: 'post'` as Core's own emulsify-copy-all-src-assets.
const copyStaticDistFiles = () => {
  let outDir = 'dist';

  return {
    name: 'yalesites-copy-static-dist-files',
    apply: 'build',
    enforce: 'post',

    configResolved(config) {
      outDir = config.build?.outDir || 'dist';
    },

    writeBundle() {
      const copies = [
        {
          // atomic.libraries.yml expects the fontawesome CSS and webfonts verbatim
          // at dist/fonts, and assets/fonts is not under a component tier.
          from: path.resolve('assets/fonts'),
          to: path.join(outDir, 'fonts'),
        },
        {
          // ys_themes' ColorTokenResolver reads dist/tokens.json straight off disk
          // to build the global-theme colour data. On a miss it logs a warning and
          // getGlobalThemeColors() returns [], which empties the Site Global Theme
          // colours site-wide with no build error to explain why. Resolved through
          // require rather than a literal node_modules path, the way the stories
          // and playground-utils resolve the same file.
          from: require.resolve('@yalesites-org/tokens/build/json/tokens.json'),
          to: path.join(outDir, 'tokens.json'),
        },
      ];

      copies.forEach(({ from, to }) => {
        if (!fs.existsSync(from)) {
          throw new Error(`Cannot copy into ${outDir}/: ${from} is missing.`);
        }
        fs.cpSync(from, to, { recursive: true });
      });
    },
  };
};

// yalesites-project's build runs `npm ci --ignore-scripts`, so postinstall
// patches never apply there. linkpurpose ships with no export statement at
// all; patch it at transform time instead, since that runs regardless of
// how node_modules was installed.
const patchLinkpurpose = () => ({
  name: 'patch-linkpurpose-default-export',
  transform(code, id) {
    if (!id.includes('linkpurpose/js/linkpurpose.js')) return null;
    if (code.includes('export default LinkPurpose')) return null;
    return `${code}\nexport default LinkPurpose;\n`;
  },
});

export default [patchLinkpurpose(), copyStaticDistFiles()];

export const extendConfig = (config, { env }) => ({
  optimizeDeps: {
    // Dep pre-bundling is esbuild, which skips the transform hook above, so a
    // pre-bundled linkpurpose keeps the missing default export in dev.
    exclude: ['linkpurpose/js/linkpurpose'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['node_modules'], // Dart Sass has no bundler alias for the webpack-only `~` prefix
      },
    },
  },
  resolve: {
    alias: {
      // @storybook/blocks moved into @storybook/addon-docs as of Storybook 9
      '@storybook/blocks': '@storybook/addon-docs/blocks',
    },
  },
  build: {
    rollupOptions: {
      input: {
        // lib/ and the root style.scss sit outside the declared component
        // tiers, so Core's own entry scan never picks them up. atomic's
        // Drupal libraries expect all three as top-level dist/ files.
        'css/style': path.resolve(env.projectDir, 'components/style.scss'),
        'css/link-treatment': path.resolve(
          env.projectDir,
          'lib/link-treatment/link-treatment.scss',
        ),
        'js/link-treatment': path.resolve(
          env.projectDir,
          'lib/link-treatment/link-treatment.js',
        ),
      },
    },
  },
});
