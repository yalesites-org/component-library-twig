// Twig templates
import textFieldTwig from './yds-text-field.twig';

// Data files
import textData from './text-field.yml';

import '../../01-atoms/typography/text/yds-text';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Text',
  tags: ['!dev'],
  argTypes: {
    variation: {
      name: 'Text Field Variation',
      options: ['default', 'emphasized'],
      control: 'select',
    },
  },
  args: {
    variation: 'default',
  },
};

export const TextField = {
  argTypes: {
    variation: {
      name: 'Text Field Variation',
      options: ['default', 'emphasized'],
      control: 'select',
    },
  },
  args: {
    variation: 'default',
  },
  render: ({ variation }) => `
    ${textFieldTwig({
      text_field__content: textData.text_field__content,
      text_field__variation: variation,
    })}
  `,
};

// Make Interactive story an alias to TextField
export const Interactive = TextField;
