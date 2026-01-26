import inlineMessageTwig from './yds-inline-message.twig';

import {
  componentThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Inline Message/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
    type: {
      name: 'Type',
      type: 'select',
      options: ['general', 'alert'],
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
    content: {
      name: 'Content',
      type: 'string',
    },
    themeColor: {
      name: 'Inline Message Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      options: componentThemes,
      type: 'select',
    },
    linkContent: {
      name: 'Link Content',
      type: 'string',
    },
    linkUrl: {
      name: 'Link URL',
      type: 'string',
    },
  },
  args: {
    sectionTheme: 'default',
    type: 'general',
    heading: 'This is a general message heading',
    content: 'This is a general message content',
    themeColor: 'one',
    linkContent: 'This is a link',
    linkUrl: '#',
  },
};

export const Playground = ({
  sectionTheme,
  type,
  heading,
  content,
  themeColor,
  linkContent,
  linkUrl,
}) => {
  // Render function for inline message variations
  const renderInlineMessage = (theme) => `
    <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${inlineMessageTwig({
            inline_message__heading: heading,
            inline_message__content: content,
            inline_message__type: type,
            inline_message__theme: themeColor,
            inline_message__link__content: linkContent,
            inline_message__link__url: linkUrl,
          })}
        </div>
      </div>
    </div>
  `;

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different inline message types and themes.',
    )}

    ${renderInlineMessage(sectionTheme)}

    ${createThemeVariations(
      renderInlineMessage,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
