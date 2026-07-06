// Storybook story for the Lit <yds-divider> web component.
// Side-effect import registers the custom element (imports Lit from the root dep).
import './src/yds-divider.js';

export default {
  title: 'Web Components/Lit/Divider',
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

// The @storybook/html renderer injects the returned string; the custom element
// upgrades itself once registered. Scalar attributes map directly.
export const Divider = ({ width, position }) =>
  `<yds-divider width="${width}" position="${position}"></yds-divider>`;
