# Storybook Migration Guide

This guide explains the new two-page documentation structure for the YaleSites Component Library Storybook and provides instructions for migrating existing components to the new format.

## Overview

The YaleSites Component Library has adopted a modern, two-page documentation structure for components:

1. **Documentation Page (MDX)**: Educational content, properties, usage guidelines, and key examples
2. **Visual Regression Page (Visreg)**: Interactive controls and comprehensive variations for visual regression testing

This structure separates documentation concerns from testing concerns, making Storybook easier to navigate and more useful for both developers and designers.

## New Documentation Structure

### Component Folder Structure

After migration, each component will have the following structure:

```
components/02-molecules/[component]/
├── [component].mdx              # Doc page: intro, properties, key variants
├── [component].stories.js       # Primary stories (referenced by MDX, hidden from sidebar)
├── [component].visreg.stories.js # VRT page: controls + all variations
├── yds-[component].twig         # Twig template
├── yds-[component].js           # JavaScript (if needed)
└── _yds-[component].scss        # Styles
```

**Important**: The `[component].stories.js` file should have `tags: ['!dev']` added to its default export to hide it from the Storybook sidebar, since users will interact with it through the MDX doc page.

### Navigation Pattern

Components will appear in the Storybook sidebar with the following structure:

```
Molecules/
└── Component Name/
    ├── Component Name (MDX doc page)
    └── Visreg (VRT testing page)
```

Example:
```
Molecules/
└── Accordion/
    ├── Accordion
    └── Visreg
```

## Page 1: Documentation (MDX)

**File**: `[component].mdx`

**Purpose**: Educate developers on component usage

**Contents**:
- Brief introduction (2-3 sentences)
- Interactive preview with controls
- Properties documentation (required/optional tables)
- Theme options explanation
- Important variants ONLY (2-4 max, not all variations)
- Technical specifications (atomic level, files, accessibility, behavior)
- Usage notes and best practices
- Link to Visreg page

**Key Principle**: MDX is for documentation, not story definitions. Import and reference stories from `.stories.js` files.

### MDX Template Usage

Copy `TEMPLATE-doc-page.mdx` and customize:

1. Update imports to reference your component stories
2. Replace placeholder component names
3. Write clear introduction and usage guidelines
4. Document all properties in tables
5. Include 2-4 key variants (not all variations)
6. Add accessibility and behavior notes
7. Update links to Visreg page

### MDX Example

```mdx
import { Meta, Canvas, Controls } from '@storybook/blocks';
import * as AccordionStories from './accordion.stories';

<Meta of={AccordionStories} />

# Accordion

The accordion component allows users to show and hide sections of related content...

## Interactive Preview

<Canvas of={AccordionStories.Accordion} />
<Controls of={AccordionStories.Accordion} />

## Properties

### Required Properties

Use HTML tables for better rendering in Storybook MDX:

```html
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>accordion__items</code></td>
      <td><code>array</code></td>
      <td>Array of accordion items...</td>
    </tr>
  </tbody>
</table>
```

...
```

## Page 2: Visual Regression (JS)

**File**: `[component].visreg.stories.js`

**Purpose**: Visual regression testing with all variations

**Contents**:
- Interactive controls section (responds to Storybook controls)
- Prominent visual divider
- VRT section heading and description
- All theme variations using `createThemeVariations()`
- All component variations using `createVariations()`
- Comprehensive coverage for Percy snapshots

### Visreg Template Usage

Copy `TEMPLATE-playground-story.js` and customize:

1. Rename to `[component].visreg.stories.js`
2. Update title to `'Category/ComponentName/Visreg'`
3. Rename export from `Playground` to `Visreg`
4. Add VRT divider after interactive section
5. Add all theme and component variations

### Visreg Example

```javascript
export default {
  title: 'Molecules/Accordion/Visreg',
  argTypes: { /* ... */ },
  args: { /* ... */ },
};

export const Visreg = ({ /* args */ }) => {
  return `
    <!-- Interactive controls section -->
    ${createPlaygroundIntro('...')}
    ${componentTwig({ /* ... */ })}

    <!-- VRT DIVIDER -->
    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 1rem; line-height: 1.5;">
        The sections below show all variations for visual regression testing.
      </p>
    </div>

    <!-- All VRT sections -->
    ${createThemeVariations(/* ... */)}
    ${createVariations(/* ... */)}
  `;
};
```

## Migration Steps

### Migrating an Existing Component

Follow these steps to migrate a component to the new structure:

#### 1. Create the MDX Documentation Page

```bash
# Copy the template
cp TEMPLATE-doc-page.mdx components/[atomic-level]/[component]/[component].mdx
```

Edit the MDX file:
- [ ] Update imports to reference your component stories
- [ ] Write introduction (2-3 sentences)
- [ ] Add interactive preview
- [ ] Document all properties (required/optional tables)
- [ ] Add theme options section (if applicable)
- [ ] Include 2-4 important variants (not all)
- [ ] Add technical specifications
- [ ] Write usage guidelines and best practices
- [ ] Update link to Visreg page

**Also update the original stories file:**
- [ ] Add `tags: ['!dev']` to the default export in `[component].stories.js` to hide it from the sidebar (users will interact with it through the MDX page)

#### 2. Convert Playground to Visreg

If component already has a `.playground.stories.js` file:

```bash
# Rename the file
mv components/[atomic-level]/[component]/[component].playground.stories.js \
   components/[atomic-level]/[component]/[component].visreg.stories.js
```

Update the file:
- [ ] Change title from `'Category/Component/Playground'` to `'Category/Component/Visreg'`
- [ ] Rename export from `Playground` to `Visreg`
- [ ] Add VRT divider after interactive section:
  ```javascript
  <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

  <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
    <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
    <p style="margin: 0; font-size: 1rem; line-height: 1.5;">
      The sections below show all variations of the [component] component for visual regression testing.
      These are static examples captured by Percy for automated visual testing.
    </p>
  </div>
  ```
- [ ] Ensure all VRT sections use `createThemeVariations()` and `createVariations()`

If component doesn't have a playground story:

```bash
# Copy the template
cp TEMPLATE-playground-story.js components/[atomic-level]/[component]/[component].visreg.stories.js
```

Then customize following the Visreg template usage instructions above.

#### 3. Test the Migration

```bash
# Start Storybook
npm run storybook
```

Manual testing checklist:
- [ ] MDX page loads without errors
- [ ] Story imports work correctly in MDX
- [ ] Canvas previews render properly
- [ ] Controls panel functions
- [ ] Link to Visreg page works
- [ ] Visreg page loads without errors
- [ ] VRT divider is clearly visible
- [ ] Theme variations render correctly
- [ ] Navigation sidebar structure is correct
- [ ] No browser console errors

#### 4. Lint and Fix

```bash
# Run linting
npm run lint:js

# Fix issues
npm run lint:js -- --fix
```

## Migration Checklist

Use this checklist when migrating a component:

### Pre-Migration
- [ ] Understand the component's purpose and use cases
- [ ] Review existing stories and playground examples
- [ ] Identify key variants (not all variations)
- [ ] Note any special behavior or accessibility features

### MDX Documentation Page
- [ ] File created: `[component].mdx`
- [ ] Imports reference correct story file
- [ ] Introduction written (2-3 sentences)
- [ ] Interactive preview added with Canvas and Controls
- [ ] Required properties documented in table
- [ ] Optional properties documented in table
- [ ] Theme options section added (if applicable)
- [ ] 2-4 key variants included (not all)
- [ ] Technical specifications added (atomic level, files)
- [ ] Accessibility notes documented
- [ ] Behavior section explains functionality
- [ ] Usage guidelines written
- [ ] Link to Visreg page works

### Visreg Testing Page
- [ ] File renamed/created: `[component].visreg.stories.js`
- [ ] Title updated to `'Category/Component/Visreg'`
- [ ] Export renamed to `Visreg`
- [ ] Interactive controls section works
- [ ] VRT divider added (with styled heading)
- [ ] Section theme variations added
- [ ] Component theme variations added (if applicable)
- [ ] All major variations included
- [ ] No linting errors

### Testing
- [ ] Both pages load without errors
- [ ] Navigation between pages works
- [ ] Controls function correctly
- [ ] Theme variations render
- [ ] No console errors
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)

### Cleanup
- [ ] Old playground file removed (if renamed)
- [ ] No dead links in documentation
- [ ] Linting passes
- [ ] Git commit with clear message

## Benefits of New Structure

### For Developers
- **Clearer Documentation**: MDX pages focus on education, not testing
- **Better Organization**: Separation of concerns between docs and VRT
- **Easier Navigation**: Two-page structure is more intuitive
- **Comprehensive Testing**: Visreg pages ensure all variations are tested

### For Designers
- **Better Overview**: MDX pages highlight key variants, not overwhelming options
- **Usage Context**: Documentation explains when and how to use components
- **Design Review**: Visreg pages show all variations for thorough review

### For QA
- **Comprehensive Coverage**: Visreg pages ensure all variations are captured
- **Visual Testing**: Percy snapshots catch regressions automatically
- **Clear Expectations**: Documentation sets clear standards for implementation

## Example Implementations

Two pilot components have been fully migrated and serve as reference examples:

### Accordion
- **MDX Doc**: `components/02-molecules/accordion/accordion.mdx`
- **Visreg**: `components/02-molecules/accordion/accordion.visreg.stories.js`
- **View**: [Storybook Accordion](?path=/story/molecules-accordion--docs)

### Alert
- **MDX Doc**: `components/02-molecules/alert/alert.mdx`
- **Visreg**: `components/02-molecules/alert/alert.visreg.stories.js`
- **View**: [Storybook Alert](?path=/story/molecules-alert--docs)

## Rollout Strategy

Migration will happen in phases:

1. **Phase 1 - Pilots** ✅: Accordion and Alert (complete)
2. **Phase 2 - Organisms**: Most complex components (10-15 components)
3. **Phase 3 - Frequent Molecules**: Commonly used molecules (20-30 components)
4. **Phase 4 - Remaining Molecules**: Less frequently used molecules (20-30 components)
5. **Phase 5 - Atoms**: Consider grouping related atoms in single MDX docs

## Technical Notes

### MDX and Twig Integration

MDX files cannot directly render Twig templates. Solution:
- Import stories from `.stories.js` files
- Reference using `<Canvas of={ComponentStories.StoryName} />`
- Stories render Twig templates via component functions

### Naming Conventions

- MDX files: `[component].mdx`
- Story files: `[component].stories.js`
- Visreg files: `[component].visreg.stories.js`
- Export name: `Visreg` (not `Playground`)

### Theme Variations

Use utility functions from `playground-utils.js`:
- `createThemeVariations()`: For section and component theme variations
- `createVariations()`: For component-specific variations (layout, position, etc.)
- `createThemeAccentCombinations()`: For theme + accent pairs (site header, etc.)

## Troubleshooting

### MDX Page Not Loading
- Check that imports reference the correct story file path
- Verify story exports match what's imported
- Check browser console for specific errors

### Visreg Controls Not Working
- Ensure argTypes are properly defined
- Verify args default values are set
- Check that component function uses the args correctly

### VRT Divider Not Showing
- Make sure the HR element has inline styles
- Check that the div wrapper has proper styling
- Verify no CSS is overriding the styles

### Stories Not Rendering in MDX
- Import path must be correct
- Story export name must match
- Use `<Canvas of={Stories.StoryName} />` syntax

## Questions and Support

If you encounter issues or have questions:
1. Review the pilot examples (Accordion and Alert)
2. Check this migration guide
3. Review Storybook 8.3 MDX documentation: https://storybook.js.org/docs/writing-docs/mdx
4. Reach out to the design system team

## Resources

- **Templates**: `TEMPLATE-doc-page.mdx`, `TEMPLATE-playground-story.js`
- **Utilities**: `components/_storybook/playground-utils.js`
- **Theme Constants**: `components/_storybook/theme-constants.js`
- **Pilot Examples**: Accordion and Alert components
- **Storybook Docs**: https://storybook.js.org/docs/writing-docs/mdx

---

**Last Updated**: 2026-01-28
**Related**: GitHub Issue #949 - Storybook Winter Cleaning 2026
