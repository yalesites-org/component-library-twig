import statTwig from './yds-stat.twig';

import statData from './stat.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Stat',
  argTypes: {
    stat: {
      name: 'Stat',
      type: 'string',
      defaultValue: statData.stat__stat,
    },
    content: {
      name: 'Content',
      type: 'string',
      defaultValue: statData.stat__content,
    },
    presentationStyle: {
      name: 'Presentation Style',
      options: ['basic', 'with-icon', 'icon-only'],
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
      options: ['left', 'center'],
      type: 'select',
      defaultValue: 'left',
    },
    themeColor: {
      name: 'Component Theme (dial)',
      options: ['one', 'two', 'three'],
      type: 'select',
      defaultValue: 'one',
    },
  },
};

export const Stat = ({
  stat,
  content,
  presentationStyle,
  fontStyle,
  alignment,
  themeColor,
}) => `
  ${statTwig({
    stat__stat: statData.stat__stat,
    stat__content: statData.stat__content,
    stat__presentation_style: 'basic',
    stat__alignment: 'center',
  })}
  ${statTwig({
    stat__stat: statData.stat__stat,
    stat__presentation_style: 'with-icon',
    stat__alignment: 'left',
  })}
  ${statTwig({
    stat__stat: statData.stat__stat,
    stat__content: statData.stat__content,
    stat__presentation_style: 'no-icon',
    stat__alignment: 'center',
  })}
  <div>
    <h2>Playground</h2>
    <p>Use the StoryBook controls to see the stat below implement the available variations.</p>
    ${statTwig({
      stat__stat: stat,
      stat__content: content,
      stat__presentation_style: presentationStyle,
      stat__font_style: fontStyle,
      stat__alignment: alignment,
      stat__theme: themeColor,
    })}
  </div>
`;
