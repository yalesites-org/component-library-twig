Drupal.behaviors.grandHero = {
  attach() {
    const header = document.querySelector('.site-header');
    document
      .getElementsByClassName('grand-hero-banner')[0]
      .style.setProperty('--site-header-height', header.offsetHeight);
  },
};
