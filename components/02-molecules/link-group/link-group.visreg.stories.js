import linkGroupTwig from './yds-link-group.twig';

import linkGroupData from './link-group.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
  createVrtIntro,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link group/Visreg',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
  },
  args: {
    sectionTheme: 'default',
    heading: linkGroupData.link_group__heading,
  },
};

export const Visreg = ({ sectionTheme, heading }) => {
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
    ${createPlaygroundIntro('Use the controls to test different settings.')}

    ${renderLinkGroup(sectionTheme)}

    ${createVrtIntro()}

    ${createThemeVariations(
      renderLinkGroup,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
