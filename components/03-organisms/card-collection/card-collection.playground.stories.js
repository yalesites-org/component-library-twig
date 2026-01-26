import cardCollectionTwig from './yds-card-collection.twig';
import postCardData from '../../02-molecules/cards/reference-card/examples/post-card.yml';
import eventCardData from '../../02-molecules/cards/reference-card/examples/event-card.yml';
import profileCardData from '../../02-molecules/cards/reference-card/examples/profile-card.yml';
import resourceCardData from '../../02-molecules/cards/reference-card/examples/resource-card.yml';
import directoryCardData from '../../02-molecules/cards/directory-listing-card/yds-directory-listing-card.yml';
import imageData from '../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Card Collection/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    collectionType: {
      name: 'Collection Type',
      type: 'select',
      options: ['grid', 'list', 'condensed'],
    },
  },
  args: {
    collectionType: 'grid',
  },
};

export const Playground = ({ collectionType }) => {
  const collectionTypes = ['grid', 'list', 'condensed'];

  return `
  <h2>Interactive Playground</h2>
  <p>All card collection types shown with the selected collection type.</p>

  <div>
    <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin-bottom: 1rem;">Post Cards</h3>
    ${cardCollectionTwig({
      card_collection__source_type: 'post',
      card_collection__type: collectionType,
      card_collection__heading: 'Post Card Collection',
      card_collection__featured: 'true',
      card_collection__with_images: 'true',
      card_collection__cards: [1, 2, 3],
      ...postCardData,
      ...imageData.responsive_images['3x2'],
    })}

    <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin: 2rem 0 1rem 0;">Event Cards</h3>
    ${cardCollectionTwig({
      card_collection__source_type: 'event',
      format: 'Online',
      card_collection__type: collectionType,
      card_collection__heading: 'Event Card Collection',
      card_collection__featured: 'true',
      card_collection__with_images: 'true',
      card_collection__cards: [1, 2, 3],
      ...eventCardData,
      ...imageData.responsive_images['3x2'],
    })}

    <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin: 2rem 0 1rem 0;">Profile Cards</h3>
    ${cardCollectionTwig({
      card_collection__source_type: 'profile',
      card_collection__type: collectionType,
      card_collection__heading: 'Profile Card Collection',
      card_collection__featured: 'true',
      card_collection__with_images: 'true',
      card_collection__cards: [1, 2, 3],
      ...profileCardData,
      ...imageData.responsive_images['1x1'],
    })}

    <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin: 2rem 0 1rem 0;">Resource Cards</h3>
    ${cardCollectionTwig({
      card_collection__source_type: 'resource',
      card_collection__type: collectionType,
      card_collection__heading: 'Resource Card Collection',
      card_collection__featured: 'true',
      card_collection__with_images: 'true',
      card_collection__cards: [1, 2, 3],
      ...resourceCardData,
      ...imageData.responsive_images['3x2'],
    })}

    <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin: 2rem 0 1rem 0;">Directory Listing Cards</h3>
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

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Collection Type Variations</h2>
  <p>Below are all collection type variations for visual regression testing (showing Post cards as representative example).</p>

  ${collectionTypes
    .map(
      (type) => `
    <div style="margin-bottom: 2rem;">
      <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin-bottom: 1rem;">Collection Type: ${type}</h3>
      ${cardCollectionTwig({
        card_collection__source_type: 'post',
        card_collection__type: type,
        card_collection__heading: `${type} Collection`,
        card_collection__featured: 'true',
        card_collection__with_images: 'true',
        card_collection__cards: [1, 2, 3],
        ...postCardData,
        ...imageData.responsive_images['3x2'],
      })}
    </div>
  `,
    )
    .join('')}
  `;
};
