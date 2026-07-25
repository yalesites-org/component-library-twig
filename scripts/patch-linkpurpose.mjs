// linkpurpose (github:itmaybejj/linkpurpose) ships js/linkpurpose.js as a bare
// `class LinkPurpose {}` with no export statement at all — fine for the old
// webpack exports-loader shim, but Vite/Rollup need a real export.
//
// This runs on every `npm install` (postinstall), including installs where
// node_modules is restored from a build cache with this file already
// patched from a previous run. Unlike an appended patch-package diff, this
// check-before-write is idempotent regardless of how many times it runs.
import fs from 'fs';

const target = new URL(
  '../node_modules/linkpurpose/js/linkpurpose.js',
  import.meta.url,
);

const content = fs.readFileSync(target, 'utf8');

if (!content.includes('export default LinkPurpose')) {
  fs.appendFileSync(target, '\nexport default LinkPurpose;\n');
}
