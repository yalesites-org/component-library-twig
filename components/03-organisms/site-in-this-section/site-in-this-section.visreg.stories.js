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
  title: 'Organisms/Site/In This Section/Visreg',
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

export const Visreg = ({ siteSectionTheme }) => {
  return `
    ${createPlaygroundIntro(
      'Use the controls to test different component theme variations.',
    )}

    ${siteSectionTwig({
      site_section_wrap__theme: siteSectionTheme,
      secondary_nav__items: secondaryNavData.items,
    })}

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 0.95rem;">
        The variations below test all site in this section theme configurations for visual regression testing with Percy.
        These cover all component theme variations.
      </p>
    </div>

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
