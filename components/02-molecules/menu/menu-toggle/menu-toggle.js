Drupal.behaviors.menuToggle = {
  attach(context) {
    // Selectors
    const menuToggle = context.querySelectorAll('.menu-toggle');
    const header = context.querySelector('.site-header');
    const headerOverlay = context.querySelector('.site-header__overlay');

    // Function to toggle the open/closed state of an element.
    function toggleMenuState(target, attribute) {
      const menuState =
        target.getAttribute(attribute) === 'closed' ? 'open' : 'closed';

      target.setAttribute(attribute, menuState);
    }

    // Show/Hide menu on toggle click.
    menuToggle.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        toggleMenuState(header, 'data-main-menu-state');
      });
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
