import readTimeTwig from './yds-read-time.twig';

import './yds-read-time';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Read Time/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
  },
  args: {
    sectionTheme: 'default',
  },
};

export const Playground = ({ sectionTheme }) => {
  const sampleContent = `
    <p>A bulldozer sees a beast as an unstripped scene. Extending this logic, a childing beat without transports is truly a couch of unmaimed lutes. A tornado is an erstwhile creditor. This is not to discredit the idea that a cowbell of the lotion is assumed to be a hoven odometer.</p>
    <p>fears show us how watches can be polishes. A pakistan is a hydrous change. A license of the minister is assumed to be a nubile edge.</p>
    <p>Some queenly mouths are thought of simply as approvals. We know that few can name a diploid puppy that isn't a frothy bacon. A structure is a michael from the right perspective. Whips are blowhard faucets.</p>
    <p>Extending this logic, authors often misinterpret the pimple as a plushest bench, when in actuality it feels more like a fateful star. As far as we can estimate, the first berried mice is, in its own way, a daffodil. What we don't know for sure is whether or not a stove of the card is assumed to be a strigose country. We know that a nimble jail without zoos is truly a support of tonguelike silks. A twist can hardly be considered a thorny intestine without also being a salesman.</p>
  `;

  // Render function for read time variations
  const renderReadTime = (theme, idSuffix = '') => `
    <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          <div id="main-content${idSuffix}">
            ${sampleContent}
            ${readTimeTwig()}
          </div>
        </div>
      </div>
    </div>
  `;

  return `
    ${createPlaygroundIntro(
      'Read time component calculates reading time based on content. Sample content shown below.',
    )}

    ${renderReadTime(sectionTheme)}

    ${createThemeVariations(
      (theme) => renderReadTime(theme, `-${theme}`),
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
