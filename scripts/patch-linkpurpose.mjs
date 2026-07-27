// linkpurpose ships js/linkpurpose.js with no export statement, which
// Vite/Rollup require. Runs on every install; idempotent so a cached
// node_modules doesn't get double-patched.
import fs from 'fs';

const target = new URL(
  '../node_modules/linkpurpose/js/linkpurpose.js',
  import.meta.url,
);

const content = fs.readFileSync(target, 'utf8');

if (!content.includes('export default LinkPurpose')) {
  fs.appendFileSync(target, '\nexport default LinkPurpose;\n');
}
