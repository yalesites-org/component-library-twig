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

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Meta/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
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
  const renderAllMetaTypes = (theme) =>
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
        `,
    );

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderAllMetaTypes,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations with all 4 meta types for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
