import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// component-props.js is an ES module inside a CommonJS package, so Node cannot
// import it by path. Load its source as a module instead.
const source = readFileSync(
  new URL('./component-props.js', import.meta.url),
  'utf8',
);
const loaded = import(`data:text/javascript,${encodeURIComponent(source)}`);

test('labels become control.labels and keep the control type', async () => {
  const { toArgTypes } = await loaded;
  const { size } = toArgTypes({
    size: {
      name: 'Media Size',
      options: ['full', 'mini'],
      control: 'radio',
      labels: { full: 'Tall', mini: 'Mini' },
    },
  });
  assert.deepEqual(size.control, {
    type: 'radio',
    labels: { full: 'Tall', mini: 'Mini' },
  });
  assert.deepEqual(size.options, ['full', 'mini']);
});

test('no labels leaves control unchanged', async () => {
  const { toArgTypes } = await loaded;
  const { a, b } = toArgTypes({
    a: { name: 'A', control: 'text' },
    b: { name: 'B' },
  });
  assert.deepEqual(a.control, { type: 'text' });
  assert.equal('control' in b, false);
});
