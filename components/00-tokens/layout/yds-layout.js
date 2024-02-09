Drupal.behaviors.layout = {
  attach(context) {
    // Classes.
    // This array of classes should not have the preceding `.` so that we can
    // check for them in `classList.contains` below.
    const classesToCheck = ['text-field', 'wrapped-image'];
    // Generate a string of the above classes with preceding `.` for the
    // querySelectorAll below.
    const bodyCopyClasses = classesToCheck.map((i) => `.${i}`);
    // Selectors.
    const bodyCopyComponents = context.querySelectorAll(bodyCopyClasses);

    bodyCopyComponents.forEach((component) => {
      const nextElement = component.nextElementSibling;

      if (
        // If there is a next element.
        nextElement &&
        // And the next element contains one of the classesToCheck
        classesToCheck.some((className) =>
          nextElement.classList.contains(className),
        )
      ) {
        // Add the `no-page-spacing` class to the component.
        component.classList.add('no-page-spacing');
      }
    });

    // Find the first and last spotlights in a group and add classes to them.
    const contentSpotlights = document.querySelectorAll(
      '.text-with-image, .content-spotlight-portrait',
    );
    let currentGroup = [];

    // Add classes to the first and last spotlights in a group.
    function markFirstAndLast(group) {
      if (group.length > 0) {
        group[0].classList.add('spotlights--first');
        group[group.length - 1].classList.add('spotlights--last');
      }
    }

    // Loop through the spotlights and group them.
    contentSpotlights.forEach((element, index) => {
      const prevSibling = element.previousElementSibling;

      if (
        prevSibling &&
        prevSibling.matches('.text-with-image, .content-spotlight-portrait')
      ) {
        currentGroup.push(element);
      } else {
        markFirstAndLast(currentGroup);
        currentGroup = [element];
      }

      if (index === contentSpotlights.length - 1) {
        markFirstAndLast(currentGroup);
      }
    });
  },
};
