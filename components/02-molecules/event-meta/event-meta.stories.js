import eventMetaTwig from './event-meta.twig';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Event Meta',
  argTypes: {
    startDate: {
      name: 'Start Date/Time',
      type: 'string',
      defaultValue: '2022-04-01T08:00',
    },
    endDate: {
      name: 'End Date/Time',
      type: 'string',
      defaultValue: '2022-04-01T11:30',
    },
    format: {
      name: 'Format',
      control: 'check',
      options: ['In-person', 'Virtual'],
      defaultValue: 'In-person',
    },
    address: {
      name: 'Address',
      type: 'string',
      defaultValue:
        'Address 1 (Building name)<br />Address 2<br />City, ST ZIP | Map',
    },
    ctaText: {
      name: 'CTA Text',
      type: 'string',
      defaultValue: 'CTA for event',
    },
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
