/**
 * Comment stripping for SCSS and CSS source, shared by the scanners that read
 * stylesheets as text: the foreground-purity ratchet and the surface contract
 * here, and the link halo scope guard in `_storybook/link-halo-scope.mjs`.
 *
 * Kept in a module of its own, with no imports, so a scanner can use it
 * without loading `tokens.json` or a baseline file the way importing it from
 * `foreground-purity.mjs` would.
 *
 * @see strip-comments.test.mjs
 */

/**
 * Is the `//` at this offset part of a URL rather than the start of a comment?
 *
 * Preceded by `:` it is a scheme (`https://`); preceded by `(` it is a
 * protocol-relative URL (`url(//cdn/...)`). Everything else is a comment,
 * including a decorative `////////` banner at column zero.
 *
 * @param {string} source
 *   The source.
 * @param {number} index
 *   Offset of the first `/`.
 * @return {boolean}
 *   True if the slashes belong to a URL.
 */
export function isUrlSlashes(source, index) {
  const preceding = source[index - 1];
  return preceding === ':' || preceding === '(';
}

/**
 * Blank out comments, keeping line numbering intact.
 *
 * One pass over the source tracking string and comment state, rather than two
 * regex replaces, because the two comment forms can nest either way round and a
 * source-order-blind pass gets it wrong in both directions:
 *
 * - Block-comments-first blanks real code when a `//` line comment happens to
 *   contain `/*` -- everything up to the next `*` + `/` disappears. This repo's
 *   comment style writes worked examples routinely, so that is a live hazard.
 * - Line-comments-first eats the tail of any line containing a URL. Both
 *   `_yds-form.scss` and `_yds-select.scss` carry
 *   `background-image: url("data:image/svg+xml,...http://www.w3.org/2000/svg...")`
 *   and both are in the purity baseline, so that shape is really in the tree.
 *
 * Either way the symptom is the same and it is the worst one an enforcement
 * tool can have: it silently stops looking, and the build stays green.
 *
 * Newlines are preserved throughout -- block comments are blanked to spaces,
 * line comments are dropped up to but not including their newline -- so a hit's
 * reported line number still matches the file.
 *
 * @param {string} source
 *   SCSS or CSS.
 * @return {string}
 *   The source with every comment blanked.
 */
export function stripComments(source) {
  let output = '';
  let quote = null;
  let index = 0;

  while (index < source.length) {
    const char = source[index];
    const next = source[index + 1];

    if (quote) {
      output += char;
      if (char === '\\') {
        output += next ?? '';
        index += 2;
      } else {
        if (char === quote) quote = null;
        index += 1;
      }
    } else if (char === '"' || char === "'") {
      quote = char;
      output += char;
      index += 1;
    } else if (char === '/' && next === '*') {
      const close = source.indexOf('*/', index + 2);
      const block = source.slice(index, close === -1 ? undefined : close + 2);
      output += block.replace(/[^\n]/g, ' ');
      index += block.length;
    } else if (char === '/' && next === '/' && !isUrlSlashes(source, index)) {
      // Skip to (not past) the newline, so the line count is unchanged.
      const newline = source.indexOf('\n', index);
      index = newline === -1 ? source.length : newline;
    } else {
      output += char;
      index += 1;
    }
  }

  return output;
}
