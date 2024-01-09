Drupal = { behaviors: {} };
drupalSettings = {
  ys_links: {
    contextStart: ['body'],
    excludedClasses: [
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
    ],
    debug: false,
  },
};

require('./builders/copy_button_creator');
require('./builders/icon_creator');
require('./builders/sr_only_creator');

require('./link_types/download');
require('./link_types/external');
require('./link_types/internal');
require('./link_types/mailto');
require('./link_types/target_blank');
require('./link_types/telephone');

require('./link_renderer');

/**
 * @file
 * Yalesites link treatment js main entry point.
 */

(function init(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.debug = false;

  // Global way to handle debugging logs
  Drupal.ys_links.debugLog = (message) => {
    if (drupalSettings.ys_links.debug) {
      // eslint-disable-next-line no-console
      console.log(message);
    }
  };

  // Tests if the link has no icons already.
  Drupal.ys_links.hasNoIcon = (link) => {
    return link.querySelectorAll('.fa-icon').length === 0;
  };

  /* Looks at the next character after a link to determine if it is a
  punctuation.  In CKE text, we must append a class that will help render it
  closer to the link for looks. */
  Drupal.ys_links.punctuationAfter = (link) => {
    const punctuationRegex = /(\.|\?|!|”|"|'|,|\)|\]|-)$/;

    if (link.nextSibling === null) {
      return false;
    }

    const nextCharacter = link.nextSibling.textContent.trim()[0];

    return (
      nextCharacter !== undefined &&
      nextCharacter.match(punctuationRegex) !== null
    );
  };

  // Adds the punctuation modifier if it exists.
  Drupal.ys_links.addPunctuationSpacing = (link) => {
    if (Drupal.ys_links.punctuationAfter(link)) {
      link.classList.add('ys_punctuation-after');
    }

    return link;
  };

  // Attempts to detect if a link is inside of a component or not.
  // Based on this, we will determine whether to decorate it or not.
  Drupal.ys_links.isInComponent = (link) => {
    const component = link.closest(
      [
        '.component-wrapper',
        '[data-component-theme]',
        '[data-menu-variation]',
        '[data-component-width]',
      ].join(', '),
    );

    return component !== null;
  };

  // Runs a function on a link element and determines whether it has change or not.
  Drupal.ys_links.ifDidChange = (link, fn) => {
    link = fn(link);

    return link.changed;
  };

  // Adds a link class if the element was changed by our function.
  // This is a way to conditionally update the linkStyle and linkType
  // attributes and know if they were changed.  If they were, we probably want
  // the link class.  Otherwise, the link class messes up a lot of different
  // controls, which we might want to fix in the future.
  Drupal.ys_links.addLinkClassIfChanged = (link, fn) => {
    if (Drupal.ys_links.ifDidChange(link, fn)) {
      link.classList.add('link');
      link.changed = true;
    }

    return link;
  };

  // Applies the linkStyle if it isn't set and if it's not in a component
  Drupal.ys_links.applyLinkStyle = (link, style) => {
    if (!link.dataset.linkStyle && !Drupal.ys_links.isInComponent(link)) {
      link.dataset.linkStyle = style;
      link.changed = true;
    }

    return link;
  };

  // Applies the linkType if it isn't set and if it's not in a component
  Drupal.ys_links.applyLinkType = (link, type) => {
    if (!link.dataset.linkType && !Drupal.ys_links.isInComponent(link)) {
      link.dataset.linkType = type;
    }

    return link;
  };

  const getExclusionParams = (excludedClasses) => {
    let queryParams = 'a';
    if (excludedClasses.length > 0) {
      queryParams = `a:not(${excludedClasses})`;
    }

    // Exclude already decorated items.
    queryParams += ':not(:has(>i.fa-icon)';
    // Ensure we only get links that have hrefs on the tag.
    queryParams += ':not(:not([href]))';

    return queryParams;
  };

  const getContextParams = (contexts) => {
    return contexts.join(', ');
  };

  const defaultConfiguration = () => ({
    contextStart: ['#main-content'],
    excludedClasses: [],
    debug: true,
  });

  const setConfiguration = (newSettings) => {
    const settings = newSettings || defaultConfiguration();
    return Object.assign(defaultConfiguration(), settings);
  };

  const retrieveAllLinksFromContexts = (contexts, excludedClasses) => {
    return (
      contexts
        .map(function findLinks(linkContext) {
          return Array.from(
            linkContext.querySelectorAll(getExclusionParams(excludedClasses)),
          );
        })
        .flat() || []
    );
  };

  class ExecutionTimer {
    constructor() {
      this.start = new Date().getTime();
    }

    end() {
      const end = new Date().getTime();
      const time = end - this.start;
      Drupal.ys_links.debugLog(`Execution time: ${time}ms`);
    }
  }

  const getExecutionTimer = () => {
    if (drupalSettings.ys_links.debug) {
      return new ExecutionTimer();
    }

    return { end: () => {} };
  };

  const linkHasNoDecoration = (link) => {
    const linkContainsAnITag = link.querySelector('i') !== null;
    return !link.classList.contains('ys_linked') && !linkContainsAnITag;
  };

  Drupal.ys_links.attach = function attach(context, drupalSettings) {
    drupalSettings.ys_links = setConfiguration(drupalSettings.ys_links || {});

    const executionTimer = getExecutionTimer();

    Drupal.ys_links.debugLog('Drupal settings: ', drupalSettings.ys_links);

    const contextStart = getContextParams(
      [drupalSettings.ys_links.contextStart].flat(),
    );
    const pageContexts = Array.from(context.querySelectorAll(contextStart));
    const excludedClasses = drupalSettings.ys_links.excludedClasses.join(', ');

    const links = retrieveAllLinksFromContexts(pageContexts, excludedClasses);

    links.forEach(function findLinkRenderer(link) {
      if (linkHasNoDecoration(link)) {
        const linkRenderer = Drupal.ys_links.getLinkRenderer(link);
        linkRenderer(link);
      }
    });

    executionTimer.end();
  };

  document.addEventListener('DOMContentLoaded', function (_event) {
    Drupal.ys_links.attach(document, drupalSettings);
  });
})(Drupal, drupalSettings);
