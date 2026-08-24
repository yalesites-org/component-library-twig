import readTimeTwig from './yds-read-time.twig';

import './yds-read-time';

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

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Atoms/Read Time/Visreg',
  parameters: { controls: { disable: true } },
};

const renderGlobalTheme = () => {
  const sampleContent = `
    <p>A bulldozer sees a beast as an unstripped scene. Extending this logic, a childing beat without transports is truly a couch of unmaimed lutes. A tornado is an erstwhile creditor. This is not to discredit the idea that a cowbell of the lotion is assumed to be a hoven odometer.</p>
    <p>fears show us how watches can be polishes. A pakistan is a hydrous change. A license of the minister is assumed to be a nubile edge.</p>
    <p>Some queenly mouths are thought of simply as approvals. We know that few can name a diploid puppy that isn't a frothy bacon. A structure is a michael from the right perspective. Whips are blowhard faucets.</p>
    <p>Extending this logic, authors often misinterpret the pimple as a plushest bench, when in actuality it feels more like a fateful star. As far as we can estimate, the first berried mice is, in its own way, a daffodil. What we don't know for sure is whether or not a stove of the card is assumed to be a strigose country. We know that a nimble jail without zoos is truly a support of tonguelike silks. A twist can hardly be considered a thorny intestine without also being a salesman.</p>
  `;

  // Render function for read time variations
  const renderReadTime = (theme, idSuffix = '') =>
    createSectionWrapper(
      theme,
      `<div id="main-content${idSuffix}">${sampleContent}${readTimeTwig()}</div>`,
    );

  return createThemeVariations(
    (theme) => renderReadTime(theme, `-${theme}`),
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
