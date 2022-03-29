// Twig templates
import textExamplesTwig from './text/_text--examples.twig';

// Data files
import textData from './text/text.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Typography' };

export const TextExamples = () => `
  <div class="text-field">${textExamplesTwig(textData)}</div>
`;
