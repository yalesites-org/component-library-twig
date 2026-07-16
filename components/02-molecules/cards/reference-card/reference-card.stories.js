import referenceCardTwig from './examples/_card--examples.twig';

import referenceCardData from './examples/post-card.yml';
import referenceProfileCardData from './examples/profile-card.yml';
import referencePageCardData from './examples/page-card.yml';
import referenceResourceData from './examples/resource-card.yml';
import imageData from '../../../01-atoms/images/image/image.yml';
import componentProps from './reference-card-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';
import { addTableDefaults } from '../../../_storybook/add-table-defaults';

const argTypes = toArgTypes(componentProps);
argTypes.eyebrow = { ...argTypes.eyebrow, if: { arg: 'showEyebrow' } };

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Cards',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
  args: {
    ...toArgs(componentProps),
    heading: referenceCardData.reference_card__heading,
    snippet: referenceCardData.reference_card__snippet,
  },
};

export const PostCard = ({
  date,
  eyebrow,
  heading,
  snippet,
  collectionType,
  featured,
  withImage,
  showCategories,
  showEyebrow,
  showTags,
  overlayText,
}) => `
<div class='card-collection' data-component-width='site' data-collection-type='${collectionType}' data-collection-featured="${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${referenceCardTwig({
        card_collection__source_type: 'post',
        card_collection__type: collectionType,
        ...imageData.responsive_images['3x2'],
        reference_card__date: date,
        reference_card__eyebrow: eyebrow,
        reference_card__heading: heading,
        reference_card__snippet: snippet,
        reference_card__featured: featured ? 'true' : 'false',
        reference_card__image: withImage ? 'true' : 'false',
        reference_card__url: referenceCardData.reference_card__url,
        show_categories: showCategories,
        show_eyebrow: showEyebrow,
        show_tags: showTags,
        reference_card__categories:
          referenceCardData.reference_card__categories,
        reference_card__tags: referenceCardData.reference_card__tags,
        reference_card__overlay: overlayText,
      })}
    </ul>
  </div>
</div>
`;
const postCardArgs = {
  date: referenceCardData.reference_card__date,
};
PostCard.argTypes = addTableDefaults(
  {
    date: {
      name: 'Date',
      type: 'string',
    },
  },
  postCardArgs,
);
PostCard.args = postCardArgs;

export const EventCard = ({
  format,
  heading,
  snippet,
  collectionType,
  featured,
  withImage,
  primaryCTAContent,
  primaryCTAURL,
  secondaryCTAContent,
  secondaryCTAURL,
  multiDayEvent,
  headingPrefix,
  showCategories,
  showTags,
  overlayText,
}) => `
<div class='card-collection' data-component-width='site' data-collection-type='${collectionType}' data-collection-featured="${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${referenceCardTwig({
        card_collection__source_type: 'event',
        card_collection__type: collectionType,
        ...imageData.responsive_images['3x2'],
        format,
        reference_card__heading: heading,
        reference_card__prefix: headingPrefix,
        reference_card__snippet: snippet,
        reference_card__featured: featured ? 'true' : 'false',
        reference_card__image: withImage ? 'true' : 'false',
        reference_card__url: referenceCardData.reference_card__url,
        reference_card__cta_primary__href: primaryCTAURL,
        reference_card__cta_primary__content: primaryCTAContent,
        reference_card__cta_secondary__href: secondaryCTAURL,
        reference_card__cta_secondary__content: secondaryCTAContent,
        multi_day_event: multiDayEvent,
        reference_card__categories:
          referenceCardData.reference_card__categories,
        show_categories: showCategories,
        reference_card__tags: referenceCardData.reference_card__tags,
        show_tags: showTags,
        reference_card__overlay: overlayText,
      })}
    </ul>
  </div>
</div>
`;
const eventCardArgs = {
  format: 'In-person',
  headingPrefix: '',
  primaryCTAContent: 'Buy Tickets',
  primaryCTAURL: 'https://yale.edu',
  secondaryCTAContent: 'Add to Calendar',
  secondaryCTAURL: 'https://yale.edu',
  multiDayEvent: false,
};
EventCard.argTypes = addTableDefaults(
  {
    format: {
      name: 'Format',
      control: 'select',
      options: ['In-person', 'Online', 'Hybrid'],
    },
    headingPrefix: {
      name: 'Heading Prefix',
      type: 'string',
    },
    primaryCTAContent: {
      name: 'Primary CTA Content',
      type: 'string',
    },
    primaryCTAURL: {
      name: 'Primary CTA URL',
      type: 'string',
    },
    secondaryCTAContent: {
      name: 'Secondary CTA Content',
      type: 'string',
    },
    secondaryCTAURL: {
      name: 'Secondary CTA URL',
      type: 'string',
    },
    multiDayEvent: {
      name: 'Multi-day Event',
      type: 'boolean',
    },
  },
  eventCardArgs,
);

EventCard.args = eventCardArgs;

export const ProfileCard = ({
  collectionType,
  featured,
  withImage,
  showCategories,
  showPronouns,
  showTags,
  overlayText,
}) => `
<div class='card-collection' data-component-width='site' data-collection-source='profile' data-collection-type='${collectionType}' data-collection-featured="${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${referenceCardTwig({
        card_collection__source_type: 'profile',
        card_collection__type: collectionType,
        ...imageData.responsive_images['1x1'],
        reference_card__featured: featured ? 'true' : 'false',
        reference_card__image: withImage ? 'true' : 'false',
        reference_card__heading:
          referenceProfileCardData.reference_card__heading,
        reference_card__heading_extra:
          referenceProfileCardData.reference_card__pronouns,
        reference_card__subheading:
          referenceProfileCardData.reference_card__subheading,
        reference_card__snippet:
          referenceProfileCardData.reference_card__snippet,
        reference_card__url: referenceProfileCardData.reference_card__url,
        reference_card__categories:
          referenceProfileCardData.reference_card__categories,
        show_categories: showCategories,
        show_pronouns: showPronouns,
        reference_card__tags: referenceProfileCardData.reference_card__tags,
        show_tags: showTags,
        reference_card__overlay: overlayText,
      })}
    </ul>
  </div>
</div>
`;

const profileCardArgs = {
  showPronouns: false,
};

ProfileCard.argTypes = addTableDefaults(
  {
    showPronouns: {
      name: 'Show Pronouns',
      type: 'boolean',
    },
  },
  profileCardArgs,
);

ProfileCard.args = profileCardArgs;

export const PageCard = ({
  date,
  eyebrow,
  heading,
  snippet,
  collectionType,
  featured,
  withImage,
  showCategories,
  showEyebrow,
  showTags,
  showThumbnail,
  overlayText,
}) => `
<div class='card-collection' data-component-width='site' data-collection-type='${collectionType}' data-collection-featured="${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${referenceCardTwig({
        card_collection__source_type: 'page',
        card_collection__type: collectionType,
        ...imageData.responsive_images['3x2'],
        reference_card__date: date,
        reference_card__eyebrow: eyebrow,
        reference_card__heading: heading,
        reference_card__snippet: snippet,
        reference_card__featured: featured ? 'true' : 'false',
        reference_card__image: withImage ? 'true' : 'false',
        reference_card__url: referencePageCardData.reference_card__url,
        show_categories: showCategories,
        show_eyebrow: showEyebrow,
        show_tags: showTags,
        show_thumbnail: showThumbnail ? 'true' : 'false',
        reference_card__categories:
          referencePageCardData.reference_card__categories,
        reference_card__tags: referencePageCardData.reference_card__tags,
        reference_card__overlay: overlayText,
      })}
    </ul>
  </div>
</div>
`;
const pageCardArgs = {
  heading: referencePageCardData.reference_card__heading,
  snippet: referencePageCardData.reference_card__snippet,
  date: referencePageCardData.reference_card__date,
  collectionType: 'grid',
  featured: true,
  withImage: true,
  showEyebrow: false,
  showCategories: false,
  showTags: false,
  showThumbnail: true,
};
PageCard.argTypes = addTableDefaults(
  {
    date: {
      name: 'Date',
      type: 'string',
    },
  },
  pageCardArgs,
);

PageCard.args = pageCardArgs;

export const ResourceCard = ({
  date,
  eyebrow,
  heading,
  snippet,
  collectionType,
  featured,
  withImage,
  showCategories,
  showEyebrow,
  showTags,
  overlayText,
  portrait,
}) => `
<div class='card-collection${
  portrait ? ' card-collection--resource-portrait' : ''
}' data-component-width='site'${
  portrait ? " data-collection-source='resource'" : ''
} data-collection-type='${collectionType}' data-collection-featured="${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${referenceCardTwig({
        card_collection__source_type: 'resource',
        card_collection__type: collectionType,
        ...imageData.responsive_images[portrait ? '1x1.6' : '3x2'],
        reference_card__date: date,
        reference_card__eyebrow: eyebrow,
        reference_card__heading: heading,
        reference_card__snippet: snippet,
        reference_card__featured: featured ? 'true' : 'false',
        reference_card__image: withImage ? 'true' : 'false',
        reference_card__url: referenceResourceData.reference_card__url,
        show_categories: showCategories,
        show_eyebrow: showEyebrow,
        show_tags: showTags,
        reference_card__categories:
          referenceResourceData.reference_card__categories,
        reference_card__tags: referenceResourceData.reference_card__tags,
        reference_card__overlay: overlayText,
      })}
    </ul>
  </div>
</div>
`;
const resourceCardArgs = {
  showCategories: true,
  portrait: false,
  date: referenceResourceData.reference_card__date,
};
ResourceCard.argTypes = addTableDefaults(
  {
    date: {
      name: 'Date',
      type: 'string',
    },
    portrait: {
      name: 'Portrait',
      type: 'boolean',
    },
  },
  resourceCardArgs,
);

ResourceCard.args = resourceCardArgs;
