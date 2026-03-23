import componentWrapperTwig from './yds-component-wrapper.twig';
import componentProps from './component-wrapper-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Component Wrapper',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

export const ComponentWrapper = ({ componentWidth }) => {
  return componentWrapperTwig({
    component_width: componentWidth,
  });
};
