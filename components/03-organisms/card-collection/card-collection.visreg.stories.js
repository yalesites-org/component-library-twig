import cardCollectionTwig from './yds-card-collection.twig';
import postCardData from '../../02-molecules/cards/reference-card/examples/post-card.yml';
import eventCardData from '../../02-molecules/cards/reference-card/examples/event-card.yml';
import profileCardData from '../../02-molecules/cards/reference-card/examples/profile-card.yml';
import resourceCardData from '../../02-molecules/cards/reference-card/examples/resource-card.yml';
import directoryCardData from '../../02-molecules/cards/directory-listing-card/yds-directory-listing-card.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import {
  sectionThemes,
  globalThemeLabels,
  globalThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeSectionStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Organisms/Card Collection/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

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

const renderSection = (sectionTheme) =>
  createSectionWrapper(sectionTheme, renderAllContent(), {
    width: 'site',
    primaryWidth: '100%',
  });

const themeStories = createGlobalThemeSectionStories(
  renderSection,
  globalThemes,
  sectionThemes,
  globalThemeLabels,
);

export const OldBluesSectionDefault = themeStories.one.default;
export const OldBluesSectionOne = themeStories.one.one;
export const OldBluesSectionTwo = themeStories.one.two;
export const OldBluesSectionThree = themeStories.one.three;
export const OldBluesSectionFour = themeStories.one.four;
export const OldBluesSectionFive = themeStories.one.five;

export const NewHavenGreenSectionDefault = themeStories.two.default;
export const NewHavenGreenSectionOne = themeStories.two.one;
export const NewHavenGreenSectionTwo = themeStories.two.two;
export const NewHavenGreenSectionThree = themeStories.two.three;
export const NewHavenGreenSectionFour = themeStories.two.four;
export const NewHavenGreenSectionFive = themeStories.two.five;

export const ShorelineSummerSectionDefault = themeStories.three.default;
export const ShorelineSummerSectionOne = themeStories.three.one;
export const ShorelineSummerSectionTwo = themeStories.three.two;
export const ShorelineSummerSectionThree = themeStories.three.three;
export const ShorelineSummerSectionFour = themeStories.three.four;
export const ShorelineSummerSectionFive = themeStories.three.five;

export const OnhaSectionDefault = themeStories.four.default;
export const OnhaSectionOne = themeStories.four.one;
export const OnhaSectionTwo = themeStories.four.two;
export const OnhaSectionThree = themeStories.four.three;
export const OnhaSectionFour = themeStories.four.four;
export const OnhaSectionFive = themeStories.four.five;

export const ItsYourYaleSectionDefault = themeStories.five.default;
export const ItsYourYaleSectionOne = themeStories.five.one;
export const ItsYourYaleSectionTwo = themeStories.five.two;
export const ItsYourYaleSectionThree = themeStories.five.three;
export const ItsYourYaleSectionFour = themeStories.five.four;
export const ItsYourYaleSectionFive = themeStories.five.five;

export const AISectionDefault = themeStories.six.default;
export const AISectionOne = themeStories.six.one;
export const AISectionTwo = themeStories.six.two;
export const AISectionThree = themeStories.six.three;
export const AISectionFour = themeStories.six.four;
export const AISectionFive = themeStories.six.five;

export const WhitneyHumanitiesCenterSectionDefault = themeStories.seven.default;
export const WhitneyHumanitiesCenterSectionOne = themeStories.seven.one;
export const WhitneyHumanitiesCenterSectionTwo = themeStories.seven.two;
export const WhitneyHumanitiesCenterSectionThree = themeStories.seven.three;
export const WhitneyHumanitiesCenterSectionFour = themeStories.seven.four;
export const WhitneyHumanitiesCenterSectionFive = themeStories.seven.five;

ItsYourYaleSectionDefault.storyName = 'It’s Your Yale Section Default';
ItsYourYaleSectionOne.storyName = 'It’s Your Yale Section One';
ItsYourYaleSectionTwo.storyName = 'It’s Your Yale Section Two';
ItsYourYaleSectionThree.storyName = 'It’s Your Yale Section Three';
ItsYourYaleSectionFour.storyName = 'It’s Your Yale Section Four';
ItsYourYaleSectionFive.storyName = 'It’s Your Yale Section Five';
