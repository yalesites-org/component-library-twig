// Twig templates
import textExamplesTwig from './text/_text--examples.twig';
import headingTwig from './headings/heading.twig';

// Data files
import textData from './text/text.yml';
import headingData from './headings/headings.yml';

// Loop over items in headingData to show each one in the example below.
const headings = headingData
  .map((content) => headingTwig(content))
  .join('<br />');

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Typography' };

export const TextExamples = () => `
  <p><em>Note: This page show text in it's "raw" form, and therefor has no line-length settings etc. Those will be determined by components at the molecule/organism level.</em></p>
  <div class="text-field">${textExamplesTwig(textData)}</div>
`;

export const headingsExamples = () => `
<p>These headings are examples of what "raw" headings (<code>h1</code> through <code>h6</code>) will look like in a basic text field. Headings that are a part of larger components will be styled by those components.</p>
<div class="text-field">
  ${headings}
</div>
`;
