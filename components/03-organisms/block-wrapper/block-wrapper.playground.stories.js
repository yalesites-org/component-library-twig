import blockWrapperTwig from './yds-block-wrapper.twig';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Block Wrapper/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    paddingModifier: {
      name: 'Padding Modifier',
      type: 'select',
      options: {
        'Default Padding': 'padding-default',
        'No Top Padding': 'padding-no-top',
        'No Bottom Padding': 'padding-no-bottom',
        'No Padding': 'padding-no-padding',
      },
    },
  },
  args: {
    paddingModifier: 'padding-default',
  },
};

export const Playground = ({ paddingModifier }) => {
  const paddingOptions = [
    'padding-default',
    'padding-no-top',
    'padding-no-bottom',
    'padding-no-padding',
  ];

  const blockContent =
    '<div style="background-color: #c8e6c9; padding: 20px;">Block wrapper content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>';

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different padding modifiers.</p>

  <div style="background-color: #f0f0f0; padding: 20px;">
    <div style="background-color: #e3f2fd; padding: 10px; margin-bottom: 10px;">
      <strong>Previous Block</strong>
    </div>
    ${blockWrapperTwig({
      block_wrapper__content: blockContent,
      block_wrapper__extra_classes: [
        'ys-block-wrapper',
        `ys-block-wrapper--${paddingModifier}`,
      ],
    })}
    <div style="background-color: #fff3e0; padding: 10px; margin-top: 10px;">
      <strong>Next Block / Footer</strong>
    </div>
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Padding Variations</h2>
  <p>Below are all padding variations for visual regression testing.</p>

  <div style="background-color: #f0f0f0; padding: 20px;">
    ${paddingOptions
      .map(
        (modifier) => `
      <div style="margin-bottom: 2rem;">
        <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin-bottom: 1rem;">Padding: ${modifier}</h3>
        <div style="background-color: #e3f2fd; padding: 10px; margin-bottom: 10px;">
          <strong>Previous Block</strong>
        </div>
        ${blockWrapperTwig({
          block_wrapper__content: blockContent,
          block_wrapper__extra_classes: [
            'ys-block-wrapper',
            `ys-block-wrapper--${modifier}`,
          ],
        })}
        <div style="background-color: #fff3e0; padding: 10px; margin-top: 10px;">
          <strong>Next Block / Footer</strong>
        </div>
      </div>
    `,
      )
      .join('')}
  </div>
  `;
};
