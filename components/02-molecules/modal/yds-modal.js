import MicroModal from 'micromodal';

// WeakMap to store close handlers for cleanup
const closeHandlers = new WeakMap();

Drupal.behaviors.ysModal = {
  attach(context) {
    // Find all modals in the current context
    const modals = context.querySelectorAll('.micromodal-slide');

    if (modals.length > 0) {
      // Initialize MicroModal
      MicroModal.init({
        disableScroll: true,
        awaitCloseAnimation: true,
      });

      // Manually attach close handlers as a fallback
      // This ensures close buttons work even if MicroModal's auto-binding fails in Storybook
      modals.forEach((modal) => {
        const closeButtons = modal.querySelectorAll('[data-micromodal-close]');

        closeButtons.forEach((button) => {
          const closeHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Try MicroModal.close first
            MicroModal.close(modal.id);

            // Also manually close the modal as a fallback
            // This is necessary because MicroModal.close() doesn't always work in Storybook
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');

            // Re-enable scroll
            document.body.style.overflow = '';
          };

          // Remove previous handler if it exists
          const previousHandler = closeHandlers.get(button);
          if (previousHandler) {
            button.removeEventListener('click', previousHandler);
          }

          // Store and attach new handler
          closeHandlers.set(button, closeHandler);
          button.addEventListener('click', closeHandler);
        });
      });
    }
  },
};
