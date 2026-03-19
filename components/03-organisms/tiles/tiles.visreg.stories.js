import tilesTwig from './yds-tiles.twig';
import tilesData from './tiles.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import { createVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Tiles/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const styles = ['heading', 'icon', 'text-only'];
  const columnCounts = ['two', 'three', 'four'];
  const alignments = ['left', 'center', 'right'];

  return `
    ${createVariations(
      (style) =>
        tilesTwig({
          tiles__alignment: 'left',
          tiles__vertical_alignment: 'top',
          tiles__presentation_style: style,
          tiles__grid_count: 'three',
          tiles__with__image: 'false',
          tiles__with__animation: 'false',
          ...tilesData,
          ...imageData.responsive_images['1x1'],
        }),
      styles,
      'All Presentation Style Variations',
      'Presentation Style',
    )}

    ${createVariations(
      (count) =>
        tilesTwig({
          tiles__alignment: 'left',
          tiles__vertical_alignment: 'top',
          tiles__presentation_style: 'heading',
          tiles__grid_count: count,
          tiles__with__image: 'false',
          tiles__with__animation: 'false',
          ...tilesData,
          ...imageData.responsive_images['1x1'],
        }),
      columnCounts,
      'All Column Count Variations',
      'Column Count',
    )}

    ${createVariations(
      (align) =>
        tilesTwig({
          tiles__alignment: align,
          tiles__vertical_alignment: 'top',
          tiles__presentation_style: 'heading',
          tiles__grid_count: 'three',
          tiles__with__image: 'false',
          tiles__with__animation: 'false',
          ...tilesData,
          ...imageData.responsive_images['1x1'],
        }),
      alignments,
      'All Alignment Variations',
      'Alignment',
    )}
  `;
};
