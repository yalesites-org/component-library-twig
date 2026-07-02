// Markup.
import utilityNavTwig from './yds-utility-nav.twig';

// Data.
import utilityNavData from './utility-nav.yml';
import componentProps from './utility-nav-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

import './utility-nav-dropdown-menu';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Utility Nav',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    linkContent: utilityNavData.utility_nav__link__content,
    linkUrl: utilityNavData.utility_nav__link__url,
    search: utilityNavData.utility_nav__search,
    ctaTheme: utilityNavData.utility_nav__cta__theme,
    dropdownLinkContent: utilityNavData.utility_nav__dropdown_link__content,
    dropdownLinkUrl: utilityNavData.utility_nav__dropdown_link__url,
  },
};

export const UtilityNav = ({
  linkContent,
  linkUrl,
  search,
  ctaTheme,
  dropdownLinkContent,
  dropdownLinkUrl,
}) =>
  utilityNavTwig({
    items: utilityNavData.items,
    utility_nav__link__content: linkContent,
    utility_nav__link__url: linkUrl,
    utility_nav__search: search,
    utility_nav__cta__theme: ctaTheme,
    utility_nav__dropdown_link__content: dropdownLinkContent,
    utility_nav__dropdown_link__url: dropdownLinkUrl,
    utility_nav__dropdown__items: utilityNavData.utility_nav__dropdown__items,
  });
