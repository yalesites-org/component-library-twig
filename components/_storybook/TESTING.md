# Visual Regression Testing Guide for Playground Stories

This guide outlines the requirements and best practices for visual regression testing (VRT) in YaleSites playground stories.

## Core Principle

**Test all permutations**: Every playground story should demonstrate all possible visual variations of a component to ensure consistent rendering and catch visual regressions.

## Required VRT Sections

### For Components with Section Themes

If your component appears within a layout section and responds to section theme backgrounds:

- **✅ Required**: "All Section Theme Variations" section
- **Purpose**: Shows component against all 5 section backgrounds (`default`, `one`, `two`, `three`, `four`)
- **Use**: `createThemeVariations()` utility from `playground-utils.js`

**Example**:

```javascript
${createThemeVariations(
  (theme) => componentTwig({ ...config, component__theme: 'one' }),
  sectionThemes,
  'All Section Theme Variations',
  'Component rendered on all section background colors',
  'Section Theme'
)}
```

### For Components with Component Themes (Dial)

If your component has accent color options (the "dial" in CMS):

- **✅ Required**: "All Component Theme Variations" section
- **Purpose**: Shows all 5 component theme accents (`one` through `five`)
- **Use**: `createThemeVariations()` utility

**Example**:

```javascript
${createThemeVariations(
  (theme) => componentTwig({ ...config, component__theme: theme }),
  componentThemes,
  'All Component Theme Variations',
  'Component with all dial color options',
  'Component Theme'
)}
```

### For Components with Custom Variations

If your component has style variations (layout, position, size, etc.):

- **✅ Required**: One VRT section per variation type
- **Purpose**: Shows all options for each variation
- **Use**: `createVariations()` utility

**Example**:

```javascript
// Position variations
${createVariations(
  (position) => componentTwig({ ...config, component__position: position }),
  ['left', 'center', 'right'],
  'All Position Variations',
  'Position'
)}

// Size variations
${createVariations(
  (size) => componentTwig({ ...config, component__size: size }),
  ['small', 'medium', 'large'],
  'All Size Variations',
  'Size'
)}
```

### For Complex Components (e.g., Site Header/Footer)

If your component has both theme AND accent:

- **✅ Required**: "All Theme & Accent Combinations" section
- **Purpose**: Shows representative theme/accent pairs
- **Use**: `createThemeAccentCombinations()` utility with `vrt-combinations.yml` data

**Example**:

```javascript
import vrtCombinations from '../_storybook/vrt-combinations.yml';

${createThemeAccentCombinations(
  (theme, accent) => componentTwig({
    ...config,
    site_header__theme: theme,
    site_header__accent: accent
  }),
  vrtCombinations.themeAccentPairs,
  'All Theme & Accent Combinations'
)}
```

## Pre-Submission Checklist

Before submitting a new or updated playground story, verify:

### Coverage

- [ ] All theme types are tested (section, component, global if applicable)
- [ ] All style variations are tested (position, layout, size, etc.)
- [ ] All boolean flags are tested (with icon vs without, expanded vs collapsed, etc.)
- [ ] Representative combinations are tested (not every permutation, but key ones)

### Code Quality

- [ ] Using utility functions from `playground-utils.js` (not duplicating code)
- [ ] Using theme constants from `theme-constants.js` (not hardcoding arrays)
- [ ] No inline styles in VRT sections (use `.sb-section__*` classes)
- [ ] VRT section titles are descriptive

### User Experience

- [ ] Interactive section has all relevant controls
- [ ] Control labels follow naming conventions (see README.md)
- [ ] VRT sections are clearly separated and labeled
- [ ] Story loads without errors

## Performance Considerations

### Do

- ✅ Use utilities to generate VRT sections (reduces code size)
- ✅ Test representative combinations, not every permutation
- ✅ Group related variations together

### Don't

- ❌ Test every possible combination of multiple variables (combinatorial explosion)
- ❌ Duplicate large data structures across sections
- ❌ Create excessive nesting of variations

**Example**: For a component with 5 themes, 3 positions, and 2 sizes:

- **Don't**: 5 × 3 × 2 = 30 variations (too many)
- **Do**: 5 themes + 3 positions + 2 sizes = 10 variations (test each independently)

## Special Cases

### Multi-Component Stories

If your playground story includes multiple related components (e.g., different banner types):

- Test all variations for EACH component
- Use clear section headings to separate components
- Consider if components should be in separate stories

### Components with Data Dependencies

If your component requires complex data (menus, cards, etc.):

- Extract data to YML files (see README.md "When to Extract Data to YML")
- Import and use in both interactive and VRT sections
- Keep data DRY (don't duplicate)

### Components with Icons

If your component has optional icons:

- Test with and without icon
- Use `icon-utils.js` for icon handling
- Include icon variations in VRT sections

## Examples in Codebase

**Good examples to reference**:

- `components/03-organisms/calendar/calendar.playground.stories.js` - Clean structure
- `components/03-organisms/site-header/site-header.playground.stories.js` - Complex theme/accent combinations
- `components/02-molecules/accordion/accordion.playground.stories.js` - Standard pattern

## Questions?

See `components/_storybook/README.md` for full developer documentation.
