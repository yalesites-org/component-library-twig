import socialLinksTwig from './yds-social-links.twig';

import socialLinksData from './social-links.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Social Links/Visreg',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
  },
  args: {
    sectionTheme: 'default',
  },
};

export const Visreg = ({ sectionTheme }) => {
  // Render function for social links variations
  const renderSocialLinks = (theme) => `
    <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${socialLinksTwig(socialLinksData)}
        </div>
      </div>
    </div>
  `;

  return `
    ${createPlaygroundIntro('Use the controls to test different settings.')}

    ${renderSocialLinks(sectionTheme)}

    ${createThemeVariations(
      renderSocialLinks,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
