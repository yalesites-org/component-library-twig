import siteFooterTwig from './yds-site-footer.twig';
import socialLinksData from '../../02-molecules/social-links/social-links.yml';
import linkGroupData from '../../02-molecules/link-group/link-group.yml';
import siteFooterConfigData from './site-footer-config.yml';
import vrtData from '../../_storybook/vrt-combinations.yml';

import {
  globalThemeLabels,
  globalThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createThemeAccentCombinations,
  createVariations,
} from '../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Organisms/Global Elements/Footer/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  // Base footer configuration from extracted YML and other data sources
  const baseConfig = {
    ...socialLinksData,
    ...linkGroupData,
    ...siteFooterConfigData.baseConfig,
  };

  const footerVariations = ['basic', 'mega'];

  // Render function for footer variations
  const renderFooter = (config) =>
    siteFooterTwig({
      ...baseConfig,
      ...config,
    });

  return `
      ${createThemeAccentCombinations(
        (theme, accent) =>
          renderFooter({
            site_footer__border_thickness: '8',
            site_footer__theme: theme,
            site_footer__accent: accent,
            site_footer__variation: 'basic',
          }),
        vrtData.themeAccentPairs,
        'All Theme & Accent Combinations',
        'Sample combinations of footer themes and accent colors for visual regression testing.',
      )}

      ${createVariations(
        (variation) =>
          renderFooter({
            site_footer__border_thickness: '8',
            site_footer__theme: 'one',
            site_footer__accent: 'one',
            site_footer__variation: variation,
          }),
        footerVariations,
        'All Footer Variations',
        'Footer with different variations (basic vs mega).',
        'Variation',
      )}

      ${createVariations(
        (thickness) =>
          renderFooter({
            site_footer__border_thickness: thickness,
            site_footer__theme: 'one',
            site_footer__accent: 'one',
            site_footer__variation: 'basic',
          }),
        vrtData.sampleBorderThickness,
        'All Border Thickness Variations',
        'Footer with different border thickness values.',
        'Border Thickness',
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
