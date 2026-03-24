import calloutTwig from './yds-callout.twig';

import calloutData from './callout.yml';

import imageData from '../../01-atoms/images/image/image.yml';

import {
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
  createSectionWrapper,
} from '../../_storybook/playground-utils';

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

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (sectionTheme) =>
          createSectionWrapper(
            sectionTheme,
            componentThemes
              .map(
                (componentTheme) => `
                  <div class="sb-section__container">
                    <h3 class="sb-section__subheading">Callout Theme: ${componentTheme}</h3>
                    ${renderCallout(componentTheme)}
                  </div>
                `,
              )
              .join(''),
            { width: 'site', primaryWidth: '100%' },
          ),
        sectionThemes,
        'All Section × Callout Theme Combinations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
