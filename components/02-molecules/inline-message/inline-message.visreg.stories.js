import inlineMessageTwig from './yds-inline-message.twig';

import {
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
  createSectionWrapper,
  createVariations,
} from '../../_storybook/playground-utils';

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
  const types = ['general', 'marketing'];
  const heading = 'This is a message heading';
  const content = 'This is a message content';
  const linkContent = 'This is a link';
  const linkUrl = '#';

  const renderInlineMessage = (dialTheme, type = 'general') =>
    inlineMessageTwig({
      inline_message__heading: heading,
      inline_message__content: content,
      inline_message__type: type,
      inline_message__theme: dialTheme,
      inline_message__link__content: linkContent,
      inline_message__link__url: linkUrl,
    });

  return createGlobalThemeVariations(
    () => `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderInlineMessage('one'), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper('one', renderInlineMessage(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Inline Message Theme Variations',
        '',
        'Inline Message Theme',
      )}
      ${createVariations(
        (type) =>
          createSectionWrapper('one', renderInlineMessage('one', type), {
            width: 'site',
            primaryWidth: '100%',
          }),
        types,
        'All Type Variations',
        '',
        'Type',
      )}
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
