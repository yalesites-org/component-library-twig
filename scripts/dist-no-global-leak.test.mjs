// Classic (non-module) dist/js scripts must not add top-level names to the page.
// Requires a built dist/ (npm run build), like the other scripts/*.test.mjs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { wrapClassicScript } from '../config/emulsify-core/vite/plugins.mjs';

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return p.endsWith('.js') ? [p] : [];
  });

const isModule = (src) => /^(import|export)[\s{*]/m.test(src);

test('classic dist/js scripts are wrapped in an IIFE', () => {
  const unwrapped = walk('dist/js').filter((f) => {
    const src = fs.readFileSync(f, 'utf8');
    const empty = !src.replace(/\/\/# sourceMappingURL=.*/, '').trim();
    return !empty && !isModule(src) && !src.startsWith('(function(){');
  });
  assert.deepEqual(unwrapped, []);
});

test('wrapClassicScript leaves ES modules alone and wraps classic chunks', () => {
  const classic = {
    isEntry: true,
    imports: [],
    dynamicImports: [],
    exports: [],
  };
  assert.equal(
    wrapClassicScript('let a=1;', classic).code,
    '(function(){let a=1;\n})();',
  );
  assert.equal(wrapClassicScript('x', { ...classic, imports: ['a.js'] }), null);
  assert.equal(wrapClassicScript('x', { ...classic, exports: ['d'] }), null);
  assert.equal(wrapClassicScript('x', { ...classic, isEntry: false }), null);
});
