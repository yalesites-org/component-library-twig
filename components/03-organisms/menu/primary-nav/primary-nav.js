Drupal.behaviors.primaryNav = {
  attach(context) {
    // Selectors
    const primaryNavToggles = context.querySelectorAll(
      '.primary-nav__toggle--level-0',
    );
    // const header = context.querySelector('.site-header');
    // const headerOverlay = context.querySelector('.site-header__overlay');

    // Function to toggle the open/closed state of the main menu.
    function toggleMenuState(target) {
      const ariaButtonState =
        target.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';

      // // Set the menu state.
      // target.setAttribute(attribute, menuState);

      // If opening an item, close all nav items.
      if (ariaButtonState === 'true') {
        primaryNavToggles.forEach((button) => {
          button.setAttribute('aria-expanded', 'false');
        });
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

    // // Hide menu on escape key press.
    // document.addEventListener('keyup', (e) => {
    //   if (e.key === 'Escape') {
    //     if (header.getAttribute('data-main-menu-state') === 'open') {
    //       // Close the main menu if open.
    //       toggleMenuState(header, 'data-main-menu-state');
    //     }
    //   }
    // });

    // // Hide menu on overlay click.
    // headerOverlay.addEventListener('click', () => {
    //   toggleMenuState(header, 'data-main-menu-state');
    // });
  },
};
