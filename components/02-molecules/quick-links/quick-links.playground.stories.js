import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import quickLinksTwig from './yds-quick-links.twig';

import quickLinksData from './quick-links.yml';

import imageData from '../../01-atoms/images/image/image.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Quick-links/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
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

export const Playground = ({ sectionTheme, heading, description, image }) => {
  const themes = colorPairingsData;

  return `
    <h2>Interactive Playground</h2>
    <p>Use the controls to test different settings.</p>

    <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
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

    <hr style="margin: 3rem 0; border: 1px solid #ccc;">

    <h2>All Section Theme Variations</h2>
    <p>Below are all theme variations for visual regression testing.</p>

    ${themes
      .map(
        (theme) => `
      <div style="margin-bottom: 2rem;">
        <h3>Section Theme: ${theme}</h3>
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
      </div>
    `,
      )
      .join('')}
  `;
};
