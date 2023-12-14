// Twig templates
import textFieldTwig from './yds-text-field.twig';
import emphasizedTextTwig from './yds-emphasized-text.twig';

// Data files
import textData from './text-field.yml';
import emphasizedTextData from './emphasized-text.yml';
/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Text' };

export const TextField = () => textFieldTwig(textData);

export const EmphasizedText = () => emphasizedTextTwig(emphasizedTextData);
