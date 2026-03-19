import componentWrapperTwig from './yds-component-wrapper.twig';

import { createVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Component Wrapper/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
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
    ${createVariations(
      renderComponentWrapper,
      widthOptions,
      'All Width Variations',
      'Component Width',
    )}
  `;
};
