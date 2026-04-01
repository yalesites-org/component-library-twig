// Markup.
import primaryNavTwig from './yds-primary-nav.twig';

// Data.
import primaryNavData from './primary-nav.yml';
import componentProps from './primary-nav-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

// JavaScript
import './yds-primary-nav';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Primary Nav',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

export const PrimaryNav = ({ menuVariation }) => `
  <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-site-header-nav-position='left' data-component-width="max" data-header-theme="one">
    ${primaryNavTwig({ ...primaryNavData, menu__variation: menuVariation })}
  </div>
`;
