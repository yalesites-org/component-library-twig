import basicMetaTwig from './basic-meta/yds-basic-meta.twig';
import resourceMetaTwig from './resource-meta/yds-resource-meta.twig';
import dateTimeTwig from '../../01-atoms/date-time/yds-date-time.twig';
import imageData from '../../01-atoms/images/image/image.yml';
import STATIC_VIDEO_EMBED from '../../_storybook/static-video-embed.mjs';
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
 * stacked here, and Profile Meta in `Molecules/Meta/Profile Meta/Visreg`;
 * see those files for why.
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
      video_embed__content__1: STATIC_VIDEO_EMBED,
    })}
  `,
  );

const renderGlobalTheme = () =>
  createThemeVariations(
    renderSectionThemedMeta,
    sectionThemes,
    'All Section Theme Variations',
    'Basic Meta and Resource Meta against every section theme.',
    'Section Theme',
  );

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
