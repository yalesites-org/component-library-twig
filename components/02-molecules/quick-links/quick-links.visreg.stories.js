import quickLinksTwig from './yds-quick-links.twig';

import quickLinksData from './quick-links.yml';

import imageData from '../../01-atoms/images/image/image.yml';

import {
  componentThemes,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

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
  const variations = ['promotional', 'subtle'];
  const imageOptions = [true, false];

  const renderQuickLinks = (theme, variation, withImage) =>
    quickLinksTwig({
      ...quickLinksData,
      ...imageData.responsive_images['16x9'],
      quick_links__heading: heading,
      quick_links__description: description,
      quick_links__image: withImage,
      quick_links__variation: variation,
      quick_links__background_color: theme,
    });

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (sectionTheme) =>
          createSectionWrapper(
            sectionTheme,
            componentThemes
              .map(
                (componentTheme) => `
                  <div class="sb-section__container">
                    <h3 class="sb-section__subheading">Quick Links Theme: ${componentTheme}</h3>
                    ${variations
                      .flatMap((variation) =>
                        imageOptions.map(
                          (withImage) => `
                        <h4>Variation: ${variation} / Image: ${withImage}</h4>
                        ${renderQuickLinks(
                          componentTheme,
                          variation,
                          withImage,
                        )}
                      `,
                        ),
                      )
                      .join('')}
                  </div>
                `,
              )
              .join(''),
            { width: 'site', primaryWidth: '100%' },
          ),
        sectionThemes,
        'All Section × Quick Links Theme Combinations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
