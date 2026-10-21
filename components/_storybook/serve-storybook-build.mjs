/**
 * Serves a built Storybook (`.out`) over loopback HTTP for the browser checks.
 *
 * Shared by `measure-visreg-pixels.mjs` (the pixel-ceiling check) and
 * `check-link-halo.mjs` (the link halo and contrast check). Both need the same
 * three things -- the static server, the media block list, and the story URL --
 * and the first copy of each was written for the pixel check, so the comments
 * below still explain the choices in its terms. Moving them here changed no
 * behavior: the pixel check imports exactly what it used to define inline.
 *
 * Kept free of Puppeteer so a unit test can import it without a browser.
 */
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

/**
 * Mime types for the built Storybook.
 *
 * Broader than what a build emits today on purpose -- a component adding a
 * `.jpg` should not start being served as a byte stream. Media is absent
 * because `BLOCKED_MEDIA` stops it being requested at all.
 */
const MIME_TYPES = {
  '.css': 'text/css',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.map': 'application/json',
  '.mjs': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

/**
 * Media URLs to block, by extension.
 *
 * Wildcarded on both sides so a query string does not slip past.
 */
export const BLOCKED_MEDIA = [
  '*.m4a*',
  '*.mov*',
  '*.mp3*',
  '*.mp4*',
  '*.ogg*',
  '*.wav*',
  '*.webm*',
];

/**
 * Serves the built Storybook over loopback HTTP.
 *
 * Storybook's `iframe.html` does not render reliably from `file://`, and the
 * repo has no static-server dependency, so this is Node's own http module
 * rather than a new package.
 *
 * @param {string} root
 *   Directory to serve.
 * @return {Promise<{origin: string, close: function(): Promise<void>}>}
 *   The server's origin and a shutdown function.
 */
export async function serveDirectory(root) {
  const server = createServer(async (request, response) => {
    // A malformed escape (`%E0%A4%A`) makes `decodeURIComponent` throw, and
    // a throw here would be an unhandled rejection that takes the process
    // down, so it is answered as the bad request it is.
    let requested;
    try {
      requested = decodeURIComponent(
        new URL(request.url, 'http://localhost').pathname,
      );
    } catch {
      response.writeHead(400).end('Bad request');
      return;
    }
    const filePath = path.join(
      root,
      requested === '/' ? 'index.html' : requested,
    );

    // Refuse anything that escapes the served directory. Compared on path
    // segments, so a legitimate name that merely starts with dots is served.
    const relative = path.relative(root, filePath);
    if (
      relative === '..' ||
      relative.startsWith(`..${path.sep}`) ||
      path.isAbsolute(relative)
    ) {
      response.writeHead(403).end('Forbidden');
      return;
    }

    try {
      const stats = await stat(filePath);
      if (!stats.isFile()) {
        response.writeHead(404).end('Not found');
        return;
      }
      response.writeHead(200, {
        'Content-Type':
          MIME_TYPES[path.extname(filePath)] ?? 'application/octet-stream',
        'Content-Length': stats.size,
      });
      // Headers are already sent by now, so the surrounding catch cannot
      // recover -- but an unhandled stream error would take the process down.
      createReadStream(filePath)
        .on('error', () => response.destroy())
        .pipe(response);
    } catch {
      response.writeHead(404).end('Not found');
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  return {
    origin: `http://127.0.0.1:${server.address().port}`,
    close: () =>
      new Promise((resolve) => {
        server.close(resolve);
      }),
  };
}

/**
 * The URL that renders one story on its own, outside the Storybook manager.
 *
 * @param {string} origin
 *   Origin serving the built Storybook.
 * @param {string} id
 *   The story id from `index.json`.
 * @param {Object<string, string>} [globals]
 *   Storybook globals to set for this render, e.g. `{globalTheme: 'two'}`.
 *   Storybook reads them from the iframe URL as `globals=key:value;key:value`.
 * @return {string}
 *   The iframe URL.
 */
export function storyUrl(origin, id, globals = {}) {
  // The `:` and `;` separators are left unencoded -- they are Storybook's own
  // syntax -- and only the keys and values are escaped.
  const pairs = Object.entries(globals).map(
    ([key, value]) => `${encodeURIComponent(key)}:${encodeURIComponent(value)}`,
  );
  const globalsParam = pairs.length > 0 ? `&globals=${pairs.join(';')}` : '';

  return `${origin}/iframe.html?id=${encodeURIComponent(
    id,
  )}&viewMode=story${globalsParam}`;
}
