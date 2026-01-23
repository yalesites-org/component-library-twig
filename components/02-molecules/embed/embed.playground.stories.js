import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import embedTwig from './yds-embed.twig';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Embed/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
    },
    width: {
      name: 'Width',
      type: 'select',
      options: ['max', 'site', 'highlight', 'content'],
    },
    loading: {
      name: 'Loading',
      options: ['lazy', 'eager'],
      type: 'select',
    },
  },
  args: {
    sectionTheme: 'one',
    width: 'site',
    loading: 'lazy',
  },
};

export const Playground = ({ sectionTheme, width, loading }) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different embed configurations. All embed types are shown below.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        <h3>Microsoft Forms</h3>
        ${embedTwig({
          embed__title: 'Example Microsoft Form',
          embed__src:
            'https://forms.office.com/Pages/ResponsePage.aspx?id=u76M3Tkh-E20EU4-h6vrXJ-OMhrDFtBEifIUjjt2g_xURUVBU1IyUVlTVFFFNjJQQzJXM1pNMVozVi4u&embed=true',
          embed__width: width,
          embed__height: '100%',
          embed__loading: loading,
          embed__type: 'form',
        })}

        <h3 style="margin-top: 2rem;">SoundCloud</h3>
        ${embedTwig({
          embed__src:
            'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/320687463',
          embed__title: 'Example SoundCloud Track',
          embed__width: width,
          embed__height: '100%',
          embed__type: 'audio',
          embed__loading: loading,
        })}

        <h3 style="margin-top: 2rem;">Google Maps</h3>
        ${embedTwig({
          embed__src:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5993.31404257508!2d-72.92491802386455!3d41.316324371308916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d9b6cd624945%3A0xae34a2c4b4d30427!2sYale%20University!5e0!3m2!1sen!2sca!4v1746124034200!5m2!1sen!2sca',
          embed__width: width,
          embed__height: '100%',
          embed__loading: loading,
          embed__type: 'map',
        })}
      </div>
    </div>
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations with multiple embed types for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 3rem;">
      <h3>Section Theme: ${theme}</h3>
      <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
        <div class="yds-layout__inner">
          <div class="yds-layout__primary">
            <h4>Microsoft Forms</h4>
            ${embedTwig({
              embed__title: 'Example Microsoft Form',
              embed__src:
                'https://forms.office.com/Pages/ResponsePage.aspx?id=u76M3Tkh-E20EU4-h6vrXJ-OMhrDFtBEifIUjjt2g_xURUVBU1IyUVlTVFFFNjJQQzJXM1pNMVozVi4u&embed=true',
              embed__width: width,
              embed__height: '100%',
              embed__loading: loading,
              embed__type: 'form',
            })}

            <h4 style="margin-top: 2rem;">SoundCloud</h4>
            ${embedTwig({
              embed__src:
                'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/320687463',
              embed__title: 'Example SoundCloud Track',
              embed__width: width,
              embed__height: '100%',
              embed__type: 'audio',
              embed__loading: loading,
            })}

            <h4 style="margin-top: 2rem;">Google Maps</h4>
            ${embedTwig({
              embed__src:
                'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5993.31404257508!2d-72.92491802386455!3d41.316324371308916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d9b6cd624945%3A0xae34a2c4b4d30427!2sYale%20University!5e0!3m2!1sen!2sca!4v1746124034200!5m2!1sen!2sca',
              embed__width: width,
              embed__height: '100%',
              embed__loading: loading,
              embed__type: 'map',
            })}
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
