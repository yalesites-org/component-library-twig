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

  const renderWrappedCallout = (dialTheme, alignment) => `
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
    () =>
      createThemeVariations(
        (sectionTheme) =>
          createSectionWrapper(
            sectionTheme,
            componentThemes
              .map(
                (componentTheme) => `
                  <div class="sb-section__container">
                    <h3 class="sb-section__subheading">Wrapped Callout Theme: ${componentTheme}</h3>
                    ${alignments
                      .map(
                        (alignment) => `
                      <h4>Alignment: ${alignment}</h4>
                      ${renderWrappedCallout(componentTheme, alignment)}
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
        'All Section × Wrapped Callout Theme Combinations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
