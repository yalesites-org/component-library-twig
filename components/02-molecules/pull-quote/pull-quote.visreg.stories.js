import pullQuoteTwig from './yds-pull-quote.twig';

import pullQuoteData from './pull-quote.yml';

import {
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Molecules/Quotes/Pull Quote/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const quote = pullQuoteData.pull_quote__quote;
  const attribution = pullQuoteData.pull_quote__attribution;
  const styles = ['bar-left', 'bar-right', 'quote-left'];

  const renderPullQuote = (sectionTheme, accentColor, style = 'bar-left') =>
    createSectionWrapper(
      sectionTheme,
      pullQuoteTwig({
        pull_quote__quote: quote,
        pull_quote__attribution: attribution,
        pull_quote__style: style,
        pull_quote__accent_theme: accentColor,
      }),
      {
        primaryWidth: '100%',
        innerStyle: `--color-pull-quote-accent: var(--color-${accentColor})`,
      },
    );

  return createGlobalThemeVariations(
    () => `
      ${createThemeVariations(
        (theme) => renderPullQuote(theme, 'one'),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) => renderPullQuote('one', theme),
        componentThemes,
        'All Pull Quote Theme Variations',
        '',
        'Pull Quote Theme',
      )}
      ${createVariations(
        (style) => renderPullQuote('one', 'one', style),
        styles,
        'All Style Variations',
        '',
        'Style',
      )}
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
