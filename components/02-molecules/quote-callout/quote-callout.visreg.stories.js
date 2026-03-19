import quoteCalloutTwig from './yds-quote-callout.twig';
import quoteCalloutData from './quote-callout.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

export default {
  title: 'Molecules/Quotes/Quote Callout/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const quote = quoteCalloutData.quote_callout__quote;
  const attribution = quoteCalloutData.quote_callout__attribution;
  const style = 'bar';
  const quoteAlignment = 'left';
  const accentColor = 'one';
  const quoteImage = 'no-image';

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
    ${createThemeVariations(
      renderQuoteCallout,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
