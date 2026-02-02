import blockWrapperTwig from './yds-block-wrapper.twig';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

const defaultArgs = {
  blockContent:
    'Block wrapper content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  paddingModifier: 'padding-default',
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Block Wrapper',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: addTableDefaults(
    {
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
    defaultArgs,
  ),
  args: defaultArgs,
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
