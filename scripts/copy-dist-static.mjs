// Static files Drupal reads out of dist/ that no build step produces.
//
// Vite only emits what a declared component tier imports, so anything consumed
// by URL or by PHP rather than by an import has to be copied here. The webpack
// build did this with CopyWebpackPlugin entries; those went away with
// webpack/plugins.js.
import fs from 'fs';

const root = new URL('../', import.meta.url);

const copies = [
  // atomic.libraries.yml expects the fontawesome CSS and webfonts verbatim at
  // dist/fonts, and assets/fonts is not under a component tier.
  { from: new URL('assets/fonts', root), to: new URL('dist/fonts', root) },
  // ys_themes' ColorTokenResolver reads
  // <atomic>/node_modules/@yalesites-org/component-library-twig/dist/tokens.json
  // directly from PHP to build the global-theme colour data. On a miss it logs a
  // warning and getGlobalThemeColors() returns [], which empties the Site Global
  // Theme colours across the site -- with no build error to explain why.
  {
    from: new URL(
      'node_modules/@yalesites-org/tokens/build/json/tokens.json',
      root,
    ),
    to: new URL('dist/tokens.json', root),
  },
];

copies.forEach(({ from, to }) => {
  if (!fs.existsSync(from)) {
    throw new Error(`Cannot copy into dist/: ${from.pathname} is missing.`);
  }
  fs.cpSync(from, to, { recursive: true });
});
