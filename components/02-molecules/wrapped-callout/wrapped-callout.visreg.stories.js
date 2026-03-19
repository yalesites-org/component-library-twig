import wrappedCalloutTwig from './yds-wrapped-callout.twig';
import textFieldTwig from '../text/yds-text-field.twig';
import wrappedCalloutData from './wrapped-callout.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

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
  const calloutAlignment = 'left';
  const themeColor = 'one';

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
    ${createThemeVariations(
      renderWrappedCallout,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
