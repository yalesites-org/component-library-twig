import { useEffect } from '@storybook/client-api';
import Twig from 'twig';
import { setupTwig } from './setupTwig';

// GLOBAL CSS
import '../components/style.scss';
import '../components/00-tokens/colors/cl-colors.scss';
import '../components/00-tokens/typography/cl-typography.scss';
import '../components/00-tokens/effects/cl-effects.scss';
import '../components/00-tokens/layout/cl-layout.scss';
import '../components/04-page-layouts/placeholder/cl-placeholder.scss';
import '../fonts/fontawesome/css/fontawesome.css';
import '../fonts/fontawesome/css/regular.css';
import '../fonts/fontawesome/css/solid.css';

// Global link treatment
import '../lib/ys_link/index';
import '../lib/ys_link/css/ys-link.css';

// If in a Drupal project, it's recommended to import a symlinked version of drupal.js.
import './_drupal.js';

export const decorators = [
  (StoryFn, context) => {
    useEffect(() => Drupal.attachBehaviors(), [context]);
    return `<div data-global-theme="${context.globals.globalTheme}">${StoryFn(context)}</div>`;
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
      ],
      showName: true,
    },
  }
}
