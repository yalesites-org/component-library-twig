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
  });
