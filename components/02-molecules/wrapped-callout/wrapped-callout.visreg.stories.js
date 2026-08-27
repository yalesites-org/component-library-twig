import wrappedCalloutTwig from './yds-wrapped-callout.twig';
import textFieldTwig from '../text/yds-text-field.twig';
import wrappedCalloutData from './wrapped-callout.yml';

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
  title: 'Molecules/Wrapped Callout/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  const alignments = ['left', 'right'];

  const renderWrappedCallout = (dialTheme, alignment = 'left') => `
    ${textFieldTwig({
      text_field__content: wrappedCalloutData.text_one,
      text_field__width: 'site',
      text_field__alignment: 'left',
    })}
    ${wrappedCalloutTwig({
      wrapped_callout__alignment: alignment,
      wrapped_callout__content: wrappedCalloutData.text_two,
      wrapped_callout__callout: wrappedCalloutData.text_three,
      wrapped_callout__theme: dialTheme,
    })}
  `;

  return `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderWrappedCallout('one'), {
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
          createSectionWrapper('one', renderWrappedCallout(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Wrapped Callout Theme Variations',
        '',
        'Wrapped Callout Theme',
      )}
      ${createVariations(
        (alignment) =>
          createSectionWrapper('one', renderWrappedCallout('one', alignment), {
            width: 'site',
            primaryWidth: '100%',
          }),
        alignments,
        'All Alignment Variations',
        '',
        'Alignment',
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
