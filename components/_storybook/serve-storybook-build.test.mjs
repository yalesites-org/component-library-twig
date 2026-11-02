/**
 * Pins the static server and story URL shared by the browser checks
 * (`serve-storybook-build.mjs`), which import it without a browser.
 *
 * Run with the Node test runner:
 *   node --test components/_storybook/serve-storybook-build.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { request } from 'node:http';
import os from 'node:os';
import path from 'node:path';

import { serveDirectory, storyUrl } from './serve-storybook-build.mjs';

test('storyUrl without globals renders the story on its own', () => {
  assert.equal(
    storyUrl('http://127.0.0.1:1234', 'molecules-cards--card'),
    'http://127.0.0.1:1234/iframe.html?id=molecules-cards--card&viewMode=story',
  );
});

test('storyUrl encodes globals as key:value;key:value, escaping only keys and values', () => {
  assert.equal(
    storyUrl('http://127.0.0.1:1234', 'a b', {
      globalTheme: 'two',
      'odd key': 'x;y:z',
    }),
    'http://127.0.0.1:1234/iframe.html?id=a%20b&viewMode=story' +
      '&globals=globalTheme:two;odd%20key:x%3By%3Az',
  );
});

/**
 * A raw GET, so the path reaches the server exactly as written: `fetch` and
 * `new URL` would normalise `/../` away before it left the client.
 */
const get = (origin, rawPath) =>
  new Promise((resolve, reject) => {
    const { hostname, port } = new URL(origin);
    const req = request({ hostname, port, path: rawPath }, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () =>
        resolve({
          status: response.statusCode,
          type: response.headers['content-type'],
          body,
        }),
      );
    });
    req.on('error', reject);
    req.end();
  });

test('serveDirectory serves the build and refuses what is outside it', async (t) => {
  const parent = await mkdtemp(
    path.join(process.env.TMPDIR ?? os.tmpdir(), 'serve-build-'),
  );
  const root = path.join(parent, 'out');
  await mkdir(path.join(root, 'sub'), { recursive: true });
  await writeFile(path.join(root, 'index.html'), '<p>index</p>');
  await writeFile(path.join(root, 'sub', 'app.js'), 'export {};');
  await writeFile(path.join(parent, 'secret.txt'), 'secret');

  const server = await serveDirectory(root);
  t.after(async () => {
    await server.close();
    await rm(parent, { recursive: true, force: true });
  });

  const index = await get(server.origin, '/');
  assert.equal(index.status, 200);
  assert.equal(index.type, 'text/html; charset=utf-8');
  assert.equal(index.body, '<p>index</p>');

  const script = await get(server.origin, '/sub/app.js?v=1');
  assert.equal(script.status, 200);
  assert.equal(script.type, 'text/javascript');

  assert.equal((await get(server.origin, '/missing.css')).status, 404);
  assert.equal((await get(server.origin, '/sub')).status, 404);

  // A literal or percent-encoded `..` segment is resolved by the URL parser
  // before the server sees it, so it can only land inside the build.
  await Promise.all(
    ['/../secret.txt', '/%2e%2e/secret.txt'].map(async (dots) => {
      assert.equal((await get(server.origin, dots)).status, 404, dots);
    }),
  );
  // An encoded slash hides `..` from the URL parser; decoded, it would climb
  // out of the build, so the server's own guard refuses it.
  await Promise.all(
    [
      '/..%2Fsecret.txt',
      '/%2e%2e%2fsecret.txt',
      '/sub/..%2F..%2Fsecret.txt',
    ].map(async (escape) => {
      const response = await get(server.origin, escape);
      assert.equal(response.status, 403, escape);
      assert.notEqual(response.body, 'secret', escape);
    }),
  );
  // An absolute path is joined under the build, never read from the disk root.
  const absolute = `/${encodeURIComponent(path.join(parent, 'secret.txt'))}`;
  assert.equal((await get(server.origin, absolute)).status, 404);

  // A malformed escape is the client's mistake, not a crash.
  assert.equal((await get(server.origin, '/%E0%A4%A.js')).status, 400);
  assert.equal((await get(server.origin, '/%')).status, 400);
  // The server is still up afterwards.
  assert.equal((await get(server.origin, '/')).status, 200);
});
