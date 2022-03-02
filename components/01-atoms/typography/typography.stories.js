// Twig templates
import textExamplesTwig from './text/_text--examples.twig';

// Data files
import textData from './text/text.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Typography' };

export const TextExamples = () => `
  <p><em>Note: This page show text in it's "raw" form, and therefor has no line-length settings etc. Those will be determined by components at the molecule/organism level.</em></p>
  <div class="text-field">${textExamplesTwig(textData)}</div>
`;
