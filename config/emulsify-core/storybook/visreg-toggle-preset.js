import { fileURLToPath } from 'url';
import path from 'path';

const _dirname = path.dirname(fileURLToPath(import.meta.url));

export function managerEntries(entry = []) {
  return [...entry, path.resolve(_dirname, 'visreg-toggle-manager.js')];
}
