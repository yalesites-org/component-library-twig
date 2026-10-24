import textFieldTwig from './yds-text-field.twig';

import textData from './text-field.yml';
import actionBannerTwig from '../banner/action/yds-action-banner.twig';
import imageData from '../../01-atoms/images/image/image.yml';
import longUrlData from '../../03-organisms/card-collection/long-url.yml';

import '../../01-atoms/typography/text/yds-text';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

const LONG_URL = longUrlData.long_url;

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Atoms/Text/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

// *** VRT: Text Field with All Section Theme Variations ***
const renderGlobalTheme = () => {
  const variation = 'default';

  // Render function for text field variations
  const renderTextField = (theme) =>
    createSectionWrapper(
      theme,
      textFieldTwig({
        text_field__content: textData.text_field__content,
        text_field__variation: variation,
      }),
    );

  return createThemeVariations(
    renderTextField,
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations for visual regression testing.',
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

/**
 * Long pasted URLs in body text (YaleSites-Internal#1953), in each place the
 * platform narrows text. Every URL should wrap inside its column with the
 * icon on the line with its end, and prose should still wrap only between
 * words. The long URL is past linkpurpose's 30-character last-word limit and
 * the short one is under it, so the two reach the icon differently.
 */
const SHORT_URL = 'https://yale.edu/about-yale';
const longUrlContent = `
  <p>Watch the recording of the first meeting, <a href="${LONG_URL}">${LONG_URL}</a>, before the next session.</p>
  <p>Registration is open at <a href="${SHORT_URL}">${SHORT_URL}</a> and closes on Friday.</p>
  <p>${LONG_URL}</p>
  <p>Ordinary prose keeps wrapping between words: Yale Divinity School is a <a href="https://divinity.yale.edu">graduate professional school</a> within a world-class research university.</p>
`;

const longUrlTextField = () =>
  textFieldTwig({
    text_field__content: longUrlContent,
    text_field__variation: 'default',
  });

/**
 * The markup `yds-layout.twig` emits for a 70/30 section. Written out because
 * that template fills its primary column from a Twig block, which only an
 * extending template (like `_layout--example.twig`) can supply.
 */
const seventyThirtySection = (primary, secondary) => `
  <div class="yds-layout layout" data-component-has-divider="true"
       data-component-padding="default" data-section-theme="default"
       data-component-layout="seventy-thirty" data-component-width="site"
       data-embedded-components>
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">${primary}</div>
      <div class="yds-layout__secondary">${secondary}</div>
    </div>
  </div>
`;

export const LongUrlInBodyText = () => `
  <div class="wrap-for-screenshot">
    <h3>Text field</h3>
    ${createSectionWrapper('default', longUrlTextField())}

    <h3>Text field in a 320px column</h3>
    <div style="max-width: 320px">
      ${createSectionWrapper('default', longUrlTextField())}
    </div>

    <h3>70/30 section, text in both columns</h3>
    ${seventyThirtySection(longUrlTextField(), longUrlTextField())}

    <h3>Action banner text</h3>
    ${actionBannerTwig({
      ...imageData.responsive_images['16x9'],
      banner__heading: 'Banner with a long URL',
      banner__snippet: `<p>Watch it at <a href="${LONG_URL}">${LONG_URL}</a></p>`,
      banner__link__content: 'This is a link',
      banner__link__url: 'https://yale.edu',
      banner__link__style: 'cta',
      banner__content__layout: 'left',
      banner__content__background: 'one',
    })}
  </div>
`;

LongUrlInBodyText.storyName = 'Long URL In Body Text';
LongUrlInBodyText.parameters = { layout: 'fullscreen' };
