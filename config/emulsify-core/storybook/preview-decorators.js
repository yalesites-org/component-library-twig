import { useEffect } from 'react';

// Registered only via `previewAnnotations` (see main.js), separately from
// preview.js's `parameters` export — see the comment in preview.js for why
// these can't live in the same file.
export const decorators = [
  (StoryFn, context) => {
    useEffect(() => {
      // Update body attributes for theme + heading typography
      document.body.setAttribute('data-global-theme', context.globals.globalTheme);
      document.body.setAttribute('data-font-pairing', context.globals.headingTypography || 'yalenew');

      // Emulsify Core's own preview.js decorator already calls
      // Drupal.attachBehaviors() once its async Drupal shim is ready, so we
      // only need to detach here on cleanup (which Core's decorator doesn't
      // do). Guarded since the shim may not have loaded yet.
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
        { value: 'yalenew', title: 'Headings: YaleNew (Old-Style Numerals)' },
        { value: 'mallory', title: 'Headings: Mallory' },
        { value: 'yalenew-oldstyle', title: 'Headings: YaleNew (Lining Numerals)' },
      ],
      showName: true,
      dynamicTitle: true,
      title: 'Typography: Heading Fonts',
    },
  },
};

export const tags = ['autodocs', 'autodocs'];
