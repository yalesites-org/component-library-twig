import videoEmbedTwig from './yds-video-embed.twig';

import videoEmbedData from './video-embed.yml';

import {
  globalThemes,
  sectionThemes,
} from '../../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../../_storybook/playground-utils';

export default {
  title: 'Atoms/Videos/Video Embed/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  // Render function for video embed variations
  const renderVideoEmbed = (theme) =>
    createSectionWrapper(theme, videoEmbedTwig(videoEmbedData));

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderVideoEmbed,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
