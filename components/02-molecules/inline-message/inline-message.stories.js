// Twig templates
import inlineMessageTwig from './yds-inline-message.twig';

// Data files
import componentProps from './inline-message-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Inline Message',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    heading: 'This is a general message heading',
    content: 'This is a general message content',
    linkContent: 'This is a link',
    linkUrl: '#',
  },
};

export const InlineMessage = ({
  type,
  heading,
  content,
  themeColor,
  linkContent,
  linkUrl,
}) =>
  inlineMessageTwig({
    inline_message__heading: heading,
    inline_message__content: content,
    inline_message__type: type,
    inline_message__theme: themeColor,
    inline_message__link__content: linkContent,
    inline_message__link__url: linkUrl,
  });
