// Twig templates
import inlineMessageTwig from './yds-inline-message.twig';

// Data files
import componentProps from './inline-message-props.yml';
// Shared icon manifest — the single source of truth for the icon options, also
// consumed by Drupal via FactsAndFiguresIconManager.
import iconsConfig from '../facts-and-figures/facts-and-figures-icons.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

// Populate the Icon control from the shared manifest so every available icon
// variant is selectable without duplicating the list here.
const iconOptions = ['_none', ...Object.keys(iconsConfig.icons || {})];
const argTypes = toArgTypes(componentProps);
if (argTypes.iconName) {
  argTypes.iconName.options = iconOptions;
}

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Inline Message',
  tags: ['!dev'],
  argTypes,
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
  iconName,
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
    inline_message__icon_name: iconName,
    inline_message__theme: themeColor,
    inline_message__link__content: linkContent,
    inline_message__link__url: linkUrl,
  });

/**
 * Demonstrates an explicitly chosen icon from the shared icon set. Use the
 * "Icon" control to preview any available variant.
 */
export const WithIcon = (args) =>
  InlineMessage({ ...args, iconName: 'lightbulb-solid' });
WithIcon.args = {
  heading: 'Pro tip for editors',
  content:
    'Pick any icon from the shared set to match the tone of your message.',
};
