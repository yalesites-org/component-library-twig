import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import shadowsTwig from './shadows.twig';

const shadowsData = { shadows: tokens.dropShadow, prefix: '--drop-shadow-' };

export default {
  title: 'Tokens/Shadows',
};

export const Shadows = () => `
  <h2>Shadows are used as hover effects</h2>
  <p>The four levels are displayed below. Hover over each box to see the shadow effect.</p>
  ${shadowsTwig(shadowsData)}
`;
