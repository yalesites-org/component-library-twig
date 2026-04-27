import cardCollectionTwig from './yds-card-collection.twig';
import postCardData from '../../02-molecules/cards/reference-card/examples/post-card.yml';
import eventCardData from '../../02-molecules/cards/reference-card/examples/event-card.yml';
import profileCardData from '../../02-molecules/cards/reference-card/examples/profile-card.yml';
import resourceCardData from '../../02-molecules/cards/reference-card/examples/resource-card.yml';
import directoryCardData from '../../02-molecules/cards/directory-listing-card/yds-directory-listing-card.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import { sectionThemes, globalThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Card Collection/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const collectionTypes = ['grid', 'list', 'condensed'];
  const collectionType = 'grid';
  const withImages = true;

  // Render function for all card types
  const renderAllCardTypes = () => `
  <div>
    <div class="wrap-for-screenshot">
    <h3>Post Cards</h3>
    ${cardCollectionTwig({
      card_collection__source_type: 'post',
      card_collection__type: collectionType,
      card_collection__heading: 'Post Card Collection',
      card_collection__featured: 'true',
      card_collection__with_images: withImages ? 'true' : 'false',
      card_collection__cards: [1, 2, 3],
      ...postCardData,
      ...imageData.responsive_images['3x2'],
    })}

    <h3>Event Cards</h3>
    ${cardCollectionTwig({
      card_collection__source_type: 'event',
      format: 'Online',
      card_collection__type: collectionType,
      card_collection__heading: 'Event Card Collection',
      card_collection__featured: 'true',
      card_collection__with_images: withImages ? 'true' : 'false',
      card_collection__cards: [1, 2, 3],
      ...eventCardData,
      ...imageData.responsive_images['3x2'],
    })}

    <h3>Profile Cards</h3>
    ${cardCollectionTwig({
      card_collection__source_type: 'profile',
      card_collection__type: collectionType,
      card_collection__heading: 'Profile Card Collection',
      card_collection__featured: 'true',
      card_collection__with_images: withImages ? 'true' : 'false',
      card_collection__cards: [1, 2, 3],
      ...profileCardData,
      ...imageData.responsive_images['1x1'],
    })}

    <h3>Resource Cards</h3>
    ${cardCollectionTwig({
      card_collection__source_type: 'resource',
      card_collection__type: collectionType,
      card_collection__heading: 'Resource Card Collection',
      card_collection__featured: 'true',
      card_collection__with_images: withImages ? 'true' : 'false',
      card_collection__cards: [1, 2, 3],
      ...resourceCardData,
      ...imageData.responsive_images['3x2'],
    })}

    <h3>Resource Portrait Cards</h3>
    ${cardCollectionTwig({
      card_collection__source_type: 'resource',
      card_collection__modifiers: ['resource-portrait'],
      card_collection__type: collectionType,
      card_collection__heading: 'Resource Portrait Card Collection',
      card_collection__featured: 'false',
      card_collection__with_images: withImages ? 'true' : 'false',
      card_collection__cards: [1, 2, 3, 4],
      ...resourceCardData,
      ...imageData.responsive_images['1x1.6'],
    })}

    <h3>Directory Listing Cards</h3>
    ${cardCollectionTwig({
      card_collection__source_type: 'directory-listing',
      card_collection__type: 'profile-directory',
      card_collection__heading: 'Directory Listing',
      card_collection__featured: 'true',
      card_collection__cards: [1, 2, 3, 4],
      ...directoryCardData,
      ...imageData.responsive_images['1x1'],
    })}
    </div>
  </div>
  `;

  const renderAllContent = () => `
    ${renderAllCardTypes()}

    ${createVariations(
      (type) =>
        cardCollectionTwig({
          card_collection__source_type: 'post',
          card_collection__type: type,
          card_collection__heading: `${type} Collection`,
          card_collection__featured: 'true',
          card_collection__with_images: withImages ? 'true' : 'false',
          card_collection__cards: [1, 2, 3],
          ...postCardData,
          ...imageData.responsive_images['3x2'],
        }),
      collectionTypes,
      'All Collection Type Variations',
      '',
      'Collection Type',
    )}
  `;

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderAllContent(), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
