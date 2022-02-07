import button from './button.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Button' };

export const Button = () =>
  button({
    button_content: 'This is a button',
    aria_pressed: 'false',
    aria_expanded: 'false',
    aria_controls: '#some-id',
  });
