// Reorders .out/index.json's entries after a static `storybook build`.
//
// Belt and braces: the postinstall story-sort patch makes Storybook's own indexer
// apply the same comparator, but that patch does not run under
// `npm ci --ignore-scripts` (which is how yalesites-project builds this package),
// and the sidebar order is part of the acceptance bar. Running the comparator here
// too makes the built order independent of whether the patch applied. Both paths
// share one comparator, so this pass is idempotent when it already ran.
//
// Static build only -- the dev server serves its story index dynamically.
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
