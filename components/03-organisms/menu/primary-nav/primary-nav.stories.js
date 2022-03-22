// Markup.
import primaryNavTwig from './primary-nav.twig';

// Data.
import primaryNavData from './primary-nav.yml';

// JavaScript
import './primary-nav';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Primary Nav',
  parameters: {
    layout: 'fullscreen',
  },
};

export const PrimaryNav = () => `
  <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-site-header-nav-position='left' data-component-width="max">
    ${primaryNavTwig(primaryNavData)}
  </div>
`;
