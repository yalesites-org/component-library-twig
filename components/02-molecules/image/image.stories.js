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
      if: { arg: 'layoutOption', neq: 'none' },
    },
    layoutOption: {
      name: 'Layout',
      type: 'select',
      options: [
        'none',
        'fifty-fifty',
        'thirty-thirty-thirty',
        'seventy-thirty',
      ],
      control: { type: 'select' },
    },
  },
  args: {
    caption: 'This is the <a href="#">caption</a> for the 16:9 image above.',
    width: 'content',
    sectionTheme: 'default',
    layoutOption: 'fifty-fifty',
  },
};

export const ContentImage = ({
  caption,
  width,
  sectionTheme,
  layoutOption,
}) => {
  const themes = ['default', 'one', 'two', 'three', 'four'];

  // For permutations section: if layout is "none", use "fifty-fifty" to show themes properly
  const permutationLayout =
    layoutOption === 'none' ? 'fifty-fifty' : layoutOption;

  // If layout is "none", render without layout wrapper (no component theme support)
  if (layoutOption === 'none') {
    return `
      <h2>Playground</h2>
      <p>Single column layout (no component theme support)</p>
      
      ${contentImageTwig({
        ...imageData.responsive_images['16x9'],
        content_image__caption: caption,
        content_image__width: width,
      })}

      <hr style="margin: 3rem 0; border: 1px solid #ccc;">
      
      <h2>All Section Theme Variations</h2>
      <p>Below are all section theme variations using fifty-fifty layout (since none layout doesn't support themes).</p>
      
      ${themes
        .map(
          (theme) => `
        <div style="margin-bottom: 2rem;">
          <h3>Section Theme: ${theme}</h3>
          <div data-component-has-divider="false" data-component-theme="${theme}" data-component-width="site" data-component-layout="${permutationLayout}" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
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
  }

  return `
    <h2>Playground</h2>
    <p>Use the Storybook controls to test different settings and see the results below.</p>
    
    <div data-component-has-divider="false" data-component-theme="${sectionTheme}" data-component-width="site" data-component-layout="${layoutOption}" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
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
    <p>Below are all section theme variations using your current caption and width settings with ${layoutOption} layout.</p>
    
    ${themes
      .map(
        (theme) => `
      <div style="margin-bottom: 2rem;">
        <h3>Section Theme: ${theme}</h3>
        <div data-component-has-divider="false" data-component-theme="${theme}" data-component-width="site" data-component-layout="${permutationLayout}" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
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
