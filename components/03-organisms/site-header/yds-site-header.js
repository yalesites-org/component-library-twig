Drupal.behaviors.siteHeader = {
  attach(context) {
    const body = context.querySelector('body');
    const header = context.querySelector('.site-header');
    const headerLogo = context.querySelector(
      '.site-header__site-branding-logo',
    );

    /**
     * debounce
     * @description Debounce to only run a function at most once every 200ms.
     * @param {} func The function to be run after the timeout.
     */
    const debounce = (func) => {
      let timer;
      return function debounceFunction(event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 200, event);
      };
    };

    /**
     * setHeaderHeight
     * @description Set the `--site-header-height` variable.
     */
    const setHeaderHeight = () => {
      body.style.setProperty(
        '--site-header-height',
        `${header.offsetHeight}px`,
      );
    };

    // Determine, and set the site header height variable on page load.
    window.addEventListener('load', () => {
      setHeaderHeight();
    });

    // Update the site header height variable when the window is resized.
    window.addEventListener(
      'resize',
      debounce(function runSetHeight() {
        setHeaderHeight();
      }),
    );

    // If the site is using a logo as the site-name, we need to add some attributes.

    if (headerLogo) {
      const svgElement = context.querySelector(
        '.site-header__site-branding-logo svg',
      );
      const srText = context.querySelector(
        '.site-header__site-branding-logo .sr-text',
      );
      const siteName = srText.innerHTML;
      // add attributes
      svgElement.setAttribute('role', 'img');
      svgElement.setAttribute('title', siteName);
    }
  },
};
