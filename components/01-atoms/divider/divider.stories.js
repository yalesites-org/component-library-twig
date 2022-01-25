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
      options: [0.5, 1, 2, 4, 6, 8],
      type: 'select',
      defaultValue: '0.5',
    },
  },
};

export const Dividers = ({ position, thickness }) => `
  ${dividerTwig({ divider__thickness: '0.5' })}<br />
  ${dividerTwig({ divider__thickness: '1' })}<br />
  ${dividerTwig({ divider__thickness: '2' })}<br />
  ${dividerTwig({ divider__thickness: '4' })}<br />
  ${dividerTwig({ divider__thickness: '6' })}<br />
  ${dividerTwig({ divider__thickness: '8' })}<br /><br />
  <h2>Playground</h2>
  <p>Use the StoryBook controls to see the dividers below implement the available positions and thicknesses.</p>
  ${dividerTwig({
    divider__width: '25%',
    divider__thickness: thickness,
    divider__position: position,
  })}<br />
  ${dividerTwig({
    divider__width: '50%',
    divider__thickness: thickness,
    divider__position: position,
  })}<br />
  ${dividerTwig({
    divider__width: '75%',
    divider__thickness: thickness,
    divider__position: position,
  })}<br />
  ${dividerTwig({
    divider__width: '100%',
    divider__thickness: thickness,
    divider__position: position,
  })}
`;
