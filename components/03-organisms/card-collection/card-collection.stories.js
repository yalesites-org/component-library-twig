import cardCollectionTwig from './yds-card-collection.twig';
import postCardData from '../../02-molecules/cards/reference-card/examples/post-card.yml';
import eventCardData from '../../02-molecules/cards/reference-card/examples/event-card.yml';
import directoryCardData from '../../02-molecules/cards/directory-listing-card/yds-directory-listing-card.yml';
import profileCardData from '../../02-molecules/cards/reference-card/examples/profile-card.yml';

import imageData from '../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Card Collection',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    collectionType: {
      name: 'Collection Type',
      type: 'select',
      options: ['grid', 'list', 'condensed'],
    },
    featured: {
      name: 'Featured',
      type: 'boolean',
    },
  },
  args: {
    collectionType: 'grid',
    featured: true,
    withImages: true,
    heading: 'Card Collection',
  },
};

export const PostCardCollection = ({
  heading,
  collectionType,
  featured,
  withImages,
  externalSourceLabel,
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];

  return cardCollectionTwig({
    card_collection__source_type: 'post',
    card_collection__type: collectionType,
    card_collection__heading: heading,
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    ...postCardData,
    ...imageData.responsive_images['3x2'],
    reference_card__external_source_label: externalSourceLabel,
  });
};
PostCardCollection.argTypes = {
  withImages: {
    name: 'With Images',
    type: 'boolean',
  },
  heading: {
    name: 'Heading',
    type: 'string',
  },
  externalSourceLabel: {
    name: 'External Source Label',
    type: 'string',
  },
};
PostCardCollection.args = {
  externalSourceLabel: 'Yale News',
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
  withImages: {
    name: 'With Images',
    type: 'boolean',
  },
  heading: {
    name: 'Heading',
    type: 'string',
  },
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
  heading: {
    name: 'Heading',
    type: 'string',
  },
  withImages: {
    name: 'With Images',
    type: 'boolean',
  },
};

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
DirectoryListingCardCollection.argTypes = {
  heading: {
    name: 'Heading',
    type: 'string',
  },
  collectionType: {
    name: 'Collection Type',
    type: 'select',
    options: ['profile-directory'],
  },
};
