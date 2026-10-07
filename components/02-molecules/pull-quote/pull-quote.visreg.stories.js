import pullQuoteTwig from './yds-pull-quote.twig';

import pullQuoteData from './pull-quote.yml';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Molecules/Quotes/Pull Quote/Visreg',
  parameters: { controls: { disable: true } },
};

const renderGlobalTheme = () => {
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

  return `
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
    `;
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
