import basicMetaTwig from './basic-meta/yds-basic-meta.twig';
import profileMetaTwig from './profile-meta/yds-profile-meta.twig';
import resourceMetaTwig from './resource-meta/yds-resource-meta.twig';
import dateTimeTwig from '../../01-atoms/date-time/yds-date-time.twig';
import imageData from '../../01-atoms/images/image/image.yml';
import videoEmbedData from '../../01-atoms/videos/video-embed/video-embed.yml';
import resourceMetaData from './resource-meta/resource-meta.yml';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 *
 * Resource Meta takes its text and link colors from the section theme
 * (`--color-text`, `--color-link-base`), so it is rendered against all of them.
 * Basic Meta's own color is the fixed `--color-gray-600` token, but it sits
 * directly on the section background, so the contrast pair it forms still
 * differs per section theme -- and at 27px it is nearly free to keep.
 *
 * Event Meta lives in `Molecules/Meta/Event Meta/Visreg` rather than being
 * stacked here; see that file for why. Profile Meta is below, rendered once;
 * see there for why.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Meta/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

/** The meta types whose rendering actually changes with the section theme. */
const renderSectionThemedMeta = (theme) =>
  createSectionWrapper(
    theme,
    `
    <h4>Basic Meta</h4>
    ${basicMetaTwig({
      basic_meta: `<span>By Charlyn Paradis</span>${dateTimeTwig({
        date_time__start: '2022-01-25',
        date_time__format: 'day__full',
      })}`,
    })}

    <h4 style="margin-top: 2rem;">Resource Meta</h4>
    ${resourceMetaTwig({
      resource_meta__heading: 'Resource Title',
      resource_meta__category: 'Video',
      resource_meta__publish_date_label: 'Published On',
      resource_meta__publish_date: 'July 1, 2025',
      resource_meta__metadata: resourceMetaData.resource_meta__metadata,
      resource_meta__resource_type: 'video',
      resource_meta__download_label: 'Download',
      resource_meta__download_aria_label: 'Download file',
      resource_meta__download_url: '#.pdf',
      resource_meta__description:
        'This is a sample resource description that will appear below the media content.',
      image__srcset__1: imageData.responsive_images['2x3'].image__srcset,
      image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
      image__alt__1: imageData.responsive_images['2x3'].image__alt,
      image__src__1: imageData.responsive_images['2x3'].image__src,
      video_embed__content__1: videoEmbedData.video_embed__content,
    })}
  `,
  );

/**
 * Profile Meta, rendered once per global theme rather than once per section
 * theme.
 *
 * `yds-profile-meta.twig` puts its own `data-component-theme` on itself, taken
 * from `profile_meta__background`, and `_yds-profile-meta.scss` keys off that --
 * so the component redefines the color slots for its own subtree and paints its
 * own background over the section behind it. The section theme reaches none of
 * it: iterating all six produced six pixel-identical 441px renders. It still
 * varies by global theme, which is what each story here covers.
 *
 * It is still wrapped in the neutral `default` layout so it sits in the same
 * page chrome as the section-themed block above rather than rendering bare.
 */
const renderProfileMeta = (background) =>
  createSectionWrapper(
    'default',
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
    renderSectionThemedMeta,
    sectionThemes,
    'All Section Theme Variations',
    'Basic Meta and Resource Meta against every section theme.',
    'Section Theme',
  )}
  ${createVariations(
    renderProfileMeta,
    ['one'],
    'Profile Meta',
    'Rendered once, not per section theme: Profile Meta sets its own component theme and background, so the section theme does not reach it. Only background one is snapshotted -- the other component-theme backgrounds have never been covered here.',
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
