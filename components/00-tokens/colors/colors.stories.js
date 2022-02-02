import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import colorsTwig from './colors.twig';
import colorPairingsTwig from './color-pairings.twig';

const colorsData = { colors: tokens.color };
const colorPairingsData = { themes: tokens['component-themes'] };

export default {
  title: 'Tokens/Colors',
};

export const Colors = () => colorsTwig(colorsData);

export const ColorPairings = () => `
  <h2>These pairings are selected to support accessibility standards.</h2>
  ${colorPairingsTwig(colorPairingsData)}
`;
