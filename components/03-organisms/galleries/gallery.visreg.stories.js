// Twig templates.
import mediaGridTwig from './media-grid/yds-media-grid.twig';

// Data files.
import mediaGridData from './media-grid/media-grid.yml';

// JS.
import './media-grid/yds-media-grid-interactive';

import {
  globalThemeLabels,
  globalThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';

/**
 * Storybook Definition.
 *
 * Gallery captions only render inside the modal, which is closed when a story
 * first renders, so every story here opens it in a play function before the
 * snapshot is taken (YaleSites-Internal#1773). Chromatic waits for a play
 * function to finish before it captures.
 *
 * Images are not hidden: fixtures are committed placeholders, and the caption
 * band is drawn over the photo, so the photo is part of what is being checked.
 * See "Images are deliberately not masked" in STORYBOOK.md.
 */
export default {
  tags: ['visreg'],
  title: 'Organisms/Galleries/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

// Item 3 in media-grid.yml: a long caption with a link and no heading. It is
// the one caption that is both truncated to plain text while collapsed and
// restored with its link when expanded, so both states differ visibly.
const captionedItem = 3;

const renderGallery = () =>
  mediaGridTwig({
    ...mediaGridData,
    media_grid__variation: 'interactive',
  });

/**
 * Polls `check` until it returns a truthy value, and resolves with it.
 *
 * Hand-rolled rather than imported from `storybook/test`: one small poll is
 * all these stories need, and the lint resolver cannot see that subpath.
 */
const waitFor = (check, label, timeout = 5000) =>
  new Promise((resolve, reject) => {
    const started = Date.now();
    const poll = () => {
      const result = check();

      if (result) {
        resolve(result);
      } else if (Date.now() - started > timeout) {
        reject(new Error(`Timed out waiting for ${label}.`));
      } else {
        setTimeout(poll, 50);
      }
    };

    poll();
  });

/**
 * Resolves once every CSS transition and animation under an element is done,
 * so the snapshot records the end state rather than a frame of the fade.
 */
const settle = (element) =>
  Promise.all(
    element.getAnimations({ subtree: true }).map((animation) =>
      // A transition interrupted by the next state change rejects; the state
      // it was heading to is what gets captured either way.
      animation.finished.catch(() => {}),
    ),
  );

/**
 * Opens the modal on the captioned item the way a visitor would, and returns
 * that item's caption once the modal and its image are fully shown.
 */
const openCaptionedItem = async (canvasElement) => {
  // Behaviors attach after render; `once()` marks the grid when they have.
  const grid = await waitFor(
    () =>
      canvasElement.querySelector(
        '.media-grid[data-once~="media-grid-interactive"]',
      ),
    'the gallery behavior to attach',
  );

  grid
    .querySelector(`[data-media-grid-item="${captionedItem}"] button`)
    .click();

  const modal = grid.querySelector('.media-grid__modal');
  const caption = modal.querySelector(
    `.media-grid-modal__content[data-media-grid-modal-item="${captionedItem}"]`,
  );
  const image = modal.querySelector(
    `.media-grid-modal__media[data-media-grid-modal-item="${captionedItem}"] img`,
  );

  // Modal images are lazy loaded, so this one only starts loading now, and it
  // competes with every grid image for bandwidth on a busy capture worker.
  // Give it far longer than the attach wait so a slow load is not a failure.
  await waitFor(
    () => image.complete && image.naturalWidth,
    'the modal image to load',
    30000,
  );
  await settle(modal);

  return caption;
};

const openCaptionCollapsed = async ({ canvasElement }) => {
  const caption = await openCaptionedItem(canvasElement);

  await waitFor(
    () => caption.getAttribute('is-expanded') === 'false',
    'the caption to be collapsed',
  );
};

const openCaptionExpanded = async ({ canvasElement }) => {
  const caption = await openCaptionedItem(canvasElement);

  caption.querySelector('.media-grid-modal__toggle-caption').click();

  await waitFor(
    () => caption.getAttribute('is-expanded') === 'true',
    'the caption to expand',
  );
  await settle(caption);
};

const collapsedStories = createGlobalThemeStories(
  renderGallery,
  globalThemes,
  globalThemeLabels,
);

const expandedStories = createGlobalThemeStories(
  renderGallery,
  globalThemes,
  globalThemeLabels,
);

export const OldBluesCaptionCollapsed = collapsedStories.one;
export const NewHavenGreenCaptionCollapsed = collapsedStories.two;
export const ShorelineSummerCaptionCollapsed = collapsedStories.three;
export const OnhaCaptionCollapsed = collapsedStories.four;
export const ItsYourYaleCaptionCollapsed = collapsedStories.five;
export const AICaptionCollapsed = collapsedStories.six;
export const WhitneyHumanitiesCenterCaptionCollapsed = collapsedStories.seven;

export const OldBluesCaptionExpanded = expandedStories.one;
export const NewHavenGreenCaptionExpanded = expandedStories.two;
export const ShorelineSummerCaptionExpanded = expandedStories.three;
export const OnhaCaptionExpanded = expandedStories.four;
export const ItsYourYaleCaptionExpanded = expandedStories.five;
export const AICaptionExpanded = expandedStories.six;
export const WhitneyHumanitiesCenterCaptionExpanded = expandedStories.seven;

ItsYourYaleCaptionCollapsed.storyName = 'It’s Your Yale Caption Collapsed';
ItsYourYaleCaptionExpanded.storyName = 'It’s Your Yale Caption Expanded';

OldBluesCaptionCollapsed.play = openCaptionCollapsed;
NewHavenGreenCaptionCollapsed.play = openCaptionCollapsed;
ShorelineSummerCaptionCollapsed.play = openCaptionCollapsed;
OnhaCaptionCollapsed.play = openCaptionCollapsed;
ItsYourYaleCaptionCollapsed.play = openCaptionCollapsed;
AICaptionCollapsed.play = openCaptionCollapsed;
WhitneyHumanitiesCenterCaptionCollapsed.play = openCaptionCollapsed;

OldBluesCaptionExpanded.play = openCaptionExpanded;
NewHavenGreenCaptionExpanded.play = openCaptionExpanded;
ShorelineSummerCaptionExpanded.play = openCaptionExpanded;
OnhaCaptionExpanded.play = openCaptionExpanded;
ItsYourYaleCaptionExpanded.play = openCaptionExpanded;
AICaptionExpanded.play = openCaptionExpanded;
WhitneyHumanitiesCenterCaptionExpanded.play = openCaptionExpanded;
