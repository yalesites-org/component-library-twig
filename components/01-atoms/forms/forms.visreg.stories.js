import select from './select/yds-select.twig';
import textfields from './textfields/yds-textfields.twig';
import formExample from './contact-form-example.twig';

import selectOptionsData from './select/select.yml';
import viewsFilterForm from './views-filter/_yds-views-filter-form.twig';
import filterData from './views-filter/views-filter.yml';
import './views-filter/chosen-base.css';

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

export default {
  tags: ['visreg'],
  title: 'Atoms/Forms/Visreg',
  parameters: { controls: { disable: true } },
};

const renderGlobalTheme = () => {
  const buttonTheme = 'one';

  // Render function for form variations
  const renderForms = (theme) =>
    createSectionWrapper(
      theme,
      `
          <h3>Select Dropdowns</h3>
          ${select(selectOptionsData)}

          <h3>Text Fields</h3>
          ${textfields()}

          <h3>Example Form</h3>
          ${formExample({ buttonTheme })}
        `,
    );

  return createThemeVariations(
    renderForms,
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

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';

/**
 * The Views filters use fixed tokens (gray, blue-horizon, white), not theme
 * colors, so they do not vary by global theme. They get stories of their own
 * rather than being repeated in every global theme story.
 */
const { categories, audiences, longVocabularyName, longTerms } = filterData;

const filterField =
  (id, label, options) =>
  (extra = {}) => ({ id, label, options, selected: [], ...extra });
const category = filterField('category', 'Category', categories);
const audience = filterField('audience', 'Audience', audiences);
const longVocabulary = filterField('long', longVocabularyName, longTerms);

const form = (props) => viewsFilterForm({ search: '', ...props });
const heading = (text) => `<h3>${text}</h3>`;
// The open list is absolutely positioned; leave room so it is not cut off.
const room = (markup) => `<div style="padding-bottom: 18rem">${markup}</div>`;

// Closed with no selection (Category) and closed with two selections (Audience).
export const ViewsFiltersClosed = () =>
  createSectionWrapper(
    'default',
    heading('Closed: none selected, then (2) items selected') +
      form({
        id: 'closed',
        fields: [category(), audience({ selected: ['Faculty', 'Staff'] })],
      }),
  );

export const ViewsFiltersOpenWithTwoSelected = () =>
  createSectionWrapper(
    'default',
    heading('Open with two chips') +
      room(
        form({
          id: 'open',
          fields: [
            category({
              open: true,
              selected: ['Featured', 'Page Category 1'],
            }),
            audience(),
          ],
        }),
      ),
  );

export const ViewsFiltersLongVocabularyName = () =>
  createSectionWrapper(
    'default',
    heading('Long vocabulary name: closed with selections, then open') +
      room(
        form({
          id: 'long',
          fields: [
            longVocabulary({ selected: longTerms.slice(0, 2) }),
            longVocabulary({
              id: 'long-open',
              open: true,
              selected: longTerms.slice(0, 2),
            }),
          ],
        }),
      ),
  );

const calendarFields = (id) => [
  category({ id: `${id}-category` }),
  audience({ id: `${id}-audience`, selected: ['Faculty', 'Staff'] }),
  longVocabulary({ id: `${id}-custom` }),
];

export const ViewsFiltersEventsCalendar = () =>
  createSectionWrapper(
    'default',
    heading('Events calendar filters') +
      form({
        id: 'calendar',
        calendar: true,
        search: 'Search events',
        fields: calendarFields('calendar'),
      }),
  );

// Below $break-mobile (992px), a media query, only the Events calendar form
// stacks; the plain Views form keeps its row and overflows sideways, as it
// does on a site. A narrow wrapper would not trigger the query, so this story
// needs a phone-width snapshot.
export const ViewsFiltersPhoneWidth = () =>
  createSectionWrapper(
    'default',
    heading('Views filters at 375px (row, overflows sideways)') +
      form({
        id: 'phone',
        fields: [
          category({ selected: ['Featured', 'Page Category 1'] }),
          audience(),
        ],
      }) +
      heading('Events calendar filters at 375px (stacked)') +
      form({
        id: 'phone-calendar',
        calendar: true,
        search: 'Search events',
        fields: calendarFields('phone-calendar'),
      }),
  );
ViewsFiltersPhoneWidth.parameters = {
  ...ViewsFiltersPhoneWidth.parameters,
  chromatic: { viewports: [375] },
};
