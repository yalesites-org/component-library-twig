import quoteCalloutTwig from './yds-quote-callout.twig';
import quoteCalloutData from './quote-callout.yml';
import imageData from '../../01-atoms/images/image/image.yml';

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
  title: 'Molecules/Quotes/Quote Callout/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const quote = quoteCalloutData.quote_callout__quote;
  const attribution = quoteCalloutData.quote_callout__attribution;
  const quoteAlignment = 'left';

  // style 'image' is triggered automatically when quote_image === 'with-image'
  const variants = [
    { style: 'bar', quoteImage: 'no-image' },
    { style: 'quote', quoteImage: 'no-image' },
    { style: 'bar', quoteImage: 'with-image' },
  ];

  const renderQuoteCallout = (
    sectionTheme,
    accentColor,
    style = 'bar',
    quoteImage = 'no-image',
  ) =>
    createSectionWrapper(
      sectionTheme,
      quoteCalloutTwig({
        quote_callout__quote: quote,
        quote_callout__attribution: attribution,
        quote_callout__style: style,
        quote_callout__accent_theme: accentColor,
        quote_callout__quote_alignment: quoteAlignment,
        quote_callout__quote_image: quoteImage,
        ...imageData.responsive_images['1x1'],
      }),
      {
        primaryWidth: '100%',
        innerStyle: `--color-quote-callout-accent: var(--color-${accentColor})`,
      },
    );

  return createGlobalThemeVariations(
    () => `
      ${createThemeVariations(
        (theme) => renderQuoteCallout(theme, 'one'),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) => renderQuoteCallout('one', theme),
        componentThemes,
        'All Quote Callout Theme Variations',
        '',
        'Quote Callout Theme',
      )}
      ${createVariations(
        ({ style, quoteImage }) =>
          renderQuoteCallout('one', 'one', style, quoteImage),
        variants,
        'All Style Variations',
        '',
        'Style',
        ({ style, quoteImage }) =>
          `Style: ${
            quoteImage === 'with-image' ? 'image' : style
          } / Image: ${quoteImage}`,
      )}
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
