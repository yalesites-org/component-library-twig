Drupal.behaviors.contentSpotlights = {
  attach(context) {
    // Find the first and last spotlights in a group.
    const contentSpotlights = context.querySelectorAll(
      '.text-with-image, .content-spotlight-portrait',
    );

    // Set an empty array to hold the current group of spotlights.
    let currentGroup = [];

    // Add classes to the first and last spotlights in a group.
    function markFirstAndLast(group) {
      if (group.length > 0) {
        // Add classes to the first and last spotlights in a group.
        group[0].classList.add('spotlights--first');
        group[group.length - 1].classList.add('spotlights--last');
      }
    }

    // Loop through the spotlights and group them.
    contentSpotlights.forEach((element, index) => {
      // Get the previous sibling of the current element.
      const prevSibling = element.previousElementSibling;

      if (
        // If the previous sibling exists and is a spotlight.
        prevSibling &&
        prevSibling.matches('.text-with-image, .content-spotlight-portrait')
      ) {
        // If the previous sibling is a spotlight, add the current element to the group.
        currentGroup.push(element);
      } else {
        // start a new group.
        markFirstAndLast(currentGroup);
        currentGroup = [element];
      }

      // If this is the last spotlight group, add classes to the first and last spotlights in the group.
      if (index === contentSpotlights.length - 1) {
        markFirstAndLast(currentGroup);
      }
    });
  },
};
