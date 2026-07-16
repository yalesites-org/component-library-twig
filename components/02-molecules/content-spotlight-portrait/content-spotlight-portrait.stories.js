// Twig templates
import contentSpotlightPortraitTwig from './yds-content-spotlight-portrait.twig';

// Data files
import imageData from '../../01-atoms/images/image/image.yml';
import contentSpotlightPortraitData from './content-spotlight-portrait.yml';
import componentProps from './content-spotlight-portrait-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Content Spotlight/Content Spotlight Portrait',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    heading: contentSpotlightPortraitData.content_spotlight_portrait__heading,
    subheading:
      contentSpotlightPortraitData.content_spotlight_portrait__subheading,
    text: contentSpotlightPortraitData.content_spotlight_portrait__text,
    linkContent:
      contentSpotlightPortraitData.content_spotlight_portrait__link__content,
    linkTwoContent:
      contentSpotlightPortraitData.content_spotlight_portrait__link_two__content,
    caption: contentSpotlightPortraitData.content_spotlight_portrait__caption,
  },
};

export const ContentSpotlightPortrait = ({
  position,
  contentVerticalAlignment,
  overline,
  heading,
  subheading,
  text,
  linkContent,
  linkTwoContent,
  componentTheme,
  imageStyle,
}) =>
  contentSpotlightPortraitTwig({
    ...imageData.responsive_images['2x3'],
    content_spotlight_portrait__theme: componentTheme,
    content_spotlight_portrait__position: position,
    content_spotlight_portrait__vertical_align: contentVerticalAlignment,
    content_spotlight_portrait__style: imageStyle,
    content_spotlight_portrait__overline: overline,
    content_spotlight_portrait__heading: heading,
    content_spotlight_portrait__subheading: subheading,
    content_spotlight_portrait__text: text,
    content_spotlight_portrait__link__content: linkContent,
    content_spotlight_portrait__link__url:
      contentSpotlightPortraitData.content_spotlight_portrait__link__url,
    content_spotlight_portrait__link_two__content: linkTwoContent,
    content_spotlight_portrait__link_two__url:
      contentSpotlightPortraitData.content_spotlight_portrait__link_two__url,
    content_spotlight_portrait__caption:
      contentSpotlightPortraitData.content_spotlight_portrait__caption,
  });
