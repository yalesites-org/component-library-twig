import pullQuoteTwig from './yds-pull-quote.twig';

import pullQuoteData from './pull-quote.yml';

export default {
  title: 'Molecules/Quotes/Pull Quote',
  tags: ['!dev'],
  args: {},
};

export const pullQuote = () => `
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
`;

pullQuote.args = {};
