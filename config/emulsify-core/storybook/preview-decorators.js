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
        'data-font-pairing',
        context.globals.headingTypography || 'yalenew',
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

  headingTypography: {
    name: 'Typography: Heading Fonts',
    description: 'Choose a heading font pairing.',
    defaultValue: 'yalenew',
    toolbar: {
      icon: 'paragraph',
      items: [
        { value: 'yalenew', title: 'Headings: YaleNew (Old-Style Numerals)' },
        { value: 'mallory', title: 'Headings: Mallory' },
        {
          value: 'yalenew-oldstyle',
          title: 'Headings: YaleNew (Lining Numerals)',
        },
      ],
      dynamicTitle: true,
      title: 'Typography: Heading Fonts',
    },
  },
};

// Dead as written, and deliberately left that way: Storybook reads project tags
// only from the preview file named by --config-dir, which is @emulsify/core's, not
// this module. Do not "fix" that by moving this into Core's preview -- Storybook 9
// dropped `docs.autodocs: false`, so an autodocs tag reaching the indexer would
// give every component an extra "Docs" child the published sidebar does not have.
export const tags = ['autodocs'];
