/**
 * Builds one visual-regression story per global theme.
 *
 * This is the canonical explanation of the visreg story shape; STORYBOOK.md and
 * `global-theme-stories.test.mjs` point here rather than repeating it.
 *
 * Visual regression snapshots have a hard pixel-area ceiling -- Chromatic
 * rejects anything over 25,000,000px -- and stacking all seven global themes
 * into a single story put most components several times past it. Each global
 * theme therefore gets its own story, which also makes a snapshot diff readable
 * without counting theme wrappers. (The 25,000,000px figure is Chromatic's,
 * which is what this shape is for; `npm run visreg:ci` runs Percy today.)
 *
 * Usage, in a `*.visreg.stories.js` file:
 *
 *   const themeStories = createGlobalThemeStories(
 *     renderGlobalTheme,
 *     globalThemes,
 *     globalThemeLabels,
 *   );
 *
 *   export const OldBlues = themeStories.one;
 *   export const NewHavenGreen = themeStories.two;
 *   // ...one export per global theme
 *
 * Three rules that are not obvious, all pinned by the test:
 *
 * 1. **Do not collapse those exports into one destructured export.**
 *    Storybook's static CSF indexer only reads export declarators whose id is a
 *    plain identifier, so `export const { OldBlues, ... } = ...` indexes as
 *    *zero* stories and the component silently drops out of visual regression
 *    altogether -- the exact failure this shape exists to prevent, but invisible.
 * 2. **A `storyName` override must be a static top-level string assignment.**
 *    The indexer reads `ItsYourYale.storyName = '...'` from the source; a name
 *    set inside this factory at runtime would not reach the index. Only the
 *    theme whose label contains a curly apostrophe needs one -- Storybook
 *    derives the other six correctly from the export name.
 * 3. **Content that cannot vary by global theme belongs in its own story**,
 *    not repeated inside all seven. See the banner components for examples.
 *
 * A few components are big enough that even one global theme exceeds the
 * ceiling. Those use `createGlobalThemeSectionStories` instead, which splits on
 * section theme as well.
 *
 * This module is `.mjs`, and takes its themes and labels as arguments rather
 * than importing them, so the Node test runner can exercise it directly:
 * `theme-constants.js` imports `tokens.json` without an import attribute, which
 * plain Node refuses to load.
 */

/**
 * Wraps one theme's content in the Storybook section chrome.
 *
 * The `data-global-theme` wrapper is what actually applies the theme: it
 * overrides the value `.storybook/preview.js` sets on `<body>` for its own
 * subtree.
 *
 * @param {string} theme - Global theme key, e.g. `one`.
 * @param {string} heading - Heading text naming what is being rendered.
 * @param {string} content - Rendered markup.
 *
 * @return {string} The story markup.
 */
const renderThemeSection = (theme, heading, content) => `
  <h2 class="sb-section__heading">${heading}</h2>
  <hr class="sb-section__divider">
  <div class="sb-section__container">
    <div data-global-theme="${theme}">
      ${content}
    </div>
  </div>
`;

/**
 * Builds a story per global theme, keyed by global theme.
 *
 * @param {Function} renderFn - Called with a global theme key, returns markup.
 * @param {string[]} themes - Global theme keys, i.e. `globalThemes`.
 * @param {Object} labels - Theme key to human-readable label, i.e.
 *   `globalThemeLabels`.
 *
 * @return {Object} Global theme key to Storybook story function.
 */
export const createGlobalThemeStories = (renderFn, themes, labels) =>
  Object.fromEntries(
    themes.map((theme) => [
      theme,
      () =>
        renderThemeSection(
          theme,
          `Global Theme: ${labels[theme]}`,
          renderFn(theme),
        ),
    ]),
  );

/**
 * Builds a story per global theme *and* section theme, for components too tall
 * to fit a whole global theme in one snapshot.
 *
 * @param {Function} renderFn - Called with a section theme key and a global
 *   theme key, returns markup. Most callers only need the section theme, since
 *   the global theme is applied by the wrapper rather than by the content.
 * @param {string[]} themes - Global theme keys, i.e. `globalThemes`.
 * @param {string[]} sections - Section theme keys, i.e. `sectionThemes`.
 * @param {Object} labels - Theme key to human-readable label, i.e.
 *   `globalThemeLabels`.
 *
 * @return {Object} Global theme key to section theme key to story function.
 */
export const createGlobalThemeSectionStories = (
  renderFn,
  themes,
  sections,
  labels,
) =>
  Object.fromEntries(
    themes.map((theme) => [
      theme,
      Object.fromEntries(
        sections.map((section) => [
          section,
          () =>
            renderThemeSection(
              theme,
              `Global Theme: ${labels[theme]}, Section Theme: ${section}`,
              renderFn(section, theme),
            ),
        ]),
      ),
    ]),
  );
