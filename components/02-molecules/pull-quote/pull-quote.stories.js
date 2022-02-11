import pullQuoteTwig from './pull-quote.twig';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Pull Quote',
  argTypes: {
    style: {
      options: ['bar-left', 'bar-right', 'quote-left'],
      type: 'select',
      defaultValue: 'bar-left',
    },
    accentColor: {
      options: ['gray-500', 'blue-yale', 'accent'],
      type: 'select',
      defaultValue: 'gray-500',
    },
  },
};

export const pullQuote = ({ style, accentColor }) => `
  ${pullQuoteTwig({
    pull_quote__quote:
      'Yale changed that thinking. It was evident in every class, every conversation, every project, that a business cannot exist in a vacuum, and that a business with the sole purpose of profit, with total disregard for its surroundings, will eventually fizzle out.',
    pull_quote__attribution: 'Annie Nymity',
  })}
  ${pullQuoteTwig({
    pull_quote__quote:
      'Yale changed that thinking. It was evident in every class, every conversation, every project, that a business cannot exist in a vacuum, and that a business with the sole purpose of profit, with total disregard for its surroundings, will eventually fizzle out.',
    pull_quote__style: 'bar-right',
  })}
  ${pullQuoteTwig({
    pull_quote__quote:
      'Yale changed that thinking. It was evident in every class, every conversation, every project, that a business cannot exist in a vacuum, and that a business with the sole purpose of profit, with total disregard for its surroundings, will eventually fizzle out.',
    pull_quote__attribution: 'Annie Nymity',
    pull_quote__style: 'quote-left',
  })}
  <div style="--color-pull-quote-accent: var(--color-${accentColor})">
    <h2>Playground</h2>
    <p>Use the StoryBook controls to see the pull-quote below implement the available variations and colors.</p>
    ${pullQuoteTwig({
      pull_quote__quote:
        'Yale changed that thinking. It was evident in every class, every conversation, every project, that a business cannot exist in a vacuum, and that a business with the sole purpose of profit, with total disregard for its surroundings, will eventually fizzle out.',
      pull_quote__attribution: 'Annie Nymity',
      pull_quote__style: style,
    })}
  </div>
`;
