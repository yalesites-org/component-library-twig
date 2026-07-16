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
  tags: ['visreg'],
  title: 'Atoms/Videos/Video Background/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const renderVideoBackground = (theme) =>
    videoBackgroundTwig({
      ...videoBackgroundData,
      video_background__button__background_color: theme,
    });

  return createGlobalThemeVariations(
    () => `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderVideoBackground('one'), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper('one', renderVideoBackground(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Video Background Theme Variations',
        '',
        'Video Background Theme',
      )}
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
