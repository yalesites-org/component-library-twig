import pageTitleTwig from './yds-page-title.twig';
import dateTimeTwig from '../../01-atoms/date-time/yds-date-time.twig';

import socialLinksData from '../social-links/social-links.yml';
import './page-title';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Page Title/Visreg',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
    prefix: {
      name: 'Page Title Prefix',
      type: 'string',
    },
    socialLinks: {
      name: 'Social Links',
      type: 'boolean',
    },
  },
  args: {
    sectionTheme: 'default',
    prefix: '',
    socialLinks: false,
  },
};

export const Visreg = ({ sectionTheme, prefix, socialLinks }) => {
  const meta = `<span>By Charlyn Paradis</span>${dateTimeTwig({
    date_time__start: '2022-01-25',
    date_time__format: 'date',
  })}`;

  // Render function for page title variations
  const renderPageTitle = (theme) => `
    <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${pageTitleTwig({
            page_title__heading: 'Davis Team Project Wins Award for Research',
            page_title__meta: meta,
            page_title__prefix: prefix,
            page_title__show_social_links: socialLinks ? 'true' : 'false',
            ...socialLinksData,
          })}
        </div>
      </div>
    </div>
  `;

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different page title configurations.',
    )}

    ${renderPageTitle(sectionTheme)}

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 0.95rem;">
        The variations below test all configurations for visual regression testing with Percy.
      </p>
    </div>

    ${createThemeVariations(
      renderPageTitle,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
