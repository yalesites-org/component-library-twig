import tokens from '@yalesites-org/tokens/build/json/tokens.json';
// get global themes as `label` : `key` values to pass into options as array.
import getGlobalThemes from '../../00-tokens/colors/color-global-themes';

// stats twig
import statsTwig from './yds-stats.twig';

// Stat default data
import statsData from './stats.yml';

// Image atom component - generic images for demo
import imageData from '../../01-atoms/images/image/image.yml';

// Get global theme options
const siteGlobalThemeOptions = getGlobalThemes(tokens['global-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Stats',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    globalTheme: {
      name: 'Global Theme (lever)',
      options: siteGlobalThemeOptions,
      type: 'select',
      defaultValue: 'one',
    },
    themeColor: {
      name: 'Component Theme (dial)',
      options: ['one', 'two', 'three'],
      type: 'select',
      defaultValue: 'one',
    },
    statsIcons: {
      name: 'Stats Icons',
      type: 'boolean',
      defaultValue: false,
    },
    presentationStyle: {
      name: 'Presentation Style',
      options: ['basic', 'icon-only'],
      type: 'select',
      defaultValue: 'basic',
    },
    fontStyle: {
      name: 'Font Style',
      options: ['normal', 'numeric-oldstyle'],
      type: 'select',
      defaultValue: 'normal',
    },
    alignment: {
      name: 'Alignment',
      options: ['left', 'right'],
      type: 'select',
      defaultValue: 'left',
    },
  },
};

export const Stats = ({
  statsIcons,
  globalTheme,
  presentationStyle,
  alignment,
  themeColor,
  image,
}) => {
  return `
    <div class="wrap-for-global-theme" data-global-theme="${globalTheme}">
      ${statsTwig({
        site_global__theme: globalTheme,
        stats__has_icon: statsIcons ? 'true' : 'false',
        stats__alignment: alignment,
        stats__presentation_style: presentationStyle,
        stats__theme: themeColor,
        stats__bg_image: image,
        ...statsData,
        ...imageData.responsive_images['16x9'],
      })}
    </div>
    `;
};
