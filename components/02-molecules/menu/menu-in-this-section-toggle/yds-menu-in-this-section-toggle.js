Drupal.behaviors.secondaryMenuToggle = {
  attach(context) {
    const toggleMenu = () => {
      // Selectors.
      const secondaryMenuToggle = context.querySelector(
        '.secondary-menu-toggle',
      );
      const sectionMenu = context.querySelector('.in-this-section__inner');
      const sectionWrapper = context.querySelector('.in-this-section');
      const sectionMenuToggleText = context.querySelector(
        '.secondary-menu-toggle__text',
      );

      // Apply only up to a max-width of 991px
      if (window.innerWidth <= 991) {
        // set default state
        sectionMenu.setAttribute('aria-expanded', false);
        sectionMenu.setAttribute('aria-hidden', true);
        sectionWrapper.setAttribute('data-secondary-menu-state', 'closed');

        // Event listener.
        secondaryMenuToggle.addEventListener('click', () => {
          const state =
            sectionWrapper.getAttribute('data-secondary-menu-state') ===
            'closed'
              ? 'open'
              : 'closed';

          sectionMenu.setAttribute('aria-expanded', state === 'open');
          sectionMenu.setAttribute('aria-hidden', state === 'closed');
          secondaryMenuToggle.setAttribute('aria-expanded', state === 'open');
          sectionWrapper.setAttribute('data-secondary-menu-state', state);
          sectionMenuToggleText.innerHTML =
            state === 'open' ? 'Close' : 'In This Section';
        });
      } else {
        sectionMenu.setAttribute('aria-expanded', true);
        sectionMenu.removeAttribute('aria-hidden');
        sectionWrapper.setAttribute('data-secondary-menu-state', 'loaded');
        sectionWrapper.setAttribute(
          'data-in-this-section-overflow',
          'expanded',
        );
      }
    };

    // Initial call
    toggleMenu();

    // Call on resize
    window.addEventListener('resize', toggleMenu);
  },
};
