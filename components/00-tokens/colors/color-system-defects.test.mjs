/**
 * Guards the color-system defects fixed in YaleSites-Internal#1628 (Color
 * Surface, Phase 0).
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/00-tokens/colors/color-system-defects.test.mjs
 *
 * Why these are tests at all: every defect below compiles cleanly and fails
 * silently at runtime. A `var()` naming a custom property that was never
 * declared is invalid-at-computed-value-time -- the declaration is dropped and
 * the element keeps whatever it inherited, so the build is green, Storybook
 * renders, and the only symptom is a colour that is wrong (or a divider that is
 * not there) on one section theme. Nothing else in the pipeline catches that,
 * which is how each of these survived a review.
 *
 * Scope note: the sibling defect in this phase -- component themes four and
 * five publishing `--component-themes-four-colors-slot-*` instead of the flat
 * `--component-themes-four-slot-*` -- is fixed in the `tokens` repo and is
 * deliberately NOT asserted here. This suite runs against the *published*
 * `@yalesites-org/tokens` package, so asserting the fixed shape would fail CI
 * until a tokens release ships and is bumped here. See the PR body.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const colorsDir = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.resolve(colorsDir, '..', '..');

/** Every .scss file under components/, as [relativePath, contents] pairs. */
function readAllScss(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      return readAllScss(full);
    }
    if (!entry.endsWith('.scss')) {
      return [];
    }
    return [[path.relative(componentsDir, full), readFileSync(full, 'utf8')]];
  });
}

/**
 * Drop a trailing `//` comment without touching `//` that is part of the value.
 *
 * A blanket `.replace(/\/\/.*$/, '')` would also cut at the `//` in
 * `url(https://...)` or inside a quoted string, silently removing source before
 * it is ever scanned. That direction of error is the dangerous one: it can only
 * hide a violation, never invent one, so it would show up as a test that passes
 * when it should fail.
 */
function stripLineComment(line) {
  let quote = null;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (quote) {
      if (char === quote && line[i - 1] !== '\\') quote = null;
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === '/' && line[i + 1] === '/') {
      // `://` is a URL scheme separator, not the start of a comment.
      if (line[i - 1] !== ':') return line.slice(0, i);
    }
  }
  return line;
}

/**
 * Source lines that can affect the compiled CSS, as [lineNumber, line] pairs.
 *
 * Every assertion here is about what the compiled CSS does, so a `--color-*`
 * name mentioned in a comment is not a violation -- two such mentions exist in
 * _yds-pull-quote.scss and they are documentation, not declarations. Both `//`
 * and `/* *\/` comment styles are stripped: the block-comment form is removed
 * first (it can span lines and can also sit mid-line), then any line that is
 * left starting with `//` is dropped.
 */
function codeLines(contents) {
  return contents
    .replace(/\/\*[\s\S]*?\*\//g, (match) => match.replace(/[^\n]/g, ' '))
    .split('\n')
    .map((line, index) => [index + 1, stripLineComment(line)])
    .filter(([, line]) => line.trim() !== '');
}

const scssFiles = readAllScss(componentsDir);

/** Every [file, lineNumber, line] whose code content matches `pattern`. */
function findInScss(pattern) {
  return scssFiles.flatMap(([file, contents]) =>
    codeLines(contents)
      .filter(([, line]) => pattern.test(line))
      .map(([lineNumber, line]) => `${file}:${lineNumber}: ${line.trim()}`),
  );
}

test('scss files were found (guards the walker itself)', () => {
  assert.ok(
    scssFiles.length > 50,
    `expected to walk the component tree, found ${scssFiles.length} .scss files`,
  );
});

/**
 * `--color-layout-theme|content|border` are declared ONLY on `.yds-layout`, and
 * only inside `[data-component-theme='...']`. A component that reads one from
 * somewhere else is reaching back up the tree for a property it cannot see
 * unless it happens to be a descendant of a themed section -- and when it is
 * not, the read resolves to nothing.
 *
 * This is the enforcement half of the ratchet described in the ticket. The
 * containment is also expressed as a stylelint rule (see stylelint.config.js);
 * keeping the assertion here too means it still fails loudly if that lint rule
 * is ever relaxed.
 */
test('--color-layout-* is confined to the layout organism', () => {
  const layoutDir = `03-organisms${path.sep}layout${path.sep}`;
  const violations = findInScss(/--color-layout-/).filter(
    (violation) => !violation.startsWith(layoutDir),
  );

  assert.deepEqual(
    violations,
    [],
    `--color-layout-* may only be used inside 03-organisms/layout/. Read the ` +
      `inheritable section contract instead (--color-section-background / ` +
      `--color-section-foreground / --color-section-accent), with the ` +
      `component's existing colour as the CSS fallback.\n${violations.join(
        '\n',
      )}`,
  );
});

/**
 * `--color-slot-white` is not a token and never was; the slot scale is
 * numbered one..nine. The one use of it silently killed a link colour.
 */
test('--color-slot-white is not referenced (it is not a token)', () => {
  const violations = findInScss(/--color-slot-white/);

  assert.deepEqual(
    violations,
    [],
    `--color-slot-white is undefined. Use --color-basic-white.\n` +
      `${violations.join('\n')}`,
  );
});

/**
 * `:root` colour fallbacks have to bottom out in something real.
 *
 * `--color-action: var(--color-theme-action, var(--color-cta-primary))` named
 * two properties that are both undefined. On a Drupal page `ys_themes` supplies
 * the `--color-theme-*` hook, which masks it; in Storybook, or on a site where
 * the setting is empty, nothing does, and the declaration is
 * invalid-at-computed-value-time. `--color-action` then has a value only where
 * a component happens to assign one, so an outline CTA reading it for its
 * border can lose the border entirely.
 *
 * Asserted over every `--color-*` in the `:root` block rather than the one
 * property that prompted it -- `--color-accent` had the identical defect one
 * line below.
 */
test('every :root color fallback chain ends in a defined value', () => {
  const globalConfig = readFileSync(
    path.join(componentsDir, '_global-config.scss'),
    'utf8',
  );

  // Only the tokens package and the `:root` block itself are in scope at
  // `:root`. A name declared on some component class is NOT -- counting those
  // would let a terminal fallback that `:root` can never see pass as defined.
  const tokensCss = readFileSync(
    require.resolve('@yalesites-org/tokens/build/css/tokens.css'),
    'utf8',
  );
  const rootBlock = globalConfig.slice(
    globalConfig.indexOf(':root'),
    globalConfig.indexOf('}', globalConfig.indexOf(':root')),
  );
  const declared = new Set(
    [
      ...tokensCss.matchAll(/(--[a-z0-9-]+)\s*:/g),
      ...rootBlock.matchAll(/(--[a-z0-9-]+)\s*:/g),
    ].map((match) => match[1]),
  );

  // Collapse wrapped declarations so a prettier line break inside `var(...)`
  // does not read as a chain that ends early.
  const declarations = codeLines(rootBlock)
    .map(([, line]) => line)
    .join(' ')
    .split(';')
    .filter((declaration) => /--color-[a-z0-9-]+\s*:/.test(declaration));

  assert.ok(
    declarations.length > 3,
    `expected several --color-* declarations in :root, found ${declarations.length}`,
  );

  const broken = declarations
    .map((declaration) => {
      const referenced = [
        ...declaration.matchAll(/var\(\s*(--[a-z0-9-]+)/g),
      ].map((match) => match[1]);
      // The LAST name in the chain is the terminal fallback: it is what paints
      // when every earlier name is undefined, so it is the one that must
      // resolve. Earlier names are optional theme hooks by design.
      const terminal = referenced[referenced.length - 1];
      return { declaration: declaration.trim(), terminal };
    })
    .filter(({ terminal }) => terminal && !declared.has(terminal))
    .map(
      ({ declaration, terminal }) =>
        `${declaration} -> terminal fallback ${terminal} is undefined`,
    );

  assert.deepEqual(
    broken,
    [],
    `a :root declaration whose terminal fallback names nothing is ` +
      `invalid-at-computed-value-time wherever the theme hook is absent:\n` +
      `${broken.join('\n')}`,
  );
});

/**
 * A Sass colour variable is resolved at compile time and baked into the output,
 * so no custom property -- and therefore no section or global theme -- can
 * override it. Colours that need to respond to a theme must be `var()` reads.
 *
 * The taxonomy tag label was `tokens.$color-blue-yale`, which compiles to
 * hsl(210, 100%, 21%) and made tags invisible on section theme one.
 */
test('themeable colors are not baked in as Sass literals', () => {
  // A `tokens.$color-*` in a colour-bearing position. Sass colour variables are
  // still legitimate inside `#{...}` interpolation used as a custom-property
  // fallback, which stays overridable, so only direct declarations are flagged.
  // Any colour-bearing property, and the literal may sit anywhere in the value
  // (`border: 1px solid tokens.$color-blue-yale`), not just immediately after
  // the colon. `#{...}` interpolation is excluded: used as a custom-property
  // fallback it stays overridable, which is the point.
  const violations = findInScss(
    /(?:^|[\s;{])(?:[a-z-]*color|fill|stroke|background|border[a-z-]*|box-shadow|outline)\s*:[^;]*(?<!#\{)tokens\.\$color-/,
  );

  assert.deepEqual(
    violations,
    [],
    `Sass colour literals cannot be themed. Read the custom property instead ` +
      `(e.g. var(--color-blue-yale)).\n${violations.join('\n')}`,
  );
});

/**
 * Light section themes must be excluded from the white-on-dark treatments.
 *
 * Section theme five paints a very light background (slot-nine), so the
 * required-field asterisk turning white makes it invisible. The exclusion list
 * named only `default` and `two`.
 */
test('light section themes are excluded from white-on-dark form styling', () => {
  const textfields = readFileSync(
    path.join(
      componentsDir,
      '01-atoms',
      'forms',
      'textfields',
      '_yds-textfields.scss',
    ),
    'utf8',
  );

  // The guard spans several lines, so normalise whitespace before matching.
  // Anchored on the `&::after` block it introduces, not just the first
  // `[data-component-theme]:not(` in the file -- otherwise adding an unrelated
  // guard above this one would leave the test happily validating the wrong
  // selector while the asterisk regressed.
  const guard = textfields
    .replace(/\s+/g, ' ')
    .match(
      /\[data-component-theme\]:not\(([^)]*(?:\([^)]*\)[^)]*)*)\) & \{ &::after \{ color: var\(--color-basic-white\)/,
    );

  assert.ok(
    guard,
    'expected the white required-asterisk rule to be behind a :not() ' +
      'light-theme exclusion guard in _yds-textfields.scss',
  );

  ['default', 'two', 'five'].forEach((theme) => {
    assert.ok(
      guard[1].includes(`[data-component-theme='${theme}']`),
      `section theme '${theme}' has a light background and must be excluded ` +
        `from the white required-asterisk rule; guard is: ${guard[1].trim()}`,
    );
  });
});
