// This js is strictly for Storybook to simulate pagination.

Drupal.behaviors.clPagination = {
  attach(context) {
    const items = context.querySelectorAll('.pager__item');
    const activeClass = 'is-active';

    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();

        const activeItem = context.querySelector('.is-active');
        const activeLink = activeItem.querySelector('a');
        const link = item.querySelector('a');

        // Remove active class from previously active item.
        activeItem.classList.remove(activeClass);
        activeLink.classList.remove(activeClass);
        // Add active class to the clicked item.
        item.classList.add(activeClass);
        link.classList.add(activeClass);
      });
    });
  },
};
