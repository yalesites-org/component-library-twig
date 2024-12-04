Drupal.behaviors.secondaryMenuToggle = {
  attach(context) {
    // Selectors.
    const secondaryMenuToggle = context.querySelector('.secondary-menu-toggle');
    const sectionMenu = context.querySelector(
      '.in-this-section__secondary-nav',
    );
    const sectionWrapper = context.querySelector('.in-this-section');
    const sectionMenuToggleText = context.querySelector(
      '.secondary-menu-toggle__text',
    );

    // set default state
    sectionMenu.setAttribute('aria-expanded', false);
    sectionMenu.setAttribute('aria-hidden', true);
    sectionMenu.setAttribute('data-secondary-menu-state', 'closed');
    sectionWrapper.setAttribute('data-secondary-menu-state', 'closed');

    // Event listener.
    secondaryMenuToggle.addEventListener('click', () => {
      const state =
        sectionMenu.getAttribute('data-secondary-menu-state') === 'closed'
          ? 'open'
          : 'closed';

      sectionMenu.setAttribute('aria-expanded', state === 'open');
      sectionMenu.setAttribute('aria-hidden', state === 'closed');
      sectionMenu.setAttribute('data-secondary-menu-state', state);
      secondaryMenuToggle.setAttribute('aria-expanded', state === 'open');
      sectionWrapper.setAttribute('data-secondary-menu-state', state);
      sectionMenuToggleText.innerHTML =
        state === 'open' ? 'Close' : 'In This Section';
    });
  },
};
