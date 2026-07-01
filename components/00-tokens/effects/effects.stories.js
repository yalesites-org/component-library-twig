import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import shadowsTwig from './shadows.twig';
import radiiTwig from './radii.twig';
import bordersTwig from './borders.twig';

const shadowsData = { shadows: tokens.dropShadow, prefix: '--drop-shadow-' };
const radiiData = { radii: tokens.radius, prefix: '--radius-' };
const bordersData = {
  borders: tokens.border.thickness,
  prefix: '--border-thickness-',
};

export default {
  tags: ['!dev'],
  title: 'Tokens/Effects',
};

export const Shadows = () => shadowsTwig(shadowsData);

export const Radius = () => radiiTwig(radiiData);

export const Borders = () => bordersTwig(bordersData);
