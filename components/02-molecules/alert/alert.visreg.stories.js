import alertTwig from './yds-alert.twig';
import textFieldTwig from '../text/yds-text-field.twig';
import ctaTwig from '../../01-atoms/controls/cta/yds-cta.twig';

import alertData from './alert.yml';

import './yds-alert';

import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
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

const alertTypes = ['emergency', 'announcement', 'marketing'];

const heading = alertData.alert__heading;
const content = alertData.alert__content;
const linkContent = alertData.alert__link__content;

/**
 * The reset control is a Storybook affordance rather than a theme variation, so
 * it gets one story of its own rather than being repeated in every global theme
 * story.
 */
export const ResettingAlerts = () => `
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
`;

const renderAlertTypes = (sectionTheme) =>
  alertTypes
    .map(
      (alertType) => `
      <div class="sb-section__container">
        <h3 class="sb-section__subheading">Alert Type: ${alertType}</h3>
        ${alertTwig({
          alert__type: alertType,
          alert__heading: heading,
          alert__content: content,
          alert__link__content: linkContent,
          alert__link__url: alertData.alert__link__url,
          alert__id: `alert-${sectionTheme}-${alertType}`,
        })}
      </div>
    `,
    )
    .join('');

const renderGlobalTheme = () =>
  createThemeVariations(
    (sectionTheme) =>
      createSectionWrapper(sectionTheme, renderAlertTypes(sectionTheme), {
        width: 'site',
        primaryWidth: '100%',
      }),
    sectionThemes,
    'All Section Theme Variations',
    'Below are all section theme variations for visual regression testing.',
    'Section Theme',
  );

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
