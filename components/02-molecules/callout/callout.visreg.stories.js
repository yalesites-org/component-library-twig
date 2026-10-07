import calloutTwig from './yds-callout.twig';

import calloutData from './callout.yml';

import imageData from '../../01-atoms/images/image/image.yml';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createThemeVariations,
  createSectionWrapper,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Callout/Visreg',
  parameters: {
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  const heading = calloutData.callout__heading;
  const text = calloutData.callout__text;
  const linkText = calloutData.callout__link__content;
  const linkType = calloutData.callout__link__type;
  const calloutAlignment = 'center';
  const overlayBackgroundImage = false;

  const renderCallout = (bgColor) =>
    calloutTwig({
      callout__background_color: bgColor,
      callout__alignment: calloutAlignment,
      callout__overlay_background_image: overlayBackgroundImage
        ? imageData.responsive_images.pattern
        : '',
      callouts: [
        {
          callout__heading: heading,
          callout__text: text,
          callout__link__content: linkText,
          callout__link__url: calloutData.callout__link__url,
          callout__link__type: linkType,
        },
      ],
    });

  return `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderCallout('one'), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper('one', renderCallout(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Callout Theme Variations',
        '',
        'Callout Theme',
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
