Drupal.behaviors.customCard = {
  attach(context) {
    // Inspiration and reasoning for this JavaScript can be found in the Cards
    // chapter of the book linked below:
    // https://inclusive-components.design/cards/#theredundantclickevent
    // Selectors
    const customCards = context.querySelectorAll('.custom-card');
    const leftClick = 0;

    // Capture info about the browser to better know how to react to clicks.
    const isMac = /Macintosh/.test(navigator.userAgent);
    const openNewTab = (link) => {
      window.open(link.href, '_blank');
    };
    const newTabModifier = isMac ? 'metaKey' : 'ctrlKey';

    customCards.forEach((customCard) => {
      const card = customCard;
      const link = card.querySelector('.custom-card__heading-link');

      // If the card has a link, make the whole card clickable. However, allow
      // users to select text by only triggering the link if the "click up" is
      // less than 200ms from the "click down".
      if (link) {
        let down;
        let up;

        card.style.cursor = 'pointer';
        card.onmousedown = () => {
          // Calculate when the "click" starts.
          down = +new Date();
        };
        card.onmouseup = (event) => {
          // Calculate when the "click" ends.
          up = +new Date();
          // If the left click "duration" is less than 200ms, trigger a click.
          if (up - down < 200 && event.button === leftClick) {
            // If the user is holding the "new tab" modifier, open the link in a
            // new tab. Otherwise, open the link in the same tab.
            if (event[newTabModifier] === true) {
              openNewTab(link);
            } else {
              link.click();
            }
          }
        };
      }
    });
  },
};
