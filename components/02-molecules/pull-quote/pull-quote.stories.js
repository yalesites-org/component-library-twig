import pullQuoteTwig from './yds-pull-quote.twig';

import pullQuoteData from './pull-quote.yml';
import componentProps from './pull-quote-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

export default {
  title: 'Molecules/Quotes/Pull Quote',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    quote: pullQuoteData.pull_quote__quote,
    attribution: pullQuoteData.pull_quote__attribution,
  },
};

export const pullQuote = ({ quote, attribution, style, accentTheme }) => `
  ${pullQuoteTwig({
    pull_quote__quote: quote,
    pull_quote__attribution: attribution,
    pull_quote__style: style,
    pull_quote__accent_theme: accentTheme,
  })}
`;
