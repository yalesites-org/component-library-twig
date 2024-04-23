// Global link treatment
import 'linkpurpose/css/linkpurpose.css';
import './link-treatment.css';
import { LinkPurpose } from 'exports-loader?exports=LinkPurpose!linkpurpose/js/linkpurpose';

const linkPurpose = new LinkPurpose({
  domain: 'http://localhost:6006',
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
        '<svg class="linkpurpose-default-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M432 48H208c-17.7 0-32 14.3-32 32V96H128V80c0-44.2 35.8-80 80-80H432c44.2 0 80 35.8 80 80V304c0 44.2-35.8 80-80 80H416V336h16c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32zM48 448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V256H48V448zM64 128H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64z"/></svg>',
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
        '<svg class="linkpurpose-default-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>',
      iconClasses: ['fa-icon', 'fa-solid', 'fa-arrow-up-right', 'fa-fw'],
    },

    download: {
      priority: 20,
      selector: '[data-link-type="download"]',
      message: 'Link downloads file',
      linkClass: 'link-purpose-download',
      iconWrapperClass: 'link-purpose-download',
      iconType: 'classes',
      iconPosition: 'beforeend',
      iconHTML:
        '<svg class="linkpurpose-default-svg" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>',
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
        '<svg class="linkpurpose-default-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z"/></svg>',
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
        '<svg class="linkpurpose-default-svg" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M432 64H208c-8.8 0-16 7.2-16 16V96H128V80c0-44.2 35.8-80 80-80H432c44.2 0 80 35.8 80 80V304c0 44.2-35.8 80-80 80H416V320h16c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16zM0 192c0-35.3 28.7-64 64-64H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192zm64 32c0 17.7 14.3 32 32 32H288c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32 14.3-32 32z"/></svg>',
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
        '<svg class="linkpurpose-default-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>',
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
        '<svg class="linkpurpose-default-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"/></svg>',
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
      iconHTML: '',
      iconClasses: ['fa-icon', 'fa-solid', 'fa-angle-right', 'fa-fw'], // set iconType to classes to use
    },
  },
});
