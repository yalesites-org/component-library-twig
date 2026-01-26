import tileItemTwig from './yds-tile-item.twig';

import tileItemData from './tile-item.yml';

import imageData from '../../01-atoms/images/image/image.yml';
import factsAndFiguresIconsData from '../facts-and-figures/facts-and-figures-icons.yml';

import {
  componentThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';
import { createIconMapping, hasIcon } from '../../_storybook/icon-utils';

const iconDisplayToValueMap = createIconMapping(factsAndFiguresIconsData);

export default {
  title: 'Molecules/Tile Item/Playground',
  argTypes: {
    heading: {
      name: 'Number',
      type: 'string',
    },
    content: {
      name: 'Content',
      type: 'string',
    },
    contentLink: {
      name: 'Content Link',
      type: 'string',
    },
    presentationStyle: {
      name: 'Presentation Style',
      options: ['heading', 'icon', 'text-only'],
      type: 'select',
    },
    alignment: {
      name: 'Alignment',
      options: ['left', 'center', 'right'],
      type: 'select',
    },
    verticalAlignment: {
      name: 'Vertical Alignment',
      options: ['top', 'bottom'],
      type: 'select',
    },
    themeColor: {
      name: 'Tile Item Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      options: componentThemes,
      type: 'select',
    },
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
    image: {
      name: 'With image',
      type: 'boolean',
    },
    withAnimation: {
      name: 'With Animation',
      type: 'boolean',
    },
    iconName: {
      name: 'Icon Selection',
      options: iconDisplayToValueMap,
      type: 'select',
    },
  },
  args: {
    heading: tileItemData.tile__item__heading,
    content: tileItemData.tile__item__content,
    contentLink: 'https://www.yale.edu',
    presentationStyle: 'heading',
    alignment: 'left',
    verticalAlignment: 'top',
    themeColor: 'one',
    sectionTheme: 'default',
    image: true,
    withAnimation: false,
    iconName: 'sack-dollar-solid',
  },
};

export const Playground = ({
  heading,
  content,
  contentLink,
  presentationStyle,
  themeColor,
  alignment,
  verticalAlignment,
  image,
  withAnimation,
  iconName,
  sectionTheme,
}) => {
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
    ${createPlaygroundIntro(
      'Use the Storybook controls to see the tile item implement the available variations.',
    )}

    ${renderTileItem(sectionTheme)}

    ${createThemeVariations(
      renderTileItem,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
