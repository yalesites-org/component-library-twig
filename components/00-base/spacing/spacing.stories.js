import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import spacingTwig from './spacing.twig';

const spacingData = { spacing_options: tokens.size.spacing };

export default {
  title: 'Tokens/Spacing',
};

export const Spacing = () => spacingTwig(spacingData);
