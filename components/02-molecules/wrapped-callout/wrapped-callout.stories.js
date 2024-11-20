import wrappedCalloutTwig from './yds-wrapped-callout.twig';
import textFieldTwig from '../text/yds-text-field.twig';

import wrappedCalloutData from './wrapped-callout.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Wrapped Callout',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    calloutAlignment: {
      name: 'Callout Alignment',
      type: 'select',
      options: ['left', 'right'],
    },
    calloutContent: {
      name: 'Callout Content',
      type: 'string',
    },
    calloutCallout: {
      name: 'Callout Callout',
      type: 'string',
    },
  },
  args: {
    calloutAlignment: 'left',
    calloutContent: wrappedCalloutData.text_two,
    calloutCallout: wrappedCalloutData.text_three,
  },
};

export const wrappedCallout = ({
  calloutAlignment,
  calloutContent,
  calloutCallout,
}) => `
  ${textFieldTwig({
    text_field__content: wrappedCalloutData.text_one,
    text_field__width: 'site',
    text_field__alignment: 'left',
  })}
  ${wrappedCalloutTwig({
    wrapped_callout__alignment: calloutAlignment,
    wrapped_callout__content: calloutContent,
    wrapped_callout__callout: calloutCallout,
  })}
`;
