import directoryCardTwig from './yds-directory-listing-card.twig';

import directoryCardData from './yds-directory-listing-card.yml';
import imageData from '../../../01-atoms/images/image/image.yml';
import { addTableDefaults } from '../../../_storybook/add-table-defaults';

const defaultArgs = {
  heading: directoryCardData.directory_listing_card__heading,
  subheading: directoryCardData.directory_listing_card__subheading,
  snippet: directoryCardData.directory_listing_card__snippet,
  showEmail: true,
  phone: directoryCardData.directory_listing_card__phone,
  featured: true,
  overline: directoryCardData.directory_listing_card__overline,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Cards',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: addTableDefaults(
    {
      heading: {
        name: 'Heading',
        type: 'string',
      },
      subheading: {
        name: 'Subheading',
        type: 'string',
      },
      snippet: {
        name: 'Snippet',
        type: 'string',
      },
      showEmail: {
        name: 'Show Email',
        type: 'boolean',
      },
      phone: {
        name: 'Phone',
        type: 'string',
      },
      featured: {
        name: 'Featured',
        type: 'boolean',
      },
      overline: {
        name: 'Overline',
        type: 'string',
      },
    },
    defaultArgs,
  ),
  args: defaultArgs,
};

export const ProfileCardDirectoryListing = ({
  collectionType,
  featured,
  heading,
  subheading,
  snippet,
  overline,
  showEmail,
  phone,
}) => `
<div class='card-collection' data-component-width='site' data-collection-type='profile-directory' data-collection-featured="${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${directoryCardTwig({
        card_collection__source_type: 'profile',
        card_collection__type: collectionType,
        ...imageData.responsive_images['1x1'],
        directory_listing_card__overline: overline,
        directory_listing_card__heading: heading,
        directory_listing_card__subheading: subheading,
        directory_listing_card__snippet: snippet,
        directory_listing_card__email: showEmail
          ? directoryCardData.directory_listing_card__email
          : '',
        directory_listing_card__phone: phone,
        directory_listing_card__url:
          directoryCardData.directory_listing_card__url,
      })}
    </ul>
  </div>
</div>
`;
