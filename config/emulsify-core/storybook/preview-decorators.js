import { useEffect } from 'react';
import {
  globalThemeLabels,
  globalThemes,
} from '../../../components/_storybook/theme-constants.js';

// Registered via previewAnnotations in main.js — Core's preview.js only merges `parameters`, not this.
export const decorators = [
  (StoryFn, context) => {
    useEffect(() => {
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

      // Core's decorator calls Drupal.attachBehaviors() but never detaches on cleanup.
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
      // Derived from tokens rather than listed here: this used to be a hand
      // written copy, and it had already drifted (a straight apostrophe in
      // "It's Your Yale" where tokens has a curly one), so the toolbar and the
      // story names disagreed.
      items: globalThemes.map((value) => ({
        value,
        title: globalThemeLabels[value],
      })),
      // showName is deprecated/no-op (storybookjs/storybook#22245); dynamicTitle: false keeps the static label.
      dynamicTitle: false,
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
      dynamicTitle: true,
      title: 'Typography: Body Numerals',
    },
  },
};

// Dead as written, and deliberately left that way: Storybook reads project tags
// only from the preview file named by --config-dir, which is @emulsify/core's, not
// this module. Do not "fix" that by moving this into Core's preview -- Storybook 9
// dropped `docs.autodocs: false`, so an autodocs tag reaching the indexer would
// give every component an extra "Docs" child the published sidebar does not have.
export const tags = ['autodocs'];
