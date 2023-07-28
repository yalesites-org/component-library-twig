Drupal.behaviors.animateItems = {
  attach(context) {
    // Check if animation is active in site settings.
    const siteAnimationEnabled = context.querySelector(
      '[data-site-animation="true"]',
    );

    // Select all elements with [data-animate-item] attribute
    const elementsToAnimate = context.querySelectorAll(
      '[data-animate-item="true"]',
    );

    // Check if the user prefers reduced motion
    const prefersReducedMotionNoPref = window.matchMedia(
      '(prefers-reduced-motion: no-preference)',
    ).matches;

    // Create a new Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const animatedElement = entry.target;

        if (entry.isIntersecting) {
          // If the element is in the viewport, add the 'animate' class
          animatedElement.classList.add('animate');
        } else {
          // remove 'animate'
          animatedElement.classList.remove('animate');
        }
      });
    });

    // Only add observer if siteAnimationEnabled, there are elements to animate,
    // and if user hasn't enabled reduced motion.
    if (
      elementsToAnimate &&
      siteAnimationEnabled &&
      prefersReducedMotionNoPref
    ) {
      // Observe each .divider element
      elementsToAnimate.forEach((animatedElement) => {
        observer.observe(animatedElement);
      });
    }
  },
};
