import wrappedCalloutTwig from './yds-wrapped-callout.twig';
import textFieldTwig from '../text/yds-text-field.twig';
import wrappedCalloutData from './wrapped-callout.yml';

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
  title: 'Molecules/Wrapped Callout/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
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

  return createGlobalThemeVariations(
    () => `
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
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
