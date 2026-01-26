import blockWrapperTwig from './yds-block-wrapper.twig';

import {
  createPlaygroundIntro,
  createVariations,
} from '../../_storybook/playground-utils';

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

  // Render function for block wrapper variations
  const renderBlockWrapper = (modifier) => `
    <div style="background-color: #f0f0f0; padding: 20px;">
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
  `;

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different padding modifiers.',
    )}

    ${renderBlockWrapper(paddingModifier)}

    ${createVariations(
      renderBlockWrapper,
      paddingOptions,
      'All Padding Variations',
      'Padding Modifier',
    )}
  `;
};
