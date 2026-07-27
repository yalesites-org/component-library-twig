import { useEffect } from 'react';

// Registered via previewAnnotations in main.js — Core's preview.js only merges `parameters`, not this.
export const decorators = [
  (StoryFn, context) => {
    useEffect(() => {
      document.body.setAttribute('data-global-theme', context.globals.globalTheme);
      document.body.setAttribute('data-font-pairing', context.globals.headingTypography || 'yalenew');

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
      items: [
        { value: 'one', title: 'Old Blues' },
        { value: 'two', title: 'New Haven Green' },
        { value: 'three', title: 'Shoreline Summer' },
        { value: 'four', title: 'Onha' },
        { value: 'five', title: 'It\'s Your Yale'},
        { value: 'six', title: 'AI'},
        { value: 'seven', title: 'Whitney Humanities Center' },
      ],
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
        { value: 'yalenew-oldstyle', title: 'Headings: YaleNew (Lining Numerals)' },
      ],
      dynamicTitle: true,
      title: 'Typography: Heading Fonts',
    },
  },
};

export const tags = ['autodocs', 'autodocs'];
