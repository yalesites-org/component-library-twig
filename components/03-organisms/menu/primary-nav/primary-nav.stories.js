// Markup.
import primaryNavTwig from './yds-primary-nav.twig';

// Data.
import primaryNavData from './primary-nav.yml';
import { addTableDefaults } from '../../../_storybook/add-table-defaults';

// JavaScript
import './yds-primary-nav';

const defaultArgs = {
  menuVariation: 'basic',
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Primary Nav',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: addTableDefaults(
    {
      menuVariation: {
        name: 'Menu Variation',
        options: ['basic', 'mega', 'focus'],
        type: 'select',
      },
    },
    defaultArgs,
  ),
  args: defaultArgs,
};

export const PrimaryNav = ({ menuVariation }) => `
  <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-site-header-nav-position='left' data-component-width="max" data-header-theme="one">
    ${primaryNavTwig({ ...primaryNavData, menu__variation: menuVariation })}
  </div>
`;
