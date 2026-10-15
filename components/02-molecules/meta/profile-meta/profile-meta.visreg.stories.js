import profileMetaTwig from './yds-profile-meta.twig';
import imageData from '../../../01-atoms/images/image/image.yml';

import {
  componentThemes,
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
} from '../../../_storybook/playground-utils';

/**
 * Storybook Definition.
 *
 * Profile Meta has its own visreg file rather than sharing
 * `Molecules/Meta/Visreg` with Basic and Resource Meta, for the same reason
 * Event Meta does. With both of its sweeps stacked under the other two, the
 * shared story reached 1,200 x 19,638 = 23,565,600px, 94% of the 25,000,000px
 * snapshot ceiling.
 *
 * It uses the two sweeps the other own-theme components use (callout, quote
 * callout, wrapped callout, accordion, action banner): every section theme
 * with the background fixed at `one`, then every component-theme background on
 * section `one`.
 *
 * `yds-profile-meta.twig` puts its own `data-component-theme` on itself, taken
 * from `profile_meta__background`, and `_yds-profile-meta.scss` keys off that --
 * so the component paints its own background over the section behind it, and
 * the section sweep is expected to render the same block each time.
 * YaleSites-Internal#1601 dropped that sweep for that reason; it is back for
 * consistency with the other own-theme components, so a section theme that
 * ever does reach the block shows up here the same way it would there.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Meta/Profile Meta/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

const renderProfileMeta = (section, background) =>
  createSectionWrapper(
    section,
    profileMetaTwig({
      ...imageData.responsive_images['3x2'],
      profile_meta__heading: 'Person Namerton',
      profile_meta__title_line: 'Professional Title',
      profile_meta__subtitle_line: 'Subtitle',
      profile_meta__department: 'Department name',
      profile_meta__pronouns: 'They/They/Them',
      profile_meta__background: background,
      profile_meta__image_orientation: 'landscape',
      image__srcset__1: imageData.responsive_images['2x3'].image__srcset,
      image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
      image__alt__1: imageData.responsive_images['2x3'].image__alt,
      image__src__1: imageData.responsive_images['2x3'].image__src,
      profile_meta__image_style: 'inline',
      profile_meta__image_alignment: 'right',
    }),
  );

const renderGlobalTheme = () => `
  ${createThemeVariations(
    (theme) => renderProfileMeta(theme, 'one'),
    sectionThemes,
    'Profile Meta: All Section Theme Variations',
    '',
    'Section Theme',
  )}
  ${createThemeVariations(
    (theme) => renderProfileMeta('one', theme),
    componentThemes,
    'Profile Meta: All Background Variations',
    '',
    'Background',
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
