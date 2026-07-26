// Reorders .out/index.json's entries directly after a static `storybook
// build`. This is the actual fix for the sidebar ordering bug documented in
// config/emulsify-core/storybook/preview.js's `parameters.options.storySort`
// comment: that storySort config (tried as both the declarative array form
// and a comparator function) never reaches the manager bundle at all in
// this Storybook 10 + Vite + Emulsify Core setup — sb-manager/*.js has zero
// references to storySort in the built output either way.
//
// index.json is the static file the manager reads to build the sidebar
// tree, and JS/JSON object key order is preserved on iteration. Reordering
// the entries here, using the same priority logic Storybook's own
// mechanism was supposed to apply, produces the correct sidebar directly —
// sidestepping whatever's broken about the config-based path.
//
// Only fixes the static `storybook build` output (.out/), not `npm run
// storybook`'s dev server, which serves its story index dynamically rather
// than from this file.
import fs from 'fs';
import { storySortComparator } from '../config/emulsify-core/storybook/story-sort.mjs';

const indexPath = new URL('../.out/index.json', import.meta.url);

const raw = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const { entries } = raw;

const sortedIds = Object.keys(entries).sort((idA, idB) =>
  storySortComparator(entries[idA], entries[idB]),
);

const sortedEntries = {};
for (const id of sortedIds) {
  sortedEntries[id] = entries[id];
}

fs.writeFileSync(
  indexPath,
  JSON.stringify({ ...raw, entries: sortedEntries }, null, 2),
);
