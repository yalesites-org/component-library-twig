/**
 * Pins the shared comment stripper (`strip-comments.mjs`) on the shapes that
 * broke the two-regex version it replaced.
 *
 * Run with the Node test runner:
 *   node --test components/00-tokens/colors/strip-comments.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { isUrlSlashes, stripComments } from './strip-comments.mjs';
import { stripComments as fromForegroundPurity } from './foreground-purity.mjs';

test('a line comment containing /* is only a line comment', () => {
  assert.equal(
    stripComments('// see tokens/*.scss\n.card a { color: red; }\n/* end */\n'),
    '\n.card a { color: red; }\n         \n',
  );
});

test('URL slashes are not a comment, in a scheme or a protocol-relative url()', () => {
  const source =
    '.a { background: url(//cdn.example.com/a.png); }\n' +
    '.b { background: url(https://example.com/b.png); } // note\n';
  assert.equal(
    stripComments(source),
    '.a { background: url(//cdn.example.com/a.png); }\n' +
      '.b { background: url(https://example.com/b.png); } \n',
  );
  assert.equal(isUrlSlashes('url(//x)', 4), true);
  assert.equal(isUrlSlashes('a:b //c', 4), false);
});

test('comment markers inside strings are kept', () => {
  assert.equal(
    stripComments(".a { content: '/* not // a comment */'; }"),
    ".a { content: '/* not // a comment */'; }",
  );
});

test('foreground-purity still exports the same stripComments', () => {
  assert.equal(fromForegroundPurity, stripComments);
});
