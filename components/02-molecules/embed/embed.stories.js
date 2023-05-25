import embedTwig from './yds-embed.twig';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Embed',
  argTypes: {
    height: {
      name: 'Height',
      type: 'string',
      defaultValue: '100%',
    },
    width: {
      name: 'Width',
      type: 'string',
      defaultValue: '100%',
    },
    type: {
      name: 'Type',
      options: ['form', 'audio', 'unknown'],
      type: 'select',
      defaultValue: 'form',
    },
    loading: {
      name: 'Loading',
      options: ['lazy', 'eager'],
      type: 'select',
      defaultValue: 'lazy',
    },
  },
};

export const Embed = ({ height, width, type, loading }) =>
  embedTwig({
    embed__src:
      'https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_cDezt2JVsNok77o',
    embed__title: 'Example Qualtrics Form',
    embed__height: height,
    embed__width: width,
    embed__type: type,
    embed__loading: loading,
  });
