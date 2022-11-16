import componentWrapperTwig from './yds-component-wrapper.twig';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Component Wrapper',
  parameters: {
    layout: 'fullscreen',
  },
};

export const ComponentWrapper = () => {
  return componentWrapperTwig({});
};
