import linkSkipTwig from './yds-link-skip.twig';

import linkSkipData from './link-skip.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link skip/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  // Render function for link skip variations
  const renderLinkSkip = (theme) => `
    <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${linkSkipTwig({
            ...linkSkipData,
          })}
        </div>
      </div>
    </div>
  `;

  return `
    ${createThemeVariations(
      renderLinkSkip,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
