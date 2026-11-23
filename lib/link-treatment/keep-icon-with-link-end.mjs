/**
 * @file
 * Keeps a link's purpose icon on the line with the end of a long link.
 *
 * Split out of link-treatment.js so `node --test` can import it without
 * linkpurpose or Drupal (see keep-icon-with-link-end.test.mjs). It reads the
 * document and node types off the links it is given rather than from globals,
 * so it runs against any DOM.
 */

// linkpurpose leaves a last word this long out of its nowrap span.
const LONG_WORD_LENGTH = 30;

// How many characters of a long word stay on the line with the icon.
const ICON_TAIL_LENGTH = 4;

// A last word that is a web or email address rather than prose.
const ADDRESS = /:\/\/|^\s*www\.|@/i;

// Marks a link keepIconWithLinkEnd() has already looked at.
const CHECKED_ATTRIBUTE = 'data-link-purpose-end';

const segmenter =
  typeof Intl !== 'undefined' && Intl.Segmenter
    ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    : null;

/**
 * Split a string into user-perceived characters, so an emoji sequence or an
 * accent is never cut in half.
 *
 * @param {string} string - Text to split.
 *
 * @returns {string[]} - Its grapheme clusters, or code points as a fallback.
 */
const graphemes = (string) =>
  segmenter
    ? Array.from(segmenter.segment(string), ({ segment }) => segment)
    : Array.from(string);

/**
 * Find the last visible text before the icon, walking back the way
 * linkpurpose does: past hidden spans, comments and whitespace, and into the
 * last child of any other element.
 *
 * @param {Element} icon - The purpose icon.
 * @param {Element} anchor - The link holding it.
 *
 * @returns {Text|null} - The text node, or null if there is none.
 */
const lastTextBefore = (icon, anchor) => {
  let node = icon;

  while (node !== anchor) {
    if (!node.previousSibling) {
      node = node.parentNode;
    } else {
      node = node.previousSibling;
      while (
        node.nodeType === node.ELEMENT_NODE &&
        !node.matches('.sr-only, .visually-hidden') &&
        node.lastChild
      ) {
        node = node.lastChild;
      }
      if (node.nodeType === node.TEXT_NODE && node.textContent.trim()) {
        return node;
      }
    }
  }

  return null;
};

/**
 * Keep a link's purpose icon on the line with the end of a long link, while
 * the link itself can wrap (YaleSites-Internal#1953).
 *
 * linkpurpose holds the last word and the icon together in a nowrap span, but
 * leaves out a word of 30 or more characters (a pasted URL) and holds a
 * shorter URL unbreakable, so the icon can wrap onto a line by itself or the
 * URL can overflow. For a link ending in an address or an over-long word,
 * only its last few characters go in a nowrap span with the icon. A link
 * ending in ordinary prose keeps linkpurpose's markup exactly.
 *
 * @param {Document|Element} root - Where to look for treated links.
 */
export default function keepIconWithLinkEnd(root = document) {
  root
    .querySelectorAll(`a.link-purpose:not([${CHECKED_ATTRIBUTE}])`)
    .forEach((anchor) => {
      anchor.setAttribute(CHECKED_ATTRIBUTE, '');

      const icon = anchor.querySelector('.link-purpose-icon');
      const text = icon && lastTextBefore(icon, anchor);

      if (!text) {
        return;
      }

      const ownSpan = text.parentElement.closest('.link-purpose-last-word');
      const [, before, word, after] = text.textContent.match(
        /^([\s\S]*?)(\S+)(\s*)$/,
      );

      // Prose keeps linkpurpose's markup exactly. Its own span is only
      // reworked for an address; with no span, also for a word it skipped as
      // too long, measured with surrounding whitespace the way it measures.
      if (
        !ADDRESS.test(word) &&
        (ownSpan ||
          text.textContent.match(/\s*\S+\s*$/)[0].length < LONG_WORD_LENGTH)
      ) {
        return;
      }

      const chars = graphemes(word);

      if (chars.length <= ICON_TAIL_LENGTH) {
        return;
      }

      const head = chars.slice(0, -ICON_TAIL_LENGTH).join('');
      const tail = anchor.ownerDocument.createElement('span');
      tail.classList.add('link-purpose-nobreak');
      tail.append(chars.slice(-ICON_TAIL_LENGTH).join(''), icon);

      // The text stays in one element, so a flex or grid link still sees a
      // single item where it saw one before.
      if (ownSpan) {
        ownSpan.classList.remove('link-purpose-nobreak');
        text.textContent = head;
        text.after(tail);
      } else {
        const end = anchor.ownerDocument.createElement('span');
        end.classList.add('link-purpose-end');
        end.append(before + head, tail);
        text.replaceWith(end);
      }

      // Whitespace in front of the icon is a place to wrap, so move it out
      // of the link, as linkpurpose does with its own trailing whitespace.
      if (after) {
        anchor.after(' ');
      }
    });
}
