import { useEffect } from '@storybook/preview-api';
import Twig from 'twig';
import { setupTwig } from './setupTwig';
import {
  globalThemeLabels,
  globalThemes,
} from '../components/_storybook/theme-constants';

// GLOBAL CSS
import '../components/style.scss';
import '../components/00-tokens/colors/cl-colors.scss';
import '../components/00-tokens/typography/cl-typography.scss';
import '../components/00-tokens/effects/cl-effects.scss';
import '../components/00-tokens/layout/cl-layout.scss';
import '../components/04-page-layouts/placeholder/cl-placeholder.scss';
import '../components/_storybook/storybook.scss';
import '../fonts/fontawesome/css/fontawesome.css';
import '../fonts/fontawesome/css/regular.css';
import '../fonts/fontawesome/css/solid.css';

// If in a Drupal project, it's recommended to import a symlinked version of drupal.js.
import './_drupal.js';
import './jquery-global.js';

// Global link treatment
import '../lib/link-treatment/link-treatment.js';
import 'linkpurpose/css/linkpurpose.css';
import '../lib/link-treatment/link-treatment.scss';

export const decorators = [
  (StoryFn, context) => {
    useEffect(() => {
      // Update body attributes for theme + typography
      document.body.setAttribute(
        'data-global-theme',
        context.globals.globalTheme,
      );
      document.body.setAttribute(
        'data-heading-font',
        context.globals.headingFont || 'yalenew',
      );
      document.body.setAttribute(
        'data-heading-numerals',
        context.globals.headingNumerals || 'oldstyle',
      );
      document.body.setAttribute(
        'data-body-numerals',
        context.globals.bodyNumerals || 'oldstyle',
      );

      Drupal.attachBehaviors(document);

      return () => {
        Drupal.detachBehaviors(document);
      };
    }, [context]);

    return StoryFn(context);
  },
];

setupTwig(Twig);

export const globalTypes = {
  globalTheme: {
    name: 'Site: Global Theme (lever)',
    description: 'Choose a global color palette.',
    defaultValue: 'one',
    toolbar: {
      // Derived from tokens rather than listed here: this used to be a hand
      // written copy, and it had already drifted (a straight apostrophe in
      // "It's Your Yale" where tokens has a curly one), so the toolbar and the
      // story names disagreed.
      items: globalThemes.map((value) => ({
        value,
        title: globalThemeLabels[value],
      })),
      showName: true,
      title: 'Site: Global Theme (lever)',
    },
  },

  headingFont: {
    name: 'Typography: Heading Font',
    description: 'Choose the heading font.',
    defaultValue: 'yalenew',
    toolbar: {
      icon: 'paragraph',
      items: [
        { value: 'yalenew', title: 'Heading font: Yale New' },
        { value: 'mallory', title: 'Heading font: Mallory' },
      ],
      showName: true,
      dynamicTitle: true,
      title: 'Typography: Heading Font',
    },
  },

  headingNumerals: {
    name: 'Typography: Heading Numerals',
    description: 'Choose the numeral style used in headings.',
    defaultValue: 'oldstyle',
    toolbar: {
      icon: 'paragraph',
      items: [
        { value: 'oldstyle', title: 'Heading numerals: Old-Style' },
        { value: 'lining', title: 'Heading numerals: Lining' },
      ],
      showName: true,
      dynamicTitle: true,
      title: 'Typography: Heading Numerals',
    },
  },

  bodyNumerals: {
    name: 'Typography: Body Numerals',
    description: 'Choose the numeral style used in body text (always Mallory).',
    defaultValue: 'oldstyle',
    toolbar: {
      icon: 'paragraph',
      items: [
        { value: 'oldstyle', title: 'Body numerals: Old-Style' },
        { value: 'lining', title: 'Body numerals: Lining' },
      ],
      showName: true,
      dynamicTitle: true,
      title: 'Typography: Body Numerals',
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
          [
            'Colors',
            'Color Palettes (Theme)',
            'Theme Sandbox',
            'Theming Reference',
          ],
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
