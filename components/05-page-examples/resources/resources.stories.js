// Shared Storybook args.
import argTypes from '../../04-page-layouts/cl-page-args';

// Twig files.
import resourcePageTwig from './resource-page.twig';
import resourceGridPageTwig from './resource-grid.twig';
import resourceListPageTwig from './resource-list.twig';

// Data files.
import imageData from '../../01-atoms/images/image/image.yml';
import pagerData from '../../02-molecules/pager/pager-last.yml';
import socialLinksData from '../../02-molecules/social-links/social-links.yml';
import videoEmbedData from '../../01-atoms/videos/video-embed/video-embed.yml';
import componentProps from './resources-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';
import argTypesToArgs from '../../utility';
import buildPageProps from '../page-utils';
import utilityNavData from '../../03-organisms/menu/utility-nav/utility-nav.yml';
import primaryNavData from '../../03-organisms/menu/primary-nav/primary-nav.yml';
import breadcrumbData from '../../03-organisms/menu/breadcrumbs/breadcrumbs.yml';

// JavaScript.
import '../../00-tokens/layout/yds-layout';

/**
 * Storybook Definition.
 */
export default {
  title: 'Page Examples/Resources',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ...argTypes,
    ...toArgTypes(componentProps),
  },
  args: {
    ...argTypesToArgs(argTypes),
    ...toArgs(componentProps),
    showBreadcrumbs: true,
  },
};

export const ResourcePage = (args) => {
  const { resourceType } = args;
  return resourcePageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    ...imageData.responsive_images['2x3'],
    ...socialLinksData,

    resource_meta__heading: 'Resource Page',
    resource_meta__resource_type: resourceType,
    resource_meta__publish_date_label: 'Published On',
    resource_meta__publish_date: 'July 01, 2025',

    // Values for resource type: Document.
    resource_meta__download_label: 'Download',
    resource_meta__download_aria_label: 'Download file',
    resource_meta__download_url: '#.pdf',
    image__srcset__1: imageData.responsive_images['2x3'].image__srcset,
    image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
    image__alt__1: imageData.responsive_images['2x3'].image__alt,
    image__src__1: imageData.responsive_images['2x3'].image__src,

    // Values for resource type: Video.
    video_embed__content__1: videoEmbedData.video_embed__content,
  });
};
ResourcePage.argTypes = {
  resourceType: {
    name: 'Resource Type',
    description: 'The type of resource to display',
    options: ['video', 'document'],
    control: { type: 'select' },
    table: {
      category: 'Optional',
      type: { summary: 'select' },
    },
  },
};
ResourcePage.args = { resourceType: 'video' };

export const ResourceGrid = (args) => {
  const { pageTitle } = args;
  return resourceGridPageTwig({
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
    reference_card__categories: [{ content: 'Video' }],
    show_categories: true,
    ...socialLinksData,
  });
};
ResourceGrid.argTypes = {
  meta: {
    table: {
      disable: true,
    },
  },
};

export const ResourceList = (args) => {
  const { pageTitle } = args;
  return resourceListPageTwig({
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
    reference_card__categories: [{ content: 'Video' }],
    show_categories: true,
    ...pagerData,
    ...socialLinksData,
  });
};
ResourceList.argTypes = {
  meta: {
    table: {
      disable: true,
    },
  },
};
