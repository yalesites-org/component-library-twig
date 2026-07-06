import pageTitleTwig from './yds-page-title.twig';
import dateTimeTwig from '../../01-atoms/date-time/yds-date-time.twig';

import socialLinksData from '../social-links/social-links.yml';
import './page-title';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Page Title/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const prefix = '';
  const socialLinks = false;

  const meta = `<span>By Charlyn Paradis</span>${dateTimeTwig({
    date_time__start: '2022-01-25',
    date_time__format: 'date',
  })}`;

  // Render function for page title variations
  const renderPageTitle = (theme) =>
    createSectionWrapper(
      theme,
      pageTitleTwig({
        page_title__heading: 'Davis Team Project Wins Award for Research',
        page_title__meta: meta,
        page_title__prefix: prefix,
        page_title__show_social_links: socialLinks ? 'true' : 'false',
        ...socialLinksData,
      }),
    );

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderPageTitle,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
