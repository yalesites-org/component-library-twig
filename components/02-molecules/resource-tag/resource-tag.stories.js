// Twig templates
import resourceTagTwig from './yds-resource-tag.twig';

// Data files
import resourceData from './resource-tag.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Resource Tag',
  argTypes: {
    content: {
      name: 'Content',
      type: 'string',
      defaultValue: resourceData.resource_tag__content,
    },
  },
};

export const resourceTag = ({ content }) => `
${resourceTagTwig({
  resource_tag__content: content,
})}
`;
