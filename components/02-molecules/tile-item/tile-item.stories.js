import tileItemTwig from './yds-tile-item.twig';

import tileItemData from './tile-item.yml';

import imageData from '../../01-atoms/images/image/image.yml';
import componentProps from './tile-item-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

export default {
  title: 'Molecules/Tile Item',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    content: tileItemData.tile__item__content,
    heading: tileItemData.tile__item__heading,
    contentLink: 'https://www.yale.edu',
  },
};

export const TileItem = ({
  content,
  heading,
  contentLink,
  presentationStyle,
  alignment,
  verticalAlignment,
  themeColor,
  image,
  withAnimation,
  iconName,
}) => `
  <div class="tiles" data-component-grid-count='three' data-component-width="site">
    <div class='tiles__inner'>
      <ul class='tiles__wrap'>
        ${tileItemTwig({
          tile__item__heading: heading,
          tile__item__content: content,
          tile__item__content_link: contentLink,
          tile__item__presentation_style: presentationStyle,
          tile__item__alignment: alignment,
          tile__item__vertical_alignment: verticalAlignment,
          tile__item__theme: themeColor,
          tile__item__bg_image: image ? 'true' : 'false',
          ...imageData.responsive_images['1x1'],
          tile__item__animation: withAnimation ? 'true' : 'false',
          tile__item__icon_name: iconName,
        })}
      </ul>
    </div>
  </div>
`;
