import statsItemTwig from './yds-stats-item.twig';

import statsItemData from './stats-item.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Stats Item',
  argTypes: {
    number: {
      name: 'Number',
      type: 'string',
      defaultValue: statsItemData.stats__item__number,
    },
    content: {
      name: 'Content',
      type: 'string',
      defaultValue: statsItemData.stats__item__content,
    },
    presentationStyle: {
      name: 'Presentation Style',
      options: ['basic', 'icon-only'],
      type: 'select',
      defaultValue: 'basic',
    },
    alignment: {
      name: 'Alignment',
      options: ['left', 'right'],
      type: 'select',
      defaultValue: 'left',
    },
    themeColor: {
      name: 'Component Theme (dial)',
      options: ['one', 'two', 'three'],
      type: 'select',
      defaultValue: 'one',
    },
    statsItemIcon: {
      name: 'Stats Item Icon',
      type: 'boolean',
      defaultValue: false,
    },
  },
};

export const StatsItem = ({
  number,
  content,
  presentationStyle,
  themeColor,
  statsItemIcon,
  alignment,
}) => `

  <ul class='stats__item__group__wrap' data-stats-item-collection-type='single'>
    ${statsItemTwig({
      stats__item__number: statsItemData.stats__item__number,
      stats__item__content: statsItemData.stats__item__content,
      stats__item__presentation_style: 'basic',
      stats__item__has_icon: 'false',
      stats__item__alignment: 'left',
    })}
    ${statsItemTwig({
      stats__item__number: statsItemData.stats__item__number,
      stats__item__presentation_style: 'basic',
      stats__item__has_icon: 'true',
      stats__item__alignment: 'right',
    })}
    ${statsItemTwig({
      stats__item__number: statsItemData.stats__item__number,
      stats__item__content: statsItemData.stats__item__content,
      stats__item__presentation_style: 'basic',
      stats__item__has_icon: 'false',
      stats__item__alignment: 'left',
    })}
  </ul>
  <div class="wrap-for-global-theme" data-global-theme="one">
  <h2>Playground</h2>
    <p>Use the StoryBook controls to see the stats item below implement the available variations.</p>
    <ul class='stats__group__wrap' data-stats-item-collection-type='single'>
      ${statsItemTwig({
        stats__item__number: number,
        stats__item__content: content,
        stats__item__alignment: alignment,
        stats__item__presentation_style: presentationStyle,
        stats__item__theme: themeColor,
        stats__item__has_icon: statsItemIcon ? 'true' : 'false',
      })}
    </ul>
  </div>
`;
