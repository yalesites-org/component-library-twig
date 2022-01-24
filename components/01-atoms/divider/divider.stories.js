import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import dividerTwig from './divider.twig';

const spacingData = {
  spacing_options: tokens.size.spacing,
  prefix: 'size-spacing'
};

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

export const Spacing = ({ position, thickness }) => `
  ${dividerTwig({
    ...spacingData,
    divider__width: '100%',
    divider__thickness: '0.5',
    divider__position: 'center',
  })}<br />
  ${dividerTwig({
    ...spacingData,
    divider__width: '100%',
    divider__thickness: '1',
    divider__position: 'center',
  })}<br />
  ${dividerTwig({
    ...spacingData,
    divider__width: '100%',
    divider__thickness: '2',
    divider__position: 'center',
  })}<br />
  ${dividerTwig({
    ...spacingData,
    divider__width: '100%',
    divider__thickness: '4',
    divider__position: 'center',
  })}<br />
  ${dividerTwig({
    ...spacingData,
    divider__width: '100%',
    divider__thickness: '6',
    divider__position: 'center',
  })}<br />
  ${dividerTwig({
    ...spacingData,
    divider__width: '100%',
    divider__thickness: '8',
    divider__position: 'center',
  })}<br /><br />
  <h2>Playground</h2>
  <p>Use the StoryBook controls to see the dividers below implement the available positions and thicknesses.</p>
  ${dividerTwig({
    ...spacingData,
    divider__width: '25%',
    divider__thickness: thickness,
    divider__position: position,
  })}<br />
  ${dividerTwig({
    ...spacingData,
    divider__width: '50%',
    divider__thickness: thickness,
    divider__position: position,
  })}<br />
  ${dividerTwig({
    ...spacingData,
    divider__width: '75%',
    divider__thickness: thickness,
    divider__position: position,
  })}<br />
`;
