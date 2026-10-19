// Twig templates
import pageTitleTwig from './yds-page-title.twig';
import pageTitlePostTwig from './_page-title--post-example.twig';
import dateTimeTwig from '../../01-atoms/date-time/yds-date-time.twig';

// Data files
import socialLinksData from '../social-links/social-links.yml';
import componentProps from './page-title-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';
import './page-title';
import '../read-time/yds-read-time';

// Matches the byline and date that ys-post-meta-block.html.twig passes as
// page_title__meta on a post.
const postMeta = `<span>Charlyn Paradis</span>${dateTimeTwig({
  date_time__start: '2022-01-25',
  date_time__format: 'date',
  date_time__format_override: 'format__day__long',
})}`;

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Page Header',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

// The page header as pages and taxonomy term pages render it: heading only.
export const Default = ({ meta, socialLinks }) =>
  pageTitleTwig({
    page_title__heading: 'About the Department',
    page_title__meta: meta,
    page_title__show_social_media_sharing_links: socialLinks ? 'true' : 'false',
    ...socialLinksData,
  });

// The page header on a post: byline, date, read time and social links at
// content width. The read-time script counts words inside #main-content, and
// the yds-storybook-cl class lets the read time show outside Drupal.
export const Post = ({ meta, socialLinks }) =>
  `<div id="main-content" class="yds-storybook-cl">${pageTitlePostTwig({
    page_title__heading: 'Davis Team Project Wins Award for Research',
    page_title__meta: meta,
    page_title__show_social_media_sharing_links: socialLinks ? 'true' : 'false',
    ...socialLinksData,
  })}</div>`;
Post.args = {
  meta: postMeta,
  socialLinks: true,
};
