import tileItemTwig from './yds-tile-item.twig';

import tileItemData from './tile-item.yml';

import imageData from '../../01-atoms/images/image/image.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';
import { hasIcon } from '../../_storybook/icon-utils';

export default {
  title: 'Molecules/Tile Item/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const heading = tileItemData.tile__item__heading;
  const content = tileItemData.tile__item__content;
  const contentLink = 'https://www.yale.edu';
  const presentationStyle = 'heading';
  const alignment = 'left';
  const verticalAlignment = 'top';
  const themeColor = 'one';
  const image = true;
  const withAnimation = false;
  const iconName = 'sack-dollar-solid';

  const hasIconSelected = hasIcon(iconName);

  // Render function for tile item variations
  const renderTileItem = (theme) => `
    <div class="wrap-for-global-theme" data-global-theme="${theme}">
      <div class="tiles" data-component-grid-count='three' data-component-width="site">
        <div class='tiles__inner'>
          <ul class='tiles__wrap' data-component-grid-count='three'>
            ${tileItemTwig({
              tile__item__heading: heading,
              tile__item__content: content,
              tile__item__content_link: contentLink,
              tile__item__alignment: alignment,
              tile__item__vertical_alignment: verticalAlignment,
              tile__item__presentation_style: presentationStyle,
              tile__item__theme: themeColor,
              tile__item__bg_image: image ? 'true' : 'false',
              ...imageData.responsive_images['1x1'],
              tile__item__animation: withAnimation ? 'true' : 'false',
              tile__item__icon_name: hasIconSelected ? iconName : null,
            })}
          </ul>
        </div>
      </div>
    </div>
  `;

  return `
    ${createThemeVariations(
      renderTileItem,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
