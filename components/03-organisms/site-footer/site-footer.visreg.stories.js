import siteFooterTwig from './yds-site-footer.twig';
import socialLinksData from '../../02-molecules/social-links/social-links.yml';
import linkGroupData from '../../02-molecules/link-group/link-group.yml';
import siteFooterConfigData from './site-footer-config.yml';
import vrtData from '../../_storybook/vrt-combinations.yml';

import {
  borderThicknessOptions,
  siteFooterThemes,
  siteFooterAccents,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeAccentCombinations,
  createVariations,
} from '../../_storybook/playground-utils';

export default {
  title: 'Organisms/Global Elements/Footer/Visreg',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    borderThickness: {
      name: 'Border Thickness',
      options: borderThicknessOptions,
      type: 'select',
    },
    siteFooterTheme: {
      name: 'Footer Theme (dial)',
      description: 'Color theme for the site footer',
      options: siteFooterThemes,
      type: 'select',
    },
    siteFooterAccent: {
      name: 'Footer Accent Color (dial)',
      description: 'Accent color for the site footer',
      options: siteFooterAccents,
      type: 'select',
    },
    siteFooterVariation: {
      name: 'Footer Variation (dial)',
      options: ['basic', 'mega'],
      type: 'select',
    },
  },
  args: {
    borderThickness: '8',
    siteFooterTheme: 'one',
    siteFooterAccent: 'one',
    siteFooterVariation: 'basic',
  },
};

export const Visreg = ({
  borderThickness,
  siteFooterTheme,
  siteFooterVariation,
  siteFooterAccent,
}) => {
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
    ${createPlaygroundIntro(
      'Use the controls to test different footer configurations including theme, accent, variation, and border thickness.',
    )}

    ${renderFooter({
      site_footer__border_thickness: borderThickness,
      site_footer__theme: siteFooterTheme,
      site_footer__accent: siteFooterAccent,
      site_footer__variation: siteFooterVariation,
    })}

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />
    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 0.95rem;">
        The variations below test all footer configurations for visual regression testing with Percy.
      </p>
    </div>

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
