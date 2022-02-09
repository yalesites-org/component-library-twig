import link from './link.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Links' };

export const links = () => `
  <div class="text-field">
    ${link({
      link_url: '#',
      link_content: 'This is a link',
      link_attributes: {
        target: '_blank',
      },
    })}
  </div>`;
