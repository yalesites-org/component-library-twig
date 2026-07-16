# Storybook Playground Stories - Developer Guide

This guide covers everything you need to know about creating and maintaining playground stories in the Yale Sites component library.

## Table of Contents

- [Overview](#overview)
- [Story Types](#story-types)
- [Playground Story Structure](#playground-story-structure)
- [Available Utilities](#available-utilities)
- [Theme System](#theme-system)
- [Using YML Data Files](#using-yml-data-files)
- [Creating a New Playground Story](#creating-a-new-playground-story)
- [Best Practices](#best-practices)
- [Anti-Patterns](#anti-patterns)

## Overview

Playground stories serve two primary purposes:

1. **Interactive Testing**: Provide controls for exploring component variations
2. **Visual Regression Testing (VRT)**: Render all permutations for automated screenshot testing

Our playground stories follow standardized patterns using shared utilities to ensure consistency and maintainability.

## Story Types

### Regular Stories

- Focused on specific use cases or examples
- Show best practices and recommended patterns
- Used for documentation

### Playground Stories

- Comprehensive interactive controls
- VRT sections showing all variations
- File naming: `*.playground.stories.js`
- Used for testing and exploration

## Playground Story Structure

Every playground story has two main sections:

```javascript
export default {
  title: 'Category/Component/Playground',
  argTypes: {
    // Control definitions
  },
  args: {
    // Default values (modern approach)
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Playground = ({
  // Destructure args
  heading,
  theme,
  // ... other args
}) => `
  <!-- INTERACTIVE SECTION -->
  ${createPlaygroundIntro('Description of this playground.')}

  <div class="wrap-for-global-theme" data-global-theme="${theme}">
    ${componentTwig({ heading, theme })}
  </div>

  <!-- VRT SECTIONS -->
  ${createThemeVariations(
    (theme) => componentTwig({ heading, theme }),
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations for visual regression testing.',
    'Section Theme',
  )}
`;
```

### Interactive Section

- Responds to Storybook controls
- Shows component with user-selected values
- Uses `data-global-theme` wrapper for global theme control

### VRT Sections

- Static renderings of all variations
- Used by automated testing
- Must cover all permutations
- Use utility functions for consistency

## Available Utilities

### Core Utilities (`playground-utils.js`)

#### `createPlaygroundIntro(description)`

Creates standard intro section.

```javascript
import { createPlaygroundIntro } from '../_storybook/playground-utils.js';

const intro = createPlaygroundIntro(
  'This playground allows you to explore all accordion variations.',
);
```

#### `createThemeVariations(renderFn, themes, title, description, label)`

Most commonly used utility for theme VRT sections.

```javascript
import { createThemeVariations } from '../_storybook/playground-utils.js';
import { sectionThemes } from '../_storybook/theme-constants.js';

const vrt = createThemeVariations(
  (theme) => accordionTwig({ ...config, theme }),
  sectionThemes,
  'All Section Theme Variations',
  'Below are all theme variations for visual regression testing.',
  'Section Theme',
);
```

#### `createVariations(renderFn, variations, title, description, label, labelFormatter)`

Generic variation utility for layouts, positions, etc. The `description` param
renders an optional paragraph under the section heading. The `labelFormatter`
param accepts a function `(variation) => string` for custom subheading text;
when omitted, subheadings default to `"${label}: ${variation}"`.

```javascript
import { createVariations } from '../_storybook/playground-utils.js';

// Basic usage
const layoutVRT = createVariations(
  (layout) => componentTwig({ ...config, layout }),
  ['fifty-fifty', 'seventy-thirty'],
  'All Layout Variations',
  '', // description (empty string if unused)
  'Layout',
);

// With a custom label formatter
const stateVRT = createVariations(
  (state) => componentTwig({ ...config, state }),
  events,
  'All Event States',
  '',
  'Event State',
  (event) => `${event.label} (${event.state})`,
);
```

#### `createThemeAccentCombinations(renderFn, combinations, title)`

For components supporting both theme and accent (site-header, site-footer).

```javascript
import { createThemeAccentCombinations } from '../_storybook/playground-utils.js';
import vrtData from '../_storybook/vrt-combinations.yml';

const vrt = createThemeAccentCombinations(
  (theme, accent) =>
    siteHeaderTwig({
      ...config,
      site_header__theme: theme,
      site_header__accent: accent,
    }),
  vrtData.themeAccentPairs,
  'All Theme & Accent Combinations',
);
```

#### `createSectionWrapper(theme, content, options)`

Wraps component in a themed `yds-layout` section with all required data
attributes. Options: `width` (default `'site'`), `primaryWidth` (CSS width
string on the primary column), `hasDivider` (boolean), `innerStyle` (CSS
string applied to `.yds-layout__inner` — useful for passing CSS custom
properties like accent colors).

```javascript
import { createSectionWrapper } from '../_storybook/playground-utils.js';

// Basic usage
const wrapped = createSectionWrapper('one', accordionTwig(config), {
  width: 'site',
  primaryWidth: '100%',
});

// With innerStyle for CSS custom properties (e.g. accent color)
const accentWrapped = createSectionWrapper(
  sectionTheme,
  pullQuoteTwig({ ...config, pull_quote__accent_theme: accentColor }),
  {
    primaryWidth: '100%',
    innerStyle: `--color-pull-quote-accent: var(--color-${accentColor})`,
  },
);
```

#### `createMultiColumnLayout(layout, primary, secondary, tertiary, theme)`

Creates multi-column layouts for components like image or text-with-image.

```javascript
import { createMultiColumnLayout } from '../_storybook/playground-utils.js';

const multiCol = createMultiColumnLayout(
  'fifty-fifty',
  imageTwig(imageConfig),
  textTwig(textConfig),
  undefined,
  'two',
);
```

### Page Example Utilities (`05-page-examples/page-utils.js`)

#### `buildPageProps(args)` (default export)

Encapsulates the shared header, footer, nav, and toolbar props that every page
example story requires. Returns an object you spread into your twig call, then
add page-specific props after.

Handles automatically:

- 12 global toolbar localStorage reads (header theme, footer theme, nav
  position, menu variation, animated items, border thicknesses, accents, etc.)
- Mapping all of those to the twig prop keys expected by page templates
- `show_breadcrumbs` from args

The three nav YAML files (`utility-nav`, `primary-nav`, `breadcrumbs`) must
still be imported and spread in each story file due to a webpack module
resolution constraint — they fail to load when imported from a non-story
utility file.

```javascript
import buildPageProps from '../page-utils';
import utilityNavData from '../../03-organisms/menu/utility-nav/utility-nav.yml';
import primaryNavData from '../../03-organisms/menu/primary-nav/primary-nav.yml';
import breadcrumbData from '../../03-organisms/menu/breadcrumbs/breadcrumbs.yml';

export const MyPage = (args) => {
  const { pageTitle, somePageSpecificArg } = args;
  return myPageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    some_page_specific_prop: somePageSpecificArg,
  });
};
```

### Icon Utilities (`icon-utils.js`)

#### `createIconMapping(iconsData, includeNone)`

Converts icon YML to Storybook control mapping.

```javascript
import { createIconMapping } from '../_storybook/icon-utils.js';
import iconsData from './component-icons.yml';

const iconMapping = createIconMapping(iconsData);

// Use in argTypes:
argTypes: {
  icon: {
    name: 'Icon',
    options: Object.keys(iconMapping),
    mapping: iconMapping,
    control: { type: 'select' }
  }
}
```

#### `hasIcon(iconName)`

Checks if icon is selected.

```javascript
import { hasIcon } from '../_storybook/icon-utils.js';

if (hasIcon(args.icon)) {
  // Render with icon
}
```

### Theme Constants (`theme-constants.js`)

Always import themes from constants instead of hardcoding:

```javascript
import {
  sectionThemes,
  componentThemes,
  siteHeaderThemes,
  siteHeaderAccents,
  siteFooterThemes,
  siteFooterAccents,
  borderThicknessOptions,
} from '../_storybook/theme-constants.js';
```

**Benefits:**

- Single source of truth
- Adding theme in tokens → automatically available everywhere
- No duplicated arrays

## Theme System

### Section Themes vs Component Themes

These are **separate concepts** that happen to use similar naming:

#### Section Themes

```javascript
['default', 'one', 'two', 'three', 'four'];
```

- Background colors for layout sections
- Defined in component-library (not in tokens)
- Used in `data-component-theme` or `data-global-theme`

#### Component Themes

```javascript
['one', 'two', 'three', 'four', 'five'];
```

- Color accents for individual components
- Defined in tokens: `tokens['component-themes']`
- Called "dial" in CMS
- Used in component-specific theme props

See `components/00-introduction/themes.mdx` for user-facing documentation.

### Control Labels

**Section Theme controls:**

```javascript
section_theme: {
  name: 'Section Theme',
  description: 'Background color theme for the layout section',
  // ...
}
```

**Component Theme controls:**

```javascript
accordion__theme: {
  name: 'Accordion Theme (dial)',
  description: 'Color accent theme for this component (from color dial in CMS)',
  // ...
}
```

Always use "(dial)" suffix for component themes to clarify they're from the CMS color dial.

## Using YML Data Files

### When to Extract to YML

**Do extract when:**

- Data is complex (>3-4 properties)
- Data is reused across stories
- Data represents realistic content examples
- Inline data makes story hard to read

**Keep inline when:**

- Simple config (2-3 properties)
- Data derived from other values
- Story-specific transformations

### Example: Site Header Config

```yaml
# site-header-config.yml
baseConfig:
  site_name: 'Department of Chemistry'
  site_header__branding_name: 'Yale University'
  site_header__branding_link: 'https://www.yale.edu'
```

```javascript
// In story
import configData from './site-header-config.yml';

const config = {
  ...configData.baseConfig,
  site_header__theme: theme,
  site_header__accent: accent,
};
```

## Creating a New Playground Story

### Step 1: Start with Template

Copy `TEMPLATE-playground-story.js` (in the root of the component library) as starting point and rename it to `[component-name].playground.stories.js`.

### Step 2: Define argTypes (Modern Approach)

```javascript
export default {
  title: 'Category/Component/Playground',
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
    },
    theme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      options: ['default', 'one', 'two', 'three', 'four'],
      control: { type: 'select' },
    },
  },
  args: {
    // DEFAULT VALUES GO HERE (not in argTypes)
    heading: 'Default Heading',
    theme: 'one',
  },
  parameters: {
    layout: 'fullscreen',
  },
};
```

**Important:** Use `args` for default values, not `defaultValue` in argTypes (deprecated pattern).

### Step 3: Build Interactive Section

```javascript
export const Playground = ({ heading, theme }) => `
  ${createPlaygroundIntro('Description of this playground.')}

  <div class="wrap-for-global-theme" data-global-theme="${theme}">
    ${componentTwig({ heading })}
  </div>
`;
```

### Step 4: Add VRT Sections

```javascript
export const Playground = ({ heading, theme }) => `
  ${createPlaygroundIntro('Description.')}

  <!-- Interactive section -->
  <div class="wrap-for-global-theme" data-global-theme="${theme}">
    ${componentTwig({ heading })}
  </div>

  <!-- VRT sections -->
  ${createThemeVariations(
    (theme) => componentTwig({ heading }),
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations for visual regression testing.',
    'Section Theme',
  )}
`;
```

### Step 5: Test All Controls Work

1. Start Storybook: `npm run storybook`
2. Navigate to your playground story
3. Test each control changes the interactive section
4. Verify all VRT sections render
5. Check console for errors

### Step 6: Lint and Fix

```bash
npm run lint:js
npx eslint path/to/story.js --fix  # Auto-fix if needed
```

## Best Practices

### 1. Use Utility Functions

Replace duplicated code with utilities:

**Before:**

```javascript
${themes.map((theme) => `
  <h3 style="padding: 0.5rem;">Theme: ${theme}</h3>
  ${componentTwig({ ...config, theme })}
`).join('')}
```

**After:**

```javascript
${createThemeVariations(
  (theme) => componentTwig({ ...config, theme }),
  sectionThemes,
  'All Section Theme Variations',
  undefined,
  'Theme'
)}
```

### 2. Import Themes from Constants

**Before:**

```javascript
const themes = ['one', 'two', 'three', 'four', 'five'];
```

**After:**

```javascript
import { componentThemes } from '../_storybook/theme-constants.js';
```

### 3. Use CSS Classes, Not Inline Styles

**Before:**

```javascript
<h2 style="padding: 1rem;">VRT: Themes</h2>
```

**After:**

```javascript
<h2 class="sb-section__heading">All Theme Variations</h2>
```

### 4. Modern argTypes Pattern

**Before (deprecated):**

```javascript
argTypes: {
  heading: {
    type: 'string',
    defaultValue: 'Heading text',  // OLD
  },
}
```

**After (modern):**

```javascript
argTypes: {
  heading: {
    type: 'string',
  },
},
args: {
  heading: 'Heading text',  // MODERN
}
```

### 5. Test All Permutations

Every playground story should test:

- All themes (section and/or component)
- All variations (layouts, positions, etc.)
- Key combinations (theme + accent, theme + layout, etc.)

See `components/_storybook/TESTING.md` for VRT requirements.

## Anti-Patterns

### ❌ Don't Hardcode Theme Arrays

```javascript
// BAD
const themes = ['one', 'two', 'three'];
```

```javascript
// GOOD
import { componentThemes } from '../_storybook/theme-constants.js';
```

### ❌ Don't Use Inline Styles

```javascript
// BAD
<h3 style="color: #222;">Theme: one</h3>
```

```javascript
// GOOD
<h3 class="sb-section__subheading">Theme: one</h3>
```

### ❌ Don't Duplicate Iteration Logic

```javascript
// BAD - duplicated 52 times
${themes.map(t => `<div>${componentTwig({theme: t})}</div>`).join('')}
```

```javascript
// GOOD - use utility
${createThemeVariations((t) => componentTwig({theme: t}), themes, 'Title')}
```

### ❌ Don't Use defaultValue in argTypes

```javascript
// BAD (deprecated)
argTypes: {
  heading: {
    type: 'string',
    defaultValue: 'Text',
  },
}
```

```javascript
// GOOD (modern)
argTypes: {
  heading: { type: 'string' },
},
args: {
  heading: 'Text',
}
```

### ❌ Don't Extract All Logic

Keep component-specific logic in the story with good comments:

```javascript
// GOOD - component-specific logic stays in story
const config = {
  ...baseConfig,
  // Accordion needs expanded state for VRT screenshots
  accordion__expanded: theme === 'one',
  theme,
};
```

Only extract truly reusable patterns.

## YAML-Driven Props Pattern

Components use a YAML-driven props system for defining Storybook controls and MDX documentation tables from a single source of truth.

### Component Props File

Each component has a `[component]-props.yml` file:

```yaml
# [component]-props.yml
myProp:
  twigProp: my_twig__prop # snake_case Twig variable name
  name: My Prop Label # display name in controls
  type: string # string | boolean | select | number | array
  required: false
  description: Short description for the controls panel
  detail: > # optional: longer description for docs tables
    More detailed explanation...
  default: someValue # only if the Twig template has |default('someValue')
  control: text # text | boolean | select | number (omit for docs-only)
  options: # only for select type
    - option1
    - option2
```

### In Story Files

```javascript
import { toArgTypes, toArgs } from '../_storybook/component-props';
import componentProps from './[component]-props.yml';

export default {
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};
```

### In MDX Documentation

```mdx
import { twigPropsTable } from '../../_storybook/twig-props-table.mdx';
import componentProps from './[component]-props.yml';

### Required Properties

{twigPropsTable(componentProps, 'required')}

### Optional Properties

{twigPropsTable(componentProps, 'optional')}
```

### Key Rules

- **`default` field**: Must match the actual Twig `|default()` value. Story-preferred demo values belong in `args`, not YAML.
- **YAML keys**: Top-level keys are camelCase Storybook arg names; `twigProp` is the snake_case Twig variable.
- **Omit `control`**: For props that are documentation-only (no interactive control), omit the `control` field.
- **Omit `twigProp`**: For Storybook-only toggles with no Twig counterpart, omit `twigProp` and add a `detail` explanation.

## Additional Resources

- **Template**: `TEMPLATE-playground-story.js` (root of component library)
- **Theme Documentation**: `components/00-introduction/themes.stories.js`
- **Testing Guide**: `components/_storybook/TESTING.md`
- **VRT Data**: `components/_storybook/vrt-combinations.yml`
- **Component Props Files**: `[component]-props.yml` — YAML props file for each component (single source of truth)
- **Component Props Utilities**: `components/_storybook/component-props.js` — `toArgTypes` and `toArgs` utilities
- **Props Table Component**: `components/_storybook/twig-props-table.mdx` — `twigPropsTable` utility for MDX docs

## Questions or Issues?

If you find patterns that should be added to utilities or have questions about best practices, please update this documentation or discuss with the team.
