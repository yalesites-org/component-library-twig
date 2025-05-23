// Global link treatment
import LinkPurpose from 'linkpurpose/js/linkpurpose';
import { link } from 'twig-drupal-filters/functions';

/**
 * Get selectors for download links.
 *
 * @param {array} extensions - File extensions to match. (optional)
 *
 * @returns {string} - Selector string.
 *
 * @example
 * getDownloadSelectors(['pdf', 'doc']) // Returns '[href$=".pdf"], [href*=".pdf?"], [href*=".pdf?"], [href$=".doc"], [href*=".doc?"], [href*=".doc?"]'
 */
function getDownloadSelectors(extensions = null) {
  const DEFAULT_EXTENSIONS = [
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'zip',
    'csv',
    'xml',
    'rtf',
  ];

  const possibleExtensions = extensions || DEFAULT_EXTENSIONS;

  return [
    `${possibleExtensions
      .map((ext) => `[href$=".${ext}"], [href*=".${ext}?"], [href*=".${ext}?"]`)
      .join(', ')}, [data-link-type="download"]`,
  ].join(', ');
}

// Only run once per page
let linkPurposeOnce;

Drupal.behaviors.linkPurpose = {
  attach(context) {
    if (
      context === document &&
      !linkPurposeOnce &&
      CSS.supports('selector(:is(body))')
    ) {
      linkPurposeOnce = true;

      // Get the protocol, domain, and port if it exists of the current request.
      const { protocol, hostname, port } = window.location;
      const domain = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

      const options = {
        domain,
        ignore: [
          '.site-header__yale-branding',
          '.site-footer__site-branding',
          '.social-links__link',
          '.toolbar-icon',
          '.site-header__site-branding',
          '.gin-breadcrumb__link',
          '.glb-button',
          '.meta-sidebar__trigger',
          '.node-page-layout-builder-form a',
          '.layout-builder__link',
          '.toolbar-menu a',
          'a:has(img)',
          'a.reference-card__image-link',
          'a.addtoany_share',
          'a.share-links__link',
        ].join(', '),
        purposes: {
          // These are listed in priority order

          newWindow: {
            priority: 0, // Higher numbers "win," e.g. external documents in new window will be marked as documents
            selector: '[target="_blank"]', // Which <a> tags will be marked
            message: 'Link opens in new window', // Hidden text for screen readers
            linkClass: 'link-purpose-window', // Goes on link
            iconWrapperClass: 'link-purpose-window-icon', // Goes on span around icon
            iconType: 'classes', // html, src or classes
            iconPosition: 'beforeend', // beforebegin, afterbegin, beforeend, afterend
            iconHTML:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M304 24c0 13.3 10.7 24 24 24H430.1L207 271c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l223-223V184c0 13.3 10.7 24 24 24s24-10.7 24-24V24c0-13.3-10.7-24-24-24H328c-13.3 0-24 10.7-24 24zM72 32C32.2 32 0 64.2 0 104V440c0 39.8 32.2 72 72 72H408c39.8 0 72-32.2 72-72V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V440c0 13.3-10.7 24-24 24H72c-13.3 0-24-10.7-24-24V104c0-13.3 10.7-24 24-24H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H72z"/></svg>',
            iconClasses: [
              'fa-icon',
              'fa-solid',
              'fa-arrow-up-right-from-square',
              'fa-fw',
            ], // Goes on icon span only if iconType is "classes"
          },

          external: {
            priority: 10,
            selector: '[href*="https://"], [href^="http://"]', // Protocol prefixes to be tested against the domain.
            additionalSelector: false, // Links that should always match, e.g. '[href^="/redirect-to/"]'
            newWindow: false,
            message: 'Link is external',
            linkClass: 'link-purpose-external',
            iconWrapperClass: 'link-purpose-external-icon',
            iconType: 'classes',
            iconPosition: 'beforeend',
            iconHTML:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M352 128c0-17.7-14.3-32-32-32L96 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l146.7 0L41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L288 205.3 288 352c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224z"/></svg>',
            iconClasses: ['fa-icon', 'fa-solid', 'fa-arrow-up-right', 'fa-fw'],
          },

          download: {
            priority: 20,
            selector: getDownloadSelectors(),
            message: 'Link downloads file',
            linkClass: 'link-purpose-download',
            iconWrapperClass: 'link-purpose-download',
            iconType: 'classes',
            iconPosition: 'beforeend',
            iconHTML:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304V160c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32v96H150.3C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z"/></svg>',
            iconClasses: ['fa-icon', 'fa-regular', 'fa-circle-down', 'fa-fw'], // set iconType to classes to use
          },

          document: {
            priority: 50,
            selector: '[data-never-get-to="true"]',
            message: 'Links downloads document', // filetype will be appended
            linkClass: 'link-purpose-document',
            iconWrapperClass: 'link-purpose-document-icon',
            iconType: 'classes',
            iconPosition: 'beforeend',
            iconHTML:
            '<svg class="linkpurpose-default-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z"/></svg>',
            iconClasses: ['fa-icon', 'fa-regular', 'fa-file-lines', 'fa-fw'], // set iconType to classes to use
          },

          // Ref www.iana.org/assignments/uri-schemes/uri-schemes.xhtml
          app: {
            priority: 90, // Unknown protocols generally win.
            selector: '[data-never-get-to="true"]',
            additionalSelector: false,
            newWindow: false,
            message: 'Link opens app',
            linkClass: 'link-purpose-app',
            iconWrapperClass: 'link-purpose-app-icon',
            iconType: 'classes',
            iconPosition: 'beforeend',
            iconHTML:
            '<svg class="linkpurpose-default-svg" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M432 64H208c-8.8 0-16 7.2-16 16V96H128V80c0-44.2 35.8-80 80-80H432c44.2 0 80 35.8 80 80V304c0 44.2-35.8 80-80 80H416V320h16c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16zM0 192c0-35.3 28.7-64 64-64H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192zm64 32c0 17.7 14.3 32 32 32H288c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32 14.3-32 32z"/></svg>',
            iconClasses: ['fa-icon', 'fa-solid', 'fa-window-restore', 'fa-fw'],
          },

          mail: {
            priority: 100, // Known protocol queries always win.
            selector: '[data-never-get-to="true"]',
            message: 'Link opens email app',
            linkClass: 'link-purpose-mailto',
            iconWrapperClass: 'link-purpose-mail-icon',
            iconType: 'classes',
            iconPosition: 'beforeend',
            iconHTML:
            '<svg class="linkpurpose-default-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>',
            iconClasses: ['fa-regular', 'fa-envelope', 'fa-fw'], // set iconType to classes to use
          },

          tel: {
            priority: 100, // Known protocol queries always win.
            selector: '[data-never-get-to="true"]',
            message: 'Link opens phone app',
            linkClass: 'link-purpose-tel',
            iconWrapperClass: 'link-purpose-tel-icon',
            iconType: 'classes',
            iconPosition: 'beforeend',
            iconHTML:
            '<svg class="linkpurpose-default-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"/></svg>',
            iconClasses: ['fa-icon', 'fa-solid', 'fa-square-phone', 'fa-fw'], // set iconType to classes to use
          },

          chevron: {
            priority: 100,
            selector: '[data-link-type="with-chevron"]',
            message: '',
            linkClass: 'link-purpose-chevron',
            iconWrapperClass: 'link-purpose-chevron-icon',
            iconType: 'classes',
            iconPosition: 'beforeend',
            iconHTML:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>',
            iconClasses: ['fa-icon', 'fa-solid', 'fa-angle-right', 'fa-fw'], // set iconType to classes to use
          },

          cas: {
            priority: 100,
            selector: '[data-link-type="cas-content"]',
            message: '',
            linkClass: 'link-purpose-cas',
            iconWrapperClass: 'link-purpose-cas-icon',
            iconType: 'classes',
            iconPosition: 'beforeend',
            iconHTML:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>',
            iconClasses: ['fa-icon', 'fa-solid', 'fa-lock'], // set iconType to classes to use
          },
        },
      };

      const linkPurpose = new LinkPurpose(options);
    }
  },
};
