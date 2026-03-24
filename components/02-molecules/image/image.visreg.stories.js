import contentImageTwig from './yds-content-image.twig';

import imageData from '../../01-atoms/images/image/image.yml';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
} from '../../_storybook/playground-utils';

export default {
  title: 'Molecules/Image/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const caption =
    'This is the <a href="#">caption</a> for the 16:9 image above.';
  const width = 'content';
  const sectionTheme = 'default';
  const layoutOption = 'fifty-fifty';

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

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (theme) => createLayoutContent(permutationLayout, theme),
        sectionThemes,
        'All Section Theme Variations',
        `Below are all section theme variations using your current caption and width settings with ${layoutOption} layout.`,
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
