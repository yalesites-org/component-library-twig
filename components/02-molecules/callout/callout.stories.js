import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import componentProps from './callout-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

import calloutTwig from './yds-callout.twig';

import calloutData from './callout.yml';

import imageData from '../../01-atoms/images/image/image.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

const argTypes = toArgTypes(componentProps);
argTypes.backgroundColor = {
  ...argTypes.backgroundColor,
  options: colorPairingsData,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Callout',
  tags: ['!dev'],
  argTypes,
  args: {
    ...toArgs(componentProps),
    heading: calloutData.callout__heading,
    text: calloutData.callout__text,
    linkText: calloutData.callout__link__content,
    linkType: calloutData.callout__link__type,
  },
};

export const Callout = ({
  heading,
  text,
  linkText,
  linkType,
  backgroundColor,
  calloutAlignment,
  overlayBackgroundImage,
}) => `
  <h2>One Callout</h2>
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
  <h2>Two Callouts</h2>
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
      {
        callout__heading: calloutData.callout__heading,
        callout__text: calloutData.callout__text,
        callout__link__content: calloutData.callout__link__content,
        callout__link__url: calloutData.callout__link__url,
        callout__link__type: linkType,
      },
    ],
  })}
`;
