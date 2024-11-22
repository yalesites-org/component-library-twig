import pullQuoteTwig from './yds-pull-quote.twig';

import pullQuoteData from './pull-quote.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Quotes/Pull Quote',
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
    accentColor: {
      name: 'Component Theme (dial)',
      options: ['one', 'two', 'three'],
      type: 'select',
    },
  },
  args: {
    quote: pullQuoteData.pull_quote__quote,
    attribution: pullQuoteData.pull_quote__attribution,
    style: 'bar-left',
    accentColor: 'one',
  },
};

export const pullQuote = {
  render: ({ style, accentColor, quote, attribution }) => `
    ${pullQuoteTwig({
      pull_quote__quote: pullQuoteData.pull_quote__quote,
      pull_quote__attribution: pullQuoteData.pull_quote__attribution,
    })}
    ${pullQuoteTwig({
      pull_quote__quote: pullQuoteData.pull_quote__quote,
      pull_quote__style: 'bar-right',
    })}
    ${pullQuoteTwig({
      pull_quote__quote: pullQuoteData.pull_quote__quote,
      pull_quote__attribution: pullQuoteData.pull_quote__attribution,
      pull_quote__style: 'quote-left',
    })}
    <div style="--color-pull-quote-accent: var(--color-${accentColor})">
      <h2>Playground</h2>
      <p>Use the StoryBook controls to see the quote below implement the available variations and colors.</p>
      ${pullQuoteTwig({
        pull_quote__quote: quote,
        pull_quote__attribution: attribution,
        pull_quote__style: style,
        pull_quote__accent_theme: accentColor,
      })}
    </div>
  `,
};
