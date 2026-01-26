import componentWrapperTwig from './yds-component-wrapper.twig';

import {
  createPlaygroundIntro,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Component Wrapper/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    componentWidth: {
      name: 'Component Width',
      type: 'select',
      options: ['content', 'highlight', 'site', 'max'],
    },
  },
  args: {
    componentWidth: 'content',
  },
};

export const Playground = ({ componentWidth }) => {
  const widthOptions = ['content', 'highlight', 'site', 'max'];

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different component widths. The placeholder block shows the constrained width.',
    )}

    ${componentWrapperTwig({
      component_wrapper__width: componentWidth,
      component_wrapper__label: 'Component Wrapper Demonstration',
    })}

    ${createVariations(
      (width) =>
        componentWrapperTwig({
          component_wrapper__width: width,
          component_wrapper__label: `Width: ${width}`,
        }),
      widthOptions,
      'All Width Variations',
      'Component Width',
    )}
  `;
};
