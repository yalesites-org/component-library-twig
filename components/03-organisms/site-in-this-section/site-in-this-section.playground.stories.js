import siteSectionTwig from './yds-site-in-this-section.twig';
import secondaryNavData from '../menu/secondary-nav/secondary-nav.yml';

import '../menu/secondary-nav/yds-secondary-nav';
import '../../02-molecules/menu/menu-in-this-section-toggle/yds-menu-in-this-section-toggle';
import './yds-site-in-this-section';
import './cl-site-in-this-section.scss';

import { componentThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Site/In This Section/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    siteSectionTheme: {
      name: 'In This Section Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      options: componentThemes,
      type: 'select',
    },
  },
  args: {
    siteSectionTheme: 'one',
  },
};

export const Playground = ({ siteSectionTheme }) => {
  return `
    ${createPlaygroundIntro(
      'Use the controls to test different component theme variations.',
    )}

    ${siteSectionTwig({
      site_section_wrap__theme: siteSectionTheme,
      secondary_nav__items: secondaryNavData.items,
    })}

    ${createThemeVariations(
      (theme) =>
        siteSectionTwig({
          site_section_wrap__theme: theme,
          secondary_nav__items: secondaryNavData.items,
        }),
      componentThemes,
      'All Component Theme Variations',
      'Below are all component theme variations for visual regression testing.',
      'Component Theme',
    )}
  `;
};
