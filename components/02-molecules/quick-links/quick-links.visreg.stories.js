import quickLinksTwig from './yds-quick-links.twig';

import quickLinksData from './quick-links.yml';

import imageData from '../../01-atoms/images/image/image.yml';

import {
  componentThemes,
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
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

const renderGlobalTheme = () => {
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

  return `
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
    `;
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
