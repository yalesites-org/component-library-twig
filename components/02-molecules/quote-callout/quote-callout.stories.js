import quoteCalloutTwig from './yds-quote-callout.twig';
import quoteCalloutData from './quote-callout.yml';
import imageData from '../../01-atoms/images/image/image.yml';

export default {
  title: 'Molecules/Quotes/Quote Callout',
  tags: ['!dev'],
};

export const QuoteCallout = () => `
  ${quoteCalloutTwig({
    quote_callout__quote: quoteCalloutData.quote_callout__quote,
    quote_callout__attribution: quoteCalloutData.quote_callout__attribution,
  })}
  ${quoteCalloutTwig({
    quote_callout__quote: quoteCalloutData.quote_callout__quote,
    quote_callout__style: 'bar',
    quote_callout__quote_alignment: 'right',
  })}
  ${quoteCalloutTwig({
    quote_callout__quote: quoteCalloutData.quote_callout__quote,
    quote_callout__attribution: quoteCalloutData.quote_callout__attribution,
    quote_callout__style: 'quote',
    quote_callout__quote_alignment: 'left',
  })}
  ${quoteCalloutTwig({
    quote_callout__quote: quoteCalloutData.quote_callout__quote,
    quote_callout__attribution: quoteCalloutData.quote_callout__attribution,
    quote_callout__style: 'quote',
    quote_callout__quote_alignment: 'right',
  })}
  ${quoteCalloutTwig({
    quote_callout__quote: quoteCalloutData.quote_callout__quote,
    quote_callout__attribution: quoteCalloutData.quote_callout__attribution,
    quote_callout__style: 'image',
    quote_callout__quote_alignment: 'left',
    quote_callout__quote_image: 'with-image',
    ...imageData.responsive_images['1x1'],
  })}
`;
