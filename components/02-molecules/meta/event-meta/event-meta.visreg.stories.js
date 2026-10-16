import eventLocalistMetaTwig from './yds-event-meta-localist.twig';
import imageData from '../../../01-atoms/images/image/image.yml';
import eventLocalistData from './event-localist.yml';

import './event-meta-localist';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
} from '../../../_storybook/playground-utils';

/**
 * Storybook Definition.
 *
 * Event Meta has its own visreg file rather than sharing `Molecules/Meta/Visreg`
 * with the other three meta types. Measured at the 1200px snapshot viewport it
 * renders 1,395px per section theme, against 802 for Resource Meta, 441 for
 * Profile Meta and 27 for Basic Meta -- more than the other three combined. With
 * all four stacked, the shared story reached 1,200 x 20,231 = 24,277,200px, 97%
 * of the 25,000,000px snapshot ceiling, leaving no room for the next variation.
 * Splitting the heaviest one out is the same move the banner components already
 * make: one visreg file per component, rather than one per component directory.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Meta/Event Meta/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

/**
 * The fixture's dates, pinned to the timed (non-all-day) rendering.
 *
 * `event-localist.yml` is shared with the documentation stories and sets
 * `is_all_day` inconsistently across its dates. A snapshot wants one predictable
 * rendering, so every date is pinned to the timed variant here.
 */
const timedEventDates = eventLocalistData.event_dates.map((date) => ({
  ...date,
  is_all_day: false,
}));

const timedFeaturedDate = {
  ...eventLocalistData.event_featured_date,
  is_all_day: false,
};

const renderEventMeta = (theme) =>
  createSectionWrapper(
    theme,
    eventLocalistMetaTwig({
      ...imageData.responsive_images['3x2'],
      ...eventLocalistData,
      event_title__heading: 'Sample Event Title',
      event_dates: timedEventDates,
      event_featured_date: timedFeaturedDate,
      event_meta__format: 'Virtual Event',
      event_meta__address: '123 Main St, New Haven, CT',
      event_meta__cta_primary__content: 'Register',
      event_meta__cta_primary__href: '#',
      cost_button_text: 'Register',
      event_meta__cta_secondary__content: 'Add to calendar',
      event_meta__cta_secondary__href: '#',
      event_meta__with_calendar: true,
      event_meta__image: 'true',
    }),
  );

const renderGlobalTheme = () =>
  createThemeVariations(
    renderEventMeta,
    sectionThemes,
    'All Section Theme Variations',
    'Event Meta against every section theme. Its address, event type, dividers and links take their colors from the section theme.',
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
