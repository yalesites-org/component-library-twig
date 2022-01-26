import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import colorsTwig from './colors.twig';

const colorsData = { colors: tokens.color };

export default {
  title: 'Tokens/Colors',
};

export const Colors = () => colorsTwig(colorsData);
