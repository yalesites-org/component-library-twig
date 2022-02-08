import dividerTwig from './divider.twig';

export default {
  title: 'Atoms/Divider',
  argTypes: {
    position: {
      options: ['left', 'center', 'right'],
      type: 'select',
      defaultValue: 'center',
    },
    thickness: {
      options: ['hairline', 1, 2, 4, 6, 8],
      type: 'select',
      defaultValue: 'hairline',
    },
    dividerColor: {
      options: ['gray-500', 'blue-yale', 'accent'],
      type: 'select',
      defaultValue: 'gray-500',
    },
  },
};

export const Dividers = ({ position, thickness, dividerColor }) => `
  ${dividerTwig({ divider__thickness: 'hairline' })}<br />
  ${dividerTwig({ divider__thickness: '1' })}<br />
  ${dividerTwig({ divider__thickness: '2' })}<br />
  ${dividerTwig({ divider__thickness: '4' })}<br />
  ${dividerTwig({ divider__thickness: '6' })}<br />
  ${dividerTwig({ divider__thickness: '8' })}<br /><br />
  <h2>Playground</h2>
  <p>Use the StoryBook controls to see the dividers below implement the available positions, thicknesses, and colors.</p>
  <style>body {--color-divider: var(--color-${dividerColor})}</style>
  ${dividerTwig({
    divider__width: '25',
    divider__thickness: thickness,
    divider__position: position,
  })}<br />
  ${dividerTwig({
    divider__width: '50',
    divider__thickness: thickness,
    divider__position: position,
  })}<br />
  ${dividerTwig({
    divider__width: '75',
    divider__thickness: thickness,
    divider__position: position,
  })}<br />
  ${dividerTwig({
    divider__width: '100',
    divider__thickness: thickness,
    divider__position: position,
  })}
`;
