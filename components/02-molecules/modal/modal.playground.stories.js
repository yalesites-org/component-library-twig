import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import modalTwig from './yds-modal.twig';
import modalData from './modal.yml';
import './yds-modal';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Modal/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
    },
  },
  args: {
    sectionTheme: 'one',
  },
};

export const Playground = ({ sectionTheme }) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Click the button to open the modal. Modal functionality requires JavaScript.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        <button class="" data-micromodal-trigger="yds-modal-playground" role="button"> Demo Modal </button>
        ${modalTwig({ ...modalData, id: 'yds-modal-playground' })}
      </div>
    </div>
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme, index) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
      <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
        <div class="yds-layout__inner">
          <div class="yds-layout__primary">
            <button class="" data-micromodal-trigger="yds-modal-theme-${index}" role="button"> Demo Modal (${theme}) </button>
            ${modalTwig({ ...modalData, id: `yds-modal-theme-${index}` })}
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
