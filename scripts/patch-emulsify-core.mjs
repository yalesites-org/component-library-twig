// Shared patcher for the @emulsify/core files these scripts edit in place.
//
// Core hardcodes behaviour these projects need to change and offers no extension
// point for it, so the installed files are patched directly. Each script owns its
// anchors; this owns the mechanics.
import fs from 'fs';

/**
 * Applies replacements to a file, verifying each anchor separately.
 *
 * Checking only the combined result lets a half-applied patch through: if the
 * first anchor matches and a later one does not, the file is written partially
 * changed and the script still exits 0 -- which surfaces later as a render-time
 * error rather than a failed install.
 *
 * Idempotent: a file already containing `marker` is left alone.
 *
 * Two of the three patch scripts share this; patch-emulsify-core-storybook-story-sort
 * keeps its own mechanics because it needs a pristine-or-sentinel re-patch path.
 *
 * @param {object} options
 * @param {URL|string} options.target - File to patch.
 * @param {string} options.marker - String present only in a patched file.
 * @param {Array<{from: string, to: string}>} options.replacements - Applied in order.
 * @param {string} options.scriptName - Named in the error, so a failure says which
 *   patch script to go fix.
 */
export function patchFile({ target, marker, replacements, scriptName }) {
  const content = fs.readFileSync(target, 'utf8');

  if (content.includes(marker)) {
    return;
  }

  const patched = replacements.reduce((source, { from, to }) => {
    if (!source.includes(from)) {
      throw new Error(
        `${scriptName}: anchor not found in ${target}:\n  ${from}\n` +
          'The upstream file changed shape. Update this script against the current file.',
      );
    }

    // A replacer function is never scanned for $-patterns ($&, $1, $`), so an
    // injected snippet containing a dollar sign cannot be silently mangled.
    return source.replace(from, () => to);
  }, content);

  fs.writeFileSync(target, patched);
}
