Drupal.behaviors.primaryNav = {
  attach(context) {
    // Selectors
    const primaryNavToggles = context.querySelectorAll(
      '.primary-nav__toggle--level-0',
    );

    // Function to toggle the open/closed state of the main menu.
    function toggleMenuState(target) {
      const ariaButtonState =
        target.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';

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
  },
};
