import { useEffect } from '@storybook/preview-api';
import Twig from 'twig';
import { setupTwig } from './setupTwig';

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
      // Update body attributes for theme + heading typography
      document.body.setAttribute('data-global-theme', context.globals.globalTheme);
      document.body.setAttribute('data-font-pairing', context.globals.headingTypography || 'yalenew');

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
        'Web Components',
        ['Overview', 'Lit', 'Vanilla', '*'],
        'Templates',
        'Page Examples',
        ['Overview', '*'],
        '*',
      ],
    },
  },
};
