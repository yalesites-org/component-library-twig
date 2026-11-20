import wrappedCalloutTwig from './yds-wrapped-callout.twig';
import textFieldTwig from '../text/yds-text-field.twig';
import wrappedCalloutData from './wrapped-callout.yml';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeSectionStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Wrapped Callout/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const alignments = ['left', 'right'];

const renderWrappedCallout = (dialTheme, alignment = 'left') => `
  ${textFieldTwig({
    text_field__content: wrappedCalloutData.text_one,
    text_field__width: 'site',
    text_field__alignment: 'left',
  })}
  ${wrappedCalloutTwig({
    wrapped_callout__alignment: alignment,
    wrapped_callout__content: wrappedCalloutData.text_two,
    wrapped_callout__callout: wrappedCalloutData.text_three,
    wrapped_callout__theme: dialTheme,
  })}
`;

// Every Wrapped Callout theme and alignment, inside one section theme. The
// callout sets its own theme, so the section theme it sits in changes its
// colors; the section sweep is therefore split across stories, because all of
// it in one snapshot is well over the 25,000,000px ceiling.
const renderSectionVariations = () => `
  ${createVariations(
    (dialTheme) => renderWrappedCallout(dialTheme),
    componentThemes,
    'All Wrapped Callout Theme Variations',
    '',
    'Wrapped Callout Theme',
  )}
  ${createVariations(
    (alignment) => renderWrappedCallout('one', alignment),
    alignments,
    'All Alignment Variations',
    '',
    'Alignment',
  )}
`;

const renderSection = (sectionTheme) =>
  createSectionWrapper(sectionTheme, renderSectionVariations(), {
    width: 'site',
    primaryWidth: '100%',
  });

const themeStories = createGlobalThemeSectionStories(
  renderSection,
  globalThemes,
  sectionThemes,
  globalThemeLabels,
);

export const OldBluesSectionDefault = themeStories.one.default;
export const OldBluesSectionOne = themeStories.one.one;
export const OldBluesSectionTwo = themeStories.one.two;
export const OldBluesSectionThree = themeStories.one.three;
export const OldBluesSectionFour = themeStories.one.four;
export const OldBluesSectionFive = themeStories.one.five;
export const OldBluesSectionSix = themeStories.one.six;

export const NewHavenGreenSectionDefault = themeStories.two.default;
export const NewHavenGreenSectionOne = themeStories.two.one;
export const NewHavenGreenSectionTwo = themeStories.two.two;
export const NewHavenGreenSectionThree = themeStories.two.three;
export const NewHavenGreenSectionFour = themeStories.two.four;
export const NewHavenGreenSectionFive = themeStories.two.five;
export const NewHavenGreenSectionSix = themeStories.two.six;

export const ShorelineSummerSectionDefault = themeStories.three.default;
export const ShorelineSummerSectionOne = themeStories.three.one;
export const ShorelineSummerSectionTwo = themeStories.three.two;
export const ShorelineSummerSectionThree = themeStories.three.three;
export const ShorelineSummerSectionFour = themeStories.three.four;
export const ShorelineSummerSectionFive = themeStories.three.five;
export const ShorelineSummerSectionSix = themeStories.three.six;

export const OnhaSectionDefault = themeStories.four.default;
export const OnhaSectionOne = themeStories.four.one;
export const OnhaSectionTwo = themeStories.four.two;
export const OnhaSectionThree = themeStories.four.three;
export const OnhaSectionFour = themeStories.four.four;
export const OnhaSectionFive = themeStories.four.five;
export const OnhaSectionSix = themeStories.four.six;

export const ItsYourYaleSectionDefault = themeStories.five.default;
export const ItsYourYaleSectionOne = themeStories.five.one;
export const ItsYourYaleSectionTwo = themeStories.five.two;
export const ItsYourYaleSectionThree = themeStories.five.three;
export const ItsYourYaleSectionFour = themeStories.five.four;
export const ItsYourYaleSectionFive = themeStories.five.five;
export const ItsYourYaleSectionSix = themeStories.five.six;

export const AISectionDefault = themeStories.six.default;
export const AISectionOne = themeStories.six.one;
export const AISectionTwo = themeStories.six.two;
export const AISectionThree = themeStories.six.three;
export const AISectionFour = themeStories.six.four;
export const AISectionFive = themeStories.six.five;
export const AISectionSix = themeStories.six.six;

export const WhitneyHumanitiesCenterSectionDefault = themeStories.seven.default;
export const WhitneyHumanitiesCenterSectionOne = themeStories.seven.one;
export const WhitneyHumanitiesCenterSectionTwo = themeStories.seven.two;
export const WhitneyHumanitiesCenterSectionThree = themeStories.seven.three;
export const WhitneyHumanitiesCenterSectionFour = themeStories.seven.four;
export const WhitneyHumanitiesCenterSectionFive = themeStories.seven.five;
export const WhitneyHumanitiesCenterSectionSix = themeStories.seven.six;

ItsYourYaleSectionDefault.storyName = 'It’s Your Yale Section Default';
ItsYourYaleSectionOne.storyName = 'It’s Your Yale Section One';
ItsYourYaleSectionTwo.storyName = 'It’s Your Yale Section Two';
ItsYourYaleSectionThree.storyName = 'It’s Your Yale Section Three';
ItsYourYaleSectionFour.storyName = 'It’s Your Yale Section Four';
ItsYourYaleSectionFive.storyName = 'It’s Your Yale Section Five';
ItsYourYaleSectionSix.storyName = 'It’s Your Yale Section Six';
