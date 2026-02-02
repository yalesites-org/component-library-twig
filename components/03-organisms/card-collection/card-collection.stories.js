import cardCollectionTwig from './yds-card-collection.twig';
import postCardData from '../../02-molecules/cards/reference-card/examples/post-card.yml';
import eventCardData from '../../02-molecules/cards/reference-card/examples/event-card.yml';
import directoryCardData from '../../02-molecules/cards/directory-listing-card/yds-directory-listing-card.yml';
import profileCardData from '../../02-molecules/cards/reference-card/examples/profile-card.yml';
import resourceCardData from '../../02-molecules/cards/reference-card/examples/resource-card.yml';

import imageData from '../../01-atoms/images/image/image.yml';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

const defaultArgs = {
  collectionType: 'grid',
  featured: true,
  withImages: true,
  heading: 'Card Collection',
  withOverlay: false,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Card Collection',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: addTableDefaults(
    {
      collectionType: {
        name: 'Collection Type',
        type: 'select',
        options: ['grid', 'list', 'condensed'],
      },
      featured: {
        name: 'Featured',
        type: 'boolean',
      },
      withOverlay: {
        name: 'Overlay',
        type: 'boolean',
      },
    },
    defaultArgs,
  ),
  args: defaultArgs,
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

const postCardCollectionArgs = {
  collectionType: 'grid',
  featured: true,
  withImages: true,
  heading: 'Card Collection',
  withOverlay: false,
};

PostCardCollection.args = postCardCollectionArgs;

PostCardCollection.argTypes = addTableDefaults(
  {
    withImages: {
      name: 'With Images',
      type: 'boolean',
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
  },
  postCardCollectionArgs,
);

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
const eventCardCollectionArgs = {
  collectionType: 'grid',
  featured: true,
  withImages: true,
  heading: 'Card Collection',
};
EventCardCollection.args = eventCardCollectionArgs;
EventCardCollection.argTypes = addTableDefaults(
  {
    withImages: {
      name: 'With Images',
      type: 'boolean',
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
  },
  eventCardCollectionArgs,
);

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
const profileCardCollectionArgs = {
  collectionType: 'grid',
  featured: true,
  withImages: true,
  heading: 'Card Collection',
};
ProfileCardCollection.args = profileCardCollectionArgs;
ProfileCardCollection.argTypes = addTableDefaults(
  {
    heading: {
      name: 'Heading',
      type: 'string',
    },
    withImages: {
      name: 'With Images',
      type: 'boolean',
    },
  },
  profileCardCollectionArgs,
);

export const DirectoryListingCardCollection = ({ featured, heading }) => {
  const items = featured ? [1, 2, 3, 4] : [1, 2, 3, 4, 5, 6];

  return cardCollectionTwig({
    card_collection__source_type: 'directory-listing',
    card_collection__type: 'profile-directory',
    card_collection__heading: 'Directory Listing',
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__cards: items,
    directory_listing_card__heading: heading,
    ...directoryCardData,
    ...imageData.responsive_images['1x1'],
  });
};
const directoryListingCardCollectionArgs = {
  featured: true,
  heading: 'Directory Listing',
};
DirectoryListingCardCollection.args = directoryListingCardCollectionArgs;
DirectoryListingCardCollection.argTypes = addTableDefaults(
  {
    heading: {
      name: 'Heading',
      type: 'string',
    },
    collectionType: {
      name: 'Collection Type',
      type: 'select',
      options: ['profile-directory'],
    },
  },
  directoryListingCardCollectionArgs,
);

export const ResourceCardCollection = ({
  heading,
  collectionType,
  featured,
  withImages,
  withOverlay,
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];

  return cardCollectionTwig({
    card_collection__source_type: 'resource',
    card_collection__type: collectionType,
    card_collection__heading: heading,
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    reference_card__overlay: withOverlay ? 'Pinned' : '',
    ...resourceCardData,
    ...imageData.responsive_images['3x2'],
  });
};
const resourceCardCollectionArgs = {
  collectionType: 'grid',
  featured: true,
  withImages: true,
  heading: 'Card Collection',
  withOverlay: false,
};
ResourceCardCollection.args = resourceCardCollectionArgs;
ResourceCardCollection.argTypes = addTableDefaults(
  {
    withImages: {
      name: 'With Images',
      type: 'boolean',
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
  },
  resourceCardCollectionArgs,
);
