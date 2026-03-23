// Twig templates
import pageTitleTwig from './yds-page-title.twig';
import dateTimeTwig from '../../01-atoms/date-time/yds-date-time.twig';

// Data files
import socialLinksData from '../social-links/social-links.yml';
import componentProps from './page-title-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';
import './page-title';

const defaultMeta = `<span>By Charlyn Paradis</span>${dateTimeTwig({
  date_time__start: '2022-01-25',
  date_time__format: 'date',
})}`;

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Page Title',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    meta: defaultMeta,
  },
};

export const PageTitle = ({ meta, prefix, socialLinks }) =>
  pageTitleTwig({
    page_title__heading: 'Davis Team Project Wins Award for Research',
    page_title__meta: meta,
    page_title__prefix: prefix,
    page_title__show_social_media_sharing_links: socialLinks ? 'true' : 'false',
    ...socialLinksData,
  });
