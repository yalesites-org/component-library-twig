import tokens from '@yalesites-org/tokens/build/json/tokens.json';

// Twig templates
import typeFaces from './type-faces.twig';
import typeScale from './type-scale.twig';

// Data files
import typeFacesData from './type-faces.yml';

const typographyData = { font_scale: tokens.font.scale };

/**
 * Storybook Definition.
 */
export default { title: 'Base/Typography' };

export const TypeFaces = () => typeFaces(typeFacesData);

export const TypeScale = () => typeScale(typographyData);
