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

import {
  componentThemes,
  globalThemes,
  sectionThemes,
  siteHeaderThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Organisms/Global Elements/In This Section/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderSiteHeader = (theme) =>
  siteHeaderTwig({
    site_header__site_name: 'Institution for Social and Policy Studies',
    site_header__site_link: '/',
    site_header__border_thickness: '8',
    site_header__nav_position: 'left',
    site_header__theme: theme,
    site_header__accent: 'one',
    site_header__menu__variation: 'basic',
    site_header__collection_nav_position: 'in_header',
    site_header__collection_nav_name:
      'Yale Interdisciplinary Center for Bioethics',
    site_header__collection_nav_link: '#',
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
  });

export const Visreg = () => {
  const renderSiteSection = (componentTheme) =>
    siteSectionTwig({
      site_section_wrap__theme: componentTheme,
      secondary_nav__items: secondaryNavData.items,
    });

  return createGlobalThemeVariations(
    () => `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderSiteSection('one'), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper('one', renderSiteSection(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All In This Section Theme Variations',
        '',
        'In This Section Theme',
      )}
      ${createThemeVariations(
        (theme) => renderSiteHeader(theme),
        siteHeaderThemes,
        'In Header — All Header Theme Variations (Collection Nav)',
        'Collection navigation displayed within the site header.',
        'Header Theme',
      )}
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
