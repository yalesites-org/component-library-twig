import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import videoTwig from './yds-video.twig';

import videoData from './video.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Video/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
    text: {
      name: 'Text',
      type: 'string',
    },
    placement: {
      name: 'Video Placement',
      type: 'select',
      options: ['left', 'center'],
    },
  },
  args: {
    sectionTheme: 'one',
    heading: videoData.video__heading,
    text: videoData.video__text,
    placement: videoData.video__placement,
  },
};

export const Playground = ({ sectionTheme, heading, text, placement }) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different video configurations.</p>

  <div data-component-theme="${sectionTheme}">
    ${videoTwig({
      ...videoData,
      video__heading: heading,
      video__text: text,
      video__alignment: placement,
      video__width: 'site',
    })}
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
      <div data-component-theme="${theme}">
        ${videoTwig({
          ...videoData,
          video__heading: heading,
          video__text: text,
          video__alignment: placement,
          video__width: 'site',
        })}
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
