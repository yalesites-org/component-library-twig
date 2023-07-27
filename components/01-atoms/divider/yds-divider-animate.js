Drupal.behaviors.animateDividers = {
  attach(context) {
    // Select all .divider elements
    const dividerElements = context.querySelectorAll('.divider');

    // Create a new Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const dividerElement = entry.target;

        if (entry.isIntersecting) {
          // If the element is in the viewport, add the 'animate' class
          dividerElement.classList.add('animate');
        } else {
          // If the element is not in the viewport, remove the 'animate' class
          dividerElement.classList.remove('animate');
        }
      });
    });

    // Observe each .divider element
    dividerElements.forEach((dividerElement) => {
      observer.observe(dividerElement);
    });
  },
};
