import './yds-calendar';
import calendarTwig from './yds-calendar.twig';
import monthData from './calendar.yml';
import {
  sectionThemes,
  globalThemeLabels,
  globalThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeSectionStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 *
 * This component splits on section theme as well as global theme: both event
 * states stacked across every section theme measured 1,200 x 21,621 =
 * 25,945,200px, past the snapshot ceiling. One section theme per story is
 * roughly a seventh of that. See `global-theme-stories.mjs`.
 */
export default {
  tags: ['visreg'],
  title: 'Organisms/Calendar/Visreg',
  parameters: {
    controls: { disable: true },
  },
};

const renderCalendarVariations = () =>
  createVariations(
    (hasEvents) =>
      calendarTwig({
        month: hasEvents
          ? monthData
          : monthData.map((week) =>
              week.map((day) => ({
                ...day,
                events: [],
              })),
            ),
      }),
    [true, false],
    'All Calendar Variations',
    '',
    'Event State',
    (hasEvents) =>
      hasEvents ? 'Calendar with Events' : 'Calendar without Events',
  );

const renderSection = (sectionTheme) =>
  createSectionWrapper(sectionTheme, renderCalendarVariations(), {
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
