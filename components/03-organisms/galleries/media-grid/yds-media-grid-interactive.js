// @TODO: Place focus on the active item when the modal is closed.

Drupal.behaviors.mediaGridInteractive = {
  attach(context) {
    const mediaGrids = context.querySelectorAll('.media-grid');
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    /**
     * trapKeyboard
     * @description traps keyboard focus when modal is active.
     * @param {HTMLElement} modal the active modal.
     */
    const trapKeyboard = (modal) => {
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
    };

    /**
     * toggleModalState
     * @description toggleModalState toggles modal state.
     * @param {HTMLElement} grid the relative grid.
     * @param {Enumerator} currentState the current state the modal is in.
     */
    const toggleModalState = (grid, currentState) => {
      const newState = currentState === 'inactive' ? 'active' : 'inactive';

      grid.setAttribute('data-media-grid-modal-state', newState);
    };

    /**
     * showSelectedItem
     * @description showSelectedItem makes the selected item visible in the modal.
     * @param {HTMLElement} grid the relevant grid.
     * @param {HTMLElement} item the selected item.
     */
    const showSelectedItem = (grid, item) => {
      const index = item.getAttribute('data-media-grid-item');
      const modalItems = grid.querySelectorAll('[data-media-grid-modal-item]');
      const activeModalItem = grid.querySelectorAll(
        `[data-media-grid-modal-item="${index}"]`,
      );

      // Hide inactive items.
      modalItems.forEach((modalItem) => {
        modalItem.removeAttribute('data-media-grid-modal-item-active');
      });

      // Show active item.
      activeModalItem.forEach((activeItem) => {
        activeItem.setAttribute('data-media-grid-modal-item-active', true);
      });
    };

    mediaGrids.forEach((grid) => {
      const modalState = grid.getAttribute('data-media-grid-modal-state');
      const items = grid.querySelectorAll('.media-grid__image');
      const modal = grid.querySelector('.media-grid__modal');
      const closeButton = grid.querySelector(
        '.media-grid-modal__control--close',
      );

      // Show modal when an item is clicked.
      items.forEach((item) => {
        item.addEventListener('click', () => {
          toggleModalState(grid, modalState);
          showSelectedItem(grid, item.closest('[data-media-grid-item]'));
          trapKeyboard(modal);
        });
      });

      // Navigate modal when "previous" or "next" buttons are clicked.
      // @TODO:

      // Navigate modal when left and right arrows are pressed.
      // @TODO:

      // Close modal when the "close" button is clicked.
      closeButton.addEventListener('click', () => {
        toggleModalState(grid, 'active');
      });

      // Close modal when the "backdrop" is clicked.
      window.addEventListener('click', (e) => {
        const classesToCheck = [
          'media-grid-modal__inner',
          'media-grid-modal__item',
        ];

        if (
          classesToCheck.some((className) =>
            e.target.classList.contains(className),
          )
        ) {
          toggleModalState(grid, 'active');
        }
      });

      // Close modal on escape key press.
      document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
          toggleModalState(grid, 'active');
        }
      });
    });
  },
};
