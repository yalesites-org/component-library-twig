// Minimal, self-contained build for the Wave 0 Web Component wrappers.
//
// Deliberately independent of the main webpack/Storybook build so it cannot
// disturb the existing component library pipeline. Produces distributable ESM
// with Lit bundled in, so a consumer needs no build step and no import map:
// just `import` the output file.
import { build } from 'esbuild';

const shared = {
  bundle: true,
  format: 'esm',
  target: 'es2020',
  sourcemap: true,
  logLevel: 'info',
};

const entries = [
  // Combined bundle — registers both elements.
  { entryPoints: ['src/index.js'], outfile: 'dist/yalesites-web-components.js', minify: true },
  // Per-component bundles for consumers who only want one element.
  { entryPoints: ['src/yds-divider.js'], outfile: 'dist/yds-divider.js', minify: true },
  { entryPoints: ['src/yds-accordion.js'], outfile: 'dist/yds-accordion.js', minify: true },
];

await Promise.all(entries.map((entry) => build({ ...shared, ...entry })));

console.log('Build complete -> web-components/dist/');
