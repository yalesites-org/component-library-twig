/**
 * Pins keepIconWithLinkEnd(), which keeps a link's purpose icon on the line
 * with the end of a long link while the link itself can wrap.
 *
 * Run with the Node test runner:
 *   node --test lib/link-treatment/keep-icon-with-link-end.test.mjs
 *
 * Reported as YaleSites-Internal#1953. The helper runs after linkpurpose, so
 * every fixture here is real linkpurpose output: each test loads the shipped
 * linkpurpose script into a fresh jsdom window, lets it decorate the markup,
 * and only then calls the helper. Hand-built fixtures would pin our guess of
 * linkpurpose's markup rather than the markup the helper actually meets.
 *
 * What this cannot pin is layout: whether the icon really stays on the line
 * depends on a browser. That is what the `Atoms/Text/Visreg/Long URL In Body
 * Text` story is for.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';

import { JSDOM } from 'jsdom';

import keepIconWithLinkEnd from './keep-icon-with-link-end.mjs';

const require = createRequire(import.meta.url);

const linkpurposeSource = fs.readFileSync(
  require.resolve('linkpurpose/js/linkpurpose.js'),
  'utf8',
);

const LONG_URL = 'https://example.com/a-very-long-path-that-keeps-going';

/**
 * Render markup in a fresh jsdom window and decorate it with real linkpurpose.
 *
 * linkpurpose keeps its state on the class, so each call gets its own window.
 *
 * @param {string} html - Body markup.
 * @param {object} options - Extra linkpurpose options.
 *
 * @returns {Promise<Document>} - The decorated document.
 */
const decorate = async (html, options = {}) => {
  const { window } = new JSDOM(`<body>${html}</body>`, {
    runScripts: 'outside-only',
  });

  // linkpurpose defers its first run until the document has loaded.
  if (window.document.readyState !== 'complete') {
    await new Promise((resolve) => {
      window.addEventListener('load', resolve);
    });
  }

  // jsdom has no checkVisibility(), which linkpurpose calls for a last word
  // that follows an element. Nothing here is hidden by CSS.
  window.Element.prototype.checkVisibility ??= () => true;

  window.eval(`${linkpurposeSource}\nwindow.LinkPurpose = LinkPurpose;`);
  // eslint-disable-next-line no-new
  new window.LinkPurpose({
    domain: 'https://www.yale.edu',
    watch: false,
    ...options,
  });

  return window.document;
};

/**
 * Markup of an element with the helper's "already checked" marker removed, so
 * a link the helper only looked at compares equal to linkpurpose's output.
 *
 * @param {Element} element - Element to serialize.
 *
 * @returns {string} - Its inner HTML without the marker.
 */
const unmarked = (element) =>
  element.innerHTML.replaceAll(' data-link-purpose-end=""', '');

/**
 * The tail span the helper adds, checked to hold the icon.
 *
 * @param {Element} anchor - The treated link.
 *
 * @returns {Element} - Its `.link-purpose-nobreak` span.
 */
const tailOf = (anchor) => {
  const tails = anchor.querySelectorAll('.link-purpose-nobreak');
  assert.equal(tails.length, 1, 'exactly one nowrap span in the link');
  const [tail] = tails;
  assert.ok(
    tail.lastElementChild.matches('.link-purpose-icon'),
    'the icon ends the nowrap span',
  );
  return tail;
};

test('a long URL keeps only its last 4 characters with the icon', async () => {
  const document = await decorate(
    `<p>See <a href="${LONG_URL}">${LONG_URL}</a> today.</p>`,
  );
  const anchor = document.querySelector('a');
  const textBefore = anchor.textContent;

  // linkpurpose skips a word this long: the icon sits loose after the URL.
  assert.equal(anchor.querySelector('.link-purpose-nobreak'), null);

  keepIconWithLinkEnd(document);

  const tail = tailOf(anchor);
  assert.equal(tail.textContent, 'oing');

  const end = anchor.querySelector(':scope > .link-purpose-end');
  assert.ok(end, 'the URL text is wrapped in one .link-purpose-end span');
  assert.equal(end.textContent, LONG_URL, 'the whole URL is in that one span');
  assert.equal(end.firstChild.textContent, LONG_URL.slice(0, -4));
  assert.equal(tail.parentElement, end);
  assert.equal(anchor.textContent, textBefore, 'visible text is unchanged');
});

test('a short URL in its own nowrap span is split, and the span can wrap', async () => {
  const document = await decorate(
    '<p>Go to <a href="https://x.org/abc">https://x.org/abc</a>.</p>',
  );
  const anchor = document.querySelector('a');
  const ownSpan = anchor.querySelector('.link-purpose-last-word');
  const textBefore = anchor.textContent;

  assert.ok(ownSpan.classList.contains('link-purpose-nobreak'));

  keepIconWithLinkEnd(document);

  assert.ok(
    !ownSpan.classList.contains('link-purpose-nobreak'),
    "linkpurpose's span no longer holds the whole URL unbreakable",
  );
  assert.equal(ownSpan.firstChild.textContent, 'https://x.org');
  const tail = tailOf(anchor);
  assert.equal(tail.parentElement, ownSpan);
  assert.equal(tail.textContent, '/abc');
  assert.equal(anchor.textContent, textBefore);
});

test('a link ending in an ordinary word keeps linkpurpose markup exactly', async () => {
  const document = await decorate(
    '<p>Please <a href="https://example.com/report">read the annual report</a> now.</p>',
  );
  const paragraph = document.querySelector('p');
  const before = paragraph.innerHTML;

  keepIconWithLinkEnd(document);

  assert.equal(unmarked(paragraph), before);
});

test('a long word that is not an address is split', async () => {
  const word = 'Pneumonoultramicroscopicsilicovolcanoconiosis';
  const document = await decorate(
    `<p><a href="https://example.com/lung">Read about ${word}</a></p>`,
  );
  const anchor = document.querySelector('a');

  keepIconWithLinkEnd(document);

  assert.equal(tailOf(anchor).textContent, 'osis');
  assert.equal(
    anchor.querySelector('.link-purpose-end').textContent,
    `Read about ${word}`,
  );
});

test('a word linkpurpose skipped only with its leading space counted is split', async () => {
  // 29 characters; linkpurpose measures it as 30 with the space in front.
  const word = 'abcdefghijklmnopqrstuvwxyzabc';
  const document = await decorate(
    `<p><a href="https://example.com/x">Read ${word}</a></p>`,
  );
  const anchor = document.querySelector('a');

  assert.equal(anchor.querySelector('.link-purpose-last-word'), null);

  keepIconWithLinkEnd(document);

  assert.equal(tailOf(anchor).textContent, 'zabc');
});

test('an email address is split', async () => {
  const document = await decorate(
    '<p><a href="mailto:help@yale.edu">help@yale.edu</a></p>',
  );
  const anchor = document.querySelector('a');

  keepIconWithLinkEnd(document);

  assert.equal(tailOf(anchor).textContent, '.edu');
  assert.equal(anchor.textContent.startsWith('help@yale.edu'), true);
});

test('a www. address with no scheme is split', async () => {
  const document = await decorate(
    '<p>Visit <a href="https://www.example.org/">www.example.org</a></p>',
  );
  const anchor = document.querySelector('a');

  keepIconWithLinkEnd(document);

  assert.equal(tailOf(anchor).textContent, '.org');
  assert.ok(
    !anchor
      .querySelector('.link-purpose-last-word')
      .classList.contains('link-purpose-nobreak'),
  );
});

test('an emoji sequence at the end of a URL is not cut in half', async () => {
  const family = '\u{1F469}‍\u{1F469}‍\u{1F467}‍\u{1F466}';
  const url = `https://example.com/the-whole-family-${family}`;
  const document = await decorate(`<p><a href="${url}">${url}</a></p>`);
  const anchor = document.querySelector('a');

  keepIconWithLinkEnd(document);

  assert.equal(tailOf(anchor).textContent, `ly-${family}`);
  assert.equal(anchor.querySelector('.link-purpose-end').textContent, url);
});

test('a combining accent stays with its letter', async () => {
  const url = 'https://example.com/menu/cafés';
  const document = await decorate(`<p><a href="${url}">${url}</a></p>`);
  const anchor = document.querySelector('a');

  keepIconWithLinkEnd(document);

  assert.equal(tailOf(anchor).textContent, 'afés');
});

test('hidden text after the URL is skipped when finding its end', async () => {
  const document = await decorate(
    `<p><a href="${LONG_URL}">${LONG_URL}<span class="sr-only"> (PDF)</span></a></p>`,
  );
  const anchor = document.querySelector('a');

  keepIconWithLinkEnd(document);

  assert.equal(tailOf(anchor).textContent, 'oing');
  assert.equal(anchor.querySelector('.sr-only').textContent, ' (PDF)');
});

test('running twice changes nothing more, and marks every link', async () => {
  const document = await decorate(
    `<p><a href="${LONG_URL}">${LONG_URL}</a>
     <a href="https://x.org/abc">https://x.org/abc</a>
     <a href="https://example.com/r">the report</a></p>`,
  );

  keepIconWithLinkEnd(document);
  const once = document.body.innerHTML;
  keepIconWithLinkEnd(document);

  assert.equal(document.body.innerHTML, once);
  const anchors = [...document.querySelectorAll('a.link-purpose')];
  assert.equal(anchors.length, 3);
  anchors.forEach((anchor) => {
    assert.ok(anchor.hasAttribute('data-link-purpose-end'));
  });
  assert.equal(document.querySelectorAll('.link-purpose-end').length, 1);
});

test('an address of 4 or fewer characters is left alone', async () => {
  const document = await decorate('<p><a href="mailto:a@b">a@b</a></p>');
  const paragraph = document.querySelector('p');
  const before = paragraph.innerHTML;

  keepIconWithLinkEnd(document);

  assert.equal(unmarked(paragraph), before);
  assert.ok(paragraph.querySelector('a').hasAttribute('data-link-purpose-end'));
});

test('a link with no icon is left alone', async () => {
  const document = await decorate(
    `<p><a class="no-icon" href="${LONG_URL}">${LONG_URL}</a></p>`,
    { hideIcon: '.no-icon' },
  );
  const paragraph = document.querySelector('p');
  const before = paragraph.innerHTML;

  assert.ok(paragraph.querySelector('a.link-purpose'));

  keepIconWithLinkEnd(document);

  assert.equal(unmarked(paragraph), before);
});

test('a link with no visible text is left alone', async () => {
  const document = await decorate(
    '<p><a href="https://example.com/x"><span class="sr-only">Example</span></a></p>',
  );
  const paragraph = document.querySelector('p');
  const before = paragraph.innerHTML;

  assert.ok(paragraph.querySelector('.link-purpose-icon'));

  keepIconWithLinkEnd(document);

  assert.equal(unmarked(paragraph), before);
});

test('whitespace before the icon moves out of the link', async () => {
  const document = await decorate(
    `<p><a href="${LONG_URL}">${LONG_URL} </a>next</p>`,
  );
  const anchor = document.querySelector('a');

  keepIconWithLinkEnd(document);

  assert.equal(anchor.querySelector('.link-purpose-end').textContent, LONG_URL);
  assert.equal(tailOf(anchor).textContent, 'oing');
  assert.equal(anchor.nextSibling.nodeValue, ' ');
  assert.equal(anchor.nextSibling.nextSibling.nodeValue, 'next');
});
