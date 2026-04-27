import directoryCardTwig from './yds-directory-listing-card.twig';

import directoryCardData from './yds-directory-listing-card.yml';
import imageData from '../../../01-atoms/images/image/image.yml';
import componentProps from './directory-listing-card-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Cards',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    heading: directoryCardData.directory_listing_card__heading,
    subheading: directoryCardData.directory_listing_card__subheading,
    snippet: directoryCardData.directory_listing_card__snippet,
    phone: directoryCardData.directory_listing_card__phone,
    overline: directoryCardData.directory_listing_card__overline,
  },
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
