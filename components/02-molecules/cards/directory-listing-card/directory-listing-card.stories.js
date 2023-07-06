import directoryCardTwig from './yds-directory-listing-card.twig';

import directoryCardData from './yds-directory-listing-card.yml';
import imageData from '../../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Cards',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: directoryCardData.directory_listing_card__heading,
    },
    snippet: {
      name: 'Snippet',
      type: 'string',
      defaultValue: directoryCardData.directory_listing_card__snippet,
    },
    collectionType: {
      name: 'Collection Type',
      type: 'select',
      options: ['directory'],
      defaultValue: 'directory',
    },
    featured: {
      name: 'Featured',
      type: 'boolean',
      defaultValue: true,
    },
    withImage: {
      name: 'With Image',
      type: 'boolean',
      defaultValue: true,
    },
  },
};

export const ProfileDirectoryListingCard = ({ collectionType, featured }) => `
<div class='card-collection' data-component-width='site' data-collection-type='${collectionType}' data-collection-featured="${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${directoryCardTwig({
        card_example_type: 'profile',
        card_collection__type: collectionType,
        ...imageData.responsive_images['3x2'],
        directory_listing_card__heading:
          directoryCardData.directory_listing_card__heading,
        directory_listing_card__subheading:
          directoryCardData.directory_listing_card__subheading,
        directory_listing_card__snippet:
          directoryCardData.directory_listing_card__snippet,
        directory_listing_card__url:
          directoryCardData.directory_listing_card__url,
      })}
    </ul>
  </div>
</div>
`;
