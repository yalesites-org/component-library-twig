Drupal.behaviors.accordion = {
  attach(context) {
    // Selectors
    const accordionContent = context.querySelectorAll(
      '.accordion-item__content',
    );
    const headings = context.querySelectorAll('.accordion-item__heading');
    const controls = context.querySelectorAll('.accordion__controls');

    // Hide all accordion content sections if JavaScript is enabled.
    accordionContent.forEach((content) => {
      content.setAttribute('hidden', '');
    });

    // Expand accordion content when toggle is activated.
    headings.forEach((heading) => {
      const toggle = heading.querySelector('.accordion-item__expand');
      const content = heading.nextElementSibling;

      toggle.addEventListener('click', () => {
        // Set `expanded` to a boolean, equal to the value of the toggle's
        // `aria-expanded` value.
        const expanded = toggle.getAttribute('aria-expanded') === 'true';

        // Set `aria-expanded` to the opposite of what it was.
        toggle.setAttribute('aria-expanded', !expanded);
        // Set `hidden` on the content section according to the original
        // expanded value. So if expanded was true, but is now false, add the
        // `hidden` attribute. Otherwise, remove it.
        content.hidden = expanded;
      });
    });

    controls.forEach((control) => {
      // Get all items relevant to the control.
      const allItems = control.parentNode.querySelectorAll('.accordion-item');
      // Add click listener on the parent <ul>
      control.addEventListener('click', (e) => {
        // Determine which control was activated. `action` will re turn a
        // boolean. `true` if the expand control was clicked, otherwise false.
        const action = e.target.classList.contains(
          'accordion__toggle-all--expand',
        );

        // Iterate over
        allItems.forEach((item) => {
          const itemContent = item.querySelector('.accordion-item__content');
          item
            .querySelector('.accordion-item__expand')
            .setAttribute('aria-expanded', action);
          if (action === false) {
            itemContent.setAttribute('hidden', '');
          } else {
            itemContent.removeAttribute('hidden');
          }
        });
      });
    });
  },
};
