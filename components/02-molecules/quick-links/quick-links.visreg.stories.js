import quickLinksTwig from './yds-quick-links.twig';

import quickLinksData from './quick-links.yml';

import imageData from '../../01-atoms/images/image/image.yml';

import { componentThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Quick Links/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const heading = quickLinksData.quick_links__heading;
  const description = quickLinksData.quick_links__description;
  const image = true;

  // Render function for quick links variations
  const renderQuickLinks = (theme) => `
    <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${quickLinksTwig({
            ...quickLinksData,
            ...imageData.responsive_images['16x9'],
            quick_links__heading: heading,
            quick_links__description: description,
            quick_links__image: image,
          })}
        </div>
      </div>
    </div>
  `;

  return `
    ${createThemeVariations(
      renderQuickLinks,
      componentThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
