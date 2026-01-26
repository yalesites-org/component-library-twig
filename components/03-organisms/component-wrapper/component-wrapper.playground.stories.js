import componentWrapperTwig from './yds-component-wrapper.twig';

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
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different component widths. The placeholder block shows the constrained width.</p>

  ${componentWrapperTwig({
    component_wrapper__width: componentWidth,
    component_wrapper__label: 'Component Wrapper Demonstration',
  })}

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Width Variations</h2>
  <p>Below are all component width variations for visual regression testing.</p>

  ${widthOptions
    .map(
      (width) => `
    <div style="margin-bottom: 2rem;">
      <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin-bottom: 1rem;">Component Width: ${width}</h3>
      ${componentWrapperTwig({
        component_wrapper__width: width,
        component_wrapper__label: `Width: ${width}`,
      })}
    </div>
  `,
    )
    .join('')}
  `;
};
