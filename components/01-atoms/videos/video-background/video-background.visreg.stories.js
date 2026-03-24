import videoBackgroundTwig from './yds-video-background.twig';

import videoBackgroundData from './video-background.yml';

import './yds-video-background';

import {
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
  createSectionWrapper,
} from '../../../_storybook/playground-utils';

export default {
  title: 'Atoms/Videos/Video Background/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (sectionTheme) =>
          createSectionWrapper(
            sectionTheme,
            componentThemes
              .map(
                (componentTheme) => `
                  <div class="sb-section__container">
                    <h3 class="sb-section__subheading">Video Background Theme: ${componentTheme}</h3>
                    ${videoBackgroundTwig({
                      ...videoBackgroundData,
                      video_background__button__background_color:
                        componentTheme,
                    })}
                  </div>
                `,
              )
              .join(''),
            { width: 'site', primaryWidth: '100%' },
          ),
        sectionThemes,
        'All Section × Video Background Theme Combinations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
