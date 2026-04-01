// Shared Storybook args.
import argTypes from '../../04-page-layouts/cl-page-args';

// Twig files.
import profilePageTwig from './profile.twig';

// Data files.
import imageData from '../../01-atoms/images/image/image.yml';
import textWithImageData from '../../02-molecules/text-with-image/text-with-image.yml';
import referenceCardData from '../../02-molecules/cards/reference-card/examples/post-card.yml';
import socialLinksData from '../../02-molecules/social-links/social-links.yml';
import videoData from '../../02-molecules/video/video.yml';
import accordionData from '../../02-molecules/accordion/accordion.yml';
import tabData from '../../02-molecules/tabs/tabs.yml';
import componentProps from './profiles-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';
import argTypesToArgs from '../../utility';
import buildPageProps from '../page-utils';
import utilityNavData from '../../03-organisms/menu/utility-nav/utility-nav.yml';
import primaryNavData from '../../03-organisms/menu/primary-nav/primary-nav.yml';
import breadcrumbData from '../../03-organisms/menu/breadcrumbs/breadcrumbs.yml';

// JavaScript.
import '../../00-tokens/layout/yds-layout';
import '../../01-atoms/controls/text-link/yds-text-link';

/**
 * Storybook Definition.
 */
export default {
  title: 'Page Examples/Profiles',
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
    profileImageOrientation: 'landscape',
    profileImageAlignment: 'right',
    profileImageStyle: 'inline',
  },
};

export const ProfilePage = (args) => {
  const { profileImageOrientation, profileImageAlignment, profileImageStyle } =
    args;
  return profilePageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    profile_meta__image_orientation: profileImageOrientation,
    profile_meta__image_style: profileImageStyle,
    profile_meta__image_alignment: profileImageAlignment,
    ...imageData.responsive_images['3x2'],
    image__srcset__1: imageData.responsive_images['2x3'].image__srcset,
    image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
    image__alt__1: imageData.responsive_images['2x3'].image__alt,
    image__src__1: imageData.responsive_images['2x3'].image__src,
    ...textWithImageData,
    ...referenceCardData,
    ...socialLinksData,
    ...videoData,
    ...accordionData,
    ...tabData,
  });
};
