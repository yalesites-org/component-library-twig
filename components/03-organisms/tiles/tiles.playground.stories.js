import tilesTwig from './yds-tiles.twig';
import tilesData from './tiles.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import {
  createPlaygroundIntro,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Tiles/Playground',
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

export const Playground = ({ presentationStyle, columnCount, alignment }) => {
  const styles = ['heading', 'icon', 'text-only'];

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different presentation styles, column counts, and alignments.',
    )}

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
  `;
};
