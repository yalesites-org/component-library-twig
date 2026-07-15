// Twig templates
import textFieldTwig from './yds-text-field.twig';

// Data files
import textData from './text-field.yml';

import componentProps from './text-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

import '../../01-atoms/typography/text/yds-text';

/**
 * Storybook Definition.
 */
export default {
  title: 'Atoms/Text',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    content: textData.text_field__content,
  },
};

export const TextField = ({ content, variation }) => `
  ${textFieldTwig({
    text_field__content: content,
    text_field__variation: variation,
  })}
`;

// Make Interactive story an alias to TextField
export const Interactive = TextField;
