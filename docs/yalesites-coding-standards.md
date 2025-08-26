# YaleSites Component Library Coding Standards

## Overview

This document outlines the coding standards and conventions used in the YaleSites component library to ensure consistency, maintainability, and quality across all contributions. These standards should be followed by all developers, including third-party vendors contributing to the project.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Naming Conventions](#naming-conventions)
3. [File Organization](#file-organization)
4. [Twig Template Standards](#twig-template-standards)
5. [SCSS/CSS Standards](#scsscss-standards)
6. [JavaScript Standards](#javascript-standards)
7. [Design Patterns & Best Practices](#design-patterns--best-practices)
8. [Code Quality & Linting](#code-quality--linting)
9. [Git Workflow & Commits](#git-workflow--commits)
10. [Documentation Standards](#documentation-standards)
11. [Testing Standards](#testing-standards)
12. [Development Environment](#development-environment)

---

## Project Structure

### Atomic Design Methodology

The project follows **Atomic Design** principles with a structured component hierarchy:

```
components/
├── 00-tokens/          # Design tokens (colors, typography, spacing)
├── 01-atoms/           # Basic building blocks (buttons, inputs, typography)
├── 02-molecules/       # Groups of atoms (forms, cards, navigation items)
├── 03-organisms/       # Groups of molecules (headers, sections, sidebars)
├── 04-page-layouts/    # Full page layout templates
├── 05-page-examples/   # Complete page demonstrations
└── _settings/          # Global SCSS settings and configurations
```

### Component Directory Structure

Each component follows a consistent directory structure:

```
component-name/
├── yds-component-name.twig          # Main Twig template
├── _yds-component-name.scss         # Component styles
├── _yds-component-name-examples.twig # Usage examples (optional)
├── component-name.stories.js        # Storybook stories
└── yds-component-name.js           # Component JavaScript (if needed)
```

---

## Naming Conventions

### General Principles

- **Prefix**: All YaleSites components use the `yds-` prefix
- **Case**: Use kebab-case for file names and CSS classes
- **Descriptive**: Names should be clear and descriptive of functionality

### File Naming

| File Type | Pattern | Example |
|-----------|---------|---------|
| Twig Templates | `yds-{component-name}.twig` | `yds-cta.twig` |
| SCSS Files | `_yds-{component-name}.scss` | `_yds-cta.scss` |
| JavaScript Files | `yds-{component-name}.js` | `yds-modal.js` |
| Stories | `{component-name}.stories.js` | `cta.stories.js` |
| Examples | `_yds-{component-name}-examples.twig` | `_yds-cta-examples.twig` |

### CSS Class Naming

- **Base classes**: Use component name as base class (e.g., `.cta`)
- **Modifiers**: Use data attributes for variations (e.g., `data-cta-style="outline"`)
- **Child elements**: Use BEM-like syntax (e.g., `.cta__icon`)

### Variable Naming

- **Twig variables**: Use double underscore syntax (e.g., `cta__content`, `cta__href`)
- **SCSS variables**: Use kebab-case with descriptive prefixes (e.g., `$component-cta-themes`)

---

## File Organization

### Component Template Structure

**Required files for each component:**
- Main Twig template (`yds-{name}.twig`)
- SCSS file (`_yds-{name}.scss`)

**Optional files:**
- JavaScript file (`yds-{name}.js`)
- Examples template (`_yds-{name}-examples.twig`)
- Storybook stories (`{name}.stories.js`)

### Import Patterns

**SCSS imports should follow this order:**
1. External dependencies
2. Tokens and design system imports
3. Local utility imports

```scss
@use 'sass:selector';
@use '~@yalesites-org/tokens/build/scss/tokens' as sass-tokens;
@use '../../../00-tokens/functions/map';
@use '../../../00-tokens/tokens';
```

---

## Twig Template Standards

### Template Documentation

Every Twig template must include comprehensive documentation:

```twig
{#
 # Available props:
 # - cta__content: the content of the cta (typically text)
 # - cta__href: the URL the link points to
 # - cta__style: filled (default) or outline
 # - cta__radius: none (default), soft, or pill
 # - cta__hover_style: fade (default), rise, or swipe
 #
 # Available variables:
 # - cta__component_theme: theme variation for the component
 #}
```

### Variable Patterns

1. **Default values**: Always provide sensible defaults
```twig
{% set cta__element = cta__element|default('button') %}
{% set cta__attributes = cta__attributes|default({}) %}
```

2. **Attribute merging**: Use consistent patterns for merging attributes
```twig
{% set cta__attributes = cta__attributes|merge({
  'data-cta-hover-style': cta__hover_style|default('fade'),
  'data-cta-radius': cta__radius|default('none'),
}) %}
```

3. **Component inheritance**: Use the base component pattern
```twig
{% include "@atoms/controls/base/yds-control.twig" with {
  control__base_class: cta__base_class,
  control__modifiers: cta__modifiers,
  control__attributes: cta__attributes,
  control__content: cta__content,
} %}
```

### Accessibility Standards

- Always include appropriate ARIA attributes
- Ensure semantic HTML elements are used
- Provide fallbacks for screen readers
- Follow WCAG 2.1 AA guidelines

---

## SCSS/CSS Standards

### Architecture

1. **Component-based SCSS**: Each component has its own SCSS file
2. **Token-based design**: Use design tokens for consistency
3. **CSS Custom Properties**: Leverage CSS variables for theming

### SCSS Patterns

**Mixin definition:**
```scss
@mixin cta {
  border: var(--border-thickness-cta, var(--border-thickness-2)) solid var(--color-cta-border);
  border-radius: var(--border-radius-cta, var(--radius-0));
  background-color: var(--color-cta-bg);
  // ... additional styles
}
```

**Component theming:**
```scss
@each $theme, $value in $component-cta-themes {
  &[data-cta-theme='#{$theme}'] {
    --color-slot-one: var(--button-cta-themes-#{$theme}-slot-one);
    --color-slot-two: var(--button-cta-themes-#{$theme}-slot-two);
  }
}
```

### CSS Custom Properties

- Use CSS custom properties for theming and variations
- Follow consistent naming patterns: `--color-{component}-{property}`
- Provide fallback values where appropriate

### Responsive Design

- Use design tokens for breakpoints
- Mobile-first approach
- Test across all supported devices

---

## JavaScript Standards

### Code Style

- Follow the shared ESLint configuration: `@yalesites-org/eslint-config-and-other-formatting`
- Use modern ES6+ syntax
- Prefer const/let over var
- Use arrow functions where appropriate

### Drupal Integration

```javascript
// Global objects available in Drupal context
// - Drupal: Drupal core object
// - jQuery: jQuery library
// - once: Drupal's once library
```

### Module Pattern

Use Drupal's behavior pattern for component initialization:

```javascript
(function(Drupal, once) {
  'use strict';

  Drupal.behaviors.ydsComponentName = {
    attach: function(context, settings) {
      once('yds-component-name', '.component-selector', context).forEach(function(element) {
        // Component initialization logic
      });
    }
  };
})(Drupal, once);
```

---

## Design Patterns & Best Practices

### Component Inheritance Pattern

YaleSites uses a base component inheritance system to reduce code duplication and ensure consistency:

**Base Component (`yds-control.twig`):**
```twig
{# Base control handles common functionality #}
{% if control__url|length > 0 %}
  {% set control__element = 'a' %}
  {% set control__attributes = control__attributes|merge({href: control__url}) %}
{% else %}
  {% set control__element = control__element|default('button') %}
{% endif %}

<{{ control__element }} {{ add_attributes(control__attributes) }}>
  {{- control__content -}}
</{{ control__element }}>
```

**Specific Component (`yds-cta.twig`):**
```twig
{# CTA component extends base with specific functionality #}
{% include "@atoms/controls/base/yds-control.twig" with {
  control__base_class: cta__base_class,
  control__modifiers: cta__modifiers,
  control__attributes: cta__attributes,
  control__content: cta__content,
  control__element: cta__element,
} %}
```

### Data Attribute Theming System

Use data attributes instead of BEM modifiers for component variations:

```twig
{# Set data attributes for styling hooks #}
{% set cta__attributes = cta__attributes|merge({
  'data-cta-hover-style': cta__hover_style|default('fade'),
  'data-cta-radius': cta__radius|default('none'),
  'data-cta-style': cta__style|default('filled'),
}) %}
```

```scss
// Style based on data attributes
.cta {
  &[data-cta-style='filled'] {
    background-color: var(--color-cta-bg);
  }
  
  &[data-cta-style='outline'] {
    background-color: transparent;
  }
}
```

### CSS Custom Property Cascading

Establish a clear hierarchy for CSS custom properties:

```scss
// 1. Global theme slots
[data-global-theme='#{$theme}'] & {
  --color-slot-one: var(--global-themes-#{$theme}-colors-slot-one);
}

// 2. Component-level defaults
&[data-cta-theme='#{$theme}'] {
  --color-cta-action: var(--color-slot-one);
}

// 3. Specific implementations
&[data-cta-style='filled'] {
  --color-cta-bg: var(--color-cta-action);
}
```

### Token Import Pattern

Always import design tokens consistently at the top of SCSS files:

```scss
@use 'sass:selector';
@use '~@yalesites-org/tokens/build/scss/tokens' as sass-tokens;
@use '../../../00-tokens/functions/map';
@use '../../../00-tokens/tokens';

$component-themes: map.deep-get(tokens.$tokens, 'component-themes');
```

### Drupal Behavior Integration

Use Drupal's `once` library for component initialization:

```javascript
(function(Drupal, once) {
  'use strict';

  Drupal.behaviors.ydsComponentName = {
    attach: function(context, settings) {
      once('yds-component-name', '.component-selector', context).forEach(function(element) {
        // Initialization logic here
        // This ensures the behavior only runs once per element
      });
    }
  };
})(Drupal, once);
```

### Component Composition

Build complex components by composing simpler ones:

```twig
{# Complex component built from atoms #}
<div class="card">
  {% include "@atoms/images/yds-image.twig" with image_data %}
  
  <div class="card__content">
    {% include "@atoms/typography/yds-heading.twig" with heading_data %}
    {% include "@atoms/typography/yds-text.twig" with body_data %}
    {% include "@atoms/controls/cta/yds-cta.twig" with cta_data %}
  </div>
</div>
```

### Storybook Story Organization

Structure stories to show different use cases:

```javascript
export default {
  title: 'Atoms/Controls/CTA',
  argTypes: {
    // Define controls for interactive testing
  },
};

// Default story
export const Default = (args) => template(args);

// Variation stories
export const Variations = () => {
  // Show all variations in one story
};

// Examples story
export const Examples = () => {
  // Real-world usage examples
};
```

### Error Prevention Patterns

**Always provide fallbacks:**
```twig
{# Provide sensible defaults #}
{% set component__element = component__element|default('div') %}
{% set component__content = component__content|default('') %}

{# Check for required data #}
{% if component__required_data is not empty %}
  {# Render component #}
{% else %}
  {# Provide fallback or log error #}
{% endif %}
```

**Validate data types:**
```twig
{# Ensure arrays are actually arrays #}
{% set items = items|default([]) %}
{% if items is iterable %}
  {% for item in items %}
    {# Safe to iterate #}
  {% endfor %}
{% endif %}
```

---

## Code Quality & Linting

### Required Tools

All code must pass through the following quality gates:

1. **ESLint**: JavaScript linting
2. **Stylelint**: SCSS/CSS linting  
3. **Prettier**: Code formatting
4. **Commitlint**: Commit message standards

### Configuration

The project uses shared configurations:
- ESLint: `@yalesites-org/eslint-config-and-other-formatting`
- Prettier: `@yalesites-org/eslint-config-and-other-formatting/prettier.config`
- Stylelint: `@yalesites-org/eslint-config-and-other-formatting/stylelint.config`

### Pre-commit Hooks

All changes are automatically validated using Husky pre-commit hooks:
- Code formatting check with Prettier
- JavaScript linting with ESLint
- SCSS linting with Stylelint
- Commit message validation

### Lint-staged Configuration

```json
{
  "components/**/*.scss": ["npm run lint:styles -- --fix"],
  "components/**/*.js": ["npm run lint:js -- --fix"],
  "components/**/*.{js,scss,php}": ["npm run prettier -- --write"]
}
```

---

## Git Workflow & Commits

### Branch Strategy

- **Main branch**: `main` - Production-ready code
- **Development branch**: `develop` - Integration branch for features
- **Feature branches**: Follow specific naming conventions based on origin:
  - **YaleSites Jira tickets**: `YSP-xxx-shortened-desc-of-feature` (where xxx is the Jira ticket number)
  - **School/project branches**: `{SCHOOL}-description` (3-letter school/project abbreviation + description)
    - Example: `IYY-new-feature`, `SOM-button-improvements`, `LAW-accessibility-fix`
- **Hotfix branches**: Prepend `hotfix/` to the standard pattern:
  - `hotfix/YSP-xxx-critical-fix`
  - `hotfix/IYY-urgent-patch`

### Commit Standards

Follow **Conventional Commits** specification with YaleSites-specific scope requirements:

```
<type>(scope): <description>

[body - strongly recommended]

[optional footer(s)]
```

**Scope Requirements:**
- **YaleSites tickets**: Use full ticket number (e.g., `YSP-333`)
- **School/project work**: Use 3-letter abbreviation (e.g., `IYY`, `SOM`, `LAW`)
- **Scope must match your branch naming pattern**

**Body is strongly recommended** - provide context for:
- What the change does and why
- Any technical decisions made
- Impact on other components
- References to related issues or discussions

**Allowed types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(IYY): add hover animation variants

Add three new hover animation options (fade, rise, wipe) to provide
more visual feedback options for different design contexts. This
supports the new interactive design requirements from the IYY project.

fix(YSP-333): resolve accessibility issue with focus states

Ensures focus indicators are visible in high contrast mode and
meet WCAG 2.1 AA contrast requirements. The previous implementation
was failing automated accessibility tests in certain browsers.

docs(SOM): update component usage guidelines

Added examples for the new theming system to help developers
understand the data attribute patterns.
```

### Pull Request Process

1. Create feature branch from `develop`
2. Implement changes following these standards
3. Create **draft PR** initially
4. **Label the PR** based on status:
   - `Work in Progress` - if still actively developing
   - `Needs review` - if completed and ready for review
5. **Assign yourself** as the person working on the PR
6. **Add required reviewers**:
   - One developer representative
   - UX representative  
   - Accessibility representative
   - Any other interested parties with GitHub access to the repo
7. Ensure all CI checks pass (runs automatically, even on draft PRs)
8. When ready for review, mark as "Ready for Review"
9. Address any feedback from reviewers promptly and thoroughly
10. Once **all reviewer types** have approved, the PR will be labeled `ready to merge`
11. Merge to `develop` using merge commit (only after "ready to merge" label is applied)

---

## Documentation Standards

### Storybook Stories

Every component must include Storybook stories demonstrating:

1. **Default state**: Basic component with minimal props
2. **Variations**: All available style and behavior options
3. **Examples**: Real-world usage scenarios
4. **Accessibility**: Keyboard navigation and screen reader support

### Component Documentation

Include comprehensive documentation for:
- Available props and their types
- Default values
- Usage examples
- Accessibility considerations
- Browser support notes

### Code Comments

- Use clear, concise comments for complex logic
- Document any workarounds or browser-specific code
- Explain the reasoning behind non-obvious decisions

---

## Testing Standards

### Manual Testing Requirements

Before submitting PR, test:
- Keyboard navigation
- Screen reader compatibility
- Multiple browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices
- Different theme variations

---

## Development Environment

### Required Tools

- **Node.js**: Version specified in `.nvmrc`
- **npm**: Package management (see `.npmrc` for registry configuration)
- **Git**: Version control with Husky hooks

### Setup Steps

1. Clone repository
2. Verify Node version: `nvm use`
3. Install dependencies: `npm install`
4. Start development: `npm run develop`

### Available Scripts

```json
{
  "develop": "Concurrent webpack and storybook development",
  "build": "Production build",
  "lint": "Run all linting checks",
  "lint:js": "ESLint JavaScript files",
  "lint:styles": "Stylelint SCSS files", 
  "prettier": "Check code formatting",
  "test": "Run full test suite",
  "storybook": "Start Storybook development server"
}
```

### Environment Variables

Required for GitHub package access:
```bash
export YALESITES_BUILD_TOKEN="your_github_personal_access_token"
```

### IDE Configuration

**VS Code settings** (`.vscode/` directory):
- Prettier formatting on save
- ESLint integration
- SCSS IntelliSense
- Twig syntax highlighting

---

## Contribution Guidelines

### For Third-Party Vendors

1. **Follow all standards**: Ensure code meets quality and style requirements
2. **Test thoroughly**: Include comprehensive testing across browsers and devices
3. **Document changes**: Provide clear documentation for new features
4. **Seek feedback early**: Create draft PRs for architectural discussions
5. **Respond to reviews**: Address all feedback promptly and thoroughly

### Code Review Checklist

- [ ] Follows naming conventions
- [ ] Includes proper documentation
- [ ] Meets accessibility standards
- [ ] Compatible with supported browsers
- [ ] Follows component architecture patterns
- [ ] Includes appropriate Storybook stories
- [ ] No console errors or warnings

### Getting Help

**YaleSites Resources:**
- **Component Library Storybook**: [https://yalesites-org.github.io/component-library-twig](https://yalesites-org.github.io/component-library-twig) - Live examples and documentation
- **Repository README**: [README.md](https://github.com/yalesites-org/component-library-twig/blob/develop/README.md) - Setup and development instructions
- **Existing Components**: Review similar components in the codebase for established patterns

**External Documentation:**
- **Twig Documentation**: [https://twig.symfony.com/doc/](https://twig.symfony.com/doc/) - Template syntax and functions
- **Drupal Documentation**: [https://www.drupal.org/docs](https://www.drupal.org/docs) - General Drupal development
- **Drupal Theming Guide**: [https://www.drupal.org/docs/theming-drupal](https://www.drupal.org/docs/theming-drupal) - Drupal-specific templating

**When Stuck:**
- Ask questions in PR comments during development
- Reference existing components for architectural patterns
- Check the Storybook for component usage examples

---

*This document is a living standard and will be updated as the project evolves. Always refer to the latest version for current guidelines.*