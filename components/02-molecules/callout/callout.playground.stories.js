import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import calloutTwig from './yds-callout.twig';

import calloutData from './callout.yml';

import imageData from '../../01-atoms/images/image/image.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Callout/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
    text: {
      name: 'Text',
      type: 'string',
    },
    linkText: {
      name: 'Link Text',
      type: 'string',
    },
    linkType: {
      name: 'Link Type',
      type: 'select',
      options: ['button', 'link'],
    },
    backgroundColor: {
      name: 'Callout Theme (dial)',
      type: 'select',
      options: colorPairingsData,
    },
    calloutAlignment: {
      name: 'Callout Alignment',
      type: 'select',
      options: ['left', 'center'],
    },
    overlayBackgroundImage: {
      name: 'Overlay Background Image',
      type: 'boolean',
    },
  },
  args: {
    sectionTheme: 'one',
    heading: calloutData.callout__heading,
    text: calloutData.callout__text,
    linkText: calloutData.callout__link__content,
    linkType: calloutData.callout__link__type,
    backgroundColor: 'one',
    calloutAlignment: 'center',
    overlayBackgroundImage: false,
  },
};

export const Playground = ({
  sectionTheme,
  heading,
  text,
  linkText,
  linkType,
  backgroundColor,
  calloutAlignment,
  overlayBackgroundImage,
}) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different callout configurations and themes.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        ${calloutTwig({
          callout__background_color: backgroundColor,
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
            ${calloutTwig({
              callout__background_color: backgroundColor,
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
