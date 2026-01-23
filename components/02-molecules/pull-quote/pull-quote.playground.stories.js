import pullQuoteTwig from './yds-pull-quote.twig';

import pullQuoteData from './pull-quote.yml';

export default {
  title: 'Molecules/Quotes/Pull Quote/Playground',
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
      options: ['bar-left', 'bar-right', 'quote-left'],
      type: 'select',
    },
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: ['default', 'one', 'two', 'three', 'four'],
    },
    accentColor: {
      name: 'Component Theme (dial)',
      options: ['one', 'two', 'three'],
      type: 'select',
      if: { arg: 'sectionTheme', eq: 'default' },
    },
  },
  args: {
    quote: pullQuoteData.pull_quote__quote,
    attribution: pullQuoteData.pull_quote__attribution,
    style: 'bar-left',
    accentColor: 'one',
    sectionTheme: 'default',
  },
};

export const Playground = ({
  style,
  accentColor,
  quote,
  attribution,
  sectionTheme,
}) => {
  const themes = ['default', 'one', 'two', 'three', 'four'];

  return `
  <h2>Interactive Playground</h2>
  <p>Use the StoryBook controls to see the quote implement the available variations and colors.</p>

  <div data-component-has-divider="false" data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
    <div class="yds-layout__inner" style="--color-pull-quote-accent: var(--color-${accentColor})">
      <div class="yds-layout__primary" style="width: 100%">
        ${pullQuoteTwig({
          pull_quote__quote: quote,
          pull_quote__attribution: attribution,
          pull_quote__style: style,
          pull_quote__accent_theme: accentColor,
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
      <div class="yds-layout__inner" style="--color-pull-quote-accent: var(--color-${accentColor})">
        <div class="yds-layout__primary" style="width: 100%">
          <h3>Section Theme: ${theme}</h3>
          ${pullQuoteTwig({
            pull_quote__quote: quote,
            pull_quote__attribution: attribution,
            pull_quote__style: style,
            pull_quote__accent_theme: accentColor,
          })}
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
