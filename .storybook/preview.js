import { useEffect } from '@storybook/preview-api';
import Twig from 'twig';
const { setupTwig } = require('./setupTwig');

// TEMPORARILY REMOVED ALL CSS IMPORTS TO TEST IF STORIES LOAD

// If in a Drupal project, it's recommended to import a symlinked version of drupal.js.
import './_drupal.js';
import './jquery-global.js';

// TEMPORARILY REMOVED ALL LINK TREATMENT IMPORTS
// Global link treatment
// import '../lib/link-treatment/link-treatment.js';
// TEMPORARILY REMOVED CSS IMPORTS
// import 'linkpurpose/css/linkpurpose.css';
// import '../lib/link-treatment/link-treatment.scss';

export const decorators = [
  (StoryFn, context) => {
    useEffect(() => {
      Drupal.attachBehaviors();

      // Update body attributes for theme + heading typography
      document.body.setAttribute('data-global-theme', context.globals.globalTheme);
      document.body.setAttribute('data-font-pairing', context.globals.headingTypography || 'yalenew');
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
        { value: 'yalenew', title: 'Headings: YaleNew' },
        { value: 'mallory', title: 'Headings: Mallory' },
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
  controls: { disableSaveFromUI: true },
};
