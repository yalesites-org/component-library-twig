import tileItemTwig from './yds-tile-item.twig';

import tileItemData from './tile-item.yml';

import imageData from '../../01-atoms/images/image/image.yml';

export default {
  title: 'Molecules/Tile Item',
  tags: ['!dev'],
};

export const TileItem = () => `
  <div class="tiles" data-component-grid-count='three' data-component-width="site">
    <div class='tiles__inner'>
      <ul class='tiles__wrap'>
        ${tileItemTwig({
          tile__item__heading: tileItemData.tile__item__heading,
          tile__item__content: tileItemData.tile__item__content,
          tile__item__content_link: 'https://www.yale.edu',
          tile__item__presentation_style: 'heading',
          tile__item__alignment: 'left',
          tile__item__vertical_alignment: 'top',
          tile__item__bg_image: 'true',
          ...imageData.responsive_images['1x1'],
          tile__item__animation: 'false',
        })}
        ${tileItemTwig({
          tile__item__content: 'This is a tile with top vertical alignment',
          tile__item__content_link: 'https://www.yale.edu',
          tile__item__vertical_alignment: 'top',
          tile__item__presentation_style: 'text-only',
          tile__item__alignment: 'left',
          tile__item__bg_image: 'true',
          ...imageData.responsive_images['1x1'],
          tile__item__animation: 'false',
        })}
        ${tileItemTwig({
          tile__item__content: 'This is a tile with bottom vertical alignment',
          tile__item__content_link: 'https://www.yale.edu',
          tile__item__vertical_alignment: 'bottom',
          tile__item__presentation_style: 'text-only',
          tile__item__alignment: 'left',
          tile__item__bg_image: 'true',
          ...imageData.responsive_images['1x1'],
          tile__item__animation: 'false',
        })}
        ${tileItemTwig({
          tile__item__heading: tileItemData.tile__item__heading,
          tile__item__presentation_style: 'icon',
          tile__item__alignment: 'right',
          tile__item__bg_image: 'false',
          tile__item__animation: 'false',
        })}
      </ul>
    </div>
  </div>
`;
