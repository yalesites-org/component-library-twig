import videoBackgroundTwig from './yds-video-background.twig';

import videoBackgroundData from './video-background.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Video Background' };

export const videoBackground = () => videoBackgroundTwig(videoBackgroundData);
