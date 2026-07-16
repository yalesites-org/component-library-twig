import quoteCalloutTwig from './yds-quote-callout.twig';
import quoteCalloutData from './quote-callout.yml';
import imageData from '../../01-atoms/images/image/image.yml';
import componentProps from './quote-callout-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

export default {
  title: 'Molecules/Quotes/Quote Callout',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    quote: quoteCalloutData.quote_callout__quote,
    attribution: quoteCalloutData.quote_callout__attribution,
  },
};

export const QuoteCallout = ({
  quote,
  attribution,
  style,
  quoteAlignment,
  accentTheme,
  quoteImage,
}) => `
  ${quoteCalloutTwig({
    quote_callout__quote: quote,
    quote_callout__attribution: attribution,
    quote_callout__style: style,
    quote_callout__quote_alignment: quoteAlignment,
    quote_callout__accent_theme: accentTheme,
    quote_callout__quote_image: quoteImage,
    ...imageData.responsive_images['1x1'],
  })}
`;
