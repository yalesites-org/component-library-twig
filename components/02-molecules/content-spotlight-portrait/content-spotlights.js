Drupal.behaviors.contentSpotlights = {
  attach(context) {
    // Select all elements with class "text-with-image" or "content-spotlight-portrait"
    const contentSpotlights = context.querySelectorAll(
      '.text-with-image, .content-spotlight-portrait',
    );

    // Iterate over each element
    contentSpotlights.forEach((element) => {
      // Check if the current element is the first element in a group
      const isFirst =
        !element.previousElementSibling ||
        !element.previousElementSibling.matches(
          '.text-with-image, .content-spotlight-portrait',
        );
      // Check if the current element is the last element in a group
      const isLast =
        !element.nextElementSibling ||
        !element.nextElementSibling.matches(
          '.text-with-image, .content-spotlight-portrait',
        );

      // Add "spotlights--first" class if the current element is the first element in a group
      if (isFirst) {
        element.classList.add('spotlights--first');
      }

      // Add "spotlights--last" class if the current element is the last element in a group
      if (isLast) {
        element.classList.add('spotlights--last');
      }
    });
  },
};
