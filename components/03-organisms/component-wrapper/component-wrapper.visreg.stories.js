import componentWrapperTwig from './yds-component-wrapper.twig';

import {
  createPlaygroundIntro,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Component Wrapper/Visreg',
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

export const Visreg = ({ componentWidth }) => {
  const widthOptions = ['content', 'highlight', 'site', 'max'];

  const renderComponentWrapper = (width) => `
    <div class="wrap-for-screenshot">
      ${componentWrapperTwig({
        component_wrapper__width: width,
        component_wrapper__label: `Width: ${width}`,
      })}
    </div>
  `;

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different component widths. The placeholder block shows the constrained width.',
    )}

    ${renderComponentWrapper(componentWidth)}

    ${createVariations(
      renderComponentWrapper,
      widthOptions,
      'All Width Variations',
      'Component Width',
    )}
  `;
};
