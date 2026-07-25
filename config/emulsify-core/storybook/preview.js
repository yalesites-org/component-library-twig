import { useEffect } from 'react';
import Twig from 'twig';
import jquery from 'jquery';
import once from '@drupal/once';
import twigUrl from './twig-url.js';
import twigAssetPath from './twig-asset-path.js';
// Must be imported before lib/link-treatment/link-treatment.js below: that
// file registers Drupal.behaviors.linkPurpose at module-evaluation time, and
// Emulsify Core's own Drupal shim only becomes available later (it's awaited
// inside a useEffect, not loaded synchronously).
import './drupal-shim-stub.js';

// Global jQuery shim for component JS that expects it (e.g. link treatment).
global.jQuery = jquery;
global.$ = jquery;
global.once = once;

// GLOBAL CSS
import '../../../components/style.scss';
import '../../../components/00-tokens/colors/cl-colors.scss';
import '../../../components/00-tokens/typography/cl-typography.scss';
import '../../../components/00-tokens/effects/cl-effects.scss';
import '../../../components/00-tokens/layout/cl-layout.scss';
import '../../../components/04-page-layouts/placeholder/cl-placeholder.scss';
import '../../../components/_storybook/storybook.scss';
import '../../../assets/fonts/fontawesome/css/fontawesome.css';
import '../../../assets/fonts/fontawesome/css/regular.css';
import '../../../assets/fonts/fontawesome/css/solid.css';

// Global link treatment
import '../../../lib/link-treatment/link-treatment.js';
import 'linkpurpose/css/linkpurpose.css';
import '../../../lib/link-treatment/link-treatment.scss';

// Register YaleSites-specific custom Twig functions. Native bem()/add_attributes()
// helpers and Drupal Twig filters are registered automatically by Emulsify Core's
// Drupal platform adapter (see project.emulsify.json).
twigUrl(Twig);
twigAssetPath(Twig);

export const decorators = [
  (StoryFn, context) => {
    useEffect(() => {
      // Update body attributes for theme + heading typography
      document.body.setAttribute('data-global-theme', context.globals.globalTheme);
      document.body.setAttribute('data-font-pairing', context.globals.headingTypography || 'yalenew');

      // Emulsify Core's own preview.js decorator already calls
      // Drupal.attachBehaviors() once its async Drupal shim is ready, so we
      // only need to detach here on cleanup (which Core's decorator doesn't
      // do). Guarded since the shim may not have loaded yet.
      return () => {
        if (typeof window.Drupal?.detachBehaviors === 'function') {
          window.Drupal.detachBehaviors(document);
        }
      };
    }, [context]);

    return StoryFn(context);
  },
];

export const globalTypes = {
  globalTheme: {
    name: 'Site: Global Theme (lever)',
    description: 'Choose a global color palette.',
    defaultValue: 'one',
    toolbar: {
      items: [
        { value: 'one', title: 'Old Blues' },
        { value: 'two', title: 'New Haven Green' },
        { value: 'three', title: 'Shoreline Summer' },
        { value: 'four', title: 'Onha' },
        { value: 'five', title: 'It\'s Your Yale'},
        { value: 'six', title: 'AI'},
        { value: 'seven', title: 'Whitney Humanities Center' },
      ],
      showName: true,
      title: 'Site: Global Theme (lever)',
    },
  },

  headingTypography: {
    name: 'Typography: Heading Fonts',
    description: 'Choose a heading font pairing.',
    defaultValue: 'yalenew',
    toolbar: {
      icon: 'paragraph',
      items: [
        { value: 'yalenew', title: 'Headings: YaleNew (Old-Style Numerals)' },
        { value: 'mallory', title: 'Headings: Mallory' },
        { value: 'yalenew-oldstyle', title: 'Headings: YaleNew (Lining Numerals)' },
      ],
      showName: true,
      dynamicTitle: true,
      title: 'Typography: Heading Fonts',
    },
  },
};

export const tags = ['autodocs', 'autodocs'];
export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: { disableSaveFromUI: true, sort: 'requiredFirst' },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Introduction',
        ['Welcome', 'Theme System', 'Storybook Guide'],
        'Tokens',
        [
          'Colors',
          ['Colors', 'Color Palettes (Theme)', 'Theme Sandbox', 'Theming Reference'],
          '*',
        ],
        'Atoms',
        'Molecules',
        'Organisms',
        ['Card Collection', ['Overview', 'Visreg', '*']],
        'Templates',
        'Page Examples',
        ['Overview', '*'],
        '*',
      ],
    },
  },
};
