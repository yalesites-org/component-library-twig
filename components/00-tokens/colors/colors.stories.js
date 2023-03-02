import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import colorsTwig from './colors.twig';
import colorPairingsTwig from './color-pairings.twig';
import colorGlobalThemeTwig from './color-global-themes.twig';

const colorsData = {
  colors: {
    blue: tokens.color.blue,
    green: tokens.color.green,
    purple: tokens.color.purple,
    orange: tokens.color.orange,
    yellow: tokens.color.yellow,
    basic: tokens.color.basic,
    gray: tokens.color.gray,
  },
};
const colorPairingsData = { themes: tokens['component-themes'] };
const colorGlobalThemeData = { globalThemes: tokens.globalThemes };

export default {
  title: 'Tokens/Colors',
};

export const Colors = () => colorsTwig(colorsData);

export const ColorPairings = () => `
  <h2>These pairings are selected to support accessibility standards.</h2>
  <p>This page is useful to check the accessibility of various components against the available background colors.</p>
  ${colorPairingsTwig(colorPairingsData)}
`;

export const ColorGlobalThemes = () => `
  <h2>These are global themes.</h2>
  ${colorGlobalThemeTwig(colorGlobalThemeData)}
`;
