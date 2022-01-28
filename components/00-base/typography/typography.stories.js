import tokens from '@yalesites-org/tokens/build/json/tokens.json';

// Twig templates
import typeFaces from './type-faces.twig';
import typeScale from './type-scale.twig';
import headingStyles from './heading-styles.twig';
import bodyStyles from './body-styles.twig';

// Data files
import typeFacesData from './type-faces.yml';

const scaleData = { font_scale: tokens.font.scale };
const headingStyleData = { heading_styles: tokens.font.style.heading };
const bodyStyleData = { body_styles: tokens.font.style.body };

/**
 * Storybook Definition.
 */
export default { title: 'Base/Typography' };

export const TypeFaces = () => typeFaces(typeFacesData);

export const TypeScale = () => typeScale(scaleData);

export const HeadingStyles = () => headingStyles(headingStyleData);

export const BodyStyles = () => bodyStyles(bodyStyleData);
