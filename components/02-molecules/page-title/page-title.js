Drupal.behaviors.bannerHeading = {
  attach() {
    // Page-level state, so read the document rather than `context`: a fragment
    // or a Storybook story root contains neither <body> nor, necessarily, the
    // page title.
    const bodyElement = document.body;
    const pageTitle = document.querySelector('.page-title');

    // If there is no page title or the page title is present but not visible, add an attribute to the body element
    if (pageTitle === null || !pageTitle.classList.contains('visible')) {
      bodyElement.setAttribute('page-title-hidden', 'true');
    }
  },
};
