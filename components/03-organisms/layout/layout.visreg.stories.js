import layoutTwig from './layout/_layout--example.twig';
import textData from '../../02-molecules/text/text-field.yml';
import accordionData from '../../02-molecules/accordion/accordion.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import '../../02-molecules/accordion/yds-accordion';

import {
  componentThemes,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Layout/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const defaultComponentTheme = 'one';
  const layoutOption = 'fifty-fifty';
  const layoutPadding = 'default';
  const divider = false;

  const layoutOptions = [
    'fifty-fifty',
    'thirty-thirty-thirty',
    'seventy-thirty',
  ];

  const paddingOptions = ['default', 'no-top', 'no-bottom', 'no-padding'];

  // Render function for layout variations
  const renderLayouts = (layout) =>
    layoutTwig({
      ...textData,
      ...accordionData,
      ...imageData.responsive_images['4x3'],
      layout__divider: divider ? 'true' : 'false',
      layout__padding: layoutPadding,
      component__theme: defaultComponentTheme,
      component__layout: layout,
    });

  // Render function for theme variations
  const renderThemes = (theme) =>
    layoutTwig({
      ...textData,
      ...accordionData,
      ...imageData.responsive_images['4x3'],
      layout__divider: divider ? 'true' : 'false',
      layout__padding: layoutPadding,
      component__theme: theme,
      component__layout: layoutOption,
    });

  // Render function for padding variations
  const renderPadding = (padding) =>
    layoutTwig({
      ...textData,
      ...accordionData,
      ...imageData.responsive_images['4x3'],
      layout__divider: divider ? 'true' : 'false',
      layout__padding: padding,
      component__theme: defaultComponentTheme,
      component__layout: layoutOption,
    });

  return `
    ${createVariations(
      renderLayouts,
      layoutOptions,
      'All Layout Variations',
      '',
      'Layout Configuration',
    )}

    ${createVariations(
      renderPadding,
      paddingOptions,
      'All Padding Variations',
      '',
      'Padding Option',
    )}

    ${createVariations(
      () =>
        layoutTwig({
          ...textData,
          ...accordionData,
          ...imageData.responsive_images['4x3'],
          layout__divider: 'true',
          layout__padding: 'default',
          component__theme: defaultComponentTheme,
          component__layout: layoutOption,
        }),
      ['enabled'],
      'With Divider Enabled',
      '',
      'Divider',
    )}

    ${createGlobalThemeVariations(
      () => `
        ${createThemeVariations(
          (theme) =>
            createSectionWrapper(theme, renderThemes(defaultComponentTheme), {
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
            createSectionWrapper('one', renderThemes(theme), {
              width: 'site',
              primaryWidth: '100%',
            }),
          componentThemes,
          'All Layout Theme Variations',
          '',
          'Layout Theme',
        )}
      `,
      globalThemes,
      'All Global Theme Variations',
    )}
  `;
};
