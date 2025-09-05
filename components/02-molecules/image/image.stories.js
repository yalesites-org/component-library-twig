import contentImageTwig from './yds-content-image.twig';

import imageData from '../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Image',
  argTypes: {
    caption: {
      name: 'Caption',
      type: 'string',
    },
    width: {
      name: 'Component Width',
      type: 'select',
      options: ['content', 'highlight', 'site', 'max'],
    },
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: ['default', 'one', 'two', 'three', 'four'],
      control: { type: 'select' },
    },
  },
  args: {
    caption: 'This is the <a href="#">caption</a> for the 16:9 image above.',
    width: 'content',
    sectionTheme: 'default',
  },
};

export const ContentImage = ({ caption, width, sectionTheme }) => {
  const themes = ['default', 'one', 'two', 'three', 'four'];

  return `
    <h2>Playground</h2>
    <p>Use the Storybook controls to test different settings and see the results below.</p>
    
    <div data-component-has-divider="false" data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${contentImageTwig({
            ...imageData.responsive_images['16x9'],
            content_image__caption: caption,
            content_image__width: width,
          })}
        </div>
      </div>
    </div>

    <hr style="margin: 3rem 0; border: 1px solid #ccc;">
    
    <h2>All Section Theme Variations</h2>
    <p>Below are all section theme variations using your current caption and width settings from the controls above.</p>
    
    ${themes
      .map(
        (theme) => `
      <div style="margin-bottom: 2rem;">
        <h3>Section Theme: ${theme}</h3>
        <div data-component-has-divider="false" data-component-theme="${theme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
          <div class="yds-layout__inner">
            <div class="yds-layout__primary">
              ${contentImageTwig({
                ...imageData.responsive_images['16x9'],
                content_image__caption: caption,
                content_image__width: width,
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
