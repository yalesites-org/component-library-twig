Drupal.behaviors.animateItems = {
  attach(context) {
    // Select all elements with [data-animate-item] attribute
    const elementsToAnimate = context.querySelectorAll(
      '[data-animate-item="true"]',
    );

    // Create a new Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const animatedElement = entry.target;

        if (entry.isIntersecting) {
          // If the element is in the viewport, add the 'animate' class
          animatedElement.classList.add('animate');
        } else {
          // If the element is not in the viewport, remove the 'animate' class
          animatedElement.classList.remove('animate');
        }
      });
    });

    if (elementsToAnimate) {
      // Observe each .divider element
      elementsToAnimate.forEach((animatedElement) => {
        observer.observe(animatedElement);
      });
    }
  },
};
