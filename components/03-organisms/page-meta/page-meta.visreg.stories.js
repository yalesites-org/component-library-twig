import breadcrumbsTwig from '../menu/breadcrumbs/yds-breadcrumbs.twig';
import breadcrumbsData from '../menu/breadcrumbs/breadcrumbs.yml';
import siteSectionTwig from '../site-in-this-section/yds-site-in-this-section.twig';
import secondaryNavData from '../menu/secondary-nav/secondary-nav.yml';
import pageTitleTwig from '../../02-molecules/page-title/yds-page-title.twig';

import '../menu/breadcrumbs/yds-breadcrumbs';
import '../menu/secondary-nav/yds-secondary-nav';
import '../../02-molecules/menu/menu-in-this-section-toggle/yds-menu-in-this-section-toggle';
import '../site-in-this-section/yds-site-in-this-section';
import '../site-in-this-section/cl-site-in-this-section.scss';
import '../../02-molecules/page-title/page-title';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import { createThemeVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 *
 * The Page Meta section as Drupal renders it: breadcrumbs, the In This Section
 * book navigation, then the page title, inside one themed section
 * (YaleSites-Internal#1837).
 */
export default {
  tags: ['visreg'],
  title: 'Organisms/Page Meta/Visreg',
  parameters: {
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  // Mirrors Drupal's layout--page-meta.html.twig output. The themed vertical
  // padding lives in Drupal (ys_layouts onecol.css), not in the component
  // library, so spacing here is not identical to the live page.
  const renderPageMeta = (theme) => {
    const content = `<div class="layout__region layout__region--content">
      ${breadcrumbsTwig({ ...breadcrumbsData })}
      ${siteSectionTwig({
        site_section_wrap__theme: 'one',
        secondary_nav__items: secondaryNavData.items,
      })}
      ${pageTitleTwig({
        page_title__heading: 'Davis Team Project Wins Award for Research',
      })}
    </div>`;

    const themed =
      theme === 'default'
        ? ''
        : ` yds-layout" data-section-theme="${theme}" data-component-layout="one-column" data-component-padding="default`;

    return `<div class="layout layout--onecol page-meta${themed}">${content}</div>`;
  };

  return createThemeVariations(
    renderPageMeta,
    sectionThemes,
    'All Section Theme Variations',
    'Below are all section theme variations for visual regression testing.',
    'Section Theme',
  );
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
