/**
 * Page Story Utilities
 *
 * Shared helpers for page example stories. Eliminates the repeated localStorage
 * reads and header/footer prop mapping that every page story requires.
 *
 * Usage:
 * import { buildPageProps } from '../page-utils';
 *
 * export const MyPage = (args) => {
 *   const { pageTitle } = args;
 *   return myPageTwig({
 *     ...buildPageProps(args),
 *     page_title__heading: pageTitle,
 *     ...otherPageSpecificData,
 *   });
 * };
 */

/**
 * Builds the shared twig props for page example stories.
 *
 * Reads the 12 global toolbar localStorage values and maps them (along with
 * shared nav/menu data) to the twig prop keys expected by every page template.
 * Spread the result into your twig call, then add page-specific props after.
 *
 * Nav items (utility_nav__items, primary_nav__items, breadcrumbs__items) must be
 * imported and spread separately in the story's twig call, because webpack's
 * YAML loader cannot process those files when imported from a non-story utility.
 *
 * @param {Object} args - The Storybook args object from the story function.
 * @returns {Object} Twig props shared by all page example stories.
 *
 * @example
 * export const Basic = (args) => {
 *   const { pageTitle } = args;
 *   return standardPageTwig({
 *     ...buildPageProps(args),
 *     page_title__heading: pageTitle,
 *     page_title__meta: null,
 *   });
 * };
 */
const buildPageProps = (args = {}) => {
  const {
    siteName,
    allowAnimatedItems = localStorage.getItem('yds-cl-twig-animate-items'),
    menuVariation = localStorage.getItem('yds-cl-twig-menu-variation'),
    headerBorderThickness = localStorage.getItem(
      'yds-cl-twig-header-border-thickness',
    ),
    primaryNavPosition = localStorage.getItem(
      'yds-cl-twig-primary-nav-position',
    ),
    siteHeaderTheme = localStorage.getItem('yds-cl-twig-site-header-theme'),
    siteHeaderAccent = localStorage.getItem('yds-cl-twig-site-header-accent'),
    utilityNavLinkContent,
    utilityNavSearch,
    siteFooterVariation = localStorage.getItem(
      'yds-cl-twig-site-footer-variation',
    ),
    siteFooterTheme = localStorage.getItem('yds-cl-twig-site-footer-theme'),
    siteFooterAccent = localStorage.getItem('yds-cl-twig-site-footer-accent'),
    footerBorderThickness = localStorage.getItem(
      'yds-cl-twig-footer-border-thickness',
    ),
    showBreadcrumbs,
  } = args;

  return {
    site_name: siteName,
    site_animate_components: allowAnimatedItems,
    site_header__border_thickness: headerBorderThickness,
    site_header__branding_link: 'https://www.yale.edu',
    site_header__site_link: '/',
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_header__accent: siteHeaderAccent,
    site_footer__variation: siteFooterVariation,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__theme: siteFooterTheme,
    site_footer__accent: siteFooterAccent,
    site_header__menu__variation: menuVariation,
    utility_nav__link__content: utilityNavLinkContent,
    utility_nav__link__url: '#',
    utility_nav__search: utilityNavSearch,
    show_breadcrumbs: showBreadcrumbs,
  };
};

export default buildPageProps;
