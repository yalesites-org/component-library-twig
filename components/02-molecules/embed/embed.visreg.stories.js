import embedTwig from './yds-embed.twig';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Embed/Visreg',
  parameters: { controls: { disable: true } },
};

const renderGlobalTheme = () => {
  const width = 'site';
  const loading = 'lazy';

  // Render function for embed variations
  const renderEmbeds = (theme) =>
    createSectionWrapper(
      theme,
      `
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

          <h3>SoundCloud</h3>
          ${embedTwig({
            embed__src:
              'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/320687463',
            embed__title: 'Example SoundCloud Track',
            embed__width: width,
            embed__height: '100%',
            embed__type: 'audio',
            embed__loading: loading,
          })}

          <h3>Google Maps</h3>
          ${embedTwig({
            embed__src:
              'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5993.31404257508!2d-72.92491802386455!3d41.316324371308916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d9b6cd624945%3A0xae34a2c4b4d30427!2sYale%20University!5e0!3m2!1sen!2sca!4v1746124034200!5m2!1sen!2sca',
            embed__width: width,
            embed__height: '100%',
            embed__loading: loading,
            embed__type: 'map',
          })}
        `,
    );

  return createThemeVariations(
    renderEmbeds,
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations with multiple embed types for visual regression testing.',
    'Section Theme',
  );
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
