Drupal.behaviors.accordion = {
  attach(context) {
    // Selectors
    const accordionContent = context.querySelectorAll(
      '.accordion-item__content',
    );
    const headings = context.querySelectorAll('.accordion-item__heading');

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
  },
};
