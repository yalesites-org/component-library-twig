import { addDecorator } from '@storybook/html';
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

import '../lib/link-treatment/link-treatment.js';
import 'linkpurpose/css/linkpurpose.css';
import '../lib/link-treatment/link-treatment.scss';

// If in a Drupal project, it's recommended to import a symlinked version of drupal.js.
import './_drupal.js';

// addDecorator deprecated, but not sure how to use this otherwise.
addDecorator((storyFn, context) => {
  useEffect(() => Drupal.attachBehaviors(), [context]);
  return storyFn(context);
});

setupTwig(Twig);
