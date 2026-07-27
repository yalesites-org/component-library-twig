import Twig from 'twig';
import jquery from 'jquery';
import once from '@drupal/once';
import twigUrl from './twig-url.js';
import twigAssetPath from './twig-asset-path.js';
import { storySortComparator } from './story-sort.mjs';
// Must load before lib/link-treatment/link-treatment.js, which needs window.Drupal.behaviors synchronously.
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

// Core reads this file directly and merges only the `parameters` export.
// decorators/globalTypes/tags live in preview-decorators.js instead (see main.js).
export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: { disableSaveFromUI: true, sort: 'requiredFirst' },
  layout: 'padded', // Core defaults to 'fullscreen', which drops story padding
  options: {
    // Doesn't reach the static build's sidebar — see scripts/sort-storybook-index.mjs.
    storySort: storySortComparator,
  },
};
