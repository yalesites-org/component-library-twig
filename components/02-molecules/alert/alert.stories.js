import alertTwig from './alert.twig';
import textFieldTwig from '../text/text-field.twig';
import buttonTwig from '../../01-atoms/buttons/button.twig';

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
      defaultValue: 'This is the heading for the alert',
    },
    content: {
      name: 'Alert Content',
      type: 'string',
      defaultValue:
        '<p>This is an optional text for more information if needed.</p>',
    },
    linkContent: {
      name: 'Alert Link Text',
      type: 'string',
      defaultValue: 'Optional link',
    },
  },
};

const buttonResetInstructions = `
<div class="text-field"><h2>Resetting Alerts in Storybook</h2><p>Once you've closed a dismissible alert, they will not show up again, even after page reloads. In order to see them again, here in storybook, click this reset button, and all alerts will be reset to their initial state.</p>${buttonTwig(
  {
    button__content: 'Reset dismissed alerts',
    button__attributes: { onClick: 'resetAlerts();' },
  },
)}<button class="button" onclick="resetAlerts();"></button></div>
`;

export const Alert = ({ type, heading, content, linkContent }) => `
<script>
  const resetAlerts = () => {
    for (key in localStorage) {
      if (key.substring(0, 12) == 'ys-alert-id-') {
        localStorage.removeItem(key);
      }
    }

    location.reload();
  };
</script>
${alertTwig({
  alert__type: type,
  alert__heading: heading,
  alert__content: content,
  alert__link__content: linkContent,
  alert__link__url: '#',
  alert__id: '123',
})}<br />
${textFieldTwig({
  text_field__content: buttonResetInstructions,
})}`;
Alert.argTypes = {
  type: {
    name: 'Alert Type',
    type: 'select',
    options: ['emergency', 'announcement', 'marketing'],
    defaultValue: 'announcement',
  },
};

export const AlertExamples = ({ heading, content, linkContent }) => `
<script>
  const resetAlerts = () => {
    for (key in localStorage) {
      if (key.substring(0, 12) == 'ys-alert-id-') {
        localStorage.removeItem(key);
      }
    }

    location.reload();
  };
</script>
${alertTwig({
  alert__type: 'emergency',
  alert__heading: heading,
  alert__content: content,
  alert__link__content: linkContent,
  alert__link__url: '#',
  alert__id: '234',
})}
${alertTwig({
  alert__type: 'announcement',
  alert__heading: heading,
  alert__content: content,
  alert__link__content: linkContent,
  alert__link__url: '#',
  alert__id: '345',
})}
${alertTwig({
  alert__type: 'marketing',
  alert__heading: heading,
  alert__content: content,
  alert__link__content: linkContent,
  alert__link__url: '#',
  alert__id: '456',
})}<br />
${textFieldTwig({
  text_field__content: buttonResetInstructions,
})}`;
