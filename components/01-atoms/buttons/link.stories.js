import button from './button.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Button' };

export const Button = () => `
  ${button({
    button_content: 'Button',
  })}
  ${button({
    button_content: 'Button',
    button_radius: 'soft',
  })}
  ${button({
    button_content: 'Button',
    button_radius: 'pill',
  })}
`;
