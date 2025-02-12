Drupal.behaviors.ReadTime = {
  attach(context) {
    const mainContent = context.querySelector('#main-content');
    const readTime = context.querySelector('#read_time');
    const wordsPerMinute = 150;

    const mainContentSplit = mainContent.textContent.split(' ').length;

    if (mainContentSplit > 1) {
      const mn = Math.floor(mainContentSplit / wordsPerMinute);
      if (mn === 0) {
        readTime.textContent = '1';
      } else {
        readTime.textContent = mn;
      }
    } else if (mainContentSplit === 1) {
      readTime.textContent = '0';
    }
  },
};
