import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import pageTitleTwig from './yds-page-title.twig';
import dateTimeTwig from '../../01-atoms/date-time/yds-date-time.twig';

import socialLinksData from '../social-links/social-links.yml';
import './page-title';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Page Title/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
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
    sectionTheme: 'one',
    prefix: '',
    socialLinks: false,
  },
};

export const Playground = ({ sectionTheme, prefix, socialLinks }) => {
  const themes = colorPairingsData;
  const meta = `<span>By Charlyn Paradis</span>${dateTimeTwig({
    date_time__start: '2022-01-25',
    date_time__format: 'date',
  })}`;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different page title configurations.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
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

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
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
    </div>
  `,
    )
    .join('')}
  `;
};
