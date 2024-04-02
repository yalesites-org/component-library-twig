Drupal.behaviors.bannerHeading = {
  attach(context) {
    // Find the body element
    const bodyElement = context.querySelector('body');

    // Find all elements matching grand-hero-banner__content-inner or cta-banner__text
    const bannerContainers = context.querySelectorAll(
      '.grand-hero-banner__content-inner, .cta-banner__text',
    );

    // Check if any of these elements contain an h1
    const hasH1 = Array.from(bannerContainers).some(
      (container) => container.querySelector('h1') !== null,
    );

    // If any of the containers have an h1, add the [data-banner-has-h1='true'] attribute to the body element
    if (hasH1) {
      bodyElement.setAttribute('data-banner-has-h1', 'true');
    }

    // Find layout-onecol layout-builder div
    const layoutOnecol = context.querySelector('.layout--onecol');

    // Check if layout-onecol contains breadcrumbs__wrapper
    // if it does add a has-breadcrumbs class to layout-onecol
    if (layoutOnecol && layoutOnecol.querySelector('.breadcrumbs__wrapper')) {
      layoutOnecol.classList.add('has-breadcrumbs');
    }
  },
};
