import ctaTwig from './cta/yds-cta.twig';
import linkTwig from './text-link/yds-text-link.twig';
import textCopyButtonTwig from './text-copy-button/yds-text-copy-button.twig';

import './text-link/yds-text-link';
import './text-copy-button/yds-text-copy-button';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Atoms/Controls/Visreg',
  parameters: { controls: { disable: true } },
};

const renderGlobalTheme = () => {
  const componentTheme = 'one';
  const ctaText = 'Call to action';

  // Render function for controls variations
  const renderControls = (theme) =>
    createSectionWrapper(
      theme,
      `
          <h4>CTA Filled</h4>
          <div class="cta-group">
            ${ctaTwig({
              cta__content: ctaText,
              cta__href: '#',
              cta__component_theme: componentTheme,
            })}
            ${ctaTwig({
              cta__content: ctaText,
              cta__href: '#',
              cta__radius: 'soft',
              cta__component_theme: componentTheme,
            })}
            ${ctaTwig({
              cta__content: ctaText,
              cta__href: '#',
              cta__radius: 'pill',
              cta__component_theme: componentTheme,
            })}
          </div>

          <h4>CTA Outline</h4>
          <div class="cta-group">
            ${ctaTwig({
              cta__content: ctaText,
              cta__href: '#',
              cta__style: 'outline',
              cta__component_theme: componentTheme,
            })}
            ${ctaTwig({
              cta__content: ctaText,
              cta__href: '#',
              cta__radius: 'soft',
              cta__style: 'outline',
              cta__component_theme: componentTheme,
            })}
            ${ctaTwig({
              cta__content: ctaText,
              cta__href: '#',
              cta__radius: 'pill',
              cta__style: 'outline',
              cta__component_theme: componentTheme,
            })}
          </div>

          <h4>Text Links</h4>
          ${linkTwig({
            link__url: '#',
            link__content: 'Default link',
          })}<br />
          ${linkTwig({
            link__url: '#',
            link__content: 'External link',
            link__style: 'underline-with-icon',
            link__type: 'external',
          })}

          <h4>Text Copy Button</h4>
          ${textCopyButtonTwig({
            text_copy_button__pre_text: 'person@example.com',
            text_copy_button__content: '(copy)',
            text_copy_button__component_theme: componentTheme,
          })}
        `,
      { width: 'site' },
    );

  return createThemeVariations(
    renderControls,
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations for visual regression testing.',
    'Section Theme',
  );
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
