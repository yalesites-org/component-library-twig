// Shared Storybook args.
import argTypes from '../../04-page-layouts/cl-page-args';

// Twig files.
import postArticleTwig from './post-article.twig';
import postGridTwig from './post-grid.twig';

// Data files.
import imageData from '../../01-atoms/images/image/image.yml';
import socialLinksData from '../../02-molecules/social-links/social-links.yml';
import referenceCardData from '../../02-molecules/cards/reference-card/examples/post-card.yml';
import componentProps from './post-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';
import argTypesToArgs from '../../utility';
import buildPageProps from '../page-utils';
import utilityNavData from '../../03-organisms/menu/utility-nav/utility-nav.yml';
import primaryNavData from '../../03-organisms/menu/primary-nav/primary-nav.yml';
import breadcrumbData from '../../03-organisms/menu/breadcrumbs/breadcrumbs.yml';

// JavaScript.
import '../../00-tokens/layout/yds-layout';
import '../../02-molecules/read-time/yds-read-time';

/**
 * Storybook Definition.
 */
export default {
  title: 'Page Examples/Post',
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
  },
};

export const PostArticle = (args) => {
  const { pageTitle, meta, showSocialMediaSharingLinks = false } = args;
  return postArticleTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: meta,
    page_title__show_social_media_sharing_links: showSocialMediaSharingLinks
      ? 'true'
      : 'false',
    ...imageData.responsive_images['16x9'],
    image__srcset__1: imageData.responsive_images['4x3'].image__srcset,
    image__sizes__1: imageData.responsive_images['4x3'].image__sizes,
    image__alt__1: imageData.responsive_images['4x3'].image__alt,
    image__src__1: imageData.responsive_images['4x3'].image__src,
    image__srcset__wrapped: imageData.responsive_images['3x2'].image__srcset,
    image__sizes__wrapped: imageData.responsive_images['3x2'].image__sizes,
    image__alt__wrapped: imageData.responsive_images['3x2'].image__alt,
    image__src__wrapped: imageData.responsive_images['3x2'].image__src,
    ...socialLinksData,
    ...referenceCardData,
  });
};

export const postGridCustom = ({
  allowAnimatedItems = localStorage.getItem('yds-cl-twig-animate-items'),
}) =>
  postGridTwig({
    site_animate_components: allowAnimatedItems,
  });
