import colorsTokens from '@yalesites-org/tokens/build/json/tokens.json';

import colorsTwig from './colors.twig';

const colorsData = { colors: colorsTokens.color };

export default {
  title: 'Tokens/Colors',
};

export const Colors = () => colorsTwig(colorsData);
