import officeHoursTwig from './yds-office-hours.twig';
import data from './office-hours.yml';

import './yds-office-hours';

import {
  globalThemeLabels,
  globalThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createThemeVariations,
  createSectionWrapper,
} from '../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Molecules/Office Hours/Visreg',
  parameters: {
    controls: { disable: true },
  },
};

/**
 * Shows the status line with a fixed value instead of the current time.
 *
 * The fixture rows carry no `weekday`, so the behavior finds no hours to
 * compute from and leaves this status alone. That keeps the snapshot the same
 * whenever it runs.
 *
 * @param {string} html - Rendered office hours markup.
 * @param {boolean} open - Whether to show Open now or Closed now.
 * @param {string} detail - The text after the pill.
 *
 * @return {string} The markup with the status filled in and shown.
 */
const withStatus = (html, open, detail) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  const status = template.content.querySelector('.office-hours__status');
  status.hidden = false;
  status.setAttribute('data-state', open ? 'open' : 'closed');
  status.querySelector('.office-hours__pill-label').textContent = open
    ? 'Open now'
    : 'Closed now';
  status.querySelector('.office-hours__status-detail').textContent = detail;
  return template.innerHTML;
};

const renderOfficeHours = (props, width = 760) =>
  `<div style="max-width: ${width}px">${officeHoursTwig({
    ...data,
    ...props,
  })}</div>`;

const renderGlobalTheme = () => {
  const fullWeek = (theme, width) =>
    withStatus(
      renderOfficeHours({ office_hours__theme: theme }, width),
      true,
      'Closes at 5 p.m.',
    );

  return `
    ${createThemeVariations(
      (variation) =>
        createSectionWrapper(
          'default',
          variation === 'narrow'
            ? withStatus(
                renderOfficeHours({}, 305),
                false,
                'Opens tomorrow at 9:30 a.m.',
              )
            : fullWeek('default'),
        ),
      ['full week', 'narrow'],
      'Layouts',
      'Narrow is 305px wide: under 340px each row stacks.',
      'Layout',
    )}
    ${createThemeVariations(
      (theme) => createSectionWrapper('default', fullWeek(theme)),
      ['default', ...componentThemes],
      'All Office Hours Theme Variations',
      '',
      'Office Hours Theme',
    )}
    ${createThemeVariations(
      () =>
        createSectionWrapper(
          'default',
          renderOfficeHours({
            office_hours__days: [],
            office_hours__upcoming: [],
            office_hours__empty_message: 'Hours: no days filled in yet.',
          }),
        ),
      ['layout builder'],
      'Empty',
      'No days entered. The public page renders nothing; Layout Builder shows this placeholder.',
      'Context',
    )}
  `;
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
