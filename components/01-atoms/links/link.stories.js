import link from './link.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Links' };

export const links = () =>
  link({
    link_url: '#',
    link_content: 'This is a link',
    link_attributes: {
      target: '_blank',
    },
  });
