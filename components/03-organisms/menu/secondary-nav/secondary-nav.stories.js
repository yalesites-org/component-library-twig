import tokens from '@yalesites-org/tokens/build/json/tokens.json';

// Markup.
import secondaryNavTwig from './yds-secondary-nav.twig';

// Data.
import secondaryNavData from './secondary-nav.yml';
import componentProps from './secondary-nav-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

// JavaScript
import './yds-secondary-nav';

const colorPairingsData = Object.keys(tokens['component-themes']);

const argTypes = toArgTypes(componentProps);
argTypes.themeColor = {
  ...argTypes.themeColor,
  options: colorPairingsData,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Content Collection',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
  args: toArgs(componentProps),
};

export const secondaryNav = ({ themeColor }) => `
  <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-component-width="max" data-component-theme="${themeColor}">
    ${secondaryNavTwig({ ...secondaryNavData, menu_theme: themeColor })}
  </div>
`;
