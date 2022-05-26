import { eventArgTypes } from '../../04-page-layouts/page-args';

import eventMetaTwig from './event-meta.twig';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Event Meta',
  argTypes: {
    ...eventArgTypes,
  },
};

export const EventMeta = ({ startDate, endDate, format, address, ctaText }) =>
  eventMetaTwig({
    event_meta__date_start: startDate,
    event_meta__date_end: endDate,
    event_meta__format: format,
    event_meta__address: address,
    event_meta__cta_primary__content: ctaText,
    event_meta__cta_primary__href: '#',
    event_meta__cta_secondary__content: 'Add to calendar',
    event_meta__cta_secondary__href: '#',
  });
