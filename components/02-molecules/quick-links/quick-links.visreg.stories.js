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
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Quick-links/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const heading = quickLinksData.quick_links__heading;
  const description = quickLinksData.quick_links__description;
  const imageOptions = [true, false];

  const renderQuickLinks = (theme, withImage = true) =>
    quickLinksTwig({
      ...quickLinksData,
      ...imageData.responsive_images['16x9'],
      quick_links__heading: heading,
      quick_links__description: description,
      quick_links__image: withImage,
      quick_links__variation: 'promotional',
      quick_links__background_color: theme,
    });

  return createGlobalThemeVariations(
    () => `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderQuickLinks('one'), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper('one', renderQuickLinks(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Quick Links Theme Variations',
        '',
        'Quick Links Theme',
      )}
      ${createVariations(
        (withImage) =>
          createSectionWrapper('one', renderQuickLinks('one', withImage), {
            width: 'site',
            primaryWidth: '100%',
          }),
        imageOptions,
        'All Image Display Options',
        '',
        'Image',
        (val) => (val ? 'With Image' : 'Without Image'),
      )}
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
