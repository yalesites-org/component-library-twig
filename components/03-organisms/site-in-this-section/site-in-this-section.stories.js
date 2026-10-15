import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import siteSectionTwig from './yds-site-in-this-section.twig';
import siteHeaderTwig from '../site-header/yds-site-header.twig';

import secondaryNavData from '../menu/secondary-nav/secondary-nav.yml';
import utilityNavData from '../menu/utility-nav/utility-nav.yml';
import primaryNavData from '../menu/primary-nav/primary-nav.yml';
import componentProps from './site-in-this-section-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

import '../menu/secondary-nav/yds-secondary-nav';
import '../../02-molecules/menu/menu-in-this-section-toggle/yds-menu-in-this-section-toggle';
import '../../02-molecules/menu/menu-toggle/yds-menu-toggle';
import '../site-header/yds-site-header';
import './yds-site-in-this-section';
import './cl-site-in-this-section.scss';

const siteHeaderThemeOptions = Object.keys(tokens['site-header-themes']);

const argTypes = toArgTypes(componentProps);
// Options come from site-in-this-section-props.yml, not the component-themes
// token map: Drupal's `book_navigation` theme setting offers one to five, and
// the token map also has `six` (YaleSites-Internal#1680).
argTypes.siteSectionTheme = {
  ...argTypes.siteSectionTheme,
  if: { arg: 'collectionNavDisplay', eq: 'in_content' },
};
argTypes.siteHeaderTheme = {
  ...argTypes.siteHeaderTheme,
  options: siteHeaderThemeOptions,
  if: { arg: 'collectionNavDisplay', eq: 'in_header' },
};
argTypes.collectionNavDisplay = {
  ...argTypes.collectionNavDisplay,
  control: {
    type: 'select',
    labels: {
      in_content: 'In Content Section',
      in_header: 'In Site Header',
    },
  },
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Global Elements/In This Section',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
  args: toArgs(componentProps),
};

export const SiteSection = ({
  collectionNavDisplay,
  siteSectionTheme,
  siteHeaderTheme,
}) => {
  if (collectionNavDisplay === 'in_header') {
    return siteHeaderTwig({
      site_header__site_name: 'Institution for Social and Policy Studies',
      site_header__site_link: '/',
      site_header__border_thickness: '8',
      site_header__nav_position: 'left',
      site_header__theme: siteHeaderTheme,
      site_header__accent: 'one',
      site_header__menu__variation: 'basic',
      site_header__collection_nav_position: 'in_header',
      site_header__collection_nav_name:
        'Yale Interdisciplinary Center for Bioethics',
      site_header__collection_nav_link: '#',
      utility_nav__items: utilityNavData.items,
      primary_nav__items: primaryNavData.items,
    });
  }

  return siteSectionTwig({
    site_section_wrap__theme: siteSectionTheme,
    secondary_nav__items: secondaryNavData.items,
  });
};
