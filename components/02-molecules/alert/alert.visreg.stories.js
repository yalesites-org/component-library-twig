import alertTwig from './yds-alert.twig';
import textFieldTwig from '../text/yds-text-field.twig';
import ctaTwig from '../../01-atoms/controls/cta/yds-cta.twig';

import alertData from './alert.yml';

import './yds-alert';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
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
    controls: { disable: true },
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

export const Visreg = () => {
  const type = 'announcement';
  const heading = alertData.alert__heading;
  const content = alertData.alert__content;
  const linkContent = alertData.alert__link__content;

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

    ${textFieldTwig({
      text_field__content: alertResetInstructions,
      text_field__width: 'site',
    })}

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
