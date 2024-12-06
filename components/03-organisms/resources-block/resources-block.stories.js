import ResourcesBlockTwig from './yds-resources-block.twig';
import { ResorceCardCollection } from '../card-collection/card-collection.stories'; // Import the card collection

// Import any necessary data (image, resource data, etc.)
import ResourcesBlockGroupData from './_yds-resources-block.yml';
import imageData from '../../01-atoms/images/image/image.yml'; // Image data (if needed)

// Storybook definition for Resources Block
export default {
  title: 'Organisms/Resources',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ResourcesBlockHeading: {
      name: 'Infographic Group Heading',
      type: 'string',
      defaultValue: ResourcesBlockGroupData.resources_block__group__heading,
    },
    ResourcesBlockContent: {
      name: 'Infographic Group Content',
      type: 'string',
      defaultValue: ResourcesBlockGroupData.resources_block__group__content,
    },
    ResourcesBlockGroupLink: {
      name: 'Infographic Group Link',
      type: 'string',
      defaultValue:
        ResourcesBlockGroupData.resources_block__group__link__content,
    },
    ResourcesBlockFormHeading: {
      name: 'Form Heading',
      type: 'string',
      defaultValue: ResourcesBlockGroupData.resources_block__form__heading,
    },
    ResourcesBlockCardHeading: {
      name: 'Card Heading',
      type: 'string',
      defaultValue: ResourcesBlockGroupData.resources_block__card__heading,
    },
    ResourcesBlockForm: {
      name: 'Form Data',
      type: 'string',
      defaultValue: ResourcesBlockGroupData.resources_block__group__form,
    },
    image: {
      name: 'With image',
      type: 'boolean',
      defaultValue: true,
    },
    blockType: {
      name: 'Block Type',
      type: 'select',
      options: ['compact', 'full'],
      defaultValue: 'full',
    },
    collectionType: {
      name: 'Collection Type',
      type: 'select',
      options: ['grid', 'list', 'condensed'],
      defaultValue: 'grid',
    },
    featured: {
      name: 'Featured',
      type: 'boolean',
      defaultValue: true,
    },
  },
};

// Export the ResourcesBlock story with ResorceCardCollection
export const ResourcesBlockWithResourceCard = ({
  ResourcesBlockHeading,
  ResourcesBlockContent,
  ResourcesBlockGroupLink,
  ResourcesBlockForm,
  ResourcesBlockFormHeading,
  ResourcesBlockCardHeading,
  blockType,
  image,
  collectionType,
  featured,
}) => {
  // Generate the ResorceCardCollection HTML
  const resourceCardCollectionHTML = ResorceCardCollection({
    heading: '',
    collectionType,
    featured,
  });

  // Set heading for the ResourceCardCollection based on blockType
  const ResourcesBlockHeadingalt =
    blockType === 'full' ? 'Explore Resources' : ResourcesBlockHeading;

  // Set heading for the ResourceCardCollection based on blockType
  const ResourcesBlockContentalt =
    blockType === 'full' ? '' : ResourcesBlockContent;

  // Return the ResourcesBlockTwig with current values passed to it
  return ResourcesBlockTwig({
    resources_block__group__heading: ResourcesBlockHeadingalt,
    resources_block__group__content: ResourcesBlockContentalt,
    resources_block__group__form: ResourcesBlockForm,
    resources_block__group__type: blockType,
    resources_block__group__bg_image: image,
    resources_block__group__link__content: ResourcesBlockGroupLink,
    resource_card_collection: resourceCardCollectionHTML,
    resources_block__form__heading: ResourcesBlockFormHeading,
    resources_block__card__heading: ResourcesBlockCardHeading,
    ...imageData.responsive_images['16x9'],
  });
};

// Define arguments for Storybook (current values)
ResourcesBlockWithResourceCard.argTypes = {
  ResourcesBlockHeading: {
    name: 'Block Heading',
    type: 'string',
    defaultValue: ResourcesBlockGroupData.resources_block__group__heading,
  },
  ResourcesBlockContent: {
    name: 'Block Content',
    type: 'string',
    defaultValue: ResourcesBlockGroupData.resources_block__group__content,
  },
  ResourcesBlockGroupLink: {
    name: 'Link Content',
    type: 'string',
    defaultValue: ResourcesBlockGroupData.resources_block__group__link__content,
  },
  collectionType: {
    name: 'Collection Type',
    type: 'select',
    options: ['grid', 'list', 'condensed'],
    defaultValue: 'grid',
  },
  featured: {
    name: 'Featured',
    type: 'boolean',
    defaultValue: true,
  },
  blockType: {
    name: 'Block Type',
    type: 'select',
    options: ['compact', 'full'],
    defaultValue: 'full',
  },
  image: {
    name: 'With Image',
    type: 'boolean',
    defaultValue: true,
  },
};
