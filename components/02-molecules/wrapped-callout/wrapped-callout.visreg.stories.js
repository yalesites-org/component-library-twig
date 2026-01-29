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
  title: 'Molecules/Wrapped Callout/Visreg',
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

export const Visreg = ({ sectionTheme, calloutAlignment, themeColor }) => {
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

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 0.95rem;">
        The variations below test all wrapped callout configurations for visual regression testing with Percy.
      </p>
    </div>

    ${createThemeVariations(
      renderWrappedCallout,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
