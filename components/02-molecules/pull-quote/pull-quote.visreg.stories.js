import pullQuoteTwig from './yds-pull-quote.twig';

import pullQuoteData from './pull-quote.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

export default {
  title: 'Molecules/Quotes/Pull Quote/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const quote = pullQuoteData.pull_quote__quote;
  const attribution = pullQuoteData.pull_quote__attribution;
  const style = 'bar-left';
  const accentColor = 'one';

  // Render function for pull quote (with accent color CSS variable)
  const renderPullQuote = (theme) => `
    <div data-component-has-divider="false" data-component-theme="${theme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
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
  `;

  return `
    ${createThemeVariations(
      renderPullQuote,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
