import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import inlineMessageTwig from './yds-inline-message.twig';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Inline Message/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
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
      name: 'Component Theme (dial)',
      options: ['one', 'two', 'three', 'four', 'five'],
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
    sectionTheme: 'one',
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
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different inline message types and themes.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
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

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
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
    </div>
  `,
    )
    .join('')}
  `;
};
