import tilesTwig from './yds-tiles.twig';
import tilesData from './tiles.yml';
import imageData from '../../01-atoms/images/image/image.yml';

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
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different presentation styles, column counts, and alignments.</p>

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

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Presentation Style Variations</h2>
  <p>Below are all presentation style variations for visual regression testing.</p>

  ${styles
    .map(
      (style) => `
    <div style="margin-bottom: 2rem;">
      <h3 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin-bottom: 1rem;">Presentation Style: ${style}</h3>
      ${tilesTwig({
        tiles__alignment: 'left',
        tiles__vertical_alignment: 'top',
        tiles__presentation_style: style,
        tiles__grid_count: 'three',
        tiles__with__image: 'false',
        tiles__with__animation: 'false',
        ...tilesData,
        ...imageData.responsive_images['1x1'],
      })}
    </div>
  `,
    )
    .join('')}
  `;
};
