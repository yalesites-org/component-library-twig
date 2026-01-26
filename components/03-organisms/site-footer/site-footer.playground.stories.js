import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import siteFooterTwig from './yds-site-footer.twig';
import socialLinksData from '../../02-molecules/social-links/social-links.yml';
import linkGroupData from '../../02-molecules/link-group/link-group.yml';

const borderThicknessOptions = Object.keys(tokens.border.thickness);
const siteFooterThemeOptions = Object.keys(tokens['site-footer-themes']);
const siteFooterAccents = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
];

export default {
  title: 'Organisms/Site/Footer/Playground',
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
      options: siteFooterThemeOptions,
      type: 'select',
    },
    siteFooterAccent: {
      name: 'Footer Accent Color (dial)',
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

export const Playground = ({
  borderThickness,
  siteFooterTheme,
  siteFooterVariation,
  siteFooterAccent,
}) => {
  // Base footer configuration
  const baseConfig = {
    ...socialLinksData,
    ...linkGroupData,
    site_footer__content_text:
      'This is <a href="https://example.com">example text</a> for footer content <a href="https://example.com/blah">with a link</a>.',
  };

  // Sample theme and accent combinations for VRT
  const themeCombinations = [
    { theme: 'one', accent: 'one' },
    { theme: 'one', accent: 'five' },
    { theme: 'two', accent: 'two' },
    { theme: 'three', accent: 'three' },
  ];

  const footerVariations = ['basic', 'mega'];

  return `
    <h2 style="padding: 1rem;">Interactive Site Footer Playground</h2>
    <p style="padding: 0 1rem 1rem;">Use the controls to test different footer configurations including theme, accent, variation, and border thickness.</p>

    ${siteFooterTwig({
      ...baseConfig,
      site_footer__border_thickness: borderThickness,
      site_footer__theme: siteFooterTheme,
      site_footer__accent: siteFooterAccent,
      site_footer__variation: siteFooterVariation,
    })}

    <hr style="margin: 3rem 0; border: 1px solid #ccc;">

    <h2 style="padding: 1rem;">VRT: Theme & Accent Combinations</h2>
    <p style="padding: 0 1rem 1rem;">Sample combinations of footer themes and accent colors for visual regression testing.</p>

    ${themeCombinations
      .map(
        ({ theme, accent }) => `
      <div style="margin-bottom: 3rem;">
        <h3 style="padding: 1rem; background: #f0f0f0;">Theme: ${theme}, Accent: ${accent}</h3>
        ${siteFooterTwig({
          ...baseConfig,
          site_footer__border_thickness: '8',
          site_footer__theme: theme,
          site_footer__accent: accent,
          site_footer__variation: 'basic',
        })}
      </div>
    `,
      )
      .join('')}

    <hr style="margin: 3rem 0; border: 1px solid #ccc;">

    <h2 style="padding: 1rem;">VRT: Footer Variations</h2>
    <p style="padding: 0 1rem 1rem;">Footer with different variations (basic vs mega).</p>

    ${footerVariations
      .map(
        (variation) => `
      <div style="margin-bottom: 3rem;">
        <h3 style="padding: 1rem; background: #f0f0f0;">Variation: ${variation}</h3>
        ${siteFooterTwig({
          ...baseConfig,
          site_footer__border_thickness: '8',
          site_footer__theme: 'one',
          site_footer__accent: 'one',
          site_footer__variation: variation,
        })}
      </div>
    `,
      )
      .join('')}

    <hr style="margin: 3rem 0; border: 1px solid #ccc;">

    <h2 style="padding: 1rem;">VRT: Border Thickness Variations</h2>
    <p style="padding: 0 1rem 1rem;">Footer with different border thickness values.</p>

    ${borderThicknessOptions
      .filter((thickness) => ['0', '4', '8', '16'].includes(thickness))
      .map(
        (thickness) => `
      <div style="margin-bottom: 3rem;">
        <h3 style="padding: 1rem; background: #f0f0f0;">Border Thickness: ${thickness}</h3>
        ${siteFooterTwig({
          ...baseConfig,
          site_footer__border_thickness: thickness,
          site_footer__theme: 'one',
          site_footer__accent: 'one',
          site_footer__variation: 'basic',
        })}
      </div>
    `,
      )
      .join('')}
  `;
};
