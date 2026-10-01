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

// Closed with no selection (Category) and closed with two chips (Audience),
// then five chips (Category) where only the first fits on the row. The rest
// collapse into the "+4 more" badge. yds-select.js does that measuring on a
// site; visible: 1 was measured at the four-column, ~233px track of the grid.
export const ViewsFiltersClosed = () =>
  createSectionWrapper(
    'default',
    heading('Closed: none selected, then two chips, then "+4 more"') +
      form({
        id: 'closed',
        fields: [category(), audience({ selected: ['Faculty', 'Staff'] })],
      }) +
      form({
        id: 'closed-more',
        fields: [
          category({
            selected: ['Featured', 'About', 'Research', 'Academics', 'Contact'],
            visible: 1,
          }),
          audience(),
        ],
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
    heading(
      'Long vocabulary name: closed with one chip and "+1 more", then open',
    ) +
      room(
        form({
          id: 'long',
          fields: [
            // Two long terms overflow the row; the real JS keeps one chip.
            longVocabulary({ selected: longTerms.slice(0, 2), visible: 1 }),
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

// Both forms are a CSS grid whose columns are at least 13rem wide, so at 375px
// they collapse to one column. Below $break-mobile (992px) the Events calendar
// form also forces its items to 100% width, and Chosen containers get a black
// border. A narrow wrapper would not trigger the media query, so this story
// needs a phone-width snapshot.
export const ViewsFiltersPhoneWidth = () =>
  createSectionWrapper(
    'default',
    heading('Views filters at 375px (one column)') +
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
