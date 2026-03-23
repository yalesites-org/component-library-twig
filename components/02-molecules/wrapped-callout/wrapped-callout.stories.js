import wrappedCalloutTwig from './yds-wrapped-callout.twig';
import textFieldTwig from '../text/yds-text-field.twig';
import wrappedCalloutData from './wrapped-callout.yml';
import componentProps from './wrapped-callout-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Wrapped Callout',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    calloutContent: wrappedCalloutData.text_two,
    calloutText: wrappedCalloutData.text_three,
  },
};

export const wrappedCallout = ({
  calloutAlignment,
  calloutContent,
  calloutText,
  themeColor,
}) => `
  ${textFieldTwig({
    text_field__content: wrappedCalloutData.text_one,
    text_field__width: 'site',
    text_field__alignment: 'left',
  })}
  ${wrappedCalloutTwig({
    wrapped_callout__alignment: calloutAlignment,
    wrapped_callout__content: calloutContent,
    wrapped_callout__callout: calloutText,
    wrapped_callout__theme: themeColor,
  })}
`;
