import customCardTwig from './custom-card/yds-custom-card.twig';
import directoryCardTwig from './directory-listing-card/yds-directory-listing-card.twig';
import referenceCardTwig from './reference-card/examples/_card--examples.twig';

import customCardData from './custom-card/custom-card.yml';
import directoryCardData from './directory-listing-card/yds-directory-listing-card.yml';
import referenceCardData from './reference-card/examples/post-card.yml';
import referenceProfileCardData from './reference-card/examples/profile-card.yml';
import referencePageCardData from './reference-card/examples/page-card.yml';
import referenceResourceData from './reference-card/examples/resource-card.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Cards/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

// *** VRT: All 7 Card Types with All Section Theme Variations ***
export const Visreg = () => {
  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (theme) => `
      <div data-component-theme="${theme}">
        <h3>1. Custom Card</h3>
        <div class='custom-card-collection' data-component-width='site' data-collection-featured="true">
          <div class='custom-card-collection__inner'>
            <ul class='custom-card-collection__cards'>
              ${customCardTwig({
                ...imageData.responsive_images['3x2'],
                custom_card__heading: customCardData.custom_card__heading,
                custom_card__snippet: customCardData.custom_card__snippet,
                custom_card__url: 'https://google.com',
                custom_card__image: 'true',
              })}
            </ul>
          </div>
        </div>

        <h3>2. Directory Listing Card (Profile)</h3>
        <div class='card-collection' data-component-width='site' data-collection-type='profile-directory' data-collection-featured="true">
          <div class='card-collection__inner'>
            <ul class='card-collection__cards'>
              ${directoryCardTwig({
                card_collection__source_type: 'profile',
                card_collection__type: 'grid',
                ...imageData.responsive_images['1x1'],
                directory_listing_card__overline:
                  directoryCardData.directory_listing_card__overline,
                directory_listing_card__heading:
                  directoryCardData.directory_listing_card__heading,
                directory_listing_card__subheading:
                  directoryCardData.directory_listing_card__subheading,
                directory_listing_card__snippet:
                  directoryCardData.directory_listing_card__snippet,
                directory_listing_card__email:
                  directoryCardData.directory_listing_card__email,
                directory_listing_card__phone:
                  directoryCardData.directory_listing_card__phone,
                directory_listing_card__url:
                  directoryCardData.directory_listing_card__url,
              })}
            </ul>
          </div>
        </div>

        <h3>3. Post Card (Reference)</h3>
        <div class='card-collection' data-component-width='site' data-collection-type='grid' data-collection-featured="true">
          <div class='card-collection__inner'>
            <ul class='card-collection__cards'>
              ${referenceCardTwig({
                card_collection__source_type: 'post',
                card_collection__type: 'grid',
                ...imageData.responsive_images['3x2'],
                reference_card__date: referenceCardData.reference_card__date,
                reference_card__heading:
                  referenceCardData.reference_card__heading,
                reference_card__snippet:
                  referenceCardData.reference_card__snippet,
                reference_card__featured: 'true',
                reference_card__image: 'true',
                reference_card__url: referenceCardData.reference_card__url,
                reference_card__categories:
                  referenceCardData.reference_card__categories,
                reference_card__tags: referenceCardData.reference_card__tags,
              })}
            </ul>
          </div>
        </div>

        <h3>4. Event Card (Reference)</h3>
        <div class='card-collection' data-component-width='site' data-collection-type='grid' data-collection-featured="true">
          <div class='card-collection__inner'>
            <ul class='card-collection__cards'>
              ${referenceCardTwig({
                card_collection__source_type: 'event',
                card_collection__type: 'grid',
                ...imageData.responsive_images['3x2'],
                format: 'In-person',
                reference_card__heading:
                  referenceCardData.reference_card__heading,
                reference_card__snippet:
                  referenceCardData.reference_card__snippet,
                reference_card__featured: 'true',
                reference_card__image: 'true',
                reference_card__url: referenceCardData.reference_card__url,
                reference_card__cta_primary__href: 'https://yale.edu',
                reference_card__cta_primary__content: 'Buy Tickets',
                reference_card__cta_secondary__href: 'https://yale.edu',
                reference_card__cta_secondary__content: 'Add to Calendar',
                multi_day_event: false,
                reference_card__categories:
                  referenceCardData.reference_card__categories,
                reference_card__tags: referenceCardData.reference_card__tags,
              })}
            </ul>
          </div>
        </div>

        <h3>5. Profile Card (Reference)</h3>
        <div class='card-collection' data-component-width='site' data-collection-source='profile' data-collection-type='grid' data-collection-featured="true">
          <div class='card-collection__inner'>
            <ul class='card-collection__cards'>
              ${referenceCardTwig({
                card_collection__source_type: 'profile',
                card_collection__type: 'grid',
                ...imageData.responsive_images['1x1'],
                reference_card__featured: 'true',
                reference_card__image: 'true',
                reference_card__heading:
                  referenceProfileCardData.reference_card__heading,
                reference_card__heading_extra:
                  referenceProfileCardData.reference_card__pronouns,
                reference_card__subheading:
                  referenceProfileCardData.reference_card__subheading,
                reference_card__snippet:
                  referenceProfileCardData.reference_card__snippet,
                reference_card__url:
                  referenceProfileCardData.reference_card__url,
                reference_card__categories:
                  referenceProfileCardData.reference_card__categories,
                reference_card__tags:
                  referenceProfileCardData.reference_card__tags,
              })}
            </ul>
          </div>
        </div>

        <h3>6. Page Card (Reference)</h3>
        <div class='card-collection' data-component-width='site' data-collection-type='grid' data-collection-featured="true">
          <div class='card-collection__inner'>
            <ul class='card-collection__cards'>
              ${referenceCardTwig({
                card_collection__source_type: 'page',
                card_collection__type: 'grid',
                ...imageData.responsive_images['3x2'],
                reference_card__date:
                  referencePageCardData.reference_card__date,
                reference_card__heading:
                  referencePageCardData.reference_card__heading,
                reference_card__snippet:
                  referencePageCardData.reference_card__snippet,
                reference_card__featured: 'true',
                reference_card__image: 'true',
                reference_card__url: referencePageCardData.reference_card__url,
                show_thumbnail: 'true',
                reference_card__categories:
                  referencePageCardData.reference_card__categories,
                reference_card__tags:
                  referencePageCardData.reference_card__tags,
              })}
            </ul>
          </div>
        </div>

        <h3>7. Resource Card (Reference)</h3>
        <div class='card-collection' data-component-width='site' data-collection-type='grid' data-collection-featured="true">
          <div class='card-collection__inner'>
            <ul class='card-collection__cards'>
              ${referenceCardTwig({
                card_collection__source_type: 'resource',
                card_collection__type: 'grid',
                ...imageData.responsive_images['3x2'],
                reference_card__date:
                  referenceResourceData.reference_card__date,
                reference_card__heading:
                  referenceResourceData.reference_card__heading,
                reference_card__snippet:
                  referenceResourceData.reference_card__snippet,
                reference_card__featured: 'true',
                reference_card__image: 'true',
                reference_card__url: referenceResourceData.reference_card__url,
                show_categories: 'true',
                reference_card__categories:
                  referenceResourceData.reference_card__categories,
                reference_card__tags:
                  referenceResourceData.reference_card__tags,
              })}
            </ul>
          </div>
        </div>
      </div>
      `,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations with all 7 card types for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
