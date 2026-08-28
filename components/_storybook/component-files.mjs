/**
 * The set of files under components/ that the fixture guards scan.
 *
 * Shared because the extension list is policy, not mechanics: it answers "which
 * files can carry an image URL or a remote host". Two guards ask that same
 * question (`no-third-party-images.test.mjs`, `fixture-asset-urls.test.mjs`), and
 * when the list lived in both, adding a format to one would silently narrow the
 * other -- the un-updated guard just stops scanning those files and keeps passing.
 *
 * This does not save any I/O: `node --test` runs each test file in its own
 * process, so each still reads the tree itself. It exists to keep one copy of the
 * policy.
 */
import path from 'node:path';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Absolute path to components/. */
export const componentsDir = path.dirname(
  fileURLToPath(new URL('.', import.meta.url)),
);

/** Absolute path to the project root. */
export const projectRoot = path.dirname(componentsDir);

/** File types that could carry an image URL or a remote host. */
const TEXT_FILE = /\.(yml|yaml|twig|js|mjs|json|mdx|md|scss|css|html)$/;

/**
 * @param {string} [excludePath] - Absolute path to omit, so a guard that names a
 *   banned string in its own source cannot police itself.
 * @returns {string[]} Absolute paths of every scannable file under components/.
 */
export function componentTextFiles(excludePath) {
  return readdirSync(componentsDir, { recursive: true })
    .filter((entry) => TEXT_FILE.test(entry))
    .map((entry) => path.join(componentsDir, entry))
    .filter((file) => file !== excludePath);
}
