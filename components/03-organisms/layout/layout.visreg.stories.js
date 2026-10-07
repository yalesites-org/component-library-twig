import layoutTwig from './layout/_layout--example.twig';
import textData from '../../02-molecules/text/text-field.yml';
import accordionData from '../../02-molecules/accordion/accordion.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import '../../02-molecules/accordion/yds-accordion';

import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  componentThemes,
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Templates/Layout/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const layoutOptions = ['fifty-fifty', 'thirty-thirty-thirty', 'seventy-thirty'];

const paddingOptions = ['default', 'no-top', 'no-bottom', 'no-padding'];

/**
 * Every story here renders the same example layout and varies exactly one of
 * its options, so they all share this one argument set.
 */
const renderLayout = ({
  layout = 'fifty-fifty',
  padding = 'default',
  theme = 'one',
  hasDivider = false,
} = {}) =>
  layoutTwig({
    ...textData,
    ...accordionData,
    ...imageData.responsive_images['4x3'],
    layout__divider: hasDivider ? 'true' : 'false',
    layout__padding: padding,
    component__theme: theme,
    component__layout: layout,
  });

/**
 * Layout, padding and divider options do not vary by global theme, so they get
 * one story of their own rather than being repeated in every global theme story.
 */
export const LayoutVariations = () => `
  ${createVariations(
    (layout) => renderLayout({ layout }),
    layoutOptions,
    'All Layout Variations',
    '',
    'Layout Configuration',
  )}

  ${createVariations(
    (padding) => renderLayout({ padding }),
    paddingOptions,
    'All Padding Variations',
    '',
    'Padding Option',
  )}

  ${createVariations(
    () => renderLayout({ hasDivider: true }),
    ['enabled'],
    'With Divider Enabled',
    '',
    'Divider',
  )}
`;

const renderGlobalTheme = () => `
  ${createThemeVariations(
    (theme) =>
      createSectionWrapper(theme, renderLayout(), {
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
      createSectionWrapper('one', renderLayout({ theme }), {
        width: 'site',
        primaryWidth: '100%',
      }),
    componentThemes,
    'All Layout Theme Variations',
    '',
    'Layout Theme',
  )}
`;

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
