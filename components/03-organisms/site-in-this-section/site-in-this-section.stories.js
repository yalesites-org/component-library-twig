import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import siteSectionTwig from './yds-site-in-this-section.twig';
import siteHeaderTwig from '../site-header/yds-site-header.twig';

import secondaryNavData from '../menu/secondary-nav/secondary-nav.yml';
import utilityNavData from '../menu/utility-nav/utility-nav.yml';
import primaryNavData from '../menu/primary-nav/primary-nav.yml';

import '../menu/secondary-nav/yds-secondary-nav';
import '../../02-molecules/menu/menu-in-this-section-toggle/yds-menu-in-this-section-toggle';
import '../../02-molecules/menu/menu-toggle/yds-menu-toggle';
import '../site-header/yds-site-header';
import './yds-site-in-this-section';
import './cl-site-in-this-section.scss';

const colorPairingsData = Object.keys(tokens['component-themes']);
const siteHeaderThemeOptions = Object.keys(tokens['site-header-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Site/In This Section',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    collectionNavDisplay: {
      name: 'Collection Navigation Display',
      options: ['in_content', 'in_header'],
      control: {
        type: 'select',
        labels: {
          in_content: 'In Content Section',
          in_header: 'In Site Header',
        },
      },
    },
    siteSectionTheme: {
      name: 'Component Theme (dial)',
      options: colorPairingsData,
      type: 'select',
      if: { arg: 'collectionNavDisplay', eq: 'in_content' },
    },
    siteHeaderTheme: {
      name: 'Header Theme (dial)',
      options: siteHeaderThemeOptions,
      type: 'select',
      if: { arg: 'collectionNavDisplay', eq: 'in_header' },
    },
  },
  args: {
    collectionNavDisplay: 'in_content',
    siteSectionTheme: 'one',
    siteHeaderTheme: 'one',
  },
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
