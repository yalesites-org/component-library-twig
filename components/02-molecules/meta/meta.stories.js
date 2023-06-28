import { eventArgTypes } from '../../04-page-layouts/cl-page-args';

import basicMetaTwig from './basic-meta/yds-basic-meta.twig';
import eventMetaTwig from './event-meta/yds-event-meta.twig';
import dateTimeTwig from '../../01-atoms/date-time/yds-date-time.twig';

// Utility to convert dates to unix timestamps
const toUnixTimeStamp = (date) => {
  return Math.floor(Date.parse(date) / 1000);
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Meta',
};

export const Basic = ({ meta }) => basicMetaTwig({ basic_meta: meta });
Basic.argTypes = {
  meta: {
    name: 'Meta',
    type: 'string',
    defaultValue: `<span>By Charlyn Paradis</span>${dateTimeTwig({
      date_time__start: '2022-01-25',
      date_time__format: 'day__full',
    })}`,
  },
};

export const Event = ({
  pageTitle,
  startDate,
  endDate,
  format,
  address,
  ctaText,
  allDay,
}) =>
  eventMetaTwig({
    event_title__heading: pageTitle,
    event_meta__date_start: toUnixTimeStamp(startDate),
    event_meta__date_end: toUnixTimeStamp(endDate),
    event_meta__format: format,
    event_meta__address: address,
    event_meta__cta_primary__content: ctaText,
    event_meta__cta_primary__href: '#',
    event_meta__cta_secondary__content: 'Add to calendar',
    event_meta__all_day: allDay,
  });
Event.argTypes = {
  ...eventArgTypes,
};
