import cardCollectionTwig from './yds-card-collection.twig';
import postCardData from '../../02-molecules/cards/reference-card/examples/post-card.yml';
import eventCardData from '../../02-molecules/cards/reference-card/examples/event-card.yml';
import directoryCardData from '../../02-molecules/cards/directory-listing-card/yds-directory-listing-card.yml';
import profileCardData from '../../02-molecules/cards/reference-card/examples/profile-card.yml';
import resourceCardData from '../../02-molecules/cards/reference-card/examples/resource-card.yml';

import imageData from '../../01-atoms/images/image/image.yml';
import componentProps from './card-collection-props.yml';
import longUrlData from './long-url.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

const LONG_URL = longUrlData.long_url;

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Card Collection',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

export const PostCardCollection = ({
  heading,
  collectionType,
  featured,
  withImages,
  withOverlay,
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];

  return cardCollectionTwig({
    card_collection__source_type: 'post',
    card_collection__type: collectionType,
    card_collection__heading: heading,
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    reference_card__overlay: withOverlay ? 'Pinned' : '',
    ...postCardData,
    ...imageData.responsive_images['3x2'],
  });
};

export const EventCardCollection = ({
  heading,
  collectionType,
  featured,
  withImages,
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];

  return cardCollectionTwig({
    card_collection__source_type: 'event',
    format: 'Online',
    card_collection__type: collectionType,
    card_collection__heading: heading,
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    ...eventCardData,
    ...imageData.responsive_images['3x2'],
  });
};

EventCardCollection.argTypes = {
  withOverlay: { table: { disable: true } },
};

export const ProfileCardCollection = ({
  heading,
  collectionType,
  featured,
  withImages,
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];

  return cardCollectionTwig({
    card_collection__source_type: 'profile',
    card_collection__type: collectionType,
    card_collection__heading: heading,
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    ...profileCardData,
    ...imageData.responsive_images['1x1'],
  });
};

ProfileCardCollection.argTypes = {
  withOverlay: { table: { disable: true } },
};

export const DirectoryListingCardCollection = ({
  featured,
  heading,
  withOverlay,
}) => {
  const items = featured ? [1, 2, 3, 4] : [1, 2, 3, 4, 5, 6];

  return cardCollectionTwig({
    card_collection__source_type: 'directory-listing',
    card_collection__type: 'profile-directory',
    card_collection__heading: 'Directory Listing',
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__cards: items,
    directory_listing_card__heading: heading,
    reference_card__overlay: withOverlay ? 'Pinned' : '',
    ...directoryCardData,
    ...imageData.responsive_images['1x1'],
  });
};

DirectoryListingCardCollection.argTypes = {
  collectionType: { table: { disable: true } },
  withImages: { table: { disable: true } },
  withOverlay: { table: { disable: true } },
};

export const ResourceCardCollection = ({
  heading,
  collectionType,
  featured,
  withImages,
  withOverlay,
  portrait,
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];

  return cardCollectionTwig({
    card_collection__source_type: 'resource',
    card_collection__modifiers: portrait ? ['resource-portrait'] : [],
    card_collection__type: collectionType,
    card_collection__heading: heading,
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    reference_card__overlay: withOverlay ? 'Pinned' : '',
    ...resourceCardData,
    ...imageData.responsive_images[portrait ? '1x1.6' : '3x2'],
  });
};
const resourceCardCollectionArgs = {
  portrait: false,
};
ResourceCardCollection.argTypes = addTableDefaults(
  {
    portrait: {
      name: 'Portrait',
      type: 'boolean',
    },
  },
  resourceCardCollectionArgs,
);
ResourceCardCollection.args = resourceCardCollectionArgs;

/**
 * A grid whose card text is a long unbroken URL.
 *
 * Pasting a webcast or registration link into an Event's Teaser Text is routine,
 * and before YaleSites-Internal#1729 it widened the card past its column, so a
 * 3-up grid rendered 2-up. This story exists so that break has a baseline.
 *
 * It covers two of the three declarations that fix: `min-width: 0`, which lets
 * the card shrink to its column, and `overflow-wrap: break-word`, which wraps
 * the URL inside the card. **It cannot cover the third.** On a real site Drupal
 * auto-links a bare URL and link-treatment wraps it in a `white-space: nowrap`
 * span, which defeats `overflow-wrap` entirely -- and that is the form the bug
 * actually took. Storybook never auto-links, so a green diff here is not proof
 * the whole fix holds; the Drupal half has to be checked on a real site.
 */
export const LongUrlInCardText = ({ collectionType, featured, withImages }) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];

  return cardCollectionTwig({
    card_collection__source_type: 'post',
    card_collection__type: collectionType,
    card_collection__heading: 'Long URL In Card Text',
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    ...postCardData,
    reference_card__snippet: LONG_URL,
    ...imageData.responsive_images['3x2'],
  });
};

LongUrlInCardText.storyName = 'Long URL In Card Text';
LongUrlInCardText.argTypes = {
  // The heading is fixed by the story, so leaving its control live would offer
  // an editable field that does nothing.
  heading: { table: { disable: true } },
  withOverlay: { table: { disable: true } },
};
