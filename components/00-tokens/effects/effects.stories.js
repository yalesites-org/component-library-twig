import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import shadowsTwig from './shadows.twig';
import radiiTwig from './radii.twig';

const shadowsData = { shadows: tokens.dropShadow, prefix: '--drop-shadow-' };
const radiiData = { radii: tokens.radius, prefix: '--radius-' };

export default {
  title: 'Tokens/Effects',
};

export const Shadows = () => `
  <h2>Shadows should only be used as hover or interaction effect</h2>
  <p>The four levels are displayed below. Hover over each box to see the shadow effect.</p>
  ${shadowsTwig(shadowsData)}
`;

export const Radius = () => `
  <h2>Radius selection will affect the appearance of cards and list groups</h2>
  <p>Radius 3 is available for mobile apps.</p>
  ${radiiTwig(radiiData)}
`;
