import calloutTwig from './yds-callout.twig';

import calloutData from './callout.yml';

import imageData from '../../01-atoms/images/image/image.yml';

import { componentThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Callout/Visreg',
  parameters: {
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const heading = calloutData.callout__heading;
  const text = calloutData.callout__text;
  const linkText = calloutData.callout__link__content;
  const linkType = calloutData.callout__link__type;
  const backgroundColor = 'one';
  const calloutAlignment = 'center';
  const overlayBackgroundImage = false;

  // Render function for callout variations
  const renderCallout = (theme) => `
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
  `;

  return `
    ${createThemeVariations(
      renderCallout,
      componentThemes,
      'All Section Theme Variations',
      'Below are all section theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
