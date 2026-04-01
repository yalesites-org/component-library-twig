// Shared Storybook args.
import argTypes from '../../04-page-layouts/cl-page-args';

// Twig files.
import accordionPageTwig from './accordion-page.twig';

// Data files.
import imageData from '../../01-atoms/images/image/image.yml';
import textWithImageData from '../../02-molecules/text-with-image/text-with-image.yml';
import accordionData from '../../02-molecules/accordion/accordion.yml';
import alertData from '../../02-molecules/alert/alert.yml';
import socialLinksData from '../../02-molecules/social-links/social-links.yml';
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
  title: 'Page Examples/Miscellaneous',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
  args: argTypesToArgs(argTypes),
};

export const AccordionPage = (args) => {
  const { pageTitle } = args;
  return accordionPageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    ...imageData.responsive_images['16x9'],
    ...textWithImageData,
    ...accordionData,
    ...alertData,
    ...socialLinksData,
  });
};
