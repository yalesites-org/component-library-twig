import alertTwig from './alert.twig';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Alert',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    type: {
      name: 'Alert Type',
      type: 'select',
      options: ['emergency', 'announcement', 'marketing'],
      defaultValue: 'announcement',
    },
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

export const Alert = ({ type, heading, content, linkContent }) =>
  alertTwig({
    alert__type: type,
    alert__heading: heading,
    alert__content: content,
    alert__link__content: linkContent,
    alert__link__url: '#',
  });
