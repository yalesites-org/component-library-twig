import tileItemTwig from './yds-tile-item.twig';

import tileItemData from './tile-item.yml';

import imageData from '../../01-atoms/images/image/image.yml';

import {
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
  createSectionWrapper,
  createVariations,
} from '../../_storybook/playground-utils';
import { hasIcon } from '../../_storybook/icon-utils';

export default {
  title: 'Molecules/Tile Item/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const heading = tileItemData.tile__item__heading;
  const content = tileItemData.tile__item__content;
  const contentLink = 'https://www.yale.edu';
  const presentationStyles = ['heading', 'icon', 'text-only'];
  const alignment = 'left';
  const verticalAlignment = 'top';
  const image = true;
  const withAnimation = false;
  const iconName = 'sack-dollar-solid';

  const hasIconSelected = hasIcon(iconName);

  const renderTileItem = (dialTheme, presentationStyle = 'heading') => `
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
            tile__item__theme: dialTheme,
            tile__item__bg_image: image ? 'true' : 'false',
            ...imageData.responsive_images['1x1'],
            tile__item__animation: withAnimation ? 'true' : 'false',
            tile__item__icon_name:
              presentationStyle === 'icon' || hasIconSelected ? iconName : null,
          })}
        </ul>
      </div>
    </div>
  `;

  return createGlobalThemeVariations(
    () => `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderTileItem('one'), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper('one', renderTileItem(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Tile Item Theme Variations',
        '',
        'Tile Item Theme',
      )}
      ${createVariations(
        (presentationStyle) =>
          createSectionWrapper(
            'one',
            renderTileItem('one', presentationStyle),
            {
              width: 'site',
              primaryWidth: '100%',
            },
          ),
        presentationStyles,
        'All Presentation Style Variations',
        '',
        'Presentation Style',
      )}
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
