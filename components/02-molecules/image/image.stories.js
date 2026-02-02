import contentImageTwig from './yds-content-image.twig';

import imageData from '../../01-atoms/images/image/image.yml';

export default {
  title: 'Molecules/Image',
  tags: ['!dev'],
  args: {},
};

export const ContentImage = () => `
  ${contentImageTwig({
    ...imageData.responsive_images['16x9'],
    content_image__caption:
      'This is the <a href="#">caption</a> for the 16:9 image above.',
    content_image__width: 'content',
  })}
`;

ContentImage.args = {};
