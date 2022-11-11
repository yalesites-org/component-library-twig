import grandHeroTwig from './yds-grand-hero.twig';

import grandHeroData from './grand-hero.yml';

import imageData from '../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Grand Hero',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: grandHeroData.grand_hero__heading,
    },
    snippet: {
      name: 'Snippet',
      type: 'string',
      defaultValue: grandHeroData.grand_hero__snippet,
    },
    linkContent: {
      name: 'Link Content',
      type: 'string',
      defaultValue: grandHeroData.grand_hero__link__content,
    },
    linkStyle: {
      name: 'Link Style',
      type: 'select',
      options: ['text-link'],
      defaultValue: 'text-link',
    },
    bgColor: {
      name: 'Content Background Color',
      type: 'select',
      defaultValue: 'gray-800',
    },
  },
};

export const GrandHeroBanner = ({
  heading,
  snippet,
  linkContent,
  linkStyle,
  bgColor,
}) =>
  grandHeroTwig({
    ...imageData.responsive_images['16x9'],
    grand_hero__heading: heading,
    grand_hero__snippet: snippet,
    grand_hero__link__content: linkContent,
    grand_hero__link__url: grandHeroData.grand_hero__link__url,
    grand_hero__link__style: linkStyle,
    grand_hero__content__background: bgColor,
  });
