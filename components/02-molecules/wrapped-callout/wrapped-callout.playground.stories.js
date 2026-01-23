import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import wrappedCalloutTwig from './yds-wrapped-callout.twig';
import textFieldTwig from '../text/yds-text-field.twig';
import wrappedCalloutData from './wrapped-callout.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Wrapped Callout/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
    },
    calloutAlignment: {
      name: 'Callout Alignment',
      type: 'select',
      options: ['left', 'right'],
    },
    themeColor: {
      name: 'Component Theme (dial)',
      options: colorPairingsData,
      type: 'select',
    },
  },
  args: {
    sectionTheme: 'one',
    calloutAlignment: 'left',
    themeColor: 'one',
  },
};

export const Playground = ({ sectionTheme, calloutAlignment, themeColor }) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different wrapped callout alignments and themes.</p>

  <div data-component-theme="${sectionTheme}">
    ${textFieldTwig({
      text_field__content: wrappedCalloutData.text_one,
      text_field__width: 'site',
      text_field__alignment: 'left',
    })}
    ${wrappedCalloutTwig({
      wrapped_callout__alignment: calloutAlignment,
      wrapped_callout__content: wrappedCalloutData.text_two,
      wrapped_callout__callout: wrappedCalloutData.text_three,
      wrapped_callout__theme: themeColor,
    })}
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
      <div data-component-theme="${theme}">
        ${textFieldTwig({
          text_field__content: wrappedCalloutData.text_one,
          text_field__width: 'site',
          text_field__alignment: 'left',
        })}
        ${wrappedCalloutTwig({
          wrapped_callout__alignment: calloutAlignment,
          wrapped_callout__content: wrappedCalloutData.text_two,
          wrapped_callout__callout: wrappedCalloutData.text_three,
          wrapped_callout__theme: themeColor,
        })}
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
