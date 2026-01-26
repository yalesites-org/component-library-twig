import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import ctaTwig from './cta/yds-cta.twig';
import linkTwig from './text-link/yds-text-link.twig';
import textCopyButtonTwig from './text-copy-button/yds-text-copy-button.twig';

import './text-link/yds-text-link';
import './text-copy-button/yds-text-copy-button';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

const componentThemeOptions = Object.keys(tokens['button-cta-themes']);

export default {
  title: 'Atoms/Controls/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
    componentTheme: {
      name: 'CTA Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      options: componentThemeOptions,
      type: 'select',
    },
    ctaStyle: {
      name: 'CTA Style',
      options: ['filled', 'outline'],
      type: 'select',
    },
    ctaRadius: {
      name: 'CTA Radius',
      options: ['default', 'soft', 'pill'],
      type: 'select',
    },
    hoverStyle: {
      name: 'Hover Style',
      options: ['fade', 'rise', 'wipe'],
      type: 'select',
    },
  },
  args: {
    sectionTheme: 'default',
    componentTheme: 'one',
    ctaStyle: 'filled',
    ctaRadius: 'default',
    hoverStyle: 'fade',
  },
};

export const Playground = ({
  sectionTheme,
  componentTheme,
  ctaStyle,
  ctaRadius,
  hoverStyle,
}) => {
  const ctaText = 'Call to action';

  // Render function for controls variations
  const renderControls = (theme) => `
    <div class="yds-layout" data-component-theme="${theme}" data-component-width="site">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
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
        </div>
      </div>
    </div>
  `;

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different CTA, text link, and button variations.',
    )}

    <div class="yds-layout" data-component-theme="${sectionTheme}" data-component-width="site">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          <h3>CTA Buttons</h3>
          <div class="cta-group">
            ${ctaTwig({
              cta__content: ctaText,
              cta__href: '#',
              cta__style: ctaStyle,
              cta__radius: ctaRadius,
              cta__hover_style: hoverStyle,
              cta__component_theme: componentTheme,
            })}
          </div>

          <h3>Text Links</h3>
          ${linkTwig({
            link__url: '#',
            link__content: 'This is a default link',
          })}<br />
          ${linkTwig({
            link__url: '#',
            link__content: 'External link',
            link__style: 'underline-with-icon',
            link__type: 'external',
          })}<br />
          ${linkTwig({
            link__url: '#',
            link__content: 'Download link',
            link__style: 'underline-with-icon',
            link__type: 'download',
          })}

          <h3>Text Copy Button</h3>
          ${textCopyButtonTwig({
            text_copy_button__pre_text: 'person@example.com',
            text_copy_button__content: '(copy)',
            text_copy_button__component_theme: componentTheme,
          })}
        </div>
      </div>
    </div>

    ${createThemeVariations(
      renderControls,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
