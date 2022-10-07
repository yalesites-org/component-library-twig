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

    mediaGrids.forEach((grid) => {
      const modalState = grid.getAttribute('data-media-grid-modal-state');
      const items = grid.querySelectorAll('.media-grid__image');
      const modal = grid.querySelector('.media-grid__modal');
      const controls = grid.querySelectorAll('.media-grid-modal__control');
      const itemCount = grid.querySelectorAll('[data-media-grid-item]').length;
      let activeIndex;

      /**
       * toggleModalState
       * @description toggleModalState toggles modal state.
       * @param {Enumerator} currentState the current state the modal is in.
       */
      const toggleModalState = (currentState) => {
        const newState = currentState === 'inactive' ? 'active' : 'inactive';

        grid.setAttribute('data-media-grid-modal-state', newState);
      };

      /**
       * showSelectedItem
       * @description showSelectedItem makes the selected item visible in the modal.
       * @param {Number} index the item number of the item to show.
       */
      const showSelectedItem = (index) => {
        activeIndex = index;

        const modalItems = grid.querySelectorAll(
          '[data-media-grid-modal-item]',
        );
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

      // Show modal when an item is clicked.
      items.forEach((item) => {
        item.addEventListener('click', () => {
          const index = item
            .closest('[data-media-grid-item]')
            .getAttribute('data-media-grid-item');
          toggleModalState(modalState);
          showSelectedItem(index);
          trapKeyboard(modal);
        });
      });

      // Handle modal control clicks.
      controls.forEach((control) => {
        control.addEventListener('click', () => {
          switch (true) {
            // Navigate to the previous item.
            case /--previous/.test(control.className):
              if (activeIndex === 1) {
                showSelectedItem(itemCount);
              } else {
                showSelectedItem(+activeIndex - 1);
              }
              break;
            // Navigate to the next item.
            case /--next/.test(control.className):
              if (activeIndex === itemCount) {
                showSelectedItem(1);
              } else {
                showSelectedItem(+activeIndex + 1);
              }
              break;
            // Close modal when the "close" button is clicked.
            case /--close/.test(control.className):
              toggleModalState('active');
              break;
            default:
              break;
          }
        });
      });

      // Close modal when the "backdrop" is clicked.
      grid.addEventListener('click', (e) => {
        const classesToCheck = [
          'media-grid-modal__inner',
          'media-grid-modal__item',
        ];

        if (
          classesToCheck.some((className) =>
            e.target.classList.contains(className),
          )
        ) {
          toggleModalState('active');
        }
      });

      // Handle key presses.
      grid.addEventListener(
        'keydown',
        (e) => {
          if (e.defaultPrevented) {
            return;
          }

          switch (e.key) {
            case 'Esc':
            case 'Escape':
              // Close modal on escape key press.
              toggleModalState('active');
              break;
            case 'Left':
            case 'ArrowLeft':
              // Previous
              if (activeIndex === 1) {
                showSelectedItem(itemCount);
              } else {
                showSelectedItem(+activeIndex - 1);
              }
              break;
            case 'Right':
            case 'ArrowRight':
              // Next
              if (activeIndex === itemCount) {
                showSelectedItem(1);
              } else {
                showSelectedItem(+activeIndex + 1);
              }
              break;
            default:
              return;
          }

          e.preventDefault();
        },
        true,
      );
    });
  },
};
