import Twig from 'twig';
import jquery from 'jquery';
import once from '@drupal/once';
import twigUrl from './twig-url.js';
import twigAssetPath from './twig-asset-path.js';
import { storySortComparator } from './story-sort.mjs';
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

// IMPORTANT: only `parameters` belongs in this file. Emulsify Core's own
// preview.js reads *this exact file* directly (see
// src/storybook/preview-parameters.js) and deep-merges its `parameters`
// export into the single global preview config Storybook loads.
// decorators/globalTypes/tags live in preview-decorators.js instead,
// registered separately via `previewAnnotations` (see main.js) — Core's
// preview.js doesn't read those from a project override at all.

// Sidebar order (kept here for documentation/dev-server use, e.g. `npm run
// storybook`). CONFIRMED this does not actually reach the sidebar for a
// static `storybook build`: the manager bundle (sb-manager/*.js) never
// references `storySort` at all in the built output, regardless of whether
// this is the declarative `{ method, order }` array form or a comparator
// function — neither crosses whatever boundary separates the preview's
// parameters from the manager's sidebar-tree renderer in this Storybook 10
// + Vite + Emulsify Core setup. The root symptom this was meant to fix
// (components with at least one *visible*, non-`!dev`-tagged story — e.g.
// Modal, Cards — jumping ahead of alphabetically-sorted docs-only entries)
// reproduces identically with story/tag content unchanged from before the
// migration, so it's a sorting behavior difference from Storybook 8, not
// something introduced by this project.
//
// The actual fix is scripts/sort-storybook-index.mjs, a post-build step
// that reorders .out/index.json directly — the static file the manager
// reads for the sidebar tree — using this same priority logic (shared via
// story-sort.mjs). See that script for why reordering the file itself,
// rather than getting Storybook to sort it, is what actually works.
export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: { disableSaveFromUI: true, sort: 'requiredFirst' },
  // Emulsify Core's own preview.js defaults `layout` to 'fullscreen' (see
  // its defaultParams). That's what strips the standard ~30px/20px padded
  // box around each story in the Docs view (Storybook renders with the
  // `sb-unstyled` class and no padding wrapper instead) — components used to
  // sit inset in a neatly padded box; without this override they can ride
  // edge-to-edge in their container. Overriding to Storybook's own default
  // restores the original spacing.
  layout: 'padded',
  options: {
    storySort: storySortComparator,
  },
};
