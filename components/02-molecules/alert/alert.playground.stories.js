import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import alertTwig from './yds-alert.twig';
import textFieldTwig from '../text/yds-text-field.twig';
import ctaTwig from '../../01-atoms/controls/cta/yds-cta.twig';

import alertData from './alert.yml';

import './yds-alert';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Alert/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
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
    sectionTheme: 'one',
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

export const Playground = ({
  sectionTheme,
  type,
  heading,
  content,
  linkContent,
}) => {
  const themes = colorPairingsData;

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

  <h2>Interactive Playground</h2>
  <p>Use the controls to test different alert types and content. Click the reset button below to show dismissed alerts.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        ${alertTwig({
          alert__type: type,
          alert__heading: heading,
          alert__content: content,
          alert__link__content: linkContent,
          alert__link__url: alertData.alert__link__url,
          alert__id: 'playground-123',
        })}
        ${textFieldTwig({
          text_field__content: alertResetInstructions,
        })}
      </div>
    </div>
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
      <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
        <div class="yds-layout__inner">
          <div class="yds-layout__primary">
            ${alertTwig({
              alert__type: type,
              alert__heading: heading,
              alert__content: content,
              alert__link__content: linkContent,
              alert__link__url: alertData.alert__link__url,
              alert__id: `theme-${theme}`,
            })}
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
