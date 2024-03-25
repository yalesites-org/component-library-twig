import tileItemTwig from './yds-tile-item.twig';

import tileItemData from './tile-item.yml';

// Image atom component - generic images for demo
import imageData from '../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Tile Item',
  argTypes: {
    number: {
      name: 'Number',
      type: 'string',
      defaultValue: tileItemData.tile__item__number,
    },
    content: {
      name: 'Content',
      type: 'string',
      defaultValue: tileItemData.tile__item__content,
    },
    presentationStyle: {
      name: 'Presentation Style',
      options: ['number', 'icon-only'],
      type: 'select',
      defaultValue: 'number',
    },
    alignment: {
      name: 'Alignment',
      options: ['left', 'right'],
      type: 'select',
      defaultValue: 'left',
    },
    themeColor: {
      name: 'Component Theme (dial)',
      options: ['one', 'two', 'three'],
      type: 'select',
      defaultValue: 'one',
    },
    image: {
      name: 'With image',
      type: 'boolean',
      defaultValue: true,
    },
  },
};

export const TileItem = ({
  number,
  content,
  presentationStyle,
  themeColor,
  alignment,
  image,
}) => `

  <ul class='tile__wrap' data-component-grid-count='three'>
    ${tileItemTwig({
      tile__item__number: tileItemData.tile__item__number,
      tile__item__content: tileItemData.tile__item__content,
      tile__item__presentation_style: 'number',
      tile__item__alignment: 'left',
      tile__item__bg_image: 'true',
      ...imageData.responsive_images['1x1'],
    })}
    ${tileItemTwig({
      tile__item__number: tileItemData.tile__item__number,
      tile__item__presentation_style: 'icon-only',
      tile__item__alignment: 'right',
      tile__item__bg_image: 'false',
    })}
    ${tileItemTwig({
      tile__item__number: tileItemData.tile__item__number,
      tile__item__content: tileItemData.tile__item__content,
      tile__item__presentation_style: 'number',
      tile__item__alignment: 'left',
      tile__item__bg_image: 'true',
      ...imageData.responsive_images['1x1'],
    })}
  </ul>
  <div class="wrap-for-global-theme" data-global-theme="one">
  <h2>Playground</h2>
    <p>Use the StoryBook controls to see the tile item below implement the available variations.</p>
    <ul class='tile__wrap' data-component-grid-count='three'>
      ${tileItemTwig({
        tile__item__number: number,
        tile__item__content: content,
        tile__item__alignment: alignment,
        tile__item__presentation_style: presentationStyle,
        tile__item__theme: themeColor,
        tile__item__bg_image: image ? 'true' : 'false',
        ...imageData.responsive_images['1x1'],
      })}
    </ul>
  </div>
`;
