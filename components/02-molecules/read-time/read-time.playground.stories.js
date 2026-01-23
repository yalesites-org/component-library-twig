import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import readTimeTwig from './yds-read-time.twig';

import './yds-read-time';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Read Time/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
    },
  },
  args: {
    sectionTheme: 'one',
  },
};

export const Playground = ({ sectionTheme }) => {
  const themes = colorPairingsData;
  const sampleContent = `
    <p>A bulldozer sees a beast as an unstripped scene. Extending this logic, a childing beat without transports is truly a couch of unmaimed lutes. A tornado is an erstwhile creditor. This is not to discredit the idea that a cowbell of the lotion is assumed to be a hoven odometer.</p>
    <p>fears show us how watches can be polishes. A pakistan is a hydrous change. A license of the minister is assumed to be a nubile edge.</p>
    <p>Some queenly mouths are thought of simply as approvals. We know that few can name a diploid puppy that isn't a frothy bacon. A structure is a michael from the right perspective. Whips are blowhard faucets.</p>
    <p>Extending this logic, authors often misinterpret the pimple as a plushest bench, when in actuality it feels more like a fateful star. As far as we can estimate, the first berried mice is, in its own way, a daffodil. What we don't know for sure is whether or not a stove of the card is assumed to be a strigose country. We know that a nimble jail without zoos is truly a support of tonguelike silks. A twist can hardly be considered a thorny intestine without also being a salesman.</p>
  `;

  return `
  <h2>Interactive Playground</h2>
  <p>Read time component calculates reading time based on content. Sample content shown below.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        <div id="main-content">
          ${sampleContent}
          ${readTimeTwig()}
        </div>
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
            <div id="main-content-${theme}">
              ${sampleContent}
              ${readTimeTwig()}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
