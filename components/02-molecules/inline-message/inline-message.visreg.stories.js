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

  const renderInlineMessage = (dialTheme, type) =>
    inlineMessageTwig({
      inline_message__heading: heading,
      inline_message__content: content,
      inline_message__type: type,
      inline_message__theme: dialTheme,
      inline_message__link__content: linkContent,
      inline_message__link__url: linkUrl,
    });

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (sectionTheme) =>
          createSectionWrapper(
            sectionTheme,
            componentThemes
              .map(
                (componentTheme) => `
                  <div class="sb-section__container">
                    <h3 class="sb-section__subheading">Inline Message Theme: ${componentTheme}</h3>
                    ${types
                      .map(
                        (type) => `
                      <h4>Type: ${type}</h4>
                      ${renderInlineMessage(componentTheme, type)}
                    `,
                      )
                      .join('')}
                  </div>
                `,
              )
              .join(''),
            { width: 'site', primaryWidth: '100%' },
          ),
        sectionThemes,
        'All Section × Inline Message Theme Combinations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
