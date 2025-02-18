import audioEmbedTwig from './yds-audio.twig';

import audioEmbedData from './audio.yml';

import './yds-audio-player';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Audio' };

export const audioEmbed = () => audioEmbedTwig(audioEmbedData);
