import eventMetaTwig from './event-meta.twig';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Event Meta',
};

export const EventMeta = () =>
  eventMetaTwig({
    event_meta__date_start: '2022-04-01T08:00:42',
    event_meta__date_end: '2022-04-01T11:30:42',
    event_meta__format: 'In-person',
    event_meta__address:
      'Address 1 (Building name)<br />Address 2<br />City, ST ZIP | Map',
    event_meta__cta_primary__content: 'CTA for event',
    event_meta__cta_primary__href: '#',
    event_meta__cta_secondary__content: 'Add to calendar',
    event_meta__cta_secondary__href: '#',
  });
