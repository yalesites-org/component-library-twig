import linkGroupTwig from './yds-link-group.twig';

import linkGroupData from './link-group.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link group/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const heading = linkGroupData.link_group__heading;

  // Render function for link group variations
  const renderLinkGroup = (theme) => `
    <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${linkGroupTwig({
            ...linkGroupData,
            link_group__heading: heading,
          })}
        </div>
      </div>
    </div>
  `;

  return `
    ${createThemeVariations(
      renderLinkGroup,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
