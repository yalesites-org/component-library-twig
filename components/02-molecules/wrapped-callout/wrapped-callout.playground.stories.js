import wrappedCalloutTwig from './yds-wrapped-callout.twig';
import textFieldTwig from '../text/yds-text-field.twig';
import wrappedCalloutData from './wrapped-callout.yml';

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
  title: 'Molecules/Wrapped Callout/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
    calloutAlignment: {
      name: 'Callout Alignment',
      type: 'select',
      options: ['left', 'right'],
    },
    themeColor: {
      name: 'Wrapped Callout Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      options: componentThemes,
      type: 'select',
    },
  },
  args: {
    sectionTheme: 'default',
    calloutAlignment: 'left',
    themeColor: 'one',
  },
};

export const Playground = ({ sectionTheme, calloutAlignment, themeColor }) => {
  // Render function for wrapped callout variations
  const renderWrappedCallout = (theme) => `
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
  `;

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different wrapped callout alignments and themes.',
    )}

    ${renderWrappedCallout(sectionTheme)}

    ${createThemeVariations(
      renderWrappedCallout,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
