import tokens from '@yalesites-org/tokens/build/json/tokens.json';

// Twig templates
import typeFaces from './type-faces.twig';
import typeScale from './type-scale.twig';
import typeStyles from './type-styles.twig';

// Data files
import typeFacesData from './type-faces.yml';

const scaleData = { font_scale: tokens.font.scale };
const styleData = { font_styles: tokens.font.styles };

/**
 * Storybook Definition.
 */
export default { title: 'Base/Typography' };

export const TypeFaces = () => typeFaces(typeFacesData);

export const TypeScale = () => typeScale(scaleData);

export const TypeStyles = () => typeStyles(styleData);
