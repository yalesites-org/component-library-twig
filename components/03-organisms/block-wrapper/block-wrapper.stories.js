import blockWrapperTwig from './yds-block-wrapper.twig';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Block Wrapper',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    blockContent: {
      name: 'Content',
      type: 'string',
    },
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
    blockContent:
      'Block wrapper content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    paddingModifier: 'padding-default',
  },
};

export const BlockWrapper = ({ blockContent, paddingModifier }) => {
  const wrappedContent = `<div style="background-color: #c8e6c9; padding: 20px;">${blockContent}</div>`;

  return `
    <div style="background-color: #f0f0f0; padding: 20px;">
      <div style="background-color: #e3f2fd; padding: 10px;">
        <strong>Previous Block</strong>
      </div>
      ${blockWrapperTwig({
        block_wrapper__content: wrappedContent,
        block_wrapper__extra_classes: [
          'ys-block-wrapper',
          `ys-block-wrapper--${paddingModifier}`,
        ],
      })}
      <div style="background-color: #fff3e0; padding: 10px;">
        <strong>Next Block / Footer</strong>
      </div>
    </div>
  `;
};

export const AllPaddingOptions = ({ blockContent }) => {
  const paddingOptions = [
    'padding-default',
    'padding-no-top',
    'padding-no-bottom',
    'padding-no-padding',
  ];

  const wrappedContent = `<div style="background-color: #c8e6c9; padding: 20px;">${blockContent}</div>`;

  return `
    <div style="background-color: #f0f0f0; padding: 20px;">
      ${paddingOptions
        .map(
          (modifier) => `
        <div style="margin-bottom: 40px;">
          <h3 style="margin: 0 0 10px 0; font-family: system-ui, sans-serif;">
            ${modifier}
          </h3>
          <div style="background-color: #e3f2fd; padding: 10px;">
            <strong>Previous Block</strong>
          </div>
          ${blockWrapperTwig({
            block_wrapper__content: wrappedContent,
            block_wrapper__extra_classes: [
              'ys-block-wrapper',
              `ys-block-wrapper--${modifier}`,
            ],
          })}
          <div style="background-color: #fff3e0; padding: 10px;">
            <strong>Next Block / Footer</strong>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
  `;
};
AllPaddingOptions.argTypes = {
  paddingModifier: {
    table: {
      disable: true,
    },
  },
};
