// Markup.
import primaryNavTwig from './primary-nav.twig';

// Data.
import primaryNavData from './primary-nav.yml';

// JavaScript
import './primary-nav';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Menu/Primary Nav' };

export const PrimaryNav = () => primaryNavTwig(primaryNavData);
