import videoBackgroundTwig from './yds-video-background.twig';

import videoBackgroundData from './video-background.yml';

import './yds-video-background';

import componentProps from './video-background-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Atoms/Videos/Video Background',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

export const Interactive = ({ sectionTheme }) => `
  <div class="yds-layout" data-component-theme="${sectionTheme}" data-component-width="site">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        ${videoBackgroundTwig(videoBackgroundData)}
      </div>
    </div>
  </div>
`;

export const videoBackground = () => videoBackgroundTwig(videoBackgroundData);
