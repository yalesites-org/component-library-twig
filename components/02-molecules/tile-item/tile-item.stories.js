import tileItemTwig from './yds-tile-item.twig';
import tileItemData from './tile-item.yml';

import './yds-tile-item';

// Image atom component - generic images for demo
import imageData from '../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Tile Item',
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
      name: 'Component Theme (dial)',
      options: ['one', 'two', 'three', 'four', 'five'],
      type: 'select',
    },
    image: {
      name: 'With image',
      type: 'boolean',
    },
    withAnimation: {
      name: 'With Animation',
      type: 'boolean',
    },
  },
  args: {
    number: tileItemData.tile__item__number,
    content: tileItemData.tile__item__content,
    contentLink: 'https://www.yale.edu',
    presentationStyle: 'number',
    alignment: 'left',
    verticalAlignment: 'top',
    themeColor: 'one',
    image: true,
    withAnimation: false,
  },
};

export const TileItem = ({
  heading,
  content,
  contentLink,
  presentationStyle,
  themeColor,
  alignment,
  verticalAlignment,
  image,
  withAnimation,
}) => `
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
          tile__item__animation: withAnimation ? 'true' : 'false',
        })}
        ${tileItemTwig({
          tile__item__heading: tileItemData.tile__item__heading,
          tile__item__presentation_style: 'icon',
          tile__item__alignment: 'right',
          tile__item__bg_image: 'false',
          tile__item__animation: withAnimation ? 'true' : 'false',
        })}
        ${tileItemTwig({
          tile__item__heading: tileItemData.tile__item__heading,
          tile__item__content: tileItemData.tile__item__content,
          tile__item__content_link: 'https://www.yale.edu',
          tile__item__vertical_alignment: 'bottom',
          tile__item__presentation_style: 'heading',
          tile__item__alignment: 'left',
          tile__item__bg_image: 'true',
          ...imageData.responsive_images['1x1'],
          tile__item__animation: withAnimation ? 'true' : 'false',
        })}
      </ul>
    </div>
  </div>
  <div class="wrap-for-global-theme" data-global-theme="one">
  <h2>Playground</h2>
    <p>Use the StoryBook controls to see the tile item below implement the available variations.</p>

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
          })}
        </ul>
      </div>
    </div>
  </div>
`;

export const ClickableTileExamples = () => `
  <div class="wrap-for-global-theme" data-global-theme="one">
    <h2>Clickable Tile Examples (YSP-1009)</h2>
    <p>These examples demonstrate accessible clickable tile functionality across all presentation styles.</p>

    <h3>Heading Presentation Style</h3>
    <div class="tiles" data-component-grid-count='four' data-component-width="site">
      <div class='tiles__inner'>
        <ul class='tiles__wrap'>
          ${tileItemTwig({
            tile__item__heading: 'Heading + Content + Link',
            tile__item__content: 'Additional content text',
            tile__item__content_link: 'https://www.yale.edu',
            tile__item__presentation_style: 'heading',
            tile__item__theme: 'one',
          })}
          ${tileItemTwig({
            tile__item__heading: 'Heading + Link (no content)',
            tile__item__content_link: 'https://www.yale.edu',
            tile__item__presentation_style: 'heading',
            tile__item__theme: 'two',
          })}
          ${tileItemTwig({
            tile__item__heading: 'Heading Only (no link)',
            tile__item__content: 'Content without a link',
            tile__item__presentation_style: 'heading',
            tile__item__theme: 'three',
          })}
        </ul>
      </div>
    </div>

    <h3>Text-Only Presentation Style</h3>
    <div class="tiles" data-component-grid-count='four' data-component-width="site">
      <div class='tiles__inner'>
        <ul class='tiles__wrap'>
          ${tileItemTwig({
            tile__item__heading: 'Heading renders as link',
            tile__item__content: 'Content text here',
            tile__item__content_link: 'https://www.yale.edu',
            tile__item__presentation_style: 'text-only',
            tile__item__theme: 'one',
          })}
          ${tileItemTwig({
            tile__item__content: 'Content only with link',
            tile__item__content_link: 'https://www.yale.edu',
            tile__item__presentation_style: 'text-only',
            tile__item__theme: 'two',
          })}
          ${tileItemTwig({
            tile__item__content_link: 'https://www.yale.edu',
            tile__item__presentation_style: 'text-only',
            tile__item__theme: 'three',
          })}
        </ul>
      </div>
    </div>

    <h3>Icon Presentation Style</h3>
    <div class="tiles" data-component-grid-count='four' data-component-width="site">
      <div class='tiles__inner'>
        <ul class='tiles__wrap'>
          ${tileItemTwig({
            tile__item__heading: 'Icon + Heading + Link',
            tile__item__content: 'Content text',
            tile__item__content_link: 'https://www.yale.edu',
            tile__item__presentation_style: 'icon',
            tile__item__icon_name: 'graduation-cap-solid',
            tile__item__theme: 'one',
          })}
          ${tileItemTwig({
            tile__item__heading: 'Icon Label',
            tile__item__content_link: 'https://www.yale.edu',
            tile__item__presentation_style: 'icon',
            tile__item__icon_name: 'book-solid',
            tile__item__theme: 'two',
          })}
          ${tileItemTwig({
            tile__item__content_link: 'https://www.yale.edu',
            tile__item__presentation_style: 'icon',
            tile__item__icon_name: 'flask-solid',
            tile__item__theme: 'three',
          })}
          ${tileItemTwig({
            tile__item__heading: 'Icon No Link',
            tile__item__content: 'No URL provided',
            tile__item__presentation_style: 'icon',
            tile__item__icon_name: 'building-columns-solid',
            tile__item__theme: 'four',
          })}
        </ul>
      </div>
    </div>

    <h3>Edge Cases</h3>
    <div class="tiles" data-component-grid-count='four' data-component-width="site">
      <div class='tiles__inner'>
        <ul class='tiles__wrap'>
          ${tileItemTwig({
            tile__item__content_link: 'https://www.yale.edu',
            tile__item__link_text: 'Custom Link Text',
            tile__item__theme: 'one',
          })}
          ${tileItemTwig({
            tile__item__heading: 'Empty tile',
            tile__item__theme: 'two',
          })}
        </ul>
      </div>
    </div>
  </div>
`;
