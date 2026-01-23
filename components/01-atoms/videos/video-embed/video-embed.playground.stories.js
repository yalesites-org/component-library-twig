import videoEmbedTwig from './yds-video-embed.twig';

import videoEmbedData from './video-embed.yml';

export default {
  title: 'Atoms/Videos/Video Embed/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: ['default', 'one', 'two', 'three', 'four'],
    },
  },
  args: {
    sectionTheme: 'default',
  },
};

export const Playground = ({ sectionTheme }) => {
  const themes = ['default', 'one', 'two', 'three', 'four'];

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test video embed with different themes.</p>

  <div class="yds-layout" data-component-theme="${sectionTheme}" data-component-width="site">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        ${videoEmbedTwig(videoEmbedData)}
      </div>
    </div>
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
      <div class="yds-layout" data-component-theme="${theme}" data-component-width="site">
        <div class="yds-layout__inner">
          <div class="yds-layout__primary">
            ${videoEmbedTwig(videoEmbedData)}
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
