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

// For global theme setting
import tokens from '@yalesites-org/tokens/build/json/tokens.json';

export const decorators = [
  (StoryFn, context) => {
    useEffect(() => Drupal.attachBehaviors(), [context]);
    document.body.classList.add('yds-storybook-cl');
    return `<div data-global-theme="${context.globals.globalTheme}">${StoryFn(context)}</div>`;
  },
];

setupTwig(Twig);

/*
 * This function parses the global themes from the tokens
 * such that we do not need to hard code the values as
 * new global themes are added.
 */
const globalThemesArray = function(themeData) {
  let globalThemes = [];
  for (const [key, value] of Object.entries(themeData)) {
    globalThemes.push({
      value: key,
      title: value.label,
    });
  }

  return globalThemes;
}

const colorGlobalThemeData = tokens['global-themes'];
const globalThemes = globalThemesArray(colorGlobalThemeData);
export const globalTypes = {

  globalTheme: {
    name: 'Site: Global Theme (lever)',
    description: 'Choose a global color palette.',
    defaultValue: 'one',
    toolbar: {
      items: globalThemes,
      showName: true,
      title: 'Site: Global Theme (lever)',
    },
  },
};

export const tags = ['autodocs', 'autodocs'];
export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: { disableSaveFromUI: true },
};
