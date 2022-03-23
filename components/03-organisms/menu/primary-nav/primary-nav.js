Drupal.behaviors.primaryNav = {
  attach(context) {
    // Selectors
    const primaryNavToggles = context.querySelectorAll(
      '.primary-nav__toggle--level-0',
    );

    // Function to close dropdown when tabbing out of the expended menu.
    function tabOut(toggle, menu) {
      const parent = toggle.parentElement;
      const menuLinks = menu.querySelectorAll('.primary-nav__link');
      const lastItem = menuLinks[menuLinks.length - 1];

      parent.addEventListener('keydown', (e) => {
        const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
          return;
        }

        if (e.shiftKey) {
          if (document.activeElement === toggle) {
            // Close when shift-tabbing from the toggle element.
            toggle.setAttribute('aria-expanded', 'false');
          }
        } else if (document.activeElement === lastItem) {
          // Close when tabbing from the last nested item to a new top-level item.
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Function to toggle the open/closed state of the main menu.
    function toggleMenuState(target) {
      const ariaButtonState =
        target.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';

      // If opening an item, close all nav items.
      if (ariaButtonState === 'true') {
        primaryNavToggles.forEach((button) => {
          button.setAttribute('aria-expanded', 'false');
        });

        // Pass the expanded menu and related toggle to the tabOut function.
        tabOut(target, target.nextElementSibling);
      }

      // Set the button aria attribute.
      target.setAttribute('aria-expanded', ariaButtonState);
    }

    // Show/Hide menu on toggle click.
    primaryNavToggles.forEach((button) => {
      button.addEventListener('click', () => {
        toggleMenuState(button);
      });
    });
  },
};
