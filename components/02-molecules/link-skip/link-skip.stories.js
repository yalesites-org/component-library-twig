import linkSkipTwig from './yds-link-skip.twig';

import linkSkipData from './link-skip.yml';
import componentProps from './link-skip-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Atoms/Link Skip',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    content: linkSkipData.link_skip__content,
    url: linkSkipData.link_skip__url,
  },
};

export const LinkSkip = ({ content, url, baseClass, extraClass }) =>
  linkSkipTwig({
    link_skip__content: content,
    link_skip__url: url,
    link_skip__base_class: baseClass,
    link_skip__extra_class: extraClass,
  });
