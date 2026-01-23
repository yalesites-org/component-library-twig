import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import quoteCalloutTwig from './yds-quote-callout.twig';
import quoteCalloutData from './quote-callout.yml';
import imageData from '../../01-atoms/images/image/image.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

export default {
  title: 'Molecules/Quotes/Quote Callout/Playground',
  argTypes: {
    quote: {
      name: 'Quote',
      type: 'string',
      defaultValue: quoteCalloutData.quote_callout__quote,
    },
    attribution: {
      name: 'Attribution',
      type: 'string',
      defaultValue: quoteCalloutData.quote_callout__attribution,
    },
    style: {
      name: 'Style',
      options: ['bar', 'quote'],
      type: 'select',
      defaultValue: 'bar',
    },
    quoteAlignment: {
      name: 'Quote Alignment',
      options: ['left', 'right'],
      type: 'select',
      defaultValue: 'left',
    },
    accentColor: {
      name: 'Component Theme (dial)',
      options: colorPairingsData,
      type: 'select',
      defaultValue: 'one',
    },
    quoteImage: {
      name: 'Quote Image',
      options: ['with-image', 'no-image'],
      type: 'select',
      defaultValue: 'no-image',
    },
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: ['default', 'one', 'two', 'three', 'four'],
    },
  },
  args: {
    sectionTheme: 'default',
  },
};

export const Playground = ({
  style,
  accentColor,
  quote,
  attribution,
  quoteAlignment,
  quoteImage,
  sectionTheme,
}) => {
  const themes = ['default', 'one', 'two', 'three', 'four'];

  return `
  <h2>Interactive Playground</h2>
  <p>Use the StoryBook controls to see the quote callout implement the available variations and colors.</p>

  <div data-component-has-divider="false" data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
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

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div data-component-has-divider="false" data-component-theme="${theme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
      <div class="yds-layout__inner" style="--color-quote-callout-accent: var(--color-${accentColor})">
        <div class="yds-layout__primary" style="width: 100%">
          <h3>Section Theme: ${theme}</h3>
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
  `,
    )
    .join('')}
  `;
};
