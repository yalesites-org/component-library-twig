// Reorders .out/index.json's entries after a static `storybook build`, since
// storySort (see preview.js) doesn't reach the manager bundle in this
// Storybook 10 + Vite setup. Only affects the static build — not the dev
// server, which serves its story index dynamically.
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
