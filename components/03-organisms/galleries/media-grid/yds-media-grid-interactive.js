Drupal.behaviors.mediaGridInteractive = {
  attach(context) {
    const mediaGrids = context.querySelectorAll('.media-grid');

    /**
     * toggleModalState
     * @function toggleModalState toggles modal state
     */
    const toggleModalState = (state) => {
      return state === 'inactive' ? 'active' : 'inactive';
    };

    mediaGrids.forEach((grid) => {
      const modalState = grid.getAttribute('data-media-grid-modal-state');
      const items = grid.querySelectorAll('.media-grid__item');

      items.forEach((item) => {
        item.addEventListener('click', () => {
          grid.setAttribute(
            'data-media-grid-modal-state',
            toggleModalState(modalState),
          );
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
