import pullQuoteTwig from './yds-pull-quote.twig';

import pullQuoteData from './pull-quote.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

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
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
    accentColor: {
      name: 'Pull Quote Accent (dial)',
      description: 'Accent color for the pull quote',
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
    ${createPlaygroundIntro(
      'Use the Storybook controls to see the quote implement the available variations and colors.',
    )}

    ${renderPullQuote(sectionTheme)}

    ${createThemeVariations(
      renderPullQuote,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
