Drupal.behaviors.breadcrumbs = {
  attach(context) {
    // Selectors.
    const breadcrumbs = context.querySelector('.breadcrumbs');
    const breadcrumbsMenu = context.querySelector('.breadcrumbs__menu');
    const breadcrumbsButton = context.querySelector('.breadcrumbs__button');
    const breadcrumbsInner = context.querySelector('.breadcrumbs__inner');
    let scrollIndicatorDir;

    /**
     * setOverflow
     * @description Get the positions of the breadcrumbs to determine whether an
     * overflow situation is in play.
     */
    function setOverflow() {
      const breadcrumbsLeft = breadcrumbs.getBoundingClientRect().left;
      const breadcrumbsRight = breadcrumbs.getBoundingClientRect().right;
      const firstBreadcrumbsLeft = breadcrumbs
        .querySelector('.breadcrumbs__item:first-child')
        .getBoundingClientRect().left;
      const lastBreadcrumbsRight = Math.floor(
        breadcrumbs
          .querySelector('.breadcrumbs__item:last-child')
          .getBoundingClientRect().right,
      );

      if (firstBreadcrumbsLeft < breadcrumbsLeft) {
        // If left side of first breadcrumb is < left side of breadcrumbs.
        // And right side of last breadcrumb is > right side of breadcrumbs.
        if (lastBreadcrumbsRight > breadcrumbsRight) {
          if (scrollIndicatorDir !== 'both') {
            scrollIndicatorDir = 'both';
            breadcrumbsInner.setAttribute('data-scroll-indicator', 'both');
          }
          // If left side of first breadcrumb is < left side of breadcrumbs.
          // But right side of last breadcrumb is <= right side of breadcrumbs.
        } else if (scrollIndicatorDir !== 'left') {
          scrollIndicatorDir = 'left';
          breadcrumbsInner.setAttribute('data-scroll-indicator', 'left');
        }
        // If left side of first breadcrumb is >= left side of breadcrumbs.
        // And right side of last breadcrumb is > right side of breadcrumbs.
      } else if (lastBreadcrumbsRight > breadcrumbsRight) {
        if (scrollIndicatorDir !== 'right') {
          scrollIndicatorDir = 'right';
          breadcrumbsInner.setAttribute('data-scroll-indicator', 'right');
        }
        // If left side of first breadcrumb is >= left side of breadcrumbs.
        // And right side of last breadcrumb is <= right side of breadcrumbs.
      } else {
        scrollIndicatorDir = 'none';
        breadcrumbsInner.setAttribute('data-scroll-indicator', 'none');
      }
    }

    /**
     * showAllBreadcrumbs
     * @description remove breadcrumbs-overflow value.
     */
    function showAllBreadcrumbs() {
      const breadcrumbsWrapper = context.querySelector('.breadcrumbs__wrapper');

      breadcrumbsWrapper.setAttribute('data-breadcrumbs-overflow', 'visible');
      breadcrumbsButton.setAttribute('aria-expanded', 'true');
    }

    // Show all breadcrumbs on mobile.
    if (breadcrumbsButton) {
      breadcrumbsButton.addEventListener('click', () => {
        showAllBreadcrumbs();
        setOverflow();
      });
    }

    /**
     * debounce
     * @description Debounce to only run a function at most once every 200ms.
     * @param {} func The function to be run after the timeout.
     */
    function debounce(func) {
      let timer;
      return function debounceFunction(event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 200, event);
      };
    }

    /**
     * init
     */
    setOverflow();

    breadcrumbsMenu.addEventListener('scroll', setOverflow);

    // Listen for window resize.
    window.addEventListener(
      'resize',
      debounce(function resizeListener() {
        setOverflow();
      }),
    );
  },
};
