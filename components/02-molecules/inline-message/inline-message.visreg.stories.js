import inlineMessageTwig from './yds-inline-message.twig';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createThemeVariations,
  createSectionWrapper,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Inline Message/Visreg',
  parameters: {
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
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

  return `
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
    `;
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
