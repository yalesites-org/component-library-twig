import inlineMessageTwig from './yds-inline-message.twig';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Inline Message/Visreg',
  parameters: {
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const type = 'general';
  const heading = 'This is a general message heading';
  const content = 'This is a general message content';
  const themeColor = 'one';
  const linkContent = 'This is a link';
  const linkUrl = '#';

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
    ${createThemeVariations(
      renderInlineMessage,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
