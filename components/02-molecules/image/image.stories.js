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
      if: { arg: 'layoutOption', neq: 'single' },
    },
    layoutOption: {
      name: 'Layout',
      type: 'select',
      options: [
        'single',
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

  // For permutations section: if layout is "single", use "fifty-fifty" to show themes properly
  const permutationLayout =
    layoutOption === 'single' ? 'fifty-fifty' : layoutOption;

  // Helper function to create layout content based on layout type
  const createLayoutContent = (layout, theme = sectionTheme) => {
    if (layout === 'single') {
      return `
        ${contentImageTwig({
          ...imageData.responsive_images['16x9'],
          content_image__caption: caption,
          content_image__width: width,
        })}
      `;
    }

    // Generate different aspect ratios for variety
    const primaryImage = contentImageTwig({
      ...imageData.responsive_images['16x9'],
      content_image__caption: caption,
      content_image__width: width,
    });

    const secondaryImage = contentImageTwig({
      ...imageData.responsive_images['3x2'],
      content_image__caption: caption,
      content_image__width: width,
    });

    const tertiaryImage = contentImageTwig({
      ...imageData.responsive_images['4x3'],
      content_image__caption: caption,
      content_image__width: width,
    });

    return `
      <div data-component-has-divider="false" data-component-theme="${theme}" data-component-width="site" data-component-layout="${layout}" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
        <div class="yds-layout__inner">
          <div class="yds-layout__primary">
            ${primaryImage}
          </div>
          <div class="yds-layout__secondary">
            ${secondaryImage}
          </div>
          ${
            layout === 'thirty-thirty-thirty'
              ? `
            <div class="yds-layout__tertiary">
              ${tertiaryImage}
            </div>
          `
              : ''
          }
        </div>
      </div>
    `;
  };

  // If layout is "single", render without layout wrapper (no component theme support)
  if (layoutOption === 'single') {
    return `
      <h2>Playground</h2>
      <p>Single column layout (no component theme support)</p>
      
      ${createLayoutContent('single')}

      <hr style="margin: 3rem 0; border: 1px solid #ccc;">
      
      <h2>All Section Theme Variations</h2>
      <p>Below are all section theme variations using fifty-fifty layout (since single layout doesn't support themes).</p>
      
      ${themes
        .map(
          (theme) => `
        <div style="margin-bottom: 2rem;">
          <h3>Section Theme: ${theme}</h3>
          ${createLayoutContent(permutationLayout, theme)}
        </div>
      `,
        )
        .join('')}
    `;
  }

  return `
    <h2>Playground</h2>
    <p>Use the Storybook controls to test different settings and see the results below.</p>
    
    ${createLayoutContent(layoutOption)}

    <hr style="margin: 3rem 0; border: 1px solid #ccc;">
    
    <h2>All Section Theme Variations</h2>
    <p>Below are all section theme variations using your current caption and width settings with ${layoutOption} layout.</p>
    
    ${themes
      .map(
        (theme) => `
      <div style="margin-bottom: 2rem;">
        <h3>Section Theme: ${theme}</h3>
        ${createLayoutContent(permutationLayout, theme)}
      </div>
    `,
      )
      .join('')}
  `;
};
