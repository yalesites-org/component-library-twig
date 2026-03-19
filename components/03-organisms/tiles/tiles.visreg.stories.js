import tilesTwig from './yds-tiles.twig';
import tilesData from './tiles.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import {
  createPlaygroundIntro,
  createVariations,
  createVrtIntro,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Tiles/Visreg',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    presentationStyle: {
      name: 'Presentation Style',
      options: ['heading', 'icon', 'text-only'],
      type: 'select',
    },
    columnCount: {
      name: 'Column Count',
      options: ['two', 'three', 'four'],
      type: 'select',
    },
    alignment: {
      name: 'Alignment',
      options: ['left', 'center', 'right'],
      type: 'select',
    },
  },
  args: {
    presentationStyle: 'heading',
    columnCount: 'three',
    alignment: 'left',
  },
};

export const Visreg = ({ presentationStyle, columnCount, alignment }) => {
  const styles = ['heading', 'icon', 'text-only'];
  const columnCounts = ['two', 'three', 'four'];
  const alignments = ['left', 'center', 'right'];

  return `
    ${createPlaygroundIntro(
      'Visual regression testing for tiles component showing all presentation styles, column counts, and alignment variations.',
    )}

    ${createVrtIntro()}

    ${tilesTwig({
      tiles__alignment: alignment,
      tiles__vertical_alignment: 'top',
      tiles__presentation_style: presentationStyle,
      tiles__grid_count: columnCount,
      tiles__with__image: 'false',
      tiles__with__animation: 'false',
      ...tilesData,
      ...imageData.responsive_images['1x1'],
    })}

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
