import embedTwig from './embed.twig';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Embed',
};

export const Embed = () =>
  embedTwig({
    embed__src: 'https://blog.logrocket.com/the-ultimate-guide-to-iframes/',
    embed__title: 'Blog about embeds',
  });
