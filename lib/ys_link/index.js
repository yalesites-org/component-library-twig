import './config';
import './builders/copy_button_creator';
import './builders/icon_creator';
import './builders/sr_only_creator';

import './link_types/download';
import './link_types/external';
import './link_types/internal';
import './link_types/mailto';
import './link_types/target-blank';
import './link_types/telephone';

import './link_renderer';

/**
 * @file
 * Yalesites link treatment js main entry point.
 */

(function init(ysLinks, ysLinkSettings) {
  ysLinks = ysLinks || {};
  ysLinks.debug = false;

  // Global way to handle debugging logs
  ysLinks.debugLog = (message) => {
    if (ysLinkSettings.debug) {
      // eslint-disable-next-line no-console
      console.log(message);
    }
  };

  // Tests if the link has no icons already.
  ysLinks.hasNoIcon = (link) => {
    return link.querySelectorAll('.fa-icon').length === 0;
  };

  /* Looks at the next character after a link to determine if it is a
  punctuation.  In CKE text, we must append a class that will help render it
  closer to the link for looks. */
  ysLinks.punctuationAfter = (link) => {
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
  ysLinks.addPunctuationSpacing = (link) => {
    if (ysLinks.punctuationAfter(link)) {
      link.classList.add('ys_punctuation-after');
    }

    return link;
  };

  // Attempts to detect if a link is inside of a component or not.
  // Based on this, we will determine whether to decorate it or not.
  ysLinks.isInComponent = (link) => {
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
  ysLinks.ifDidChange = (link, fn) => {
    link = fn(link);

    return link.changed;
  };

  // Adds a link class if the element was changed by our function.
  // This is a way to conditionally update the linkStyle and linkType
  // attributes and know if they were changed.  If they were, we probably want
  // the link class.  Otherwise, the link class messes up a lot of different
  // controls, which we might want to fix in the future.
  ysLinks.addLinkClassIfChanged = (link, fn) => {
    if (ysLinks.ifDidChange(link, fn)) {
      link.classList.add('link');
      link.changed = true;
    }

    return link;
  };

  // Applies the linkStyle if it isn't set and if it's not in a component
  ysLinks.applyLinkStyle = (link, style) => {
    if (!link.dataset.linkStyle && !ysLinks.isInComponent(link)) {
      link.dataset.linkStyle = style;
      link.changed = true;
    }

    return link;
  };

  // Applies the linkType if it isn't set and if it's not in a component
  ysLinks.applyLinkType = (link, type) => {
    if (!link.dataset.linkType && !ysLinks.isInComponent(link)) {
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
    queryParams += ':not(:has(>i.fa-icon))';
    // Exclude already decorated items with svgs.
    queryParams += ':not(:has(>svg.fa-icon-svg))';
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
      ysLinks.debugLog(`Execution time: ${time}ms`);
    }
  }

  const getExecutionTimer = () => {
    if (ysLinkSettings.debug) {
      return new ExecutionTimer();
    }

    return { end: () => {} };
  };

  const linkHasNoDecoration = (link) => {
    const linkContainsAnITag = link.querySelector('i') !== null;
    return !link.classList.contains('ys_linked') && !linkContainsAnITag;
  };

  ysLinks.attach = function attach(context, ysLinkSettings) {
    ysLinkSettings = setConfiguration(ysLinkSettings || {});

    const executionTimer = getExecutionTimer();

    ysLinks.debugLog('Drupal settings: ', ysLinkSettings);

    const contextStart = getContextParams([ysLinkSettings.contextStart].flat());
    const pageContexts = Array.from(context.querySelectorAll(contextStart));
    const excludedClasses = ysLinkSettings.excludedClasses.join(', ');

    const links = retrieveAllLinksFromContexts(pageContexts, excludedClasses);

    links.forEach(function findLinkRenderer(link) {
      if (linkHasNoDecoration(link)) {
        const linkRenderer = ysLinks.getLinkRenderer(link);
        linkRenderer(link);
      }
    });

    executionTimer.end();
  };

  document.addEventListener('DOMContentLoaded', function (_event) {
    ysLinks.attach(document, ysLinkSettings);
  });
})(ysLinks, ysLinkSettings);
