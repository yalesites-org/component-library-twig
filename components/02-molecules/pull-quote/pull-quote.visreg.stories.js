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
} from '../../_storybook/playground-utils';

export default {
  title: 'Molecules/Quotes/Pull Quote/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const quote = pullQuoteData.pull_quote__quote;
  const attribution = pullQuoteData.pull_quote__attribution;
  const styles = ['bar-left', 'bar-right', 'quote-left'];

  const renderPullQuote = (sectionTheme, accentColor, style) =>
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
    () =>
      createThemeVariations(
        (sectionTheme) =>
          componentThemes
            .map(
              (componentTheme) => `
                <div class="sb-section__container">
                  <h3 class="sb-section__subheading">Pull Quote Theme: ${componentTheme}</h3>
                  ${styles
                    .map(
                      (style) => `
                    <h4>Style: ${style}</h4>
                    ${renderPullQuote(sectionTheme, componentTheme, style)}
                  `,
                    )
                    .join('')}
                </div>
              `,
            )
            .join(''),
        sectionThemes,
        'All Section × Pull Quote Theme Combinations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
