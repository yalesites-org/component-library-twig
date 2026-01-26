import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import siteSectionTwig from './yds-site-in-this-section.twig';
import secondaryNavData from '../menu/secondary-nav/secondary-nav.yml';

import '../menu/secondary-nav/yds-secondary-nav';
import '../../02-molecules/menu/menu-in-this-section-toggle/yds-menu-in-this-section-toggle';
import './yds-site-in-this-section';
import './cl-site-in-this-section.scss';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Site/In This Section/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    siteSectionTheme: {
      name: 'Component Theme (dial)',
      options: colorPairingsData,
      type: 'select',
    },
  },
  args: {
    siteSectionTheme: 'one',
  },
};

export const Playground = ({ siteSectionTheme }) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different component theme variations.</p>

  ${siteSectionTwig({
    site_section_wrap__theme: siteSectionTheme,
    secondary_nav__items: secondaryNavData.items,
  })}

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Component Theme Variations</h2>
  <p>Below are all component theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin-bottom: 1rem;">Component Theme: ${theme}</h3>
      ${siteSectionTwig({
        site_section_wrap__theme: theme,
        secondary_nav__items: secondaryNavData.items,
      })}
    </div>
  `,
    )
    .join('')}
  `;
};
