import blockWrapperTwig from './yds-block-wrapper.twig';
import componentProps from './block-wrapper-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Templates/Block Wrapper',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
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
