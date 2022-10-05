// @TODO: Place focus on the active item when the modal is closed.

Drupal.behaviors.mediaGridInteractive = {
  attach(context) {
    const mediaGrids = context.querySelectorAll('.media-grid');
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // Function to trap focus when modal is active.
    function trapKeyboard(modal) {
      const focusableModalElements = modal.querySelectorAll(focusableElements);
      const firstFocusableElement = focusableModalElements[0];
      const lastFocusableElement =
        focusableModalElements[focusableModalElements.length - 1];

      // Set initial focus inside modal when opened.
      firstFocusableElement.focus();

      modal.addEventListener('keydown', (e) => {
        const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
          return;
        }

        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();

            lastFocusableElement.focus();
          }
        } else if (document.activeElement === lastFocusableElement) {
          e.preventDefault();

          firstFocusableElement.focus();
        }
      });
    }

    /**
     * toggleModalState
     * @function toggleModalState toggles modal state
     */
    const toggleModalState = (state) => {
      return state === 'inactive' ? 'active' : 'inactive';
    };

    mediaGrids.forEach((grid) => {
      const modalState = grid.getAttribute('data-media-grid-modal-state');
      const items = grid.querySelectorAll('.media-grid__image');
      const modal = grid.querySelector('.media-grid__modal');

      items.forEach((item) => {
        item.addEventListener('click', () => {
          grid.setAttribute(
            'data-media-grid-modal-state',
            toggleModalState(modalState),
          );
          trapKeyboard(modal);
        });
      });
    });

    // Close modal on escape key press
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        const activeModals = context.querySelectorAll(
          '[data-media-grid-modal-state="active"',
        );
        activeModals.forEach((modal) => {
          modal.setAttribute(
            'data-media-grid-modal-state',
            toggleModalState('active'),
          );
        });
      }
    });
  },
};
