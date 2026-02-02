import componentWrapperTwig from './yds-component-wrapper.twig';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

const defaultArgs = {
  componentWidth: 'content',
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Component Wrapper',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: addTableDefaults(
    {
      componentWidth: {
        name: 'Component Width',
        type: 'select',
        options: ['content', 'highlight', 'site', 'max'],
      },
    },
    defaultArgs,
  ),
  args: defaultArgs,
};

export const ComponentWrapper = ({ componentWidth }) => {
  return componentWrapperTwig({
    component_width: componentWidth,
  });
};
