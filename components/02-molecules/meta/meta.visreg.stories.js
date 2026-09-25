import basicMetaTwig from './basic-meta/yds-basic-meta.twig';
import eventLocalistMetaTwig from './event-meta/yds-event-meta-localist.twig';
import profileMetaTwig from './profile-meta/yds-profile-meta.twig';
import resourceMetaTwig from './resource-meta/yds-resource-meta.twig';
import dateTimeTwig from '../../01-atoms/date-time/yds-date-time.twig';
import imageData from '../../01-atoms/images/image/image.yml';
import videoEmbedData from '../../01-atoms/videos/video-embed/video-embed.yml';
import eventLocalistData from './event-meta/event-localist.yml';
import resourceMetaData from './resource-meta/resource-meta.yml';

import './event-meta/event-meta-localist';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeSectionStories } from '../../_storybook/global-theme-stories.mjs';
import { createSectionWrapper } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 *
 * This component splits on section theme as well as global theme: all four
 * meta types stacked across every section theme measured 1,200 x 23,542 =
 * 28,250,400px, past the snapshot ceiling. One section theme per story is
 * roughly a seventh of that. See `global-theme-stories.mjs`.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Meta/Visreg',
  parameters: { controls: { disable: true } },
};

const allDayEvent = false;

// Modify event dates to add is_all_day property and adjust timestamps
// For all-day events, Drupal sets start to 00:00 and end to 23:59
const eventDatesWithAllDay = eventLocalistData.event_dates.map((date) => {
  if (!allDayEvent) {
    return {
      ...date,
      is_all_day: false,
    };
  }
  // For all-day, set times to midnight (start) and 23:59 (end)
  const startDate = new Date(date.original_start * 1000);
  const endDate = new Date(date.original_end * 1000);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 0, 0);
  return {
    ...date,
    original_start: Math.floor(startDate.getTime() / 1000),
    original_end: Math.floor(endDate.getTime() / 1000),
    is_all_day: true,
  };
});

const eventFeaturedDateWithAllDay = (() => {
  if (!allDayEvent) {
    return {
      ...eventLocalistData.event_featured_date,
      is_all_day: false,
    };
  }
  const startDate = new Date(
    eventLocalistData.event_featured_date.original_start * 1000,
  );
  const endDate = new Date(
    eventLocalistData.event_featured_date.original_end * 1000,
  );
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 0, 0);
  return {
    ...eventLocalistData.event_featured_date,
    original_start: Math.floor(startDate.getTime() / 1000),
    original_end: Math.floor(endDate.getTime() / 1000),
    is_all_day: true,
  };
})();

// Render function for all meta types
const renderAllMetaTypes = () => `
          <h4>Basic Meta</h4>
          ${basicMetaTwig({
            basic_meta: `<span>By Charlyn Paradis</span>${dateTimeTwig({
              date_time__start: '2022-01-25',
              date_time__format: 'day__full',
            })}`,
          })}

          <h4 style="margin-top: 2rem;">Event Meta</h4>
          ${eventLocalistMetaTwig({
            ...imageData.responsive_images['3x2'],
            ...eventLocalistData,
            event_title__heading: 'Sample Event Title',
            event_dates: eventDatesWithAllDay,
            event_featured_date: eventFeaturedDateWithAllDay,
            event_meta__format: 'Virtual Event',
            event_meta__address: '123 Main St, New Haven, CT',
            event_meta__cta_primary__content: 'Register',
            event_meta__cta_primary__href: '#',
            cost_button_text: 'Register',
            event_meta__cta_secondary__content: 'Add to calendar',
            event_meta__cta_secondary__href: '#',
            event_meta__with_calendar: true,
            event_meta__image: 'true',
          })}

          <h4 style="margin-top: 2rem;">Profile Meta</h4>
          ${profileMetaTwig({
            ...imageData.responsive_images['3x2'],
            profile_meta__heading: 'Person Namerton',
            profile_meta__title_line: 'Professional Title',
            profile_meta__subtitle_line: 'Subtitle',
            profile_meta__department: 'Department name',
            profile_meta__pronouns: 'They/They/Them',
            profile_meta__background: 'one',
            profile_meta__image_orientation: 'landscape',
            image__srcset__1: imageData.responsive_images['2x3'].image__srcset,
            image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
            image__alt__1: imageData.responsive_images['2x3'].image__alt,
            image__src__1: imageData.responsive_images['2x3'].image__src,
            profile_meta__image_style: 'inline',
            profile_meta__image_alignment: 'right',
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
        `;

const renderSection = (sectionTheme) =>
  createSectionWrapper(sectionTheme, renderAllMetaTypes());

const themeStories = createGlobalThemeSectionStories(
  renderSection,
  globalThemes,
  sectionThemes,
  globalThemeLabels,
);

export const OldBluesSectionDefault = themeStories.one.default;
export const OldBluesSectionOne = themeStories.one.one;
export const OldBluesSectionTwo = themeStories.one.two;
export const OldBluesSectionThree = themeStories.one.three;
export const OldBluesSectionFour = themeStories.one.four;
export const OldBluesSectionFive = themeStories.one.five;
export const OldBluesSectionSix = themeStories.one.six;

export const NewHavenGreenSectionDefault = themeStories.two.default;
export const NewHavenGreenSectionOne = themeStories.two.one;
export const NewHavenGreenSectionTwo = themeStories.two.two;
export const NewHavenGreenSectionThree = themeStories.two.three;
export const NewHavenGreenSectionFour = themeStories.two.four;
export const NewHavenGreenSectionFive = themeStories.two.five;
export const NewHavenGreenSectionSix = themeStories.two.six;

export const ShorelineSummerSectionDefault = themeStories.three.default;
export const ShorelineSummerSectionOne = themeStories.three.one;
export const ShorelineSummerSectionTwo = themeStories.three.two;
export const ShorelineSummerSectionThree = themeStories.three.three;
export const ShorelineSummerSectionFour = themeStories.three.four;
export const ShorelineSummerSectionFive = themeStories.three.five;
export const ShorelineSummerSectionSix = themeStories.three.six;

export const OnhaSectionDefault = themeStories.four.default;
export const OnhaSectionOne = themeStories.four.one;
export const OnhaSectionTwo = themeStories.four.two;
export const OnhaSectionThree = themeStories.four.three;
export const OnhaSectionFour = themeStories.four.four;
export const OnhaSectionFive = themeStories.four.five;
export const OnhaSectionSix = themeStories.four.six;

export const ItsYourYaleSectionDefault = themeStories.five.default;
export const ItsYourYaleSectionOne = themeStories.five.one;
export const ItsYourYaleSectionTwo = themeStories.five.two;
export const ItsYourYaleSectionThree = themeStories.five.three;
export const ItsYourYaleSectionFour = themeStories.five.four;
export const ItsYourYaleSectionFive = themeStories.five.five;
export const ItsYourYaleSectionSix = themeStories.five.six;

export const AISectionDefault = themeStories.six.default;
export const AISectionOne = themeStories.six.one;
export const AISectionTwo = themeStories.six.two;
export const AISectionThree = themeStories.six.three;
export const AISectionFour = themeStories.six.four;
export const AISectionFive = themeStories.six.five;
export const AISectionSix = themeStories.six.six;

export const WhitneyHumanitiesCenterSectionDefault = themeStories.seven.default;
export const WhitneyHumanitiesCenterSectionOne = themeStories.seven.one;
export const WhitneyHumanitiesCenterSectionTwo = themeStories.seven.two;
export const WhitneyHumanitiesCenterSectionThree = themeStories.seven.three;
export const WhitneyHumanitiesCenterSectionFour = themeStories.seven.four;
export const WhitneyHumanitiesCenterSectionFive = themeStories.seven.five;
export const WhitneyHumanitiesCenterSectionSix = themeStories.seven.six;

ItsYourYaleSectionDefault.storyName = 'It’s Your Yale Section Default';
ItsYourYaleSectionOne.storyName = 'It’s Your Yale Section One';
ItsYourYaleSectionTwo.storyName = 'It’s Your Yale Section Two';
ItsYourYaleSectionThree.storyName = 'It’s Your Yale Section Three';
ItsYourYaleSectionFour.storyName = 'It’s Your Yale Section Four';
ItsYourYaleSectionFive.storyName = 'It’s Your Yale Section Five';
ItsYourYaleSectionSix.storyName = 'It’s Your Yale Section Six';
