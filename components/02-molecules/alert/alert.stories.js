import alertTwig from './alert.twig';
import textFieldTwig from '../text/text-field.twig';
import ctaTwig from '../../01-atoms/controls/cta/cta.twig';

import alertData from './alert.yml';

import './alert';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Alert',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    heading: {
      name: 'Alert Heading',
      type: 'string',
      defaultValue: alertData.alert__heading,
    },
    content: {
      name: 'Alert Content',
      type: 'string',
      defaultValue: alertData.alert__content,
    },
    linkContent: {
      name: 'Alert Link Text',
      type: 'string',
      defaultValue: alertData.alert__link__content,
    },
  },
};

const alertResetInstructions = `
<h2>Resetting Alerts in Storybook</h2><p>Once you've closed a dismissible alert, they will not show up again, even after page reloads. In order to see them again, here in storybook, click this reset button, and all alerts will be reset to their initial state.</p>
${ctaTwig({
  cta__content: 'Reset dismissed alerts',
  cta__attributes: { onClick: 'resetAlerts();' },
})}
`;

export const Alert = ({ type, heading, content, linkContent }) => `
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
${alertTwig({
  alert__type: type,
  alert__heading: heading,
  alert__content: content,
  alert__link__content: linkContent,
  alert__link__url: alertData.alert__link__url,
  alert__id: '123',
})}<br />
${textFieldTwig({
  text_field__content: alertResetInstructions,
})}`;
Alert.argTypes = {
  type: {
    name: 'Alert Type',
    type: 'select',
    options: ['emergency', 'announcement', 'marketing'],
    defaultValue: 'announcement',
  },
};

export const AlertExamples = () => `
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
${alertTwig({
  alert__type: 'emergency',
  alert__heading: 'University Office Is Closed',
  alert__content:
    'Due to the inclement weather and unsafe road conditions, Yale University will be closed today, August 5th, 2022.',
  alert__link__content: 'Office Hours',
  alert__link__url: alertData.alert__link__url,
  alert__id: '234',
})}
${alertTwig({
  alert__type: 'announcement',
  alert__heading: 'Dr. Smith Conference Information Change',
  alert__content:
    'Due to scheduling conflicts, the Dr. Smith conference location this Friday is changed to conference room 204.',
  alert__link__content: 'Conference Information',
  alert__link__url: alertData.alert__link__url,
  alert__id: '345',
})}
${alertTwig({
  alert__type: 'marketing',
  alert__heading: 'Interested In Our Program?',
  alert__content:
    'To apply to our program, please visit our program page and fill out an application.',
  alert__link__content: 'Apply Now',
  alert__link__url: alertData.alert__link__url,
  alert__id: '456',
})}<br />
${textFieldTwig({
  text_field__content: alertResetInstructions,
})}`;
