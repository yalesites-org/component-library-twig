import pullQuoteTwig from './pull-quote.twig';

// import linkData from './link.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Pull Quote' };

export const links = () => `
  ${pullQuoteTwig({
    pull_quote__quote:
      'Yale changed that thinking. It was evident in every class, every conversation, every project, that a business cannot exist in a vacuum, and that a business with the sole purpose of profit, with total disregard for its surroundings, will eventually fizzle out.',
    pull_quote__attribution: 'Annie Nymity',
  })}
  ${pullQuoteTwig({
    pull_quote__quote:
      'Yale changed that thinking. It was evident in every class, every conversation, every project, that a business cannot exist in a vacuum, and that a business with the sole purpose of profit, with total disregard for its surroundings, will eventually fizzle out.',
    pull_quote__attribution: 'Annie Nymity',
    pull_quote__style: 'bar-right',
  })}
  ${pullQuoteTwig({
    pull_quote__quote:
      'Yale changed that thinking. It was evident in every class, every conversation, every project, that a business cannot exist in a vacuum, and that a business with the sole purpose of profit, with total disregard for its surroundings, will eventually fizzle out.',
    pull_quote__attribution: 'Annie Nymity',
    pull_quote__style: 'quote-left',
  })}
`;
