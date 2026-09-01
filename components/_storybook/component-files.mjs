/**
 * What the guards under components/_storybook/ scan, and how they read it.
 *
 * Shared because the extension list is policy, not mechanics: it answers "which
 * files can carry an image URL or a remote host". Two guards ask that same
 * question (`no-third-party-images.test.mjs`, `fixture-asset-urls.test.mjs`), and
 * when the list lived in both, adding a format to one would silently narrow the
 * other -- the un-updated guard just stops scanning those files and keeps passing.
 * `VISREG_STORY_FILE` and `objectBody` are here for the same reason.
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
 * The filename convention that marks a story file as a visual-regression
 * subject. Policy, not mechanics, for the same reason `TEXT_FILE` is: more than
 * one guard asks "is this a visreg story file", and a second copy of the answer
 * would go stale silently -- the un-updated guard just matches nothing and keeps
 * passing.
 */
export const VISREG_STORY_FILE = /\.visreg\.stories\.js$/;

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

/** Bracket pairs `objectBody` knows how to balance. */
const CLOSER = { '{': '}', '[': ']' };

/**
 * Returns the body of the first object or array literal that follows
 * `declaration` in `source`, matched by counting brackets.
 *
 * The guards read Storybook config out of source text, because those modules
 * import `.scss` and `.twig` and cannot be loaded outside Vite. A regex cannot
 * do the extraction: the literal nests, so a non-greedy match stops at the first
 * inner closer -- `parameters` in the preview closes several keys before
 * `chromatic` is reached, and a CSS selector as ordinary as `a[href$=".zip"]`
 * closes an array of selectors early. Both mistakes leave a guard reading a
 * truncated body and passing on what it did not see.
 *
 * @param {string} source - File contents.
 * @param {string} declaration - Literal text that precedes the opening bracket.
 * @returns {string|null} The body, or null if the declaration is absent.
 */
export function objectBody(source, declaration) {
  const start = source.indexOf(declaration);
  if (start === -1) return null;

  const open = [...source.slice(start)].findIndex((char) => char in CLOSER);
  if (open === -1) return null;

  const from = start + open;
  const opener = source[from];
  const closer = CLOSER[opener];

  let depth = 0;
  for (let i = from; i < source.length; i += 1) {
    if (source[i] === opener) depth += 1;
    if (source[i] === closer) {
      depth -= 1;
      if (depth === 0) return source.slice(from + 1, i);
    }
  }
  return null;
}
