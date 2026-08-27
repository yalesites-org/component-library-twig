// Storybook's dev server (and its static build's index generation) both
// resolve `parameters.options.storySort` by statically reading the raw
// source text of <configDir>/preview.js (node_modules/@emulsify/core/.storybook/preview.js)
// and Babel-parsing it — it never executes the file. It only supports a
// literal array/object/function value there, and explicitly rejects a bare
// imported identifier ("Unexpected 'storySort'... should be defined inline").
// Core's preview.js currently assigns `parameters` via a CallExpression
// (mergePreviewParameters(...)), so the raw text doesn't even contain the
// substring "storySort" — the sidebar silently falls back to file-discovery
// order. This patch rewrites `parameters` into a literal object whose
// storySort is a self-contained inline function, embedding the actual
// ORDER_TREE/storySortComparator logic from story-sort.mjs verbatim (read at
// patch time, so story-sort.mjs stays the single source of truth) rather
// than hand-translating it into Storybook's separate declarative order
// format, whose tie-break semantics don't exactly match story-sort.mjs's
// path-length-aware comparator.
import fs from 'fs';

const storySortTarget = new URL(
  '../config/emulsify-core/storybook/story-sort.mjs',
  import.meta.url,
);
const previewTarget = new URL(
  '../node_modules/@emulsify/core/.storybook/preview.js',
  import.meta.url,
);

const storySortSource = fs
  .readFileSync(storySortTarget, 'utf8')
  .replace(/^export (const|function)/gm, '$1');

const inlineStorySort = `(a, b) => {
${storySortSource
  .split('\n')
  .map((line) => (line ? `    ${line}` : line))
  .join('\n')}
    return storySortComparator(a, b);
  }`;

const startMarker = '// YALESITES_STORYBOOK_STORY_SORT_INLINE START';
const endMarker = '// YALESITES_STORYBOOK_STORY_SORT_INLINE END';

const pristineBlock = `export const parameters = mergePreviewParameters(
  defaultParams,
  externalOverrides,
);`;

const patchedBlock = `${startMarker}
const mergedParameters = mergePreviewParameters(
  defaultParams,
  externalOverrides,
);
export const parameters = {
  ...mergedParameters,
  options: {
    ...(mergedParameters.options || {}),
    storySort: ${inlineStorySort},
  },
};
${endMarker}`;

const content = fs.readFileSync(previewTarget, 'utf8');

const sentinelPattern = new RegExp(
  `${startMarker}[\\s\\S]*?${endMarker}`,
);

let patched;
if (content.includes(pristineBlock)) {
  patched = content.replace(pristineBlock, patchedBlock);
} else if (sentinelPattern.test(content)) {
  patched = content.replace(sentinelPattern, patchedBlock);
} else {
  throw new Error(
    'patch-emulsify-core-storybook-story-sort: expected content not found in ' +
      `${previewTarget} — @emulsify/core may have changed shape. Check this script against the current file.`,
  );
}

fs.writeFileSync(previewTarget, patched);
