import filterBarTwig from './yds-filter-bar.twig';
import componentProps from './filter-bar-props.yml';
import filterData from './filter-bar-fixtures.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

import '../../../00-tokens/effects/yds-animate';
import '../../../01-atoms/forms/views-filter/chosen-base.css';

/**
 * Storybook Definition.
 * One story per state and per layout, plus a Playground that exposes every
 * prop as a Control. Chosen is a Drupal library, so the multi-selects are the
 * static copy the Views filter stories use.
 */
export default {
  title: 'Molecules/Event Calendar/Filter bar',
  tags: ['!dev'],
  argTypes: {
    ...toArgTypes(componentProps),
    showCategory: { name: 'Show Category', control: 'boolean' },
    showAudience: { name: 'Show Audience', control: 'boolean' },
    showExperience: { name: 'Show Event experience', control: 'boolean' },
    showCustom: { name: 'Show custom vocabulary', control: 'boolean' },
  },
  args: {
    ...toArgs(componentProps),
    showCategory: true,
    showAudience: true,
    showExperience: true,
    showCustom: false,
  },
};

const { category, audience, experience, custom } = filterData;

// The open list is absolutely positioned; leave room so it is not cut off.
const render = (data, { width = '100%' } = {}) =>
  `<div style="padding: var(--size-spacing-5); width: ${width}; box-sizing: border-box">${filterBarTwig(
    { filter_bar__id: 'story', ...data },
  )}</div>`;

const filters = (selected = {}, show = {}) => [
  {
    id: 'category',
    label: 'Category',
    options: category,
    selected: selected.category ?? [],
    show: show.category,
  },
  {
    id: 'audience',
    label: 'Audience',
    options: audience,
    selected: selected.audience ?? [],
    show: show.audience,
  },
  {
    id: 'experience',
    label: 'Event experience',
    options: experience,
    selected: selected.experience ?? [],
    show: show.experience,
  },
  {
    id: 'custom',
    label: custom.label,
    options: custom.options,
    selected: selected.custom ?? [],
    show: show.custom,
  },
];

export const Playground = (args) =>
  render({
    filter_bar__id: args.id,
    filter_bar__layout: args.layout,
    filter_bar__search_placeholder: args.searchPlaceholder,
    filter_bar__search_value: args.searchValue,
    filter_bar__show_search: args.showSearch,
    filter_bar__filters: filters(
      { category: ['Lecture', 'Concert'] },
      {
        category: args.showCategory,
        audience: args.showAudience,
        experience: args.showExperience,
        custom: args.showCustom,
      },
    ),
  });

// Empty: nothing typed, nothing picked.
export const Empty = () =>
  render({ filter_bar__filters: filters({}, { custom: false }) });

// Filters set: removable pills inside the fields. Each field shows its two
// picks, so nothing overflows here (see FiltersOverflow for the "+N more" chip).
export const FiltersSet = () =>
  render({
    filter_bar__filters: filters(
      {
        category: ['Lecture', 'Concert'],
        audience: ['Students', 'Faculty'],
        experience: ['In person'],
      },
      { custom: false },
    ),
  });

// Filters overflow: four picks, two fit on the closed row (`visible`), so the
// rest collapse into the "+ 2 more" chip.
export const FiltersOverflow = () =>
  render({
    filter_bar__filters: [
      {
        id: 'category',
        label: 'Category',
        options: category,
        selected: ['Lecture', 'Concert', 'Exhibition', 'Workshop'],
        visible: 2,
        show: true,
      },
      ...filters({}, { audience: true, experience: true, custom: false }).slice(
        1,
        3,
      ),
    ],
  });

// Search active: text typed in the search field.
export const SearchActive = () =>
  render({
    filter_bar__search_value: 'poetry reading',
    filter_bar__filters: filters({}, { custom: false }),
  });

// Layouts. Row is the 840px-and-wider default; stacked is one per row.
export const LayoutRow = () =>
  render({
    filter_bar__layout: 'row',
    filter_bar__filters: filters({ category: ['Lecture'] }, { custom: false }),
  });

export const LayoutStacked = () =>
  render(
    {
      filter_bar__layout: 'stacked',
      filter_bar__filters: filters(
        { category: ['Lecture'] },
        { custom: false },
      ),
    },
    { width: '40rem' },
  );

// A row bar in a block narrower than 840px stacks by itself.
export const NarrowBlock = () =>
  render(
    {
      filter_bar__layout: 'row',
      filter_bar__filters: filters(
        { category: ['Lecture'] },
        { custom: false },
      ),
    },
    { width: '30rem' },
  );

// Optional filters: each has a show prop; the custom vocabulary is one.
export const WithCustomVocabulary = () =>
  render({ filter_bar__filters: filters({}, { custom: true }) });

export const SearchHidden = () =>
  render({
    filter_bar__show_search: false,
    filter_bar__filters: filters({}, { custom: false }),
  });
