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
  siteHeaderThemes,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Site/In This Section/Visreg',
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
      name: 'In This Section Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      options: componentThemes,
      type: 'select',
      if: { arg: 'collectionNavDisplay', eq: 'in_content' },
    },
    siteHeaderTheme: {
      name: 'Header Theme (dial)',
      options: siteHeaderThemes,
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

export const Visreg = ({
  collectionNavDisplay,
  siteSectionTheme,
  siteHeaderTheme,
}) => {
  // Top interactive component follows controls
  const interactive =
    collectionNavDisplay === 'in_header'
      ? renderSiteHeader(siteHeaderTheme)
      : siteSectionTwig({
          site_section_wrap__theme: siteSectionTheme,
          secondary_nav__items: secondaryNavData.items,
        });

  return `
    ${createPlaygroundIntro(
      'Use the controls to toggle between In Content and In Header display modes.',
    )}

    ${interactive}

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 0.95rem;">
        The variations below test all configurations for visual regression testing with Percy.
        These cover both In Content theme variations and In Header collection navigation variations.
      </p>
    </div>

    ${createThemeVariations(
      (theme) =>
        siteSectionTwig({
          site_section_wrap__theme: theme,
          secondary_nav__items: secondaryNavData.items,
        }),
      componentThemes,
      'In Content — All Component Theme Variations',
      'Section navigation displayed inline within the content area.',
      'Component Theme',
    )}

    ${createThemeVariations(
      (theme) => renderSiteHeader(theme),
      siteHeaderThemes,
      'In Header — All Header Theme Variations (Collection Nav)',
      'Collection navigation displayed within the site header.',
      'Header Theme',
    )}
  `;
};
