// Twig templates.
import mediaGridTwig from './media-grid/yds-media-grid.twig';

// Data files.
import mediaGridData from './media-grid/media-grid.yml';
import imageData from '../../01-atoms/images/image/image.yml';

// JS.
import './media-grid/yds-media-grid-interactive';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Galleries',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    gridHeading: {
      name: 'Gallery heading',
      type: 'string',
      defaultValue: mediaGridData.media_grid__heading,
    },
    items: {
      name: 'Number of images',
      type: 'number',
      defaultValue: 11,
    },
  },
};

export const ImageGrid = ({ items, gridHeading }) => {
  const Items = [];
  for (let i = 0; i < items; i += 1) {
    Items.push(i);
  }

  return mediaGridTwig({
    media_grid__heading: gridHeading,
    media_grid__items: Items,
    ...imageData.responsive_images['3x2'],
  });
};

export const InteractiveGrid = ({ items, gridHeading }) => {
  const Items = [];
  for (let i = 0; i < items; i += 1) {
    Items.push(i);
  }

  return mediaGridTwig({
    ...mediaGridData,
    media_grid__variation: 'interactive',
    media_grid__heading: gridHeading,
    media_grid__items: Items,
    ...imageData.responsive_images['3x2'],
  });
};
