import quickLinksTwig from './yds-quick-links.twig';

import quickLinksData from './quick-links.yml';

import imageData from '../../01-atoms/images/image/image.yml';

import { componentThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Quick Links/Visreg',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: componentThemes,
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
    description: {
      name: 'Description',
      type: 'string',
    },
    image: {
      name: 'With image',
      type: 'boolean',
    },
  },
  args: {
    sectionTheme: 'one',
    heading: quickLinksData.quick_links__heading,
    description: quickLinksData.quick_links__description,
    image: true,
  },
};

export const Visreg = ({ sectionTheme, heading, description, image }) => {
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
    ${createPlaygroundIntro('Use the controls to test different settings.')}

    ${renderQuickLinks(sectionTheme)}

    ${createThemeVariations(
      renderQuickLinks,
      componentThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
