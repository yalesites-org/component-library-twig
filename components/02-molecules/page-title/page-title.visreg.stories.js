import pageTitleTwig from './yds-page-title.twig';
import pageTitlePostTwig from './_page-title--post-example.twig';
import dateTimeTwig from '../../01-atoms/date-time/yds-date-time.twig';

import socialLinksData from '../social-links/social-links.yml';
import './page-title';
import '../read-time/yds-read-time';

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
  title: 'Molecules/Page Header/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  const meta = `<span>By Charlyn Paradis</span>${dateTimeTwig({
    date_time__start: '2022-01-25',
    date_time__format: 'date',
  })}`;

  // Render function for page title variations
  const renderPageTitle = (theme) =>
    createSectionWrapper(
      theme,
      pageTitleTwig({
        page_title__heading: 'Davis Team Project Wins Award for Research',
        page_title__meta: meta,
        page_title__show_social_media_sharing_links: 'true',
        ...socialLinksData,
      }),
    );

  return createThemeVariations(
    renderPageTitle,
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations for visual regression testing.',
    'Section Theme',
  );
};

// The page header on pages and taxonomy term pages: heading only.
const renderHeadingOnlyGlobalTheme = () => {
  const renderPageTitle = (theme) =>
    createSectionWrapper(
      theme,
      pageTitleTwig({
        page_title__heading: 'About the Department',
        page_title__show_social_media_sharing_links: 'false',
      }),
    );

  return createThemeVariations(
    renderPageTitle,
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations for visual regression testing.',
    'Section Theme',
  );
};

// The page header on a post: byline, date, read time and social links at
// content width. Mirrors the Post story: the read-time script counts words
// inside #main-content, and yds-storybook-cl lets read time show outside Drupal.
const renderPostGlobalTheme = () => {
  const meta = `<span>Charlyn Paradis</span>${dateTimeTwig({
    date_time__start: '2022-01-25',
    date_time__format: 'date',
    date_time__format_override: 'format__day__long',
  })}`;

  const renderPageTitle = (theme) =>
    createSectionWrapper(
      theme,
      `<div id="main-content" class="yds-storybook-cl">${pageTitlePostTwig({
        page_title__heading: 'Davis Team Project Wins Award for Research',
        page_title__meta: meta,
        page_title__show_social_media_sharing_links: 'true',
        ...socialLinksData,
      })}</div>`,
    );

  return createThemeVariations(
    renderPageTitle,
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations for visual regression testing.',
    'Section Theme',
  );
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);
const headingOnlyStories = createGlobalThemeStories(
  renderHeadingOnlyGlobalTheme,
  globalThemes,
  globalThemeLabels,
);
const postStories = createGlobalThemeStories(
  renderPostGlobalTheme,
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

export const OldBluesHeadingOnly = headingOnlyStories.one;
export const NewHavenGreenHeadingOnly = headingOnlyStories.two;
export const ShorelineSummerHeadingOnly = headingOnlyStories.three;
export const OnhaHeadingOnly = headingOnlyStories.four;
export const ItsYourYaleHeadingOnly = headingOnlyStories.five;
export const AIHeadingOnly = headingOnlyStories.six;
export const WhitneyHumanitiesCenterHeadingOnly = headingOnlyStories.seven;

export const OldBluesPost = postStories.one;
export const NewHavenGreenPost = postStories.two;
export const ShorelineSummerPost = postStories.three;
export const OnhaPost = postStories.four;
export const ItsYourYalePost = postStories.five;
export const AIPost = postStories.six;
export const WhitneyHumanitiesCenterPost = postStories.seven;

ItsYourYaleHeadingOnly.storyName = 'It’s Your Yale Heading Only';
ItsYourYalePost.storyName = 'It’s Your Yale Post';
