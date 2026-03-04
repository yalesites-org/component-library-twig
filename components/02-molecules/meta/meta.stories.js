import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import {
  eventLocalistArgs,
  eventLocalistArgTypes,
} from '../../04-page-layouts/cl-page-args';

import eventLocalistData from './event-meta/event-localist.yml';
import eventLocalistUpcomingOnly from './event-meta/event-localist--upcoming-only.yml';
import eventLocalistPastOnly from './event-meta/event-localist--past-only.yml';
import eventLocalistSingleDate from './event-meta/event-localist--single-date.yml';
import basicMetaTwig from './basic-meta/yds-basic-meta.twig';
import eventLocalistMetaTwig from './event-meta/yds-event-meta-localist.twig';
import dateTimeTwig from '../../01-atoms/date-time/yds-date-time.twig';
import profileMetaTwig from './profile-meta/yds-profile-meta.twig';
import imageData from '../../01-atoms/images/image/image.yml';
import videoEmbedData from '../../01-atoms/videos/video-embed/video-embed.yml';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

import './event-meta/event-meta-localist';

// Resource Meta files.
import resourceMetaData from './resource-meta/resource-meta.yml';
import resourceMetaTwig from './resource-meta/yds-resource-meta.twig';

const colorPairingsData = Object.keys(tokens['component-themes']);

const eventDataVariants = {
  'Mixed (Past & Upcoming)': eventLocalistData,
  'Upcoming Only': eventLocalistUpcomingOnly,
  'Past Only': eventLocalistPastOnly,
  'Single Date': eventLocalistSingleDate,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Meta',
  tags: ['!dev'],
};

export const PostMeta = ({ author, date }) =>
  basicMetaTwig({
    basic_meta: `<span>By ${author}</span>${dateTimeTwig({
      date_time__start: date,
      date_time__format: 'day__full',
    })}`,
  });
const postMetaArgs = {
  author: 'Charlyn Paradis',
  date: '2022-01-25',
};
PostMeta.argTypes = addTableDefaults(
  {
    author: {
      name: 'Author',
      type: 'string',
    },
    date: {
      name: 'Date',
      type: 'string',
    },
  },
  postMetaArgs,
);
PostMeta.args = postMetaArgs;

export const Event = ({
  pageTitle,
  format,
  address,
  ctaText,
  allDay,
  withImage,
  withCalendar,
  dataVariant,
}) => {
  const selectedData = eventDataVariants[dataVariant];

  // Modify event dates to add is_all_day property and adjust timestamps
  // For all-day events, Drupal sets start to 00:00 and end to 23:59
  const eventDatesWithAllDay = selectedData.event_dates.map((date) => {
    if (!allDay) {
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
    if (!selectedData.event_featured_date) {
      return undefined;
    }
    if (!allDay) {
      return {
        ...selectedData.event_featured_date,
        is_all_day: false,
      };
    }
    const startDate = new Date(
      selectedData.event_featured_date.original_start * 1000,
    );
    const endDate = new Date(
      selectedData.event_featured_date.original_end * 1000,
    );
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 0, 0);
    return {
      ...selectedData.event_featured_date,
      original_start: Math.floor(startDate.getTime() / 1000),
      original_end: Math.floor(endDate.getTime() / 1000),
      is_all_day: true,
    };
  })();

  return eventLocalistMetaTwig({
    ...imageData.responsive_images['3x2'],
    ...selectedData,
    event_title__heading: pageTitle,
    event_dates: eventDatesWithAllDay,
    event_featured_date: eventFeaturedDateWithAllDay,
    event_meta__format: format,
    event_meta__address: address,
    event_meta__cta_primary__content: ctaText,
    event_meta__cta_primary__href: '#',
    cost_button_text: ctaText,
    event_meta__cta_secondary__content: 'Add to calendar',
    event_meta__cta_secondary__href: '#',
    event_meta__with_calendar: withCalendar == null ? true : !!withCalendar,
    event_meta__image: withImage ? 'true' : 'false',
  });
};
const eventArgs = {
  ...eventLocalistArgs,
  dataVariant: 'Mixed (Past & Upcoming)',
  withCalendar: true,
};
Event.argTypes = addTableDefaults(
  {
    dataVariant: {
      name: 'Event Date Scenario',
      type: 'select',
      options: Object.keys(eventDataVariants),
    },
    withCalendar: {
      name: 'With Add to Calendar button',
      type: 'boolean',
    },
    ...eventLocalistArgTypes,
  },
  eventArgs,
);
Event.args = eventArgs;

export const Profile = ({
  heading,
  bgColor,
  titleLine,
  subTitle,
  department,
  pronouns,
  profileImageOrientation,
  profileImageAlignment,
  profileImageStyle,
}) =>
  profileMetaTwig({
    ...imageData.responsive_images['3x2'],
    profile_meta__heading: heading,
    profile_meta__title_line: titleLine,
    profile_meta__subtitle_line: subTitle,
    profile_meta__department: department,
    profile_meta__pronouns: pronouns,
    profile_meta__background: bgColor,
    profile_meta__image_orientation: profileImageOrientation,
    image__srcset__1: imageData.responsive_images['2x3'].image__srcset,
    image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
    image__alt__1: imageData.responsive_images['2x3'].image__alt,
    image__src__1: imageData.responsive_images['2x3'].image__src,
    profile_meta__image_style: profileImageStyle,
    profile_meta__image_alignment: profileImageAlignment,
  });
const profileArgs = {
  heading: 'Person Namerton',
  titleLine: 'Professional Title',
  subTitle: 'Subtitle',
  department: 'Department name',
  pronouns: 'They/They/Them',
  bgColor: 'one',
  profileImageOrientation: 'landscape',
  profileImageAlignment: 'right',
  profileImageStyle: 'inline',
};
Profile.argTypes = addTableDefaults(
  {
    heading: {
      name: 'Heading',
      type: 'string',
    },
    titleLine: {
      name: 'Profile professional title',
      type: 'string',
    },
    subTitle: {
      name: 'Profile subtitle',
      type: 'string',
    },
    department: {
      name: 'Profile department',
      type: 'string',
    },
    pronouns: {
      name: 'Profile pronouns',
      type: 'string',
    },
    bgColor: {
      name: 'Component Theme (dial)',
      type: 'select',
      options: colorPairingsData,
    },
    profileImageOrientation: {
      name: 'Profile Image Orientation',
      type: 'select',
      options: ['landscape', 'portrait'],
    },
    profileImageAlignment: {
      name: 'Profile Image Alignment',
      type: 'select',
      options: ['left', 'right'],
    },
    profileImageStyle: {
      name: 'Profile Image Style',
      type: 'select',
      options: ['inline', 'outdent'],
    },
  },
  profileArgs,
);
Profile.args = profileArgs;

export const Resource = ({
  heading,
  category,
  resourceType,
  publishDate,
  description,
}) =>
  resourceMetaTwig({
    resource_meta__heading: heading,
    resource_meta__category: category,
    resource_meta__publish_date_label: 'Published On',
    resource_meta__publish_date: publishDate,
    resource_meta__metadata: resourceMetaData.resource_meta__metadata,
    resource_meta__resource_type: resourceType,
    resource_meta__download_label: 'Download',
    resource_meta__download_aria_label: 'Download file',
    resource_meta__download_url: '#.pdf',
    resource_meta__description: description,
    image__srcset__1: imageData.responsive_images['2x3'].image__srcset,
    image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
    image__alt__1: imageData.responsive_images['2x3'].image__alt,
    image__src__1: imageData.responsive_images['2x3'].image__src,
    video_embed__content__1: videoEmbedData.video_embed__content,
  });
const resourceArgs = {
  heading: 'Resource Title',
  category: 'Video',
  resourceType: 'video',
  publishDate: 'July 1, 2025',
  description:
    'This is a sample resource description that will appear below the media content. It can contain <strong>HTML markup</strong> and provides context about the resource.',
};
Resource.argTypes = addTableDefaults(
  {
    heading: {
      name: 'Heading',
      type: 'string',
    },
    category: {
      name: 'Category',
      type: 'string',
    },
    resourceType: {
      name: 'Resource Type',
      type: 'select',
      options: {
        Video: 'video',
        Document: 'document',
      },
    },
    publishDate: {
      name: 'Publish Date',
      type: 'string',
    },
    description: {
      name: 'Description',
      type: 'string',
    },
  },
  resourceArgs,
);
Resource.args = resourceArgs;
