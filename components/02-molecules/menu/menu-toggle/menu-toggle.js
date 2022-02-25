Drupal.behaviors.menuToggle = {
  attach(context) {
    // Selectors
    const menuToggle = context.querySelector('.menu-toggle');
    const header = context.querySelector('.site-header');
    const headerOverlay = context.querySelector('.site-header__overlay');

    // Function to toggle the open/closed state of the main menu.
    function toggleMenuState(target, attribute) {
      const menuState =
        target.getAttribute(attribute) === 'closed' ? 'open' : 'closed';
      const ariaButtonState =
        target.getAttribute(attribute) === 'closed' ? 'true' : 'false';

      // Set the menu state.
      target.setAttribute(attribute, menuState);

      // Set the button aria properties.
      menuToggle.setAttribute('aria-pressed', ariaButtonState);
      menuToggle.setAttribute('aria-expanded', ariaButtonState);
    }

    // Show/Hide menu on toggle click.
    menuToggle.addEventListener('click', () => {
      toggleMenuState(header, 'data-main-menu-state');
    });

    // Hide menu on escape key press.
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        if (header.getAttribute('data-main-menu-state') === 'open') {
          // Close the main menu if open.
          toggleMenuState(header, 'data-main-menu-state');
        }
      }
    });

    // Hide menu on overlay click.
    headerOverlay.addEventListener('click', () => {
      toggleMenuState(header, 'data-main-menu-state');
    });
  },
};
