import socialLinksTwig from './yds-social-links.twig';

import socialLinksData from './social-links.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Social Links/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
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
    ${createThemeVariations(
      renderSocialLinks,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
