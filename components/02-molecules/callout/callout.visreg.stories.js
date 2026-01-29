import calloutTwig from './yds-callout.twig';

import calloutData from './callout.yml';

import imageData from '../../01-atoms/images/image/image.yml';

import { componentThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Callout/Visreg',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: componentThemes,
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
      description: 'Background color theme for the callout component',
      type: 'select',
      options: componentThemes,
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

export const Visreg = ({
  sectionTheme,
  heading,
  text,
  linkText,
  linkType,
  backgroundColor,
  calloutAlignment,
  overlayBackgroundImage,
}) => {
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
    ${createPlaygroundIntro(
      'Use the controls to test different callout configurations and themes.',
    )}

    ${renderCallout(sectionTheme)}

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 1rem; line-height: 1.5;">
        The sections below show all variations of the callout component for visual regression testing.
        These are static examples captured by Percy for automated visual testing.
      </p>
    </div>

    ${createThemeVariations(
      renderCallout,
      componentThemes,
      'All Section Theme Variations',
      'Below are all section theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
