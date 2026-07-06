// Storybook story for the vanilla (no-Lit) <yds-divider-vanilla> web component.
// Same controls and output as the Lit Divider story — compare the source files
// (web-components/src/yds-divider.js vs web-components/vanilla/yds-divider-vanilla.js).
import './vanilla/yds-divider-vanilla.js';

export default {
  title: 'Web Components/Vanilla/Divider',
  tags: ['!dev'],
  argTypes: {
    width: {
      control: 'select',
      options: ['100', '75', '50', '25'],
      description: 'Divider width as a % of the container',
    },
    position: {
      control: 'select',
      options: ['left', 'center'],
      description: 'Horizontal alignment',
    },
  },
  args: { width: '100', position: 'center' },
};

export const Divider = ({ width, position }) =>
  `<yds-divider-vanilla width="${width}" position="${position}"></yds-divider-vanilla>`;
