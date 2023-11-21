import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import calloutTwig from './yds-callout.twig';

import calloutData from './callout.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Callout',
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: calloutData.callout__heading,
    },
    text: {
      name: 'Text',
      type: 'string',
      defaultValue: calloutData.callout__text,
    },
    linkText: {
      name: 'Link Text',
      type: 'string',
      defaultValue: calloutData.callout__link__content,
    },
    linkType: {
      name: 'Link Type',
      type: 'select',
      options: ['button', 'link'],
      defaultValue: calloutData.callout__link__type,
    },
    backgroundColor: {
      name: 'Callout Theme (dial)',
      type: 'select',
      options: colorPairingsData,
      defaultValue: 'one',
    },
    calloutAlignment: {
      name: 'Callout Alignment',
      type: 'select',
      options: ['left', 'center'],
      defaultValue: 'center',
    },
  },
};

export const Callout = ({
  heading,
  text,
  linkText,
  linkType,
  backgroundColor,
  calloutAlignment,
}) => `
  <h2>One Callout</h2>
  ${calloutTwig({
    callout__background_color: backgroundColor,
    callout__alignment: calloutAlignment,
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
