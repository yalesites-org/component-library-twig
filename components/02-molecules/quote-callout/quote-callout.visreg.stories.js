import quoteCalloutTwig from './yds-quote-callout.twig';
import quoteCalloutData from './quote-callout.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import {
  componentThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

export default {
  title: 'Molecules/Quotes/Quote Callout/Visreg',
  argTypes: {
    quote: {
      name: 'Quote',
      type: 'string',
    },
    attribution: {
      name: 'Attribution',
      type: 'string',
    },
    style: {
      name: 'Style',
      options: ['bar', 'quote'],
      type: 'select',
    },
    quoteAlignment: {
      name: 'Quote Alignment',
      options: ['left', 'right'],
      type: 'select',
    },
    accentColor: {
      name: 'Quote Callout Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      options: componentThemes,
      type: 'select',
    },
    quoteImage: {
      name: 'Quote Image',
      options: ['with-image', 'no-image'],
      type: 'select',
    },
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
  },
  args: {
    quote: quoteCalloutData.quote_callout__quote,
    attribution: quoteCalloutData.quote_callout__attribution,
    style: 'bar',
    quoteAlignment: 'left',
    accentColor: 'one',
    quoteImage: 'no-image',
    sectionTheme: 'default',
  },
};

export const Visreg = ({
  style,
  accentColor,
  quote,
  attribution,
  quoteAlignment,
  quoteImage,
  sectionTheme,
}) => {
  // Render function for quote callout variations
  const renderQuoteCallout = (theme) => `
    <div data-component-has-divider="false" data-component-theme="${theme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
      <div class="yds-layout__inner" style="--color-quote-callout-accent: var(--color-${accentColor})">
        <div class="yds-layout__primary" style="width: 100%">
          ${quoteCalloutTwig({
            quote_callout__quote: quote,
            quote_callout__attribution: attribution,
            quote_callout__style: style,
            quote_callout__accent_theme: accentColor,
            quote_callout__quote_alignment: quoteAlignment,
            quote_callout__quote_image: quoteImage,
            ...imageData.responsive_images['1x1'],
          })}
        </div>
      </div>
    </div>
  `;

  return `
    ${createPlaygroundIntro(
      'Use the Storybook controls to see the quote callout implement the available variations and colors.',
    )}

    ${renderQuoteCallout(sectionTheme)}

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 0.95rem;">
        The variations below test all configurations for visual regression testing with Percy.
      </p>
    </div>

    ${createThemeVariations(
      renderQuoteCallout,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
