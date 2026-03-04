import alertTwig from './yds-alert.twig';
import textFieldTwig from '../text/yds-text-field.twig';
import ctaTwig from '../../01-atoms/controls/cta/yds-cta.twig';

import alertData from './alert.yml';

import './yds-alert';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Site Alert/Visreg',
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
    type: {
      name: 'Alert Type',
      type: 'select',
      options: ['emergency', 'announcement', 'marketing'],
    },
    heading: {
      name: 'Alert Heading',
      type: 'string',
    },
    content: {
      name: 'Alert Content',
      type: 'string',
    },
    linkContent: {
      name: 'Alert Link Text',
      type: 'string',
    },
  },
  args: {
    sectionTheme: 'default',
    type: 'announcement',
    heading: alertData.alert__heading,
    content: alertData.alert__content,
    linkContent: alertData.alert__link__content,
  },
};

const alertResetInstructions = `
<h2>Resetting Alerts in Storybook</h2><p>Once you've closed a dismissible alert, they will not show up again, even after page reloads. In order to see them again, here in storybook, click this reset button, and all alerts will be reset to their initial state.</p>
${ctaTwig({
  cta__content: 'Reset dismissed alerts',
  cta__attributes: { onClick: 'resetAlerts();' },
  cta__component_theme: 'one',
})}
`;

export const Visreg = ({
  sectionTheme,
  type,
  heading,
  content,
  linkContent,
}) => {
  // Render function for alert variations
  const renderAlert = (theme, idSuffix = 'default') => `
    <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${alertTwig({
            alert__type: type,
            alert__heading: heading,
            alert__content: content,
            alert__link__content: linkContent,
            alert__link__url: alertData.alert__link__url,
            alert__id: `alert-${idSuffix}`,
          })}
        </div>
      </div>
    </div>
  `;

  return `
    <script>
      const resetAlerts = () => {
        Object.keys(localStorage).forEach((key) => {
          if (key.substring(0, 12) === 'ys-alert-id-') {
            localStorage.removeItem(key);
          }
        });

        location.reload();
      };
    </script>

    ${createPlaygroundIntro(
      'Use the controls to test different alert types and content. Click the reset button below to show dismissed alerts.',
    )}

    ${renderAlert(sectionTheme, 'playground')}

    ${textFieldTwig({
      text_field__content: alertResetInstructions,
      text_field__width: 'site',
    })}

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 1rem; line-height: 1.5;">
        The sections below show all variations of the alert component for visual regression testing.
        These are static examples captured by Percy for automated visual testing.
      </p>
    </div>

    ${createThemeVariations(
      (theme) => renderAlert(theme, `theme-${theme}`),
      sectionThemes,
      'All Section Theme Variations',
      'Below are all section theme variations for visual regression testing.',
      'Section Theme',
    )}

    ${createVariations(
      (alertType) => `
        <div data-component-theme="one" data-component-width="site" class="yds-layout">
          <div class="yds-layout__inner">
            <div class="yds-layout__primary">
              ${alertTwig({
                alert__type: alertType,
                alert__heading: heading,
                alert__content: content,
                alert__link__content: linkContent,
                alert__link__url: alertData.alert__link__url,
                alert__id: `alert-type-${alertType}`,
              })}
            </div>
          </div>
        </div>
      `,
      ['emergency', 'announcement', 'marketing'],
      'All Alert Type Variations',
      'Alert Type',
    )}
  `;
};
