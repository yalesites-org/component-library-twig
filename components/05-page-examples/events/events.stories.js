// Shared Storybook args.
import argTypes, { eventArgTypes } from '../../04-page-layouts/cl-page-args';

// Twig files.
import eventPageTwig from './event-page.twig';
import eventGridPageTwig from './event-grid.twig';
import eventListPageTwig from './event-list.twig';

// Data files.
import imageData from '../../01-atoms/images/image/image.yml';
import pagerData from '../../02-molecules/pager/pager-last.yml';
import socialLinksData from '../../02-molecules/social-links/social-links.yml';
import componentProps from './events-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';
import argTypesToArgs from '../../utility';
import buildPageProps from '../page-utils';
import utilityNavData from '../../03-organisms/menu/utility-nav/utility-nav.yml';
import primaryNavData from '../../03-organisms/menu/primary-nav/primary-nav.yml';
import breadcrumbData from '../../03-organisms/menu/breadcrumbs/breadcrumbs.yml';

// JavaScript.
import '../../00-tokens/layout/yds-layout';

// Utility to convert dates to unix timestamps
const toUnixTimeStamp = (date) => {
  return Math.floor(Date.parse(date) / 1000);
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Page Examples/Events',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ...argTypes,
    ...eventArgTypes,
    ...toArgTypes(componentProps),
  },
  args: {
    ...argTypesToArgs({ ...argTypes, ...eventArgTypes }),
    ...toArgs(componentProps),
    eventPageTitle:
      'Parlika (2016) film screening + Q&A with film director Sahraa Karimi',
    showBreadcrumbs: true,
  },
};

export const EventPage = (args) => {
  const { eventPageTitle, startDate, endDate, format, address, ctaText } = args;

  let unixStartDate = toUnixTimeStamp(startDate);
  let unixEndDate = toUnixTimeStamp(endDate);

  // Convert 'NaN' to null so that it is not rendered in the template
  const nanToNull = (value) => {
    if (value === 'NaN') {
      return null;
    }
    return value;
  };

  unixStartDate = nanToNull(unixStartDate);
  unixEndDate = nanToNull(unixEndDate);

  return eventPageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    event_title__heading: eventPageTitle,
    ...imageData.responsive_images['4x3'],
    event_meta__date_start: unixStartDate,
    event_meta__date_end: unixEndDate,
    event_meta__format: format,
    event_meta__address: address,
    event_meta__cta_primary__content: ctaText,
    event_meta__cta_primary__href: '#',
    event_meta__cta_secondary__content: 'Add to calendar',
    event_meta__cta_secondary__href: '#',
    ...socialLinksData,
  });
};
EventPage.argTypes = {
  pageTitle: {
    table: {
      disable: true,
    },
  },
  meta: {
    table: {
      disable: true,
    },
  },
};

export const EventGrid = (args) => {
  const { pageTitle } = args;
  return eventGridPageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    ...imageData.responsive_images['3x2'],
    reference_card__heading:
      'BINYA! A celebration of the legacy of Binyavanga Wainaina at Yale',
    reference_card__snippet:
      'A panel celebrating the legacy of author Binyavanga Wainaina.',
    reference_card__url: 'https://google.com',
    reference_card__date: '2022-03-30 13:00',
    format: 'Online',
    ...socialLinksData,
  });
};
EventGrid.argTypes = {
  meta: {
    table: {
      disable: true,
    },
  },
};

export const EventList = (args) => {
  const { pageTitle } = args;
  return eventListPageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    ...imageData.responsive_images['3x2'],
    reference_card__heading:
      'BINYA! A celebration of the legacy of Binyavanga Wainaina at Yale',
    reference_card__snippet:
      'A panel celebrating the legacy of author Binyavanga Wainaina.',
    reference_card__url: '#',
    reference_card__date: '2022-03-30 13:00',
    format: 'Online',
    ...pagerData,
    ...socialLinksData,
  });
};
EventList.argTypes = {
  meta: {
    table: {
      disable: true,
    },
  },
};
