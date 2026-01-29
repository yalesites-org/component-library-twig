import contentImageTwig from './yds-content-image.twig';

import imageData from '../../01-atoms/images/image/image.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

export default {
  title: 'Molecules/Image/Visreg',
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
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
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
    },
  },
  args: {
    caption: 'This is the <a href="#">caption</a> for the 16:9 image above.',
    width: 'content',
    sectionTheme: 'default',
    layoutOption: 'fifty-fifty',
  },
};

export const Visreg = ({ caption, width, sectionTheme, layoutOption }) => {
  const permutationLayout =
    layoutOption === 'single' ? 'fifty-fifty' : layoutOption;

  // Helper function to create layout content (component-specific logic kept inline)
  const createLayoutContent = (layout, theme = sectionTheme) => {
    if (layout === 'single') {
      return contentImageTwig({
        ...imageData.responsive_images['16x9'],
        content_image__caption: caption,
        content_image__width: width,
      });
    }

    // Multi-column layout with different image aspect ratios
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
          <div class="yds-layout__primary" style="width: 100%">
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

  if (layoutOption === 'single') {
    return `
      ${createPlaygroundIntro(
        'Single column layout (no component theme support)',
      )}

      ${createLayoutContent('single')}

      <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

      <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
        <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
        <p style="margin: 0; font-size: 0.95rem;">
          The variations below test all image configurations for visual regression testing with Percy.
        </p>
      </div>

      ${createThemeVariations(
        (theme) => createLayoutContent(permutationLayout, theme),
        sectionThemes,
        'All Section Theme Variations',
        "Below are all section theme variations using fifty-fifty layout (since single layout doesn't support themes).",
        'Section Theme',
      )}
    `;
  }

  return `
    ${createPlaygroundIntro(
      'Use the Storybook controls to test different settings and see the results below.',
    )}

    ${createLayoutContent(layoutOption)}

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 0.95rem;">
        The variations below test all image configurations for visual regression testing with Percy.
      </p>
    </div>

    ${createThemeVariations(
      (theme) => createLayoutContent(permutationLayout, theme),
      sectionThemes,
      `All Section Theme Variations`,
      `Below are all section theme variations using your current caption and width settings with ${layoutOption} layout.`,
      'Section Theme',
    )}
  `;
};
