import video from './video.twig';

import videoData from './video.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Videos' };

export const wide = () => video(videoData);
