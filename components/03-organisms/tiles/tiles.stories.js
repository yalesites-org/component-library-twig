// tiles twig
import tilesTwig from './yds-tiles.twig';

// Stat default data
import tilesData from './tiles.yml';

// Image atom component - generic images for demo
import imageData from '../../01-atoms/images/image/image.yml';
import componentProps from './tiles-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Tiles',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    verticalAlignment: 'top',
  },
};

export const Tiles = ({
  presentationStyle,
  alignment,
  verticalAlignment,
  columnCount,
  image,
  withAnimation,
}) => {
  return `
    <div class="wrap-for-global-theme">
      ${tilesTwig({
        tiles__alignment: alignment,
        tiles__vertical_alignment: verticalAlignment,
        tiles__presentation_style: presentationStyle,
        tiles__grid_count: columnCount,
        tiles__with__image: image ? 'true' : 'false',
        tiles__with__animation: withAnimation ? 'true' : 'false',
        ...tilesData,
        ...imageData.responsive_images['1x1'],
      })}
    </div>
    `;
};
