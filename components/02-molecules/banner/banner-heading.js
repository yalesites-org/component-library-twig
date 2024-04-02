Drupal.behaviors.bannerHeading = {
  attach(context) {
    // Find the main-content div
    const mainContent = context.querySelector('.main-content');

    // Find all elements matching grand-hero-banner__content-inner or cta-banner__text
    const bannerContainers = context.querySelectorAll(
      '.grand-hero-banner__content-inner, .cta-banner__text',
    );

    // Check if any of these elements contain an h1
    const hasH1 = Array.from(bannerContainers).some(
      (container) => container.querySelector('h1') !== null,
    );

    // If any of the containers have an h1, add the banner-heading-is-h1 class to the main-content div
    if (hasH1) {
      mainContent.classList.add('banner-heading-is-h1');
    }

    // Find layout-onecol div
    const layoutOnecol = context.querySelector('.layout--onecol');

    // Check if layout-onecol contains breadcrumbs__wrapper
    if (layoutOnecol && layoutOnecol.querySelector('.breadcrumbs__wrapper')) {
      layoutOnecol.classList.add('has-breadcrumbs');
    }
  },
};
